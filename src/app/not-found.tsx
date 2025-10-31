import Header from "@/components/Header";
import { Luckiest_Guy } from "next/font/google";
import Image from "next/image";
const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function NotFound() {
  return (
    <>
      <Header home={false} />
      <main className="min-h-screen flex-col p-20 bg-gray-150 gap-10 flex items-center justify-center">
        <h1
          className={`${luckiestGuy.variable} text-[#227C9D] text-5xl font-bold`}
          style={{ fontFamily: "Luckiest Guy" }}
        >
          ERRO 404 - PÁGINA NÃO ENCONTRADA!
        </h1>
        <Image
          src={"/lose.svg"}
          alt="Mascote Tente novamente"
          width={250}
          height={250}
          className="object-contain "
          priority
        />
        <button className="bg-[#227C9D] cursor-pointer hover:bg-[#227c9dda]  text-white rounded p-5 text-2xl ">
          Voltar ao ínicio
        </button>
      </main>
    </>
  );
}
