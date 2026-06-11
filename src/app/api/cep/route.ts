import { type NextRequest, NextResponse } from "next/server";
import { buscarCep } from "@/actions/cep";

export async function GET(req: NextRequest) {
  const cep = req.nextUrl.searchParams.get("cep") ?? "";
  const result = await buscarCep(cep);
  return NextResponse.json(result);
}