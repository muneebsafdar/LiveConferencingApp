"use client"

import React, { ReactNode } from 'react'
import Header from './_components/Header'
import Sidebar from './_components/SideNav'


export default function RootLayout({children}:{children:ReactNode}) {
  return (
    <div>

      <Header/>
      <Sidebar/>
       <div>
          {children}
        </div>
    </div>
  )
}
