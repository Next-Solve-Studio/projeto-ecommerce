"use client";

import Link from "next/link";
import { User, Lock, Mail, Phone, FileText, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-900">
      <main 
        className="flex w-full h-full max-w-[1536px] max-h-[864px] shadow-2xl bg-white overflow-hidden"
      >
        {/* Seção da Esquerda */}
        <div 
          className="w-full md:w-[40%] h-full bg-cover bg-center flex items-center justify-center md:justify-end relative shrink-0 z-20"
          style={{ 
            backgroundImage: "url(/imagem-4_Autentificacao.png)" 
          }}
        >
          {/* Formulário de Cadastro */}
          <section 
            className="bg-white rounded-xl shadow-2xl flex flex-col relative z-30 w-[90%] md:w-[474px] p-[35px] h-auto min-h-[431px] md:mr-[-138.24px]"
          >
            <div className="flex justify-center mb-4">
              <img 
                src="/Logo-EletronicSolve_Store.png" 
                alt="EletronicSolve Store" 
                className="h-14 w-auto object-contain" 
              />
            </div>

            <div className="mb-5 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Cadastro</h1>
              <p className="text-sm text-gray-500 mt-1">Crie sua conta para começar a comprar</p>
            </div>

            <form className="flex flex-col gap-3">
              <div className="space-y-3">
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="nome">Nome Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" id="nome"
                      className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="João da Silva" required
                    />
                  </div>
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="email">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="email" id="email"
                      className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="seu@email.com" required
                    />
                  </div>
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="cpf">CPF</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" id="cpf"
                      className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="000.000.000-00" required
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="telefone">Telefone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="tel" id="telefone"
                      className="block w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="(00) 00000-0000" required
                    />
                  </div>
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="password">Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type={showPassword ? "text" : "password"} id="password"
                      className="block w-full pl-9 pr-10 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirmação de Senha */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="confirm-password">Confirmação de Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input type={showConfirmPassword ? "text" : "password"} id="confirm-password"
                      className="block w-full pl-9 pr-10 py-1.5 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="••••••••" required />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/login" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors">
                  Cadastrar
                </Link>
              </div>

              <div className="mt-1 text-center text-xs text-gray-600 border-t pt-3 border-gray-100">
                Já tem uma conta?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Faça login
                </Link>
              </div>
            </form>
          </section>
        </div>

        {/* Seção da Direita */}
        <div 
          className="hidden md:flex w-[60%] h-full bg-cover bg-center items-center justify-center relative shrink-0 z-0"
          style={{ backgroundImage: "url(/imagem-3_Autentificacao.png)" }}
        >
          <div 
            className="w-full h-full max-w-[653.360px] max-h-[638.200px]"
            style={{ padding: "40px 203.240px 65px 65px" }}
          >
            {/* Conteúdo a definir depois */}
          </div>
        </div>
      </main>
    </div>
  );
}