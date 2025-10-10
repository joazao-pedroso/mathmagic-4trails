"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectByRole = ({ role }: { role: string }) => {
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('user_role')?.toLocaleUpperCase();
    if (userRole !== role.toLocaleUpperCase()) {
        router.push('/');
    }
    if (!userRole) {
        router.push('/auth');
    }
  }, [router, role]);
};

export default useRedirectByRole;