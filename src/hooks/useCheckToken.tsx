import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useCheckToken(){
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (!storedToken) {
      router.replace("/auth/signin");
    } else {
      setToken(storedToken);
    }
  }, [router]);
}