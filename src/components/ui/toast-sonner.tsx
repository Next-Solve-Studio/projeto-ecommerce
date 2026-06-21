"use client";

import { Toaster, toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const DEFAULT_DURATION = 4000;

interface ToastContentProps {
  icon: ReactNode;
  title: string;
  description: string;
  tone: "success" | "error" | "info" | "green";
  toastId: number | string;
}

function ToastContent({ icon, title, description, tone, toastId }: ToastContentProps) {
  const toneStyles = {
    error: {
      borderColor: "#fecaca",
      backgroundColor: "#fef2f2",
      color: "#991b1b",
      iconBackground: "#fee2e2",
      iconColor: "#b91c1c",
      progressColor: "#ef4444",
    },
    info: {
      borderColor: "#bfdbfe",
      backgroundColor: "#eff6ff",
      color: "#1d4ed8",
      iconBackground: "#dbeafe",
      iconColor: "#1e40af",
      progressColor: "#2563eb",
    },
    green: {
      borderColor: "#bbf7d0",
      backgroundColor: "#ecfdf5",
      color: "#166534",
      iconBackground: "#dcfce7",
      iconColor: "#15803d",
      progressColor: "#16a34a",
    },
    success: {
      borderColor: "#cbd5e1",
      backgroundColor: "#ffffff",
      color: "#0f172a",
      iconBackground: "#f1f5f9",
      iconColor: "#475569",
      progressColor: "#111827",
    },
  };

  const styles = toneStyles[tone] ?? toneStyles.success;
  const [isInteracting, setIsInteracting] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (duration = DEFAULT_DURATION) => {
      clearTimer();
      timerRef.current = window.setTimeout(() => {
        toast.dismiss(toastId);
      }, duration);
    },
    [clearTimer, toastId],
  );

  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false);
    setProgressKey((current) => current + 1);
  }, []);

  const handleToastClick = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    clearTimer();
    window.setTimeout(() => {
      toast.dismiss(toastId);
    }, 180);
  }, [isClosing, toastId]);

  useEffect(() => {
    if (isClosing) {
      clearTimer();
      return;
    }

    if (!isInteracting) {
      setProgressKey((current) => current + 1);
      startTimer(DEFAULT_DURATION);
    } else {
      clearTimer();
    }

    return () => {
      clearTimer();
    };
  }, [clearTimer, isClosing, isInteracting, startTimer]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border px-4 py-3 shadow-lg transition-all duration-200"
      onPointerEnter={handleInteractionStart}
      onPointerLeave={handleInteractionEnd}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onClick={handleToastClick}
      style={{
        borderColor: styles.borderColor,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        transform: isClosing ? "translateX(120%)" : undefined,
        opacity: isClosing ? 0 : 1,
        transition: "transform 180ms ease, opacity 180ms ease",
        cursor: "pointer",
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: styles.iconBackground,
            color: styles.iconColor,
          }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-5" style={{ color: styles.color }}>
            {description}
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 h-1 w-full"
        style={{ backgroundColor: "#e2e8f0" }}
      >
        {!isInteracting ? (
          <div
            key={progressKey}
            className="h-full animate-toast-progress origin-right"
            style={{ backgroundColor: styles.progressColor }}
          />
        ) : null}
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
        swipeDirections={["left", "right"]}
        duration={Infinity}
        toastOptions={{
          duration: Infinity,
          style: {
            padding: 0,
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />
    </>
  );
}

export function toastAddedToCart(quantity: number, productName: string) {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Produto adicionado ao carrinho"
        description={`${quantity}x ${productName} adicionado ao carrinho!`}
        tone="green"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}

export function toastLoginSuccess() {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<UserCheck size={18} />}
        title="Login efetuado com sucesso"
        description="Bem-vindo de volta!"
        tone="success"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}

export function toastLoginError(message = "Falha ao realizar o login") {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<AlertTriangle size={18} />}
        title="Falha ao realizar o login"
        description={message}
        tone="error"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}

export function toastCadastroSuccess() {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<Sparkles size={18} />}
        title="Cadastro realizado com sucesso"
        description="Sua conta foi criada com sucesso."
        tone="success"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}

export function toastCompraConcluida() {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Compra concluída"
        description="Seu pedido foi finalizado com sucesso."
        tone="info"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}

export function toastEnderecoAdicionado() {
  toast.custom(
    (toastId) => (
      <ToastContent
        icon={<CheckCircle2 size={18} />}
        title="Endereço adicionado"
        description="Endereço salvo com sucesso."
        tone="green"
        toastId={toastId}
      />
    ),
    {
      duration: Infinity,
    },
  );
}
