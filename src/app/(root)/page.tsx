"use client";

import LoadingPage from "@/components/loading";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  router.push('/checklist');
  return (
   <LoadingPage/>
  )
}