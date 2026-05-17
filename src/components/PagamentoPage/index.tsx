"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/Header";

export default function PagamentoPageComponent() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para o método de pagamento padrão
    router.push("/checkout/pix");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-64px)] flex items-center justify-center">
        <p className="text-gray-600">Redirecionando para pagamento...</p>
      </div>
    </div>
  );
}
