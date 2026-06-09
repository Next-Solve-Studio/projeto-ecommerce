import { Header } from "@/components/Header";

export default function AccountPageComponent() {
  return (
    <div className="min-h-screen bg-[#F2F3F4]">
      <Header />
      <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-64px)]">
        <h1 className="text-3xl font-bold mb-6">Central Minha Conta</h1>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <p className="text-gray-600">
            Bem-vindo à sua central. Esta página está em construção.
          </p>
        </div>
      </div>
    </div>
  );
}
