import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 justify-items-center">
          {/* Logo e Descrição */}
          <div className="flex flex-col gap-4 w-fit items-start">
            <div className="flex items-center gap-2">
              <Image
                src="/Logo/Logo-ElectronicSolve_Store.png"
                alt="ElectronicSolve Store"
                width={40}
                height={40}
                className="h-10 object-contain"
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                ElectronicSolve Store
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed text-justify">
              Sua loja especializada em tecnologia. Trazemos os melhores
              eletrônicos do mercado global diretamente para você, com rapidez e
              segurança.
            </p>
          </div>

          {/* Links das Categorias*/}
          <div className="flex flex-col gap-4 w-fit items-start">
            <h3 className="text-white font-semibold mb-2">Categorias</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/produtos?categoria=Smartphones"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Smartphones
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Notebooks"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Notebooks
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Fones de Ouvido"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Fones de Ouvido
                </Link>
              </li>
              <li>
                <Link
                  href="/produtos?categoria=Setup Gamer"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  Setup Gamer
                </Link>
              </li>
            </ul>
          </div>

          {/* Atendimento e Redes sociais */}
          <div className="flex flex-col gap-4 w-fit items-start">
            <h3 className="text-white font-semibold mb-2">
              Atendimento e Redes
            </h3>
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
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="transition-all hover:opacity-80">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="Facebook"
                  className="w-5 h-5"
                />
              </a>
              <a href="#" className="transition-all hover:opacity-80">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/500px-WhatsApp_icon.png"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="transition-all hover:opacity-80">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
              <a href="#" className="transition-all hover:opacity-80">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Nossa Loja Física */}
          <div className="flex flex-col gap-4 w-fit items-start">
            <h3 className="text-white font-semibold mb-2">Nossa Loja Física</h3>
            <div className="flex items-start gap-3 text-sm text-gray-400">
              <MapPin size={20} className="shrink-0 mt-0.5 text-blue-400" />
              <p className="leading-relaxed">
                Av. Paulista, 1578 - Bela Vista
                <br />
                São Paulo - SP, 01310-200
                <br />
                Brasil
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-12">
          <p
            className="text-xs text-gray-500 text-center
            "
          >
            &copy; {new Date().getFullYear()} ElectronicSolve Store Comércio de
            Eletrônicos Ltda. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
