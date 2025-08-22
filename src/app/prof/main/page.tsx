"use client";
import Header from "@/components/Header";

export default function MainPage() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-between bg-gray-100">
      <Header home={false} />
      <main className="w-full h-screen flex  ">
        <div className="w-25 bg-red-500 h-full flex flex-col items-center gap-10 justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-50"></div>
          <div className="w-20 h-20 rounded-full bg-gray-50"></div>
          <div className="w-20 h-20 rounded-full bg-gray-50"></div>
        </div>
        <div className="min-h-screen flex flex-col w-full ">
          <div className="h-1/3 w-full flex-col bg-gray-50 flex items-center justify-center">
            <div className="h-1/2 w-full flex items-center justify-around">
              <h1 className="text-4xl font-bold text-[#227C9D]">
                Minhas Salas:
              </h1>
              <button className="w-55 rounded-xl h-15 cursor-pointer bg-amber-300 text-white text-2xl hover:bg-amber-400 transition-all">
                Nova Sala
              </button>
            </div>
            <div className="h-1/2 w-full flex items-center justify-center">
              <div className="w-200 flex h-15 ">
                <div className="w-1/8 border-3 rounded-l-xl border-amber-400 "></div>
                <input type="text" placeholder="Nome da Sala:" className="w-7/8 border-3 text-center rounded-r-xl border-amber-400 " />
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
