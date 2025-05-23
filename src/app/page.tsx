'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DropBox from './components/DropBox';
import DraggableItem from './components/DraggableItem';
import { Luckiest_Guy } from "next/font/google";
import Image from 'next/image';

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: '400'
});


export default function Home() {
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [droppedValue, setDroppedValue] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showWarning, setShowWarning] = useState(false);
  const [n1, setN1] = useState<number | null>(null);
  const [n2, setN2] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [erros, setErros] = useState<number>(0);
  const [acertos, setAcertos] = useState<number>(0);
  const total = acertos + erros;

  function handleGetValues() {
    const num1 = Math.floor(Math.random() * 4) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correct = num1 * num2;

    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 3) {
      // Gera opções erradas razoáveis, evitando valores muito altos ou iguais
      let opt = Math.floor(Math.random() * 40) + 1;
      if (opt !== correct) {
        wrongOptions.add(opt);
      }
    }

    const allOptions = [correct, ...Array.from(wrongOptions)];

    for (let i = allOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }

    setN1(num1);
    setN2(num2);
    setCorrectAnswer(correct);
    setOptions(allOptions);
    setDroppedValue(null);
    setIsCorrect(null);
  }

  const handleVerify = () => {
    if (droppedValue === null) {
        setShowWarning(true);

      return;
    }

    if (correctAnswer !== null) {
      const correct = droppedValue === correctAnswer;
      setIsCorrect(correct);
      if (correct) {
        setAcertos((prev) => prev + 1);
      } else {
        setErros((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (isCorrect !== null) {
      const timer = setTimeout(() => {
        handleGetValues();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  useEffect(() => {
    handleGetValues();
  }, []);

  useEffect(() => {
    if (total >= 2) {
       const timer = setTimeout(() => {
          setShowEndGamePopup(true);
      }, 1750);
      return () => clearTimeout(timer);
    }

  }, [total]);

 return (
  <DndProvider backend={HTML5Backend}>
    <div className='flex items-center justify-center flex-col'>
      <div className="container flex flex-col gap-3 bg-white rounded-lg shadow-md mx-auto mt-5 p-5 w-250 h-160"> 
        <div className="bg-white rounded-lg flex-col shadow-lg w-full h-1/3 flex gap-3 items-center justify-center">
          <div className="flex gap-3 h-[5%] w-full items-center justify-end p-10">
            <h3 style={{ fontFamily: 'Luckiest Guy' }} className={`${luckiestGuy.variable} text-3xl`}>
              <span className='text-[#227C9D]'>{acertos + erros}</span> / 10
            </h3>
          </div>
          <div className="flex gap-3 h-4/4 w-full justify-center">
            <h1 className={`${luckiestGuy.variable} text-center text-5xl tracking-wider`} style={{ fontFamily: 'Luckiest Guy' }}>
              {n1} <span className='text-[#227C9D]'>x</span> {n2} =
            </h1>
            <DropBox onDropValue={setDroppedValue} currentValue={droppedValue} />
          </div>
        </div>

        <div className="text-center h-2/3 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
          <div className="flex gap-3 items-center justify-center h-full w-full">
            {options.map((value) => (
              <DraggableItem key={value} value={value} />
            ))}
          </div>
          <div className="flex gap-3 flex-col items-center justify-center h-full w-full">
            <p>Arraste</p>
            <button
              onClick={handleVerify}
              className="bg-[#227C9D] text-white font-bold w-140 py-2 px-4 rounded-xl cursor-pointer hover:bg-[#227c9dd8] transition-all focus:outline-none focus:shadow-outline"
            >
              Verificar
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4 flex-col items-center">
        </div>
      </div>
    </div>

   {/* Overlay de Parabéns */}
{/* Overlay de Parabéns */}
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
          src={'/win.svg'} 
          alt="Mascote Parabéns" 
          width={300} 
          height={300} 
          className="object-contain mb-4"
          priority
        />
        <Image 
          src={'/win_dialog.svg'} 
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
          src={'/lose.svg'} 
          alt="Mascote Tente novamente" 
          width={300} 
          height={300} 
          className="object-contain mb-4"
          priority
        />
        <Image 
          src={'/lose_dialog.svg'} 
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
      <div className={` ${luckiestGuy.variable} text-[#FE6D73] text-3xl font-extrabold`} style={{ fontFamily: 'Luckiest Guy' }}> 
        Atenção
      </div>
      <p className="text-gray-700 text-base">
        Você precisa arrastar um número antes de verificar.
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
<AnimatePresence>
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
          <h2 className={`${luckiestGuy.variable} text-[#227C9D] text-3xl`} style={{ fontFamily: 'Luckiest Guy' }}>
            Fim de Jogo!
          </h2>
          <p className="text-lg text-gray-700">
            Você acertou <strong>{acertos}</strong> e errou <strong>{erros}</strong>.
          </p>
          <button
            onClick={() => {
              setAcertos(0);
              setErros(0);
              setShowEndGamePopup(false);
              handleGetValues()
            }}
            className="bg-[#227C9D] text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
          >
            Jogar novamente
          </button>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

  </DndProvider>
);

}
