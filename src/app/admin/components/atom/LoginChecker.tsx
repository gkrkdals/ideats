'use client';

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {client} from "@/util/axios";

export default function LoginChecker() {
  const router = useRouter();

  useEffect(() => {
    client
      .get('/api/auth/verify')
      .catch(() => {
        router.push('/admin/login');
      });
  }, []);

  return (
    <div hidden></div>
  );
}