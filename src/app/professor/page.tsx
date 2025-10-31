"use client";
import Header from "@/components/Header";
import CreateClassForm from "@/components/professor/CreateClassForm";
import { useApi } from "@/hooks/useApi";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Classes{
  nome: string;
  id: number;
}

export default function ProfHome() {
  const router = useRouter()
  const api = useApi();
  const [classes, setClasses] = useState([]);
  const [createClass, setCreateClass] = useState(false);
  const handleGetClasses = async () => {
    try {
      const response = await api({
        url: "/api/professor/salas",
      });

      setClasses(response.data);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  const handleCloseModal = () => {
    setCreateClass(false);
    handleGetClasses();
  };

  useEffect(() => {
    handleGetClasses();
  }, []);
  return (
    <>
      <Header home={true} />
      <main className="min-h-screen bg-gray-150 flex flex-col items-start">
        <div className="w-full h-25 mt-10 flex items-center gap-10 justify-center">
          <button
            onClick={() => setCreateClass(true)}
            className="bg-[#227C9D] hover:bg-[#1b627f] cursor-pointer text-gray-50 w-40 h-15 text-xl rounded-md"
          >
            Nova Sala
          </button>
          <h2 className="text-center text-3xl text-[#227C9D]">
            Salas Cadastradas:
          </h2>
        </div>

        {classes.length > 0 ? (
          <div className="w-full flex-wrap flex-1 flex gap-5 justify-center items-start">
            {classes.map((item: Classes, index) => (
              <div
                className="w-90 h-40 flex-col gap-10 p-5 flex items-center justify-center bg-[#227C9D] rounded-md shadow-lg"
                key={index}
              >
                <h2 className="text-center text-xl text-white ">
                  Nome: {item.nome}
                </h2>
                <button
                  onClick={() => router.push(`/professor/${item.id}`)}
                  type="button"
                  className="w-full cursor-pointer hover:bg-gray-200 text-lg rounded-md h-13 bg-gray-50"
                >
                  Ver sala
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl w-full mt-10">
            Nenhuma sala registrada.
          </p>
        )}
      </main>
      {createClass && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2 mt-20 md:mt-12 mb-8">
            <div className="bg-[#227C9D] w-full backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h1 className="text-white text-xl  font-bold">Nova Trilha:</h1>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => handleCloseModal()}
                  className="text-gray-100 hover:text-gray-300 transition-colors duration-300"
                >
                  <X className="text-white hover:text-gray-200" />
                </button>
              </div>
              <CreateClassForm
                closeModal={() => handleCloseModal()}
                onRegisterError={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
