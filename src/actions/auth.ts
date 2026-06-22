"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function cadastrar(data: {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  phone?: string;
}) {

  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return { error: "Este e-mail já está cadastrado." };
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);


  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      cpf: data.cpf?.replace(/\D/g, "") || null,
      phone: data.phone || null,
    },
  });

}

export async function login(data: { email: string; password: string }) {
  const result = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });

  if (result?.error) {
    return { error: "E-mail ou senha incorretos." };
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}