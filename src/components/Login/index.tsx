"use client";

import Link from "next/link";
import { MonitorSmartphone, Lock, Mail } from "lucide-react";

export function Login() {
  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-900">
      {/* Adicionado fixed, inset-0 e z-50 para cobrir o Footer e travar a tela acima do layout global */}
      {/* Contêiner responsivo com medidas máximas garantindo que caibam exatamente na tela */}
      <main 
        className="flex w-full h-full max-w-[1536px] max-h-[864px] shadow-2xl bg-white overflow-hidden"
      >
        
        {/* Seção da Esquerda */}
        <div 
          className="hidden md:flex w-[60%] h-full bg-cover bg-center items-center justify-center relative shrink-0"
          style={{ 
            backgroundImage: "url(/imagem-1_Autentificacao.png)" 
          }}
        >
          {/* Div interna para futuro conteúdo com paddings específicos */}
          <div 
            className="w-full h-full max-w-[653.360px] max-h-[638.200px]"
            style={{ 
              padding: "40px 203.240px 65px 65px" 
            }}
          >
            {/* Conteúdo a definir depois */}
          </div>
        </div>

        {/* Seção da Direita */}
        <div 
          className="w-full md:w-[40%] h-full bg-cover bg-center flex items-center justify-center md:justify-start relative shrink-0"
          style={{ 
            backgroundImage: "url(/imagem-2_Autentificacao.png)" 
          }}
        >
          {/* Formulário de Login sobreposto com altura automática (corrige o link vazando) */}
          <section 
            className="bg-white rounded-xl shadow-2xl flex flex-col relative z-10 w-[90%] md:w-[474px] p-[35px] h-auto min-h-[431px] md:ml-[-138.24px]"
          >
            {/* Identidade Visual */}
            <div className="flex justify-center mb-6">
              <img 
                src="/Logo-EletronicSolve_Store.png" 
                alt="EletronicSolve Store" 
                className="h-16 w-auto object-contain" 
              />
            </div>

            {/* Título de Boas-vindas */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
              <p className="text-sm text-gray-500 mt-1">Insira suas credenciais para acessar sua conta</p>
            </div>

            {/* Formulário */}
            <form className="flex flex-col gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      id="password"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Opções extras */}
              <div className="flex items-center justify-between mt-2 mb-2">
                <div className="flex items-center">
                  <input 
                    id="remember-me" 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded cursor-pointer" 
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Continuar conectado
                  </label>
                </div>
                <Link href="/recuperar-senha" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão de Ação */}
              <button 
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors"
              >
                Entrar
              </button>
            </form>

            {/* Link de Cadastro */}
            <div className="mt-6 text-center text-sm text-gray-600 border-t pt-4 border-gray-100">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="font-medium text-indigo-600 hover:text-indigo-500">
                Cadastre-se
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}