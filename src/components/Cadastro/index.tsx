"use client";

import Link from "next/link";
import { User, Lock, Mail, Phone, FileText, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { cadastrar } from "@/actions/auth";
import { toast } from "sonner";

const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

const schema = yup.object().shape({
  nome: yup
    .string()
    .required("Nome é obrigatório")
    .matches(/^[A-Za-zÀ-ÿ\s]+$/, "Apenas letras e espaços permitidos")
    .max(35, "Máximo de 35 caracteres")
    .min(3, "Mínimo de 3 caracteres"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("E-mail é obrigatório")
    .max(35, "Máximo de 35 caracteres")
    .matches(
      /@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|icloud\.com|proton\.me|protonmail\.com)$/i,
      "Provedor de e-mail não suportado"
    ),
  cpf: yup
    .string()
    .required("CPF é obrigatório")
    .test("cpf-length", "Deve conter exatos 11 algarismos", (val) => {
      return val ? val.replace(/\D/g, "").length === 11 : false;
    }),
  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .test("telefone-length", "Deve conter exatos 11 algarismos", (val) => {
      return val ? val.replace(/\D/g, "").length === 11 : false;
    }),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Mínimo de 8 caracteres")
    .max(12, "Máximo de 12 caracteres")
    .matches(/(?=.*[a-zA-Z])/, "Deve conter pelo menos 1 letra")
    .matches(/(?=.*\d)/, "Deve conter pelo menos 1 algarismo")
    .matches(/(?=.*[^a-zA-Z0-9])/, "Deve conter 1 caractere especial"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

export function Cadastro() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

const onSubmit = async (data: any) => {
  const result = await cadastrar({
    name: data.nome,
    email: data.email,
    password: data.password,
    cpf: data.cpf.replace(/\D/g, ""),
    phone: data.telefone.replace(/\D/g, ""),
  });

  if (result?.error) {
    toast.error(result.error);
    return;
  }
};


  const { onChange: cpfOnChange, ...cpfRest } = register("cpf");
  const { onChange: phoneOnChange, ...phoneRest } = register("telefone");

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden flex items-center justify-center bg-gray-900">
      <main 
        className="flex w-full h-full max-w-[1536px] max-h-[864px] shadow-2xl bg-white overflow-hidden"
      >
        {/* Seção da Esquerda */}
        <div 
          className="w-full md:w-[40%] h-full bg-cover bg-center flex items-center justify-center md:justify-end relative shrink-0 z-20"
          style={{ 
            backgroundImage: "url(/Auth/imagem-4_Autentificacao.png)" 
          }}
        >
          {/* Formulário de Cadastro */}
          <section 
            className="bg-white rounded-xl shadow-2xl flex flex-col relative z-30 w-[90%] md:w-[474px] px-[35px] py-[25px] h-auto min-h-[431px] md:mr-[-138.24px]"
          >
            <div className="mb-5 text-center">
              <h1 className="text-2xl font-bold text-gray-900">Cadastro</h1>
              <p className="text-sm text-gray-500 mt-1">Crie sua conta para começar a comprar</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
              <div className="space-y-3">
                {/* Nome Completo */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="nome">Nome Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      id="nome"
                      maxLength={35}
                      {...register("nome")}
                      className={`block w-full pl-9 pr-3 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.nome ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="João da Silva" 
                    />
                  </div>
                  {errors.nome && <span className="text-red-500 text-[10px] block mt-0.5">{errors.nome.message}</span>}
                </div>

                {/* E-mail */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="email">E-mail</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      maxLength={35}
                      {...register("email")}
                      className={`block w-full pl-9 pr-3 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="seu@email.com" 
                    />
                  </div>
                  {errors.email && <span className="text-red-500 text-[10px] block mt-0.5">{errors.email.message}</span>}
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="cpf">CPF</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="text" 
                      id="cpf"
                      maxLength={14}
                      {...cpfRest}
                      onChange={(e) => {
                        e.target.value = cpfMask(e.target.value);
                        cpfOnChange(e);
                      }}
                      className={`block w-full pl-9 pr-3 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.cpf ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="000.000.000-00" 
                    />
                  </div>
                  {errors.cpf && <span className="text-red-500 text-[10px] block mt-0.5">{errors.cpf.message}</span>}
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="telefone">Telefone</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type="tel" 
                      id="telefone"
                      maxLength={15}
                      {...phoneRest}
                      onChange={(e) => {
                        e.target.value = phoneMask(e.target.value);
                        phoneOnChange(e);
                      }}
                      className={`block w-full pl-9 pr-3 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.telefone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="(00) 00000-0000" 
                    />
                  </div>
                  {errors.telefone && <span className="text-red-500 text-[10px] block mt-0.5">{errors.telefone.message}</span>}
                </div>

                {/* Senha */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="password">Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password"
                      maxLength={12}
                      {...register("password")}
                      className={`block w-full pl-9 pr-10 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="••••••••" 
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <span className="text-red-500 text-[10px] block mt-0.5">{errors.password.message}</span>}
                </div>

                {/* Confirmação de Senha */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="confirm-password">Confirmação de Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      id="confirm-password"
                      maxLength={12}
                      {...register("confirmPassword")}
                      className={`block w-full pl-9 pr-10 py-1.5 border rounded-lg sm:text-sm outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-600 focus:border-indigo-600'
                      }`}
                      placeholder="••••••••" 
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="text-red-500 text-[10px] block mt-0.5">{errors.confirmPassword.message}</span>}
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={!isValid}
                  className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 ${
                    isValid 
                      ? "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600" 
                      : "bg-indigo-400 opacity-60 cursor-not-allowed"
                  }`}
                >
                  Cadastrar
                </button>
              </div>

              <div className="mt-1 text-center text-sm text-gray-600 border-t pt-3 border-gray-100">
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
          style={{ backgroundImage: "url(/Auth/imagem-3_Autentificacao.png)" }}
        >
          <div 
            className="w-full h-full max-w-[800px] max-h-[620px] flex flex-col justify-between"
          >
            <div className="flex justify-end items-end w-full">
              <Link href="/">
                <img 
                  src="/Logo/LogoCompleta-ElectronicSolve_Store.png" 
                  alt="ElectronicSolve Store" 
                  className="h-17 md:h-17 w-auto object-contain hover:opacity-90 transition-opacity drop-shadow-lg" 
                />
              </Link>
            </div>

            <div className="flex flex-col items-end w-full">
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
      </main>
    </div>
  );
}