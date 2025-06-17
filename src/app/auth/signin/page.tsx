'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      setEmptyFields(true);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login_aluno', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        // Exemplo: salvar token no localStorage e redirecionar
        localStorage.setItem('token', data.access_token);
        router.push('/'); // redirecione para onde quiser
      } else {
        setLoginError(true);
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setLoginError(true);
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between bg-gray-100">
      <Header home={false} />
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8">
        <h1
          className={`${luckiestGuy.variable} text-[#227C9D] text-5xl font-bold mb-8`}
          style={{ fontFamily: "Luckiest Guy" }}
        >
          Entrar
        </h1>

        <form className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 space-y-6">
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
              id="senha"
              type="password"
              onChange={(e) => setSenha(e.target.value)}
              value={senha}
              placeholder="Digite sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-[#227C9D] text-white text-xl py-3 rounded-lg hover:bg-[#1a5d74] transition-colors"
          >
            Entrar
          </button>
        </form>
      </main>
      <Footer />

      {/* Modal - Campos vazios */}
      <AnimatePresence>
        {emptyFields && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <h2 className={`${luckiestGuy.variable} text-[#FE6D73] text-3xl font-extrabold`} style={{ fontFamily: "Luckiest Guy" }}>
                Atenção!
              </h2>
              <p className="text-gray-700 mt-4">Preencha todos os campos para continuar.</p>
              <button
                onClick={() => setEmptyFields(false)}
                className="mt-6 bg-[#227C9D] text-white px-6 py-2.5 rounded hover:bg-[#1b627f] transition-all"
              >
                Voltar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal - Erro login */}
      <AnimatePresence>
        {loginError && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <h2 className={`${luckiestGuy.variable} text-[#FE6D73] text-3xl font-extrabold`} style={{ fontFamily: "Luckiest Guy" }}>
                Erro!
              </h2>
              <p className="text-gray-700 mt-4">Email ou senha incorretos. Tente novamente.</p>
              <button
                onClick={() => setLoginError(false)}
                className="mt-6 bg-[#227C9D] text-white px-6 py-2.5 rounded hover:bg-[#1b627f] transition-all"
              >
                Voltar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
