"use client";

import { HeadphonesIcon, Mail, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    title: "Como faço para acompanhar meu pedido?",
    description:
      "Após a confirmação do pedido, você receberá um e-mail com o código de rastreamento e o prazo estimado. Use o painel de pedidos para verificar o status de processamento, expedição e entrega em tempo real.",
  },
  {
    title: "Quais são as formas de pagamento aceitas?",
    description:
      "Aceitamos cartão de crédito, PIX e boleto bancário. No checkout, você pode escolher a forma de pagamento e visualizar o valor final incluindo descontos, juros e parcelas antes de confirmar a compra.",
  },
  {
    title: "Como faço para trocar ou devolver um produto?",
    description:
      "Para solicitar troca ou devolução, acesse sua área de pedidos e selecione o pedido correspondente. Informe o motivo do retorno e acompanhe a autorização; a devolução é feita conforme nossa política e com instruções completas enviadas por e-mail.",
  },
  {
    title: "Posso atualizar meu endereço após a compra?",
    description:
      "Se o pedido ainda não foi despachado, você pode atualizar o endereço diretamente na sua conta. Caso já esteja em trânsito, entre em contato imediatamente para verificarmos a possibilidade de redirecionamento ou bloqueio de envio.",
  },
  {
    title: "Meu pedido está atrasado ou não foi entregue, o que devo fazer?",
    description:
      "Se o prazo de entrega estimado passou e o pedido não chegou, consulte o código de rastreamento e, se não houver atualização recente, abra uma solicitação na área de pedidos. Nossa equipe investiga o caso com a transportadora e retorna com a solução o mais rápido possível.",
  },
  {
    title: "Como funciona a política de cancelamento e reembolso?",
    description:
      "Cancelamentos podem ser solicitados antes do envio do pedido. Após a confirmação do cancelamento, o reembolso é processado conforme a forma de pagamento escolhida, com prazo que pode variar entre 5 e 15 dias úteis.",
  },
];

export default function SupportPageComponent() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqItems = useMemo(
    () =>
      faqItems.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />

      {/* Seção com bg gradiente azul para preto */}
      <section className="w-full bg-gradient-to-r from-[#011C40] to-[#011CA0] py-20 text-white">
        <div className="mx-auto max-w-[1268px] px-4">
          <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,600px)] items-center">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 mb-6">
                <HeadphonesIcon size={36} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold leading-tight max-w-2xl">
                Estamos prontos para ajudar você a resolver qualquer dúvida
              </h1>
              <p className="text-lg leading-relaxed text-slate-200 mt-6">
                Encontre respostas rápidas, acompanhe pedidos, entenda nossas políticas e entre em contato com nossos canais de suporte quando precisar.
              </p>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1268px] px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Como podemos te ajudar?</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Digite sua dúvida abaixo para filtrar as perguntas frequentes. Assim você encontra a resposta mais rápido.
          </p>
          <div className="mt-6 max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Busque por pedido, pagamento, devolução..."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <section className="space-y-6">
          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Dúvidas frequentes</h3>
            <Accordion type="single" collapsible>
              {filteredFaqItems.length > 0 ? (
                filteredFaqItems.map((item, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    key={item.title}
                    className="border-b border-slate-200/40 last:border-b-0"
                  >
                    <AccordionTrigger className="text-left text-lg text-slate-900">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-600">
                  Nenhum resultado encontrado para a busca.
                </div>
              )}
            </Accordion>
          </div>
        </section>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded border border-slate-200 bg-white p-8 shadow-md">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-5">
              <Phone size={28} className="text-[#011C40]" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Telefone</h3>
            <p className="text-gray-600 mb-4">
              Nosso time de atendimento está disponível de segunda a sexta-feira,
              das 8h às 18h.
            </p>
            <p className="text-lg font-semibold text-[#011C40]">0800 123 4567</p>
          </div>

          <div className="rounded border border-slate-200 bg-white p-8 shadow-md">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-5">
              <Mail size={28} className="text-[#011C40]" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">E-mail</h3>
            <p className="text-gray-600 mb-4">
              Envie sua solicitação e nossa equipe responde em até 24 horas úteis.
            </p>
            <p className="text-lg font-semibold text-[#011C40]">suporte@electronicsolve.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
