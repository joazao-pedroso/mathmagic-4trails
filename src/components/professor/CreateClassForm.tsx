"use client";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormData {
  name: string;
  description: string;
  id_trail: string;
}

interface Trail {
  nome: string;
  descricao: string;
  id: number;
}

interface RegisterFormProps {
  onRegisterError: (type: "error", message: string) => void;
  closeModal: () => void;
}

export default function CreateClassForm({
  onRegisterError,
  closeModal,
}: RegisterFormProps) {
  const api = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trails, setTrails] = useState([]);
  const [selectedTrails, setSelectedTrails] = useState<number[]>([]);
  const [isErro, setIsErro] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const handleGetTrails = async () => {
    const response = await api({
      url: "/api/professor/trilhas",
      method: "GET",
    });
    setTrails(response.data);
  };

  useEffect(() => {
    handleGetTrails();
  }, []);

  const handleAddTrail = (id: number) => {
    if (!selectedTrails.includes(id)) {
      setSelectedTrails((prev) => [...prev, id]);
    } else {
      const filteredItems = selectedTrails.filter((item) => item != id);
      setSelectedTrails(filteredItems);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsLoading(true);

    if (selectedTrails.length > 0) {
      try {
        await api({
          url: "/api/professor/salas",
          method: "POST",
          data: {
            nome: data.name,
            trilhas_ids: selectedTrails,
          },
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
    } else setIsErro(true);
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

      <div className="w-full pl-3 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 p-10 items-center justify-around focus:ring-gray-100 focus:border-transparent transition-all duration-300 flex flex-wrap">
        {trails.length > 0 ? (
          trails.map((item: Trail, index) => (
            <div
              onClick={() => handleAddTrail(item.id)}
              className={`w-30 cursor-pointer h-30 flex-col transition-all rounded-lg shadow-md flex items-center justify-center gap-5 text-black ${
                selectedTrails.includes(item.id)
                  ? " bg-[#227C9D] text-gray-50  "
                  : "bg-gray-50 text-[#227C9D] "
              }`}
              key={index}
            >
              <p className="text-lg">{item.nome}</p>
              <p className="text-md text-center">{item.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma trilha encontrada.</p>
        )}
        {isErro && (
          <p className="text-red-500 text-center text-sm mt-2">
            Selecione pelomenos 1 trilha.
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isLoading || selectedTrails.length === 0}
        className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg hover:from-gray-200 hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? "Carregando..." : "Cadastrar"}
      </button>
    </form>
  );
}
