'use client';

import {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";
import {client} from "@/util/axios";
import FormControl from "@/components/atom/FormControl";

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
      router.push("/admin");
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.status === 401) {
        setFailed(true);
      } else {
        console.error(e);
      }
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <>
      <div className='mb-2'>ID</div>
      <FormControl
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='ID'
      />
      <div className='my-3'/>
      <div className='mb-2'>비밀번호</div>
      <FormControl
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='비밀번호 입력'
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            await handleLogin();
          }
        }}
      />
      <div className='my-3'/>
      <button
        className='btn btn-primary'
        style={{ width: '100%', marginBottom: failed ? '10px' : '' }}
        onClick={handleLogin}
        disabled={isLoggingIn}
      >
        {isLoggingIn ? '로그인 중..' : '로그인'}
      </button>
      {failed && <p className='text-danger'>ID 또는 비밀번호가 잘못되었습니다.</p>}
    </>
  );
}