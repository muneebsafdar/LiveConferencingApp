"use client"

import React, { ReactNode } from 'react'
import Header from './_components/Header'
import Sidebar from './_components/SideNav'

export default function RootLayout({children}:{children:ReactNode}) {
  return (
    <div className='min-h-screen bg-[#F4F4F4]'>
      {/* Header - Fixed at top */}
      <Header />
      
      <div className='flex'>
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <Sidebar />
        
        {/* Main Content - Responsive margins and padding */}
        <main className='flex-1 lg:ml-64 mt-16 p-4 md:p-6 w-full'>
          <div className='max-w-7xl mx-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}