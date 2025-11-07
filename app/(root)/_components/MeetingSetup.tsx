'use client';

import { VideoPreview, useCall } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface MeetingSetupProps {
  setissetupComplete: (value: boolean) => void;
}

const MeetingSetup: React.FC<MeetingSetupProps> = ({ setissetupComplete }) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const call = useCall();

  useEffect(() => {
    setIsClient(true); // Only render on client
  }, []);

  // 🧠 Don't access call.* until call exists
  useEffect(() => {
    if (!call) return;

    if (isMicCamToggledOn) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggledOn, call]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Meeting link copied!');
    } catch {
      toast.error('Failed to copy link.');
    }
  };

  // 🧱 Don't render until both client + call are ready
  if (!isClient || !call) return null;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white bg-[#1A3D64] p-4">
      <h1 className="text-2xl font-bold text-[#F4F4F4]">Meeting Setup</h1>

      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden">
        <VideoPreview />
      </div>

      <div className="flex items-center justify-center gap-3 mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with mic and camera off
        </label>
      </div>

      <div className="flex gap-4 mt-3">
        <Button onClick={handleShare} className="flex items-center gap-2">
          <Share2 size={18} /> Share Link
        </Button>

        <Button
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
