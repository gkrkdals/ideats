'use client';

import {useState} from "react";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {client} from "@/util/axios";
import {navigate} from "next/dist/client/components/segment-cache/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [failed, setFailed] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    try {
      setIsLoggingIn(true);

      await client.post("/api/auth/login", { username, password });
      router.push("/api/admin");
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.status === 400) {
        setFailed(true);
      } else {
        console.log(e);
      }
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <>

    </>
  );
}