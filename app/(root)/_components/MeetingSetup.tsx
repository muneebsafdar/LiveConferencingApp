'use client';

import { VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const MeetingSetup = ({
  setissetupComplete,
}: {
  setissetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();

  if (!call) {
    throw new Error('useCall must be used within StreamCall component');
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  // ✅ Copy meeting link + show Sonner toast
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Meeting link copied!');
    } catch (err) {
      toast.error('Failed to copy link. Please try again.');
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 md:gap-6 text-white bg-[#1A3D64] p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-[#F4F4F4]">
        Meeting Setup
      </h1>

      {/* Video Preview */}
      <div className="w-full max-w-[90vw] flex justify-center md:max-w-4xl lg:max-w-5xl aspect-video rounded-xl overflow-hidden">
        <VideoPreview />
      </div>

      <div className="flex items-center justify-center gap-3 px-4">
        <label className="flex items-center justify-center gap-2 font-medium text-[#F4F4F4] text-sm md:text-base cursor-pointer">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            className="w-4 h-4 md:w-5 md:h-5 cursor-pointer"
          />
          Join with mic and camera off
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3 md:gap-4 mt-2">
        <Button
          onClick={handleShare}
          className="flex items-center gap-2 rounded-md bg-[#1D546C] px-6 py-3 hover:bg-[#0C2B4E] text-[#F4F4F4] font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Share2 size={18} />
          Share Link
        </Button>

        <Button
          className="rounded-md bg-[#1D546C] px-6 md:px-8 py-3 md:py-3.5 hover:bg-[#0C2B4E] text-[#F4F4F4] font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => {
            call.join();
            setissetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
