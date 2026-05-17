"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para o método de pagamento padrão
    router.push('/checkout/pix');
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-12 text-center min-h-[calc(100vh-64px)] flex items-center justify-center">
      <p className="text-gray-600">Redirecionando para pagamento...</p>
    </div>
  );
}
