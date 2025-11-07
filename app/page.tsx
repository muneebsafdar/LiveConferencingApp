"use client"

import Image from "next/image";
import {Button, buttonVariants} from '@/components/ui/button'
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const router=useRouter()

  useEffect(()=>{
    router.push('/home')
  },[])
  return (
   <></>
  );
}
