"use client";
import Link from "next/link";
import Cookies from 'js-cookie';
import http from "@/lib/http";
import { useRouter } from "next/navigation";
import { BsFillTrashFill } from "react-icons/bs";

export default function DetailCheckList() {
  const router = useRouter();
  const handleDelete = (id: number | string) => {
    const token = Cookies.get('token');
    http.delete('/checklist/' + id, token).then((response) => {
      console.log(response);
      router.push('/checklist');
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <div className="max-w-7xl mx-auto p-5 flex flex-col gap-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">
          DETAIL CHECKLIST
        </h1>
        <Link href={'/checklist'} className="bg-gray-300 text-gray-500 rounded p-3 text-sm">Kembali</Link>
      </div>
      <div className="w-full h-full rounded bg-red-100 p-5 shadow relative flex flex-col gap-3" key={"i"}>
        <div className="flex flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" readOnly={true} checked={false} />
            <h1>{"e.name"}</h1>
          </div>
          <button onClick={() => handleDelete("e.id")} className="text-gray-400 hover:text-red-500 duration-300 cursor-pointer"><BsFillTrashFill /></button>
        </div>
        <div className="">Komponen</div>
        <div className="flex flex-col gap-3">
          <div className="rounded p-5 w-full h-fit bg-red-50 flex flex-row gap-3">
            <input type="checkbox" name="" id="" />
            <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus nam ea a tempora qui rem dignissimos obcaecati architecto ex, omnis magnam fugiat perferendis pariatur! Reiciendis tempora harum vero tenetur totam?</span>
          </div>
        </div>
      </div>
    </div>
  );
}