"use client";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onRegisterError: (type: "error", message: string) => void;
  closeModal: () => void;
}

export default function CreateProfForm({
  onRegisterError,
  closeModal,
}: RegisterFormProps) {
  const api = useApi()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);

    const apiPayload = {
      nome: data.name,
      email: data.email,
      senha: data.password,
    };

    try {
      console.log(apiPayload)
      await api({
        url: "/api/professores",
        method: "POST",
        data: apiPayload
      });

      // Sucesso
      reset();
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onRegisterError("error", error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
        <input
          type="text"
          {...register("name", { required: "Nome é obrigatório" })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Nome do Barbeiro"
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email inválido",
            },
          })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Email do Barbeiro"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
        <input
          type="password"
          {...register("password", {
            required: "Senha é obrigatória",
            minLength: {
              value: 6,
              message: "A senha deve ter no mínimo 6 caracteres",
            },
          })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Senha do Barbeiro"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? "Carregando..." : "Cadastrar"}
      </button>
    </form>
  );
}
