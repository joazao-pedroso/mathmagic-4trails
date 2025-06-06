import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Luckiest_Guy } from "next/font/google";
import { useState } from "react";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between bg-[#f0f8ff]">
      <Header home={false} />

      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8">
        <h1
          className={`${luckiestGuy.variable} text-[#227C9D] text-5xl font-bold mb-8`}
          style={{ fontFamily: "Luckiest Guy" }}
        >
          Cadastro
        </h1>

        <form className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="text-2xl text-[#227C9D]"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              Nome:
            </label>
            <input
              id="nome"
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              type="text"
              placeholder="Digite seu nome"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-2xl text-[#227C9D]"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Digite seu email"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="senha"
              className="text-2xl text-[#227C9D]"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              Senha:
            </label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmar-senha"
              className="text-2xl text-[#227C9D]"
              style={{ fontFamily: "Luckiest Guy" }}
            >
              Confirmar senha:
            </label>
            <input
            onChange={(e) => setSenha2(e.target.value)}
            value={senha2}
              id="confirmar-senha"
              type="password"
              placeholder="Confirme sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#227C9D] cursor-pointer text-white text-xl py-3 rounded-lg hover:bg-[#1a5d74] transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
