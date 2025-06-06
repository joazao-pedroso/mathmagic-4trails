"use client";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Luckiest_Guy } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const luckiestGuy = Luckiest_Guy({
  variable: "--font-luckiest-guy",
  subsets: ["latin"],
  weight: "400",
});

export default function Trilha() {
  const router = useRouter();

  const steps = [
    { title: "Jogo 1", path: "/first_game" },
    { title: "Jogo 2", path: "/second_game" },
    { title: "Jogo 3", path: "/third_game" },
    { title: "Jogo 4", path: "/four_game" },
  ];

  return (
    <>
      <Header home={true} />
      <main className="min-h-screen bg-gray-150 flex items-center justify-center ">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 flex flex-col items-center gap-6">
          <h1
            className={`${luckiestGuy.variable} text-[#227C9D] text-4xl font-bold`}
            style={{ fontFamily: "Luckiest Guy" }}
          >
            Trilha de Jogos
          </h1>

          <ul className="flex flex-col gap-5 w-full">
            {steps.map((step, index) => (
              <li
                key={index}
                onClick={() => router.push(step.path)}
                className="flex items-center gap-4 bg-[#F2FCFC] border-2 border-[#227C9D] hover:bg-[#D3F4F2] text-[#227C9D] rounded-xl p-4 cursor-pointer transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#227C9D] flex items-center justify-center">
                  <CheckCircle className="text-white" size={22} />
                </div>
                <span
                  className={`${luckiestGuy.variable} text-xl tracking-wide`}
                  style={{ fontFamily: "Luckiest Guy" }}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
