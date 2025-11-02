"use client"
import { useParams } from 'next/navigation'
import React from 'react'



export default function meeting() {
    const params = useParams<{ id: string }>()
  return (
    <div>meetinng With id {params.id}</div>
  )
}
