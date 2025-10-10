'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    console.log(data)

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          email: data.email,
          senha: data.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data)
      const { access_token, funcao } = response.data;

      if (access_token) {
        login(access_token, funcao);
        setSuccessMessage(true);
      } else {
        setLoginError(true);
      }

      reset();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between bg-gray-100">
      <Header home={false} auth={true} />

      <main className="flex flex-col items-center justify-center flex-grow w-full px-4 py-8">
        <h1
          className={`text-[#227C9D] text-5xl mb-8 ${luckiestGuy.variable}`}
          style={{ fontFamily: "Luckiest Guy" }}
        >
          ENTRAR
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 space-y-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-2xl text-[#227C9D]">
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
              placeholder="Digite seu email"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-2xl text-[#227C9D]">
              Senha:
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Senha é obrigatória" })}
              placeholder="Digite sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#227C9D] text-white text-xl py-3 rounded-lg hover:bg-[#1a5d74] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </main>

      <Footer />

      {/* Modal - Erro */}
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
              <h2
                className={`${luckiestGuy.variable} text-[#FE6D73] text-3xl font-extrabold`}
                style={{ fontFamily: "Luckiest Guy" }}
              >
                Erro!
              </h2>
              <p className="text-gray-700 mt-4">
                Email ou senha incorretos. Tente novamente.
              </p>
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

      {/* Modal - Sucesso */}
      <AnimatePresence>
        {successMessage && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <h2
                className={`${luckiestGuy.variable} text-[#38B000] text-3xl font-extrabold`}
                style={{ fontFamily: "Luckiest Guy" }}
              >
                Sucesso!
              </h2>
              <p className="text-gray-700 mt-4">
                Login bem-sucedido! Você está autenticado.
              </p>
              <button
                onClick={() => setSuccessMessage(false)}
                className="mt-6 bg-[#227C9D] text-white px-6 py-2.5 rounded hover:bg-[#1b627f] transition-all"
              >
                Fechar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
