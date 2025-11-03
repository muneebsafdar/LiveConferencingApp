"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import MeetingTypeList from '../_components/MeetingTypeList';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full h-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-2xl">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 bg-linear-to-br from-[#0C2B4E] via-[#1A3D64] to-[#1D546C]"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-linear-to-br from-[#0C2B4E]/90 via-[#1A3D64]/85 to-[#1D546C]/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-4">
          {/* Top Section - Meeting Info */}
          <div className="space-y-4">
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#F4F4F4] leading-tight">
              Upcoming Meeting
            </h1>
            
            <div className="flex items-center space-x-3">
              <Clock className="text-[#F4F4F4]" size={28} />
              <span className="md:text-xl font-semibold text-[#F4F4F4]">
                Today at 10:00 AM
              </span>
            </div>
          </div>

          {/* Bottom Section - Current Time */}
          <div className="bg-[#0C2B4E]/60 backdrop-blur-md  rounded-xl p-6 border border-[#F4F4F4]/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[#F4F4F4]/70 text-sm font-medium mb-1">Current Time</p>
                <p className="text-3xl md:text-4xl font-bold text-[#F4F4F4] font-mono tracking-wider">
                  {formatTime(currentTime)}
                </p>
              </div>
              <div className="md:text-right">
                <p className="text-[#F4F4F4]/70 text-sm font-medium mb-1">Date</p>
                <p className="text-lg md:text-xl font-semibold text-[#F4F4F4]">
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#1D546C]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#0C2B4E]/30 rounded-full blur-3xl"></div>
      </div>


      <div className='my-8'>
        <MeetingTypeList/>
      </div>

    </div>
  );
}