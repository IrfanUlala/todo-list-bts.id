"use client";

import http from "@/lib/http";
import { useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddChecklist() {
  const [name, setName] = useState('')
  const router=useRouter();
  const handleSave = () => {
    const token = Cookies.get('token');
    http.post('/checklist', { name: name }, token).then((response) => {
      console.log(response);
      const res = response as { statusCode: number; [key: string]: unknown };
      if(res.statusCode === 2000){
        router.push('/checklist');
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto p-5">
      <h1 className="font-semibold">Tambah Checklist</h1>
      <input type="text" className="w-full p-3 rounded border-1 border-gray-200" placeholder="Nama tugas" onChange={(e) => setName(e.target.value)} />
      <button className="bg-red-500 text-white rounded p-3 text-sm" onClick={handleSave}>Simpan</button>
      <Link href={'/checklist'} className="bg-gray-200 text-gray-500 rounded p-3 text-sm text-center hover:text-gray-700 duration-300 hover:bg-gray-300">Kembali</Link>
    </div>
  );
}