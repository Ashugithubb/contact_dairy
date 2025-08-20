'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "./redux/hook/hook";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return (

    <>

    </>
  );
}