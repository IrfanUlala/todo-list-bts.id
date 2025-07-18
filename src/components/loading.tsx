import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingPage() {
  return (
     <div className="flex h-screen w-full items-center justify-center">
      <span className="animate-spin">
        <AiOutlineLoading />
      </span>
    </div>
  );
}