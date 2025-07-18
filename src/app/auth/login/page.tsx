"use client";
import { AiOutlineLoading } from "react-icons/ai";
import http from "@/lib/http";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
export default function Login() {
  // tinggal ka apikeun
  // jika sudah ada token alihkan ke halaman utama root
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    const token = Cookies.get('token');
    http.post('/login', user, token).then((response) => {
      const res = response as { statusCode: number, message: string, data: { token: string } };
      if (res.statusCode === 2110) {
        const token = res.data.token
        Cookies.set('token', token, { expires: 365, path: '/' });
        toast.success(res.message);
        router.push('/');
      }
    }).catch((err) => {
      setError(err.response.data.errorMessage);
    })
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      http.get('/checklist', token).then((response) => {
        if (response) {
          router.push('/');
        }
      }).catch((err) => {
        if (err.status === 401) {
          setIsLoading(false);
        } else {
          console.log(err);
          alert('Error Api');
        }
      })
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <span className="animate-spin">
          <AiOutlineLoading />
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-screen overflow-auto bg-slate-200">
      <div className="bg-white rounded p-5 flex flex-col w-full gap-3 shadow max-w-xl mx-auto">
        <h3 className="w-full text-center font-semibold text-2xl">
          TODOLIST
        </h3>
        {error && (
          <span className="text-red-500 italic text-sm">
            {error}
          </span>
        )}
        <input type="text" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Username" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
        <input type="password" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
        <button className="w-full rounded p-3 text-center bg-red-500 text-white" onClick={handleLogin}>Login</button>
        <div className="w-full text-center text-gray-400 text-sm">
          Ingin <Link href={'/auth/register'} className="text-blue-500 underline">daftar?</Link>
        </div>
      </div>
    </div>
  );
}
