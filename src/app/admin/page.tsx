"use client";
import Header from "@/components/Header";
import useRedirectByRole from "@/hooks/useRedirectByRole";
import ProfessorContainer from "@/components/admin/containers/ProfessorContainer";
import { GraduationCap, Gamepad, Map } from "lucide-react";

export default function Admin() {
  useRedirectByRole({ role: "ADMIN" });

  return (
    <>
      <Header home={false} />
      <main className="min-h-screen flex-wrap bg-gray-150  flex items-start justify-between">
        <div className="w-1/7 h-screen gap-10 pt-10 flex flex-col items-center justify-start bg-gray-50 shadow ">
          <div className="w-20 h-20 hover:bg-[#1b627f] flex items-center cursor-pointer justify-center rounded-lg bg-[#227C9D]">
            <GraduationCap size={60} className="text-white" strokeWidth={1} />
          </div>
          <div className="w-20 h-20 hover:bg-[#1b627f] flex items-center cursor-pointer justify-center rounded-lg bg-[#227C9D]">
            <Gamepad size={60} className="text-white" strokeWidth={1} />
          </div>
          <div className="w-20 h-20 hover:bg-[#1b627f] flex items-center cursor-pointer justify-center rounded-lg bg-[#227C9D]">
            <Map size={60} className="text-white" strokeWidth={1} />
          </div>
        </div>
        <div className="w-6/7 mt-10  gap-10 flex items-center flex-col justify-center">
          <h1 className="text-center text-4xl font-semi-bold">
            Painel do Administrador
          </h1>
          <div className="w-full flex items-center gap-10 flex-col justify-center">
            <ProfessorContainer />
          </div>
        </div>
      </main>
    </>
  );
}
