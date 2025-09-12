"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Luckiest_Guy } from "next/font/google";
const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});
type HeaderProps = {
  home: boolean;
  auth?: boolean; 
};
export default function Header({ home, auth = false }: HeaderProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showModalLeave, setShowModalLeave] = useState(false);


  function handleGoToHome() {
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
  function handleCancelLogout() {
    setShowModalLeave(false);
  }
  function handleLogout() {
    sessionStorage.removeItem("token");
    router.replace("/auth/signin");
  }

  return (
    <>
      <header className="flex w-full justify-between items-center p-4 h-25 bg-[#227C9D] text-white">
        <Image
          src="/logo.svg"
          className={home ? "cursor-default" : "cursor-pointer"}
          alt="Logo"
          width={250}
          height={250}
          onClick={handleGoToHome}
        />
        {
          auth == false &&(
            <button
            className="w-30 mr-10 text-xl bg-white text-[#227C9D] font-medium h-12 rounded-xl cursor-pointer hover:bg-[#e8e7e7] border-2"
            onClick={() => setShowModalLeave(true)}
          >
            Sair
          </button>
          )
        }

      </header>

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
                <div
                  className={` ${luckiestGuy.variable} text-shadow-lg/25 text-[#FFCB77] text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
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
      <AnimatePresence>
        {showModalLeave && (
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
                  className={` ${luckiestGuy.variable} text-shadow-lg/25 text-[#FFCB77] text-3xl font-extrabold`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  Deseja sair da conta?
                </div>
                <p className="text-gray-700 text-base">
                  Essa ação fazera você se deslogar!
                </p>
                <div className="buttons flex w-full items-center justify-center gap-3">
                  <button
                    onClick={() => handleLogout()}
                    className="bg-[#FE6D73] w-30 text-white px-6 py-2.5 rounded cursor-pointer hover:bg-[#fe6d72a5] transition-all shadow-md"
                  >
                    Confirmar
                  </button>

                  <button
                    onClick={() => handleCancelLogout()}
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
