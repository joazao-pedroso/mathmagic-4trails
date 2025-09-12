'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
import { useState } from "react";
import { useRouter } from 'next/navigation'

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function Register() {
    const router = useRouter()
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [showWarningPassword, setShowWarningPassword] = useState(false);
    const [showWarningPasswordLeng, setShowWarningPasswordLeng] = useState(false)
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");
    const [registerSucess, setRegisterSuccess] = useState(false);
    const [validateEmail, setValidateEmail] = useState(false);
    const handleValidate = () => {
      if (!nome || !email || !senha || !senha2) {
        setShowWarning(true);
        return;
      }
      if (senha !== senha2) {
        setShowWarningPassword(true)
        return;
      }
      if (senha.length < 8 ){
        setShowWarningPasswordLeng(true)
        return
      }
      handleCreateUser()
    }

    async function handleCreateUser(){
      const response = await fetch('http://127.0.0.1:5000/api/criar_aluno', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, senha }),
      });
      if (response.status === 200 || response.status == 201){
        setRegisterSuccess(true);
      }else if (response.status === 409) {
        setValidateEmail(true);
      }
      else {
        console.error("Erro ao criar usuário", response);
      }

    }
    
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between bg-gray-100">
      <Header home={false} auth={true} />
      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8">
        <h1
          className={`${luckiestGuy.variable} text-[#227C9D] text-5xl font-bold mb-8`}
          style={{ fontFamily: "Luckiest Guy" }}
        >
          CADASTRO
        </h1>
        <form className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="nome"
              className="text-2xl text-[#227C9D]"
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
            onClick={handleValidate}
            type="button"
            className="w-full bg-[#227C9D] cursor-pointer text-white text-xl py-3 rounded-lg hover:bg-[#1a5d74] transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </main>
      <Footer />
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#FE6D73] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Atenção!
                </div>
                <p className="text-gray-700 text-base">
                  Você precisa preencher todos os campos para continuar.
                </p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showWarningPassword && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#FE6D73] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Atenção!
                </div>
                <p className="text-gray-700 text-base">
                  As senhas digitadas não coincidem. Por favor, verifique e tente novamente.
                </p>
                <button
                  onClick={() => setShowWarningPassword(false)}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {validateEmail && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#FE6D73] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Atenção!
                </div>
                <p className="text-gray-700 text-base">
                  Ja tem um usuario com esse email cadastrado. Por favor, tente outro email.
                </p>
                <button
                  onClick={() => setValidateEmail(false)}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showWarningPasswordLeng && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#FE6D73] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Atenção!
                </div>
                <p className="text-gray-700 text-base">
                  A senha deve ter no minimo 8 Caracteres.
                </p>
                <button
                  onClick={() => setShowWarningPasswordLeng(false)}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {registerSucess && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#17C3B2] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Parabéns!
                </div>
                <p className="text-gray-700 text-base">
                  Usuario cadastrado com sucesso!
                </p>
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
