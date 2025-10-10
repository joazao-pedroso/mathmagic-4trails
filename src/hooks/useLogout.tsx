"use client";
import { useRouter } from "next/navigation";
export default function useLogout() {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    router.replace('/')
  }
  return logout;
}