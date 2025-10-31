import { useApi } from "@/hooks/useApi";
import { Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import CreateGameForm from "../CreateGameForm";

interface Game {
 id: number
 nome: string;
 descricao: string
 trilha_nome: string
}


export default function GamesContainer() {
  const api = useApi();
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [trails, setTrails] = useState([]);
  const [games, setGames] = useState([]);
  const handleGetGames = async () => {
    try {
      const response = await api({
        url: "/api/admin/jogos",
        method: "GET",
      });

      setGames(response.data);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };
  const handleGetTrails = async () => {
    try {
      const response = await api({
        url: "/api/admin/trilhas",
        method: "GET",
      });

      setTrails(response.data);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  const closeCreateGameModal = () => {
    setIsCreatingGame(false);
    handleGetGames()
    handleGetTrails();
  };
  const handleDeleteGame = async (idGame: number) => {
    try {
      await api({
        url: `/api/admin/jogos/${idGame}`,
        method: "DELETE",
      });
      handleGetGames();
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };
  useEffect(() => {
    handleGetTrails();
    handleGetGames();
  }, []);

  return (
    <>
      <h2 className="text-3xl text-center">Jogos Registrados: </h2>
      <button
        onClick={() => setIsCreatingGame(true)}
        className="bg-[#227C9D] text-white font-bold w-50 py-3 px-6 rounded-md cursor-pointer hover:bg-[#1b627f] transition-all focus:outline-none focus:shadow-outline"
      >
        Registrar Jogo
      </button>
      {games.length > 0 ? (
        <div className="w-full gap-10 flex items-center p-2 justify-center flex-wrap flex-1">
          {games.map((item: Game, index) => (
            <div
              key={index}
              className="bg-[#227C9D] w-75 rounded-md justify-around flex flex-col items-center shadow-md h-40"
            >
              <p className="text-center text-lg text-white font-semibold ">
                Nome: {item.nome}
              </p>
              <p className="text-center text-lg text-white font-semibold ">
                Trilha: {item.trilha_nome}
              </p>
              <div className="w-full h-1/3 gap-10 flex items-center justify-center">
                <div
                  onClick={() => handleDeleteGame(item.id)}
                  className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-red-700 cursor-pointer bg-red-600"
                >
                  <Trash strokeWidth={2} size={35} className="text-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum jogo registrado.</p>
      )}
      {isCreatingGame && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 overflow-y-auto p-4">
          <div className="flex flex-col gap-4 w-full md:w-1/2 mt-20 md:mt-12 mb-8">
            <div className="bg-[#227C9D] w-full backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h1 className="text-white text-xl font-bold">Novo Jogo:</h1>
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => closeCreateGameModal()}
                  className="text-gray-100 hover:text-gray-300 transition-colors duration-300"
                >
                  <X className="text-white hover:text-gray-200" />
                </button>
              </div>
              <CreateGameForm
                trails={trails}
                closeModal={() => closeCreateGameModal()}
                onRegisterError={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
