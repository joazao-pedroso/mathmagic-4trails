'use client';
import { useState, useEffect } from 'react';
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
  const [droppedValue, setDroppedValue] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [n1, setN1] = useState<number | null>(null);
  const [n2, setN2] = useState<number | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [erros, setErros] = useState<number>(0);
  const [acertos, setAcertos] = useState<number>(0);
  const total = acertos + erros;

  function handleGetValues() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correct = num1 * num2;

    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 4) {
      // Gera opções erradas razoáveis, evitando valores muito altos ou iguais
      let opt = Math.floor(Math.random() * 20) + 1;
      if (opt !== correct) {
        wrongOptions.add(opt);
      }
    }

    const allOptions = [correct, ...Array.from(wrongOptions)];

    // Embaralha as opções
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
      alert('Você precisa arrastar um número para verificar!');
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

  // Carrega nova questão quando usuário acertar ou errar e já verificou
  useEffect(() => {
    if (isCorrect !== null) {
      // Dá um pequeno delay para o usuário ver a mensagem antes de mudar
      const timer = setTimeout(() => {
        handleGetValues();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  useEffect(() => {
    handleGetValues();
  }, []);

  useEffect(() => {
    if (total >= 5) {
      console.log({ acertos, erros });
      setAcertos(0);
      setErros(0);
    }

  }, [total]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex items-center justify-center flex-col'>
        {/* <Image src="logo.svg" alt="MVP MATHMAGIC" width={200} height={50} /> */}
        <div className="container flex flex-col gap-3 bg-white rounded-lg shadow-md mx-auto mt-5 p-5 w-250 h-160 " > 
          <div className="bg-white rounded-lg shadow-lg w-full h-1/3 flex gap-3 items-center justify-center">
            <div className="flex gap-3 w-full items-center justify-center ">
              <h1 className={`${luckiestGuy.variable} text-center text-5xl tracking-wider `} style={{ fontFamily: 'Luckiest Guy' }}> 
                {n1} <span className='text-teal-600'>x</span>  {n2} = 
              </h1>
              <DropBox  onDropValue={setDroppedValue} currentValue={droppedValue} />

            </div>
          </div>
          <div className="text-center h-2/3 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg">
            <div className="flex gap-3 items-center justify-center h-full w-full ">
              {options.map((value) => (
                <DraggableItem key={value} value={value} />
              ))}
              
            </div>
            <div className="flex gap-3 flex-col items-center justify-center h-full w-full ">
              <p>Arraste</p>
              <button
                onClick={handleVerify}
                className="bg-teal-600 border-3 border-teal-600 text-white font-bold w-140 py-2 px-4 rounded-xl cursor-pointer hover:bg-white hover:text-teal-600 transition-all  focus:outline-none focus:shadow-outline"
              >
                Verificar
              </button>
            </div>
            




          </div>
          
          <div className="flex justify-center mt-4 flex-col items-center">

            {/* {isCorrect !== null && (
              <p className={`mt-3 text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '✅ Correto!' : '❌ Errado!'}
              </p>
            )} */}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
