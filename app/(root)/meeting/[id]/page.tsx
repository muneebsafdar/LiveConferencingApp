"use client"
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { Loader, UserSearch } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import MeetingSetup from '../../_components/MeetingSetup'
import MeetingRoom from '../../_components/MeetingRoom'
import { useGetCalllByid } from '@/Hooks/useGetCalllByid'



export default function meeting() {
    const params = useParams<{ id: string }>()
    const {user,isLoaded}=useUser()
    const [issetupComplete,setissetupComplete]=useState(false)
    const {call,isCallloading}=useGetCalllByid(params.id)

    if(!isLoaded || isCallloading) return <Loader/>


  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!issetupComplete ? (
            <MeetingSetup setissetupComplete={setissetupComplete}/>
          )
          :(
          <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}
