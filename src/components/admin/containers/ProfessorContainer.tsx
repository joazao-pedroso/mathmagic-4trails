import { useApi } from "@/hooks/useApi";
import { Trash, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import CreateProfForm from "../CreateProfForm";
import EditProfForm from "../EditProfForm";

interface Prof {
  nome: string;
  email: string;
  id: number;
}
export default function ProfessorContainer() {
  const api = useApi();
  const [idProfDelete, setIdProfDelete] = useState<null | number>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingProf, setIsCreatingProf] = useState<boolean>(false);
  const [isEditingProf, setIsEditingProf] = useState<boolean>(false);
  const [profToEdit, setProfToEdit] = useState<Prof | null>(null);
  const [professor, setProfessor] = useState([]);
  useEffect(() => {
    handleGetProfessores();
  }, []);
  const handleGetProfessores = async () => {
    try {
      const response = await api({
        url: "/api/professores",
        method: "GET",
      });

      setProfessor(response.data);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };
  const closeCreateProfModal = () => {
    setIsCreatingProf(false);
    handleGetProfessores();
  };

  const handleDeleteProf = async () => {
    try {
      await api({
        url: `/api/professores/${idProfDelete}`,
        method: "DELETE",
      });
      setIdProfDelete(null);
      handleGetProfessores();
      setIsDeleting(false);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };
  return (
    <>
      <h2 className="text-3xl text-center">Professores Registrados: </h2>
      <button
        onClick={() => setIsCreatingProf(true)}
        className="bg-[#227C9D] text-white font-bold w-50 py-3 px-6 rounded-md cursor-pointer hover:bg-[#1b627f] transition-all focus:outline-none focus:shadow-outline"
      >
        Novo Professor
      </button>
      {professor.length > 0 ? (
        <div className="w-full gap-10 flex items-center p-2 justify-center flex-wrap flex-1">
          {professor.map((item: Prof, index) => (
            <div
              key={index}
              className="bg-[#227C9D] w-75 rounded-md justify-around flex flex-col items-center shadow-md h-40"
            >
              <p className="text-center text-lg text-white font-semibold ">
                Nome: {item.nome}
              </p>
              <p className="text-center text-lg text-white font-semibold ">
                Email: {item.email}
              </p>
              <div className="w-full h-1/3 gap-10 flex items-center justify-center">
                <div
                  onClick={() => {
                    setIsDeleting(true);
                    setIdProfDelete(item.id);
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-red-700 cursor-pointer bg-red-600"
                >
                  <Trash strokeWidth={2} size={35} className="text-gray-200" />
                </div>
                <div
                  onClick={() => {
                    setProfToEdit(item);
                    setIsEditingProf(true);
                  }}
                  className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-yellow-500 cursor-pointer bg-yellow-400"
                >
                  <Pencil strokeWidth={2} size={35} className="text-black" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum professor cadastrado.</p>
      )}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto p-4">
          <div className="flex flex-col items-center gap-4 w-full md:w-1/2 mt-20 md:mt-12 mb-8">
            <div className="w-125 h-60 flex gap-10 items-center justify-center flex-col bg-[#227C9D] rounded-xl">
              <h1 className="text-white text-2xl text-center">
                Deseja excluir o Professor?
              </h1>
              <div className="w-full flex items-center justify-center gap-5">
                <button className="w-40 h-15 rounded-md bg-red-500 hover:bg-red-600 cursor-pointer">
                  <h3
                    onClick={() => setIsDeleting(false)}
                    className="text-center text-lg text-white"
                  >
                    Cancelar
                  </h3>
                </button>
                <button className="w-40 h-15 rounded-md bg-green-500 hover:bg-green-600 cursor-pointer">
                  <h3
                    onClick={() => handleDeleteProf()}
                    className="text-center text-lg text-white"
                  >
                    Confirmar
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCreatingProf && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2 mt-20 md:mt-12 mb-8">
            <div className="bg-[#227C9D] w-full backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h1 className="text-white text-xl font-bold">Novo Professor:</h1>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => closeCreateProfModal()}
                  className="text-gray-100 hover:text-gray-300 transition-colors duration-300"
                >
                  <X className="text-white hover:text-gray-200" />
                </button>
              </div>
              <CreateProfForm
                closeModal={() => closeCreateProfModal()}
                onRegisterError={() => {}}
              />
            </div>
          </div>
        </div>
      )}
      {isEditingProf && profToEdit && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
    <div className="flex flex-col gap-4 w-full md:w-1/2 mt-20 md:mt-12 mb-8">
      <div className="bg-[#227C9D] w-full backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setIsEditingProf(false);
              setProfToEdit(null);
            }}
            className="text-gray-100 hover:text-gray-300 transition-colors duration-300"
          >
            <X className="text-white hover:text-gray-200" />
          </button>
        </div>
        <EditProfForm
          profData={profToEdit}
          closeModal={() => {
            setIsEditingProf(false);
            setProfToEdit(null);
            handleGetProfessores();
          }}
          onEditError={() => {}}
        />
      </div>
    </div>
  </div>
)}

    </>
  );
}
