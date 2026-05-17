import Link from 'next/link';
import { Globe, Share2, MessageCircle, Users, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        {/* Desktop 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Logo and Description */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* Generic NextJS Logo SVG */}
              <div className="bg-white rounded-full p-1 w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_1_2" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                    <circle cx="90" cy="90" r="90" fill="black"/>
                  </mask>
                  <g mask="url(#mask0_1_2)">
                    <circle cx="90" cy="90" r="90" fill="black"/>
                    <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_1_2)"/>
                    <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_1_2)"/>
                  </g>
                  <defs>
                    <linearGradient id="paint0_linear_1_2" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_1_2" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white"/>
                      <stop offset="1" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">ElectronicSolve Store</span>
            </div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Sua loja especializada em tecnologia. Trazemos os melhores eletrônicos do mercado global diretamente para você, com rapidez e segurança.
            </p>
          </div>

          {/* Col 2: Institutional Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold mb-2">Institucional</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Sobre a Empresa
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/trocas-e-devolucoes" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Trocas e Devoluções
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Social Media and Contacts */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold mb-2">Atendimento e Redes</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <Phone size={18} />
                <span>(11) 4002-8922</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <Mail size={18} />
                <span>contato@electrsolve.com.br</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Share2 size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Users size={20} />
              </a>
            </div>
          </div>

          {/* Col 4: Physical Address */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold mb-2">Nossa Loja Física</h3>
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={20} className="shrink-0 mt-0.5 text-blue-400" />
              <p className="leading-relaxed">
                Av. Paulista, 1578 - Bela Vista<br />
                São Paulo - SP, 01310-200<br />
                Brasil
              </p>
            </div>
          </div>

        </div>

        {/* Minimalist Bottom Line with Left-Aligned Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-12">
          <p className="text-xs text-gray-500 text-center
            ">
            &copy; {new Date().getFullYear()} ElectronicSolve Store Comércio de Eletrônicos Ltda. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
