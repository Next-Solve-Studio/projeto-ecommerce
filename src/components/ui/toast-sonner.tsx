"use client";

import { Toaster, toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  UserCheck,
} from "lucide-react";
import type { ReactNode } from "react";

const DEFAULT_DURATION = 4000;

interface ToastContentProps {
  icon: ReactNode;
  title: string;
  description: string;
  tone: "success" | "error" | "info" | "green";
}

function ToastContent({ icon, title, description, tone }: ToastContentProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border px-4 py-3 shadow-lg transition-all duration-200 ${
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-900"
          : tone === "info"
          ? "border-blue-200 bg-blue-50 text-blue-900"
          : tone === "green"
          ? "border-green-200 bg-green-50 text-green-900"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${
            tone === "error"
              ? "bg-red-100 text-red-600"
              : tone === "info"
              ? "bg-blue-100 text-blue-600"
              : tone === "green"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-200">
        <div
          className={`h-full ${
            tone === "error"
              ? "bg-red-500"
              : tone === "info"
              ? "bg-blue-600"
              : tone === "green"
              ? "bg-green-500"
              : "bg-black"
          } animate-toast-progress origin-right`}
        />
      </div>
    </div>
  );
}

export function ToastSonner() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton={false}
        duration={DEFAULT_DURATION}
        toastOptions={{
          duration: DEFAULT_DURATION,
          style: {
            padding: 0,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />

      <style jsx global>{`
        @keyframes toast-progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }

        .animate-toast-progress {
          animation: toast-progress ${DEFAULT_DURATION}ms linear forwards;
        }

        [data-sonner-toast] {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
      `}</style>
    </>
  );
}

export function toastAddedToCart(quantity: number, productName: string) {
  toast.custom(
    () => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Produto adicionado ao carrinho"
        description={`${quantity}x ${productName} adicionado ao carrinho!`}
        tone="success"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}

export function toastLoginSuccess() {
  toast.custom(
    () => (
      <ToastContent
        icon={<UserCheck size={18} />}
        title="Login efetuado com sucesso"
        description="Bem-vindo de volta!"
        tone="success"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}

export function toastLoginError(message = "Falha ao realizar o login") {
  toast.custom(
    () => (
      <ToastContent
        icon={<AlertTriangle size={18} />}
        title="Falha ao realizar o login"
        description={message}
        tone="error"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}

export function toastCadastroSuccess() {
  toast.custom(
    () => (
      <ToastContent
        icon={<Sparkles size={18} />}
        title="Cadastro realizado com sucesso"
        description="Sua conta foi criada com sucesso."
        tone="success"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}

export function toastCompraConcluida() {
  toast.custom(
    () => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Compra concluída"
        description="Seu pedido foi finalizado com sucesso."
        tone="info"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}

export function toastEnderecoAdicionado() {
  toast.custom(
    () => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Endereço adicionado"
        description="Endereço salvo com sucesso."
        tone="green"
      />
    ),
    {
      duration: DEFAULT_DURATION,
    },
  );
}
