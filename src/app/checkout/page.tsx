"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/providers/CartProvider';
import { Header } from '@/components/Header';

const schema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  telefone: yup.string().required('Telefone é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  cep: yup.string().required('CEP é obrigatório'),
  endereco: yup.string().required('Endereço é obrigatório'),
  numero: yup.string().required('Número é obrigatório'),
  complemento: yup.string().optional(),
  bairro: yup.string().required('Bairro é obrigatório'),
  cidade: yup.string().required('Cidade é obrigatória'),
  estado: yup.string().required('Estado é obrigatório').length(2, 'Apenas a sigla (ex: SP)'),
});

type CheckoutFormData = yup.InferType<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();
  const { getTotal, items } = useCart();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    // Save to context or local storage if needed in a real app
    console.log(data);
    router.push('/entrega');
  };

  const subtotal = getTotal();
  const total = subtotal; // Assuming shipping is calculated later

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Checkout - Dados Pessoais</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 md:p-8 rounded-lg border shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Dados Pessoais */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Dados Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input id="nome" placeholder="João da Silva" {...register('nome')} />
                      {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="joao@exemplo.com" {...register('email')} />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input id="telefone" placeholder="(11) 99999-9999" {...register('telefone')} />
                      {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input id="cpf" placeholder="000.000.000-00" {...register('cpf')} />
                      {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="pt-4">
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">Endereço de Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="space-y-2 md:col-span-4">
                      <Label htmlFor="cep">CEP</Label>
                      <Input id="cep" placeholder="00000-000" {...register('cep')} />
                      {errors.cep && <p className="text-red-500 text-sm">{errors.cep.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-8">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input id="endereco" placeholder="Rua, Avenida, etc." {...register('endereco')} />
                      {errors.endereco && <p className="text-red-500 text-sm">{errors.endereco.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-3">
                      <Label htmlFor="numero">Número</Label>
                      <Input id="numero" placeholder="123" {...register('numero')} />
                      {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-9">
                      <Label htmlFor="complemento">Complemento <span className="text-gray-400 font-normal">(Opcional)</span></Label>
                      <Input id="complemento" placeholder="Apto, Bloco, etc." {...register('complemento')} />
                    </div>

                    <div className="space-y-2 md:col-span-5">
                      <Label htmlFor="bairro">Bairro</Label>
                      <Input id="bairro" placeholder="Centro" {...register('bairro')} />
                      {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-5">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input id="cidade" placeholder="São Paulo" {...register('cidade')} />
                      {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade.message}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Input id="estado" placeholder="SP" maxLength={2} className="uppercase" {...register('estado')} />
                      {errors.estado && <p className="text-red-500 text-sm">{errors.estado.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button type="submit" size="lg" className="bg-black hover:bg-gray-800 text-white px-8">
                    Ir para a Entrega
                  </Button>
                </div>
              </form>
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
                {items.length > 3 && (
                  <p className="text-sm text-gray-500">e mais {items.length - 3} item(ns)...</p>
                )}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
