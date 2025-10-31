"use client";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormData {
  name: string;
  description: string;
  trail: string;
}
interface Trail {
  id: number;
  nome: string;
  descricao: string;
}

interface RegisterFormProps {
  onRegisterError: (type: "error", message: string) => void;
  closeModal: () => void;
  trails: Trail[];
}
export default function CreateGameForm({
  onRegisterError,
  closeModal,
  trails,
}: RegisterFormProps) {
  const api = useApi();
  const [isLoading, setIsLoading] = useState(false);

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
      descricao: data.description,
      trilha_id: data.trail
    };

    try {
      console.log(apiPayload);
      await api({
        url: "/api/admin/jogos",
        method: "POST",
        data: apiPayload,
      });

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
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nome
        </label>
        <input
          type="text"
          {...register("name", { required: "Nome é obrigatório" })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Nome da Trilha"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Descrição
        </label>
        <input
          type="text"
          {...register("description", { required: "Descrição é obrigatória" })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Descrição da Trilha"
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Trilha
        </label>
        <select
          {...register("trail", { required: "Trilha é obrigatória" })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
        >
          <option value="">Selecione uma trilha</option>
          {trails.map((item: Trail, index) => (
            <option key={index} value={item.id}>
              {item.nome}
            </option>
          ))}

          {errors.trail && (
            <p className="mt-1 text-xs text-red-400">{errors.trail.message}</p>
          )}
        </select>
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
