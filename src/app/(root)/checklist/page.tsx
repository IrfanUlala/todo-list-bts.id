"use client";
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
    <div className="grid grid-cols-4 gap-4">
      {checkListData?.map((e, i: number) => (
        <div className="w-full h-full rounded bg-red-500 p-5 shadow" key={i}>
          <h1>{e.name}</h1>
          <h2>{e.checklistCompletionStatus}</h2>
        </div>
      ))}
    </div>
  );
}