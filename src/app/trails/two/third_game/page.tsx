"use client";
import Header from "../../../../components/Header";
import { Luckiest_Guy } from "next/font/google";
import Footer from "../../../../components/Footer";
import { MouseEventHandler, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function ThirdGame() {
  const router = useRouter();
  const [passou, setPassou] = useState<boolean | null>(null);
  const [totalAcertos, setTotalAcertos] = useState<string[]>([]);
  const [totalErros, setTotalErros] = useState<string[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [userN, setuserN] = useState<number | null>(null);
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [correct, setCorrect] = useState<number | null>(null);
  const [posJogador, setPosJogador] = useState(150);
  const [posZumbi, setPosZumbi] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState<boolean | null>(null);
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);
  function handleGetValues() {
    const correct = Math.floor(Math.random() * 8) + 1; // resultado da divisão
    const n2 = Math.floor(Math.random() * 12) + 1; // divisor
    const n1 = correct * n2; // dividendo

    setNum1(n1); // mesmo nome
    setNum2(n2); // mesmo nome
    setCorrect(correct); // resultado da divisão
    setuserN(null);
  }

  const checkGameOver = (newPosJogador: number, newPosZumbi: number) => {
    if (newPosJogador >= 800) {
      setTimeout(() => {
        setPassou(true);
        setShowVictoryPopup(true);
      }, 1000);
    } else if (newPosZumbi >= newPosJogador) {
      setTimeout(() => {
        setPassou(false);
        setShowEndGamePopup(true);
      }, 1000);
    }
  };

  const handleCheckValues: MouseEventHandler<HTMLInputElement> = () => {
    if (gameOver) return;

    let newJogador = posJogador;
    let newZumbi = posZumbi;
    if (userN === null || userN < 0) {
      setShowWarning(true);
      return;
    }
    if (userN === correct) {
      newJogador += 50;
      newZumbi += 10;
      setTotalAcertos((prev) => [...prev, `${num1}x${num2}`]);
      setIsVictory(true);
      setTimeout(() => {
        setIsVictory(null);
      }, 500);
    } else {
      setTotalAcertos((prev) => [...prev, `${num1}÷${num2}`]);
      setIsVictory(false);
      setTimeout(() => {
        setIsVictory(null);
      }, 500);
      newJogador += 10;
      newZumbi += 50;
    }

    setPosJogador(newJogador);
    setPosZumbi(newZumbi);
    checkGameOver(newJogador, newZumbi);

    handleGetValues();
  };

  const resetGame = () => {
    setPassou(null);
    setTotalAcertos([]);
    setTotalErros([]);
    setPosJogador(150);
    setPosZumbi(0);
    setGameOver(false);
    setIsVictory(null);
    handleGetValues();
    setShowEndGamePopup(false);
    setShowVictoryPopup(false);
    setuserN(null);
  };

  useEffect(() => {
    handleGetValues();
  }, []);

  useEffect(() => {
    if (passou !== null) {
      setShowEndGamePopup(true);

      const sendData = async () => {
        console.log(
          JSON.stringify({
            trilha: 1,
            jogo: 3,
            passou: `${passou}`,
            acertos: totalAcertos,
            erros: totalErros,
          })
        );
        const response = await fetch(
          "http://127.0.0.1:5000/api/desempenho-jogo",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              aluno_id: 1,
              trilha: 1,
              jogo: 3,
              passou: `${passou}`,
              acertos: totalAcertos,
              erros: totalErros,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to save game data");
        } else {
          console.log("Dados enviados com sucesso!");
        }
      };

      sendData();
    }
  }, [passou, totalAcertos, totalErros]);

  return (
    <>
      <Header home={false} />

      <div className="flex items-center justify-center flex-col">
        <div className="container flex flex-col gap-3 bg-white rounded-lg shadow-md mx-auto mt-5 p-5 w-250 h-200">
          {/* ÁREA DA CORRIDA */}
          <div className="bg-white p-2 rounded-lg shadow-lg w-full h-full flex flex-col gap-3 items-center justify-center relative">
            <div className="flex border-3 border-[#227C9D] rounded-xl bg-gray-50 shadow flex-row h-3/5 w-full justify-end p-2 relative overflow-hidden">
              <div
                className="absolute top-1/2"
                style={{
                  left: `${posJogador}px`,
                  transform: "translateY(-50%)",
                }}
              >
                <Image
                  src="/character_runing.svg"
                  alt="Mago"
                  width={125}
                  height={125}
                  priority
                />
              </div>

              {/* Zumbi - esqueleto */}
              <div
                className="absolute top-1/2"
                style={{ left: `${posZumbi}px`, transform: "translateY(-50%)" }}
              >
                <Image
                  src="/eskeleton_runing.svg"
                  alt="Esqueleto"
                  className="transform scale-x-[-1]"
                  width={125}
                  height={125}
                  priority
                />
              </div>
            </div>

            <div className="flex flex-row w-full items-center h-2/5 justify-around gap-2">
              <h1
                className={`${luckiestGuy.className} text-center text-5xl tracking-wider`}
              >
                {num1} <span className="text-[#227C9D]">÷</span> {num2}
                <span className="text-[#227C9D]">= ?</span>
              </h1>
            </div>
          </div>

          <div className="text-center h-125 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
            <div className="flex gap-3 flex-col items-center justify-center h-full w-full mt-4">
              <p className="text-lg font-semibold">
                Digite a resposta em baixo
              </p>
              <input
                type="number"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    handleCheckValues(e as never); // TypeScript pode pedir ajuste
                  }
                }}
                value={userN === null ? "" : userN}
                onChange={(e) => setuserN(Number(e.target.value))}
                className={`${luckiestGuy.className} border-3 border-[#227C9D] text-3xl text-center text-[#227C9D] rounded-xl w-150 h-15`}
              />
              <input
                type="button"
                value={"ENVIAR"}
                onClick={handleCheckValues}
                className={`${luckiestGuy.className} border-3 transition-all border-[#227C9D] cursor-pointer hover:bg-white hover:text-[#227C9D] text-3xl text-center text-white bg-[#227C9D] rounded-xl w-150 h-15`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Animações de Vitória e Derrota com Framer Motion */}
      <AnimatePresence>
        {isVictory === true && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex flex-row gap-3 items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-row gap-3 items-center justify-center"
            >
              <Image
                src={"/win.svg"}
                alt="Mascote Parabéns"
                width={300}
                height={300}
                className="object-contain mb-4"
                priority
              />
              <Image
                src={"/win_dialog.svg"}
                alt="Dialogo Parabéns"
                width={500}
                height={500}
                className="object-contain mb-4"
                priority
              />
            </motion.div>
          </div>
        )}

        {isVictory === false && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex flex-row gap-3 items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-row gap-3 items-center justify-center"
            >
              <Image
                src={"/lose.svg"}
                alt="Mascote Tente novamente"
                width={300}
                height={300}
                className="object-contain mb-4"
                priority
              />
              <Image
                src={"/lose_dialog.svg"}
                alt="Dialogo Tente novamente"
                width={500}
                height={500}
                className="object-contain mb-4"
                priority
              />
            </motion.div>
          </div>
        )}

        {showEndGamePopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <h2
                  className={`${luckiestGuy.variable} text-[#227C9D] text-3xl`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Fim de Jogo!
                </h2>
                <p className="text-lg text-gray-700 text-center">
                  Você perdeu foi pego pela a caveira!
                </p>
                <div className="flex gap-3 items-center justify-center flex-wrap">
                  <button
                    onClick={() => {
                      resetGame();
                    }}
                    className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                  >
                    Jogar novamente
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                  >
                    Voltar para o início
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVictoryPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex flex-row gap-3 items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <h2
                  className={`${luckiestGuy.variable} text-[#227C9D] text-3xl`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Parabéns!
                </h2>
                <p className="text-lg text-gray-700 text-center">
                  Você completou todas as rodadas!
                </p>
                <div className="flex gap-3 items-center justify-center flex-wrap">
                  <button
                    onClick={() => {
                      resetGame();
                    }}
                    className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                  >
                    Jogar novamente
                  </button>
                  <button
                    onClick={() => router.push("/")}
                    className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                  >
                    Voltar para o início
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div
                  className={` ${luckiestGuy.variable} text-[#FE6D73] text-shadow-lg/25 text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Atenção!
                </div>
                <p className="text-gray-700 text-base">
                  Você precisa digitar um numero antes de verificar!
                </p>
                <button
                  onClick={() => setShowWarning(false)}
                  className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                >
                  Voltar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
