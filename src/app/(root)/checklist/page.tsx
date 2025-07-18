"use client";
import { BsFillTrashFill } from "react-icons/bs";
import LoadingPage from "@/components/loading";
import http from "@/lib/http";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type checkListType = {
  "id": number,
  "name": string,
  "items": null,
  "checklistCompletionStatus": boolean
}

export default function CheckList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [checkListData, setCheckListData] = useState<checkListType[] | undefined>(undefined);
  const getChecklist = () => {
    setIsLoading(true);
    const token = Cookies.get('token');
    http.get('/checklist', token).then((response) => {
      const res = response as {
        data: checkListType[]
      };
      setCheckListData(res.data);
      setIsLoading(false);
    }).catch((err) => {
      if (err.status === 401) {
        setIsLoading(false);
        router.push('/auth/login');
      } else {
        console.log(err);
        alert('Error Api');
      }
    })
  }
  const handleDelete = (id: number) => {
    const token = Cookies.get('token');
    http.delete('/checklist/' + id, token).then((response) => {
      console.log(response);
      getChecklist();
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getChecklist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (isLoading) {
    return (
      <LoadingPage />
    )
  }
  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-semibold">
          CHECKLIST
        </h1>
        <button className="bg-red-500 text-white rounded p-3 text-sm" onClick={() => router.push('/checklist/add')}>+ Tambah</button>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full mt-5">
        {checkListData?.map((e, i: number) => (
          <div className="w-full h-full rounded bg-red-100 p-5 shadow relative" key={i}>
            <div className="flex flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" readOnly={true} checked={e.checklistCompletionStatus} />
                <h1>{e.name}</h1>
              </div>
              <button onClick={() => handleDelete(e.id)} className="text-gray-400 hover:text-red-500 duration-300 cursor-pointer"><BsFillTrashFill /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}