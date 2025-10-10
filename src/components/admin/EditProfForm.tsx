"use client";
import { useApi } from "@/hooks/useApi";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface EditFormData {
  name: string;
  email: string;
  password?: string;
}

interface EditFormProps {
  profData: {
    id: number;
    nome: string;
    email: string;
  };
  onEditError: (type: "error", message: string) => void;
  closeModal: () => void;
}

export default function EditProfForm({ profData, onEditError, closeModal }: EditFormProps) {
  const api = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditFormData>();

  useEffect(() => {
    if (profData) {
      setValue("name", profData.nome);
      setValue("email", profData.email);
    }
  }, [profData, setValue]);

  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    setIsLoading(true);

    const payload = {
      nome: data.name,
      email: data.email,
      senha: data.password || undefined, // só envia senha se for alterada
    };

    try {
      await api({
        url: `/api/professores/${profData.id}`,
        method: "PUT",
        data: payload,
      });

      reset();
      closeModal();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onEditError("error", error.message || "Erro desconhecido.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-white text-xl font-bold">Editar Professor</h1>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
        <input
          type="text"
          {...register("name", { required: "Nome é obrigatório" })}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Nome do Professor"
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
          placeholder="Email do Professor"
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Senha (opcional)</label>
        <input
          type="password"
          {...register("password")}
          className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:border-transparent transition-all duration-300"
          placeholder="Nova senha (deixe em branco para manter a atual)"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? "Salvando..." : "Salvar Alterações"}
      </button>
    </form>
  );
}
