'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: '400'
});
export default function Header({ home }: { home: boolean }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function handleGoToHome() {
    // Se já está na home, não mostra modal
    if (home) {
      return;
    }
    setShowModal(true);
  }

  function confirmGoHome() {
    setShowModal(false);
    router.push("/");
  }

  function cancelGoHome() {
    setShowModal(false);
  }

  return (
    <>
      <header className="flex justify-between items-center p-4 h-25 bg-[#227C9D] text-white">
        <Image
          src="/logo.svg" // Garante que o caminho está correto
          className={home ? "cursor-default" : "cursor-pointer"}
          alt="Logo"
          width={250}
          height={250}
          onClick={handleGoToHome}
        />
      </header>

      {/* Modal estilo popup do jogo */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 30 }}
               transition={{ duration: 0.3 }}
               className="bg-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center"
             >
               <div className="flex flex-col items-center gap-4">
                 <div className={` ${luckiestGuy.variable} text-shadow-lg/25 text-[#FFCB77] text-3xl font-extrabold`} style={{ fontFamily: 'Luckiest Guy' }}> 
                   Deseja voltar para a página inicial?
                 </div>
                 <p className="text-gray-700 text-base">
                  Essa ação você perdera todo seu progreço!
                 </p>
                <div className="buttons flex w-full items-center justify-center gap-3">

                 <button
                   onClick={() => confirmGoHome()}
                   className="bg-[#FE6D73] w-30 text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#fe6d72a5] transition-all shadow-md"
                 >
                   Confirmar
                 </button>
                   
                 <button
                   onClick={() => cancelGoHome()}
                   className="bg-[#227C9D] text-white px-6 w-30 py-2.5 rounded cursor-pointer hover:bg-[#1b627f] transition-all shadow-md"
                 >
                   Cancelar
                 </button>
                  </div>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
