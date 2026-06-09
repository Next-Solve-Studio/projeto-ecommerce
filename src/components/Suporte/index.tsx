import { HeadphonesIcon, Mail, MessageCircle, Phone } from "lucide-react";
import { Header } from "@/components/Header";

export default function SupportPageComponent() {
  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-gray-100 p-6 rounded-full inline-block mb-6">
              <HeadphonesIcon size={48} className="text-gray-900" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Atendimento ao Cliente</h1>
            <p className="text-gray-600">
              Estamos aqui para ajudar. Escolha uma das opções abaixo para
              entrar em contato com nossa equipe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-shadow">
              <MessageCircle className="mx-auto mb-4 text-blue-600" size={32} />
              <h3 className="font-bold mb-2">Chat Online</h3>
              <p className="text-sm text-gray-500 mb-4">
                Fale com um atendente em tempo real.
              </p>
              <span className="text-sm font-medium text-blue-600">
                Disponível agora
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-shadow">
              <Phone className="mx-auto mb-4 text-green-600" size={32} />
              <h3 className="font-bold mb-2">Telefone</h3>
              <p className="text-sm text-gray-500 mb-4">
                Segunda a Sexta, das 8h às 18h.
              </p>
              <span className="text-sm font-medium text-green-600">
                0800 123 4567
              </span>
            </div>

            <div className="bg-white p-6 rounded-lg border text-center hover:shadow-md transition-shadow">
              <Mail className="mx-auto mb-4 text-purple-600" size={32} />
              <h3 className="font-bold mb-2">E-mail</h3>
              <p className="text-sm text-gray-500 mb-4">
                Respondemos em até 24 horas úteis.
              </p>
              <span className="text-sm font-medium text-purple-600">
                suporte@electronicsolve.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
