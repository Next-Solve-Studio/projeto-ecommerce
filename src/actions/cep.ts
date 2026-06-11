"use server";

export async function buscarCep(cep: string) {
  const cepLimpo = cep.replace(/\D/g, "");
  if (cepLimpo.length !== 8) return { error: "CEP inválido" };

  const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
  const data = await res.json();

  if (data.erro) return { error: "CEP não encontrado" };

  return {
    endereco: data.logradouro as string,
    bairro: data.bairro as string,
    cidade: data.localidade as string,
    estado: data.uf as string,
  };
}