"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useLogout from "@/hooks/useLogout";

export function useApi() {
  const router = useRouter();
  const logout = useLogout();

  const apiCall = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        logout();
        router.push("/auth/signin");
        throw new Error("Token não encontrado.");
      }

      try {
        const response = await axios({
          ...config,
          url: `${process.env.NEXT_PUBLIC_API_URL}${config.url}`, // Prefixa a URL
          withCredentials: true,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          },
        });

        return response;
      } catch (error) {
        const err = error as AxiosError;

        if (err.response?.status === 401 || err.response?.status === 403) {
          logout();
          router.push("/auth/signin");
        }

        throw err;
      }
    },
    [logout, router]
  );

  return apiCall;
}
