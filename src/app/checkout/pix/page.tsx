"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/providers/CartProvider';
import { Copy, CheckCircle2, Loader2, QrCode, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export default function PixPaymentPage() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  const [copied, setCopied] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Hardcoding 35.90 if express was selected is hard without global state, 
  // but let's assume standard for now or just get the total since it's a prototype.
  const subtotal = getTotal();
  const total = subtotal; // For simplicity in prototype without shipping state

  const pixCode = "00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913Loja de Eletr6008SAO PAULO62070503***63041A2B";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success('Código Pix copiado!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate API delay
    setTimeout(() => {
      router.push('/finalizacao?method=Pix');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F2F3F4] py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Pagamento</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
              
              {/* Payment Methods Tabs */}
              <div className="flex space-x-4 border-b pb-4 mb-6">
                <Link href="/checkout/pix" className="flex items-center gap-2 px-4 py-2 border-b-2 border-black font-semibold text-black">
                  <QrCode className="w-5 h-5" />
                  Pix
                </Link>
                <Link href="/checkout/cartao" className="flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-black transition-colors">
                  <CreditCard className="w-5 h-5" />
                  Cartão de Crédito
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center py-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Pague com Pix</h2>
                  <p className="text-gray-500">Use o aplicativo do seu banco para pagar.</p>
                </div>

                {/* Simulated QR Code Area */}
                <div className="p-4 bg-gray-50 border rounded-lg flex flex-col items-center justify-center w-64 h-64">
                  <QrCode className="w-48 h-48 text-gray-800" strokeWidth={1} />
                </div>

                {/* Copy Paste Code */}
                <div className="w-full max-w-md space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Código Copia e Cola:</p>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={pixCode}
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-gray-500 font-mono text-sm truncate"
                    />
                    <Button variant="outline" onClick={handleCopy} className="flex-shrink-0">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copied ? 'Copiado' : 'Copiar'}
                    </Button>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-3 text-amber-600 bg-amber-50 px-4 py-3 rounded-full font-medium">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Aguardando pagamento...
                </div>

                <div className="pt-4 w-full border-t">
                  <Button 
                    size="lg" 
                    className="w-full bg-black hover:bg-gray-800 text-white h-14 text-lg" 
                    onClick={handleConfirm}
                    disabled={isConfirming}
                  >
                    {isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Confirmar Pagamento (Simulação)'
                    )}
                  </Button>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border sticky top-24 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Resumo do Pedido</h3>
              <div className="space-y-4 mb-6">
                {items.slice(0, 3).map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold line-clamp-2">{item.product.name}</p>
                      <p className="text-gray-500">Qtd: {item.quantity}</p>
                      <p className="font-medium">R$ {(item.product.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between font-bold text-xl pt-2">
                  <span>Total</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                 <Button variant="ghost" className="w-full" onClick={() => router.push('/entrega')}>
                   Voltar para Entrega
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
