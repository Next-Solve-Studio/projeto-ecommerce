"use client";

import Link from "next/link";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth";
import { toast } from "sonner";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
  const result = await login({
    email: data.email,
    password: data.password,
  });

  if (result?.error) {
    toast.error(result.error);
  }
};

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-900">
      <main 
        className="flex w-full h-full max-w-[1536px] max-h-[864px] shadow-2xl bg-white overflow-hidden"
      >
        {/* Seção da Esquerda */}
        <div 
          className="hidden md:flex w-[60%] h-full bg-cover bg-center items-center justify-center relative shrink-0"
          style={{ 
            backgroundImage: "url(/Auth/imagem-1_Autentificacao.png)" 
          }}
        >
          <div 
            className="w-full h-full max-w-[800px] max-h-[620px] flex flex-col justify-between"
            style={{ 
              padding: "0px 203.240px 0px 0px" 
            }}
          >
            <div className="flex justify-start items-start w-full">
              <Link href="/">
                <img 
                  src="/Logo/LogoCompleta-ElectronicSolve_Store.png" 
                  alt="ElectronicSolve Store" 
                  className="h-17 md:h-17 w-auto object-contain hover:opacity-90 transition-opacity drop-shadow-lg" 
                />
              </Link>
            </div>

            <div className="flex flex-col items-start w-full">
              <div className="flex gap-4 mb-3">
                <Link href="#" className="transition-all hover:opacity-80">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-5 h-5" />
                </Link>
                <Link href="#" className="transition-all hover:opacity-80">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/500px-WhatsApp_icon.png" alt="WhatsApp" className="w-6 h-6" />
                </Link>
                <Link href="#" className="transition-all hover:opacity-80">
                  <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-5 h-5" />
                </Link>
                <Link href="#" className="transition-all hover:opacity-80">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-5 h-5" />
                </Link>
              </div>
              <span className="text-white text-base font-medium tracking-wide drop-shadow-md">
                Electronic Solve | Store
              </span>
            </div>
          </div>
        </div>

        {/* Seção da Direita */}
        <div 
          className="w-full md:w-[40%] h-full bg-cover bg-center flex items-center justify-center md:justify-start relative shrink-0"
          style={{ 
            backgroundImage: "url(/Auth/imagem-2_Autentificacao.png)" 
          }}
        >
          {/* Formulário de Login sobreposto com altura automática (corrige o link vazando) */}
          <section 
            className="bg-white rounded-xl shadow-2xl flex flex-col relative z-10 w-[90%] md:w-[474px] p-[35px] h-auto min-h-[431px] md:ml-[-138.24px]"
          >
            <div className="flex justify-center mb-6">
              <img 
                src="/Logo/Logo-ElectronicSolve_Store.png" 
                alt="ElectronicSolve Store" 
                className="h-16 w-auto object-contain" 
              />
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h1>
              <p className="text-sm text-gray-500 mt-1">Insira suas credenciais para acessar sua conta</p>
            </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                    {...register("email", { required: true })}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="seu@email.com"
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
                      type={showPassword ? "text" : "password"} 
                      id="password"
                    {...register("password", { required: true })}
                      className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm outline-none transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

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

              <button 
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors"
              >
                Entrar
              </button>
            </form>

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