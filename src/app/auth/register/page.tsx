"use client";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import http from "@/lib/http";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Register() {
  const router=useRouter();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: ''
  })
  const handleRegister = () => {
    const token = Cookies.get('token');
    http.post('/register', user, token).then((response) => {
      console.log(response);
      const res = response as { statusCode: number, message: string };
      if (res.statusCode === 2000) {
        toast.success(res.message);
        router.push('/auth/login');
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-auto bg-slate-200">
      <div className="bg-white rounded p-5 flex flex-col w-full gap-3 shadow max-w-xl mx-auto">
        <h3 className="w-full text-center font-semibold text-2xl">
          REGISTER TODOLIST
        </h3>
        {/* {error && (
          <span className="text-red-500 italic text-sm">
            {error}
          </span>
        )} */}
        <input type="text" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
        <input type="text" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Username" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
        <input type="text" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
        <button className="w-full rounded p-3 text-center bg-red-500 text-white" onClick={handleRegister}>Daftar</button>
        <div className="w-full text-center text-gray-400 text-sm">
          Sudah punya akun silahkan <Link href={'/auth/login'} className="text-blue-500 underline">Login!</Link>
        </div>
      </div>
    </div>
  );
}