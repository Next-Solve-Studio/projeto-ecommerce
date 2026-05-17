import { CheckCircle2, Home, Package } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function CheckoutSucessoComponent() {
  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="bg-white p-8 md:p-12 rounded-lg border shadow-sm max-w-2xl w-full text-center">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-6">
            <CheckCircle2 size={64} className="text-green-600" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Pedido Realizado!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Obrigado pela sua compra. Seu pedido foi recebido e está sendo
            processado.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left space-y-3">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">
                Número do Pedido
              </span>
              <span className="font-bold">#{orderNumber}</span>
            </div>
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500 font-medium">Status</span>
              <span className="text-green-600 font-bold uppercase">
                Aprovado
              </span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-500 font-medium">Data</span>
              <span className="font-medium">
                {new Date().toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Link href="/pedidos" className="flex-1">
              <Button variant="outline" className="w-full h-12">
                <Package className="w-5 h-5 mr-2" />
                Acompanhar Pedido
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full h-12 bg-black hover:bg-gray-800">
                <Home className="w-5 h-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
