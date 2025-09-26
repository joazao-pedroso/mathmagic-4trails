"use client";
import axios, { AxiosError } from "axios";

interface Data {
  aluno_id: number;
  trilha: number;
  jogo: number;
  passou: string;
  acertos: string[];
  erros: string[];
}

export const useSendGameData = () => {
  const sendData = async (data: Data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/desempenho-jogo`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Dados enviados com sucesso:", response.data);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "❌ Erro ao enviar dados:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  return { sendData };
};
