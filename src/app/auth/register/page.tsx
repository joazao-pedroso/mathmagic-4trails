'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

interface RegisterFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function Register() {
  const router = useRouter();

  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);
    setRegisterError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201 || response.status === 200) {
        setRegisterSuccess(true);
        reset();
      } else {
        setRegisterError("Erro ao cadastrar usuário. Tente novamente.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 409) {
        setRegisterError("Este email já está cadastrado.");
      } else {
        setRegisterError("Erro inesperado. Tente novamente.");
      }
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
          CADASTRO
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white rounded-xl shadow-xl p-8 space-y-6"
        >
          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="text-2xl text-[#227C9D]">
              Nome:
            </label>
            <input
              id="nome"
              type="text"
              {...register("nome", { required: "Nome é obrigatório" })}
              placeholder="Digite seu nome"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.nome && (
              <p className="text-red-500 text-sm">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-2xl text-[#227C9D]">
              Email:
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email é obrigatório",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email inválido",
                },
              })}
              placeholder="Digite seu email"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="senha" className="text-2xl text-[#227C9D]">
              Senha:
            </label>
            <input
              id="senha"
              type="password"
              {...register("senha", {
                required: "Senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter pelo menos 8 caracteres",
                },
              })}
              placeholder="Digite sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.senha && (
              <p className="text-red-500 text-sm">{errors.senha.message}</p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmarSenha" className="text-2xl text-[#227C9D]">
              Confirmar Senha:
            </label>
            <input
              id="confirmarSenha"
              type="password"
              {...register("confirmarSenha", {
                required: "Confirmação de senha é obrigatória",
                validate: (value) =>
                  value === watch("senha") || "As senhas não coincidem",
              })}
              placeholder="Confirme sua senha"
              className="h-12 px-4 rounded-lg border-2 border-[#227C9D] text-xl text-[#227C9D] focus:outline-none focus:ring-2 focus:ring-[#227C9D]"
            />
            {errors.confirmarSenha && (
              <p className="text-red-500 text-sm">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#227C9D] text-white text-xl py-3 rounded-lg hover:bg-[#1a5d74] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </main>

      <Footer />

      {/* Modal de erro */}
      <AnimatePresence>
        {registerError && (
          <Modal
            title="Erro!"
            color="#FE6D73"
            message={registerError}
            onClose={() => setRegisterError(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal de sucesso */}
      <AnimatePresence>
        {registerSuccess && (
          <Modal
            title="Sucesso!"
            color="#38B000"
            message="Cadastro realizado com sucesso!"
            onClose={() => {
              setRegisterSuccess(false);
              router.push("/auth/signin");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({
  title,
  message,
  onClose,
  color,
}: {
  title: string;
  message: string;
  onClose: () => void;
  color: string;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
      >
        <h2
          className={`text-3xl font-extrabold ${luckiestGuy.variable}`}
          style={{ fontFamily: "Luckiest Guy", color }}
        >
          {title}
        </h2>
        <p className="text-gray-700 mt-4">{message}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-[#227C9D] text-white px-6 py-2.5 rounded hover:bg-[#1b627f] transition-all"
        >
          Fechar
        </button>
      </motion.div>
    </div>
  );
}
