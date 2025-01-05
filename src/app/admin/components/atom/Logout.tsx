'use client';

import {useRouter} from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function handleLogout() {
    router.push("/admin/login");
  }

  return (
    <button className='btn btn-outline-danger' onClick={handleLogout}>
      로그아웃
    </button>
  );
}