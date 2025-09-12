"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header";
import { Luckiest_Guy } from "next/font/google";
import { Heart } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../../../components/Footer";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function SecondGame() {
  const [passou, setPassou] = useState<boolean | null>(null);
  const [totalAcertos, setTotalAcertos] = useState<string[]>([]);
  const [totalErros, setTotalErros] = useState<string[]>([]);
  const [n1, setN1] = useState<number | null>(null);
  const [n2, setN2] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [lives, setLives] = useState<number>(3);
  const [rounds, setRounds] = useState<number>(0);
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const router = useRouter();

  function handleGetValues() {
    const divisor = Math.floor(Math.random() * 9) + 2; // 2 to 10
    const quotient = Math.floor(Math.random() * 10) + 1; // 1 to 10
    const dividend = divisor * quotient;

    const correct = quotient;

    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 3) {
      const opt = Math.floor(Math.random() * 20) + 1;
      if (opt !== correct) {
        wrongOptions.add(opt);
      }
    }

    const allOptions = [correct, ...Array.from(wrongOptions)].sort(
      () => Math.random() - 0.5
    );

    setOptions(allOptions);
    setN1(dividend);
    setN2(divisor);
    setCorrectAnswer(correct);
  }

  useEffect(() => {
    handleGetValues();
  }, []);

  const handleVerify = (value: number) => {
    if (rounds >= 10 || lives <= 0) return;

    const correct = value === correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setRounds((prev) => {
        const newRound = prev + 1;
        setTotalAcertos((prev) => [...prev, `${n1}/${n2}`]);
        if (newRound === 10) {
          setTimeout(() => setShowVictoryPopup(true), 1000);
        }
        return newRound;
      });
    } else {
      setLives((prev) => prev - 1);
      setTotalErros((prev) => [...prev, `${n1}/${n2}`]);
      setRounds((prev) => {
        const newRound = prev + 1;
        if (newRound === 10 && lives > 1) {
          setPassou(true);
          setTimeout(() => setShowVictoryPopup(true), 1000);
        }
        return newRound;
      });
    }
  };

  useEffect(() => {
    if (isCorrect !== null) {
      const timer = setTimeout(() => {
        setIsCorrect(null);
        if (rounds < 10 && lives > 0) {
          handleGetValues();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCorrect, lives, rounds]);

  useEffect(() => {
    if (lives <= 0) {
      const timer = setTimeout(() => {
        setPassou(false);
        setShowEndGamePopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lives]);

  useEffect(() => {
    if (passou !== null) {
      setShowEndGamePopup(true);

      const sendData = async () => {
        const response = await fetch("http://127.0.0.1:5000/api/desempenho-jogo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            aluno_id: 1,
            trilha: 1,
            jogo: 2,
            passou: `${passou}`,
            acertos: totalAcertos,
            erros: totalErros,
          }),
        });

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
        <div className="container flex flex-col gap-3 bg-white rounded-lg shadow-md mx-auto mt-5 p-5 w-250 h-160">
          <div className="bg-white rounded-lg shadow-lg w-full h-1/3 flex flex-row gap-3 items-center justify-center">
            <div className="flex flex-row w-1/3 items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Heart
                      key={index}
                      fill={index < lives ? "red" : "none"}
                      className={`w-6 h-6 ${
                        index < lives
                          ? "text-red-600 opacity-100"
                          : "text-red-300 opacity-50"
                      }`}
                    />
                  ))}
                </div>
                <Image
                  src="/character.svg"
                  alt="Personagem"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            <div className="flex flex-row w-1/3 items-center justify-around gap-2">
              <h1
                className={`${luckiestGuy.className} text-center text-5xl tracking-wider`}
              >
                {n1} <span className="text-[#227C9D]">÷</span> {n2} ={" "}
                <span className="text-[#227C9D]">?</span>
              </h1>
            </div>

            <div className="flex flex-row w-1/3 h-44 justify-end p-5">
              <h3
                style={{ fontFamily: "Luckiest Guy" }}
                className={`${luckiestGuy.variable} text-3xl`}
              >
                <span className="text-[#227C9D]">{rounds}</span> / 10
              </h3>
            </div>
          </div>

          <div className="text-center h-2/3 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
            <div className="flex gap-3 flex-col items-center justify-center h-full w-full mt-4">
              <div className="flex gap-4 items-center justify-center h-75 w-100 flex-wrap p-7 rounded-lg">
                {options.map((value) => (
                  <button
                    onClick={() => handleVerify(value)}
                    key={value}
                    className={`${luckiestGuy.className} text-4xl cursor-pointer hover:scale-115 transition-all bg-[#227C9D] hover:bg-[#227c9dda] text-white w-40 h-20 rounded-lg`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <p className="text-lg font-semibold">Escolha a opção correta</p>
            </div>
          </div>
        </div>
      </div>

          {/* ANIMAÇÕES DE ACERTO E ERRO */}
          <AnimatePresence>
        {isCorrect === true && (
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

        {isCorrect === false && (
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
      </AnimatePresence>

      {/* MODAL DE FIM DE JOGO */}
      <AnimatePresence>
        {showEndGamePopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
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
                  Você perdeu todas as vidas!
                </p>
                <div className="flex gap-3 items-center justify-center flex-wrap">
                  <button
                    onClick={() => {
                      setLives(3);
                      setRounds(0);
                      setShowEndGamePopup(false)
                      setShowVictoryPopup(false);
                      handleGetValues();
                      setPassou(null)
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
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
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
                      setLives(3);
                      setRounds(0);
                      setShowEndGamePopup(false)
                      setShowVictoryPopup(false);
                      handleGetValues();
                      setTotalAcertos([])
                      setTotalErros([])
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
      <Footer />
    </>
  );
}
