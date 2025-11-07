"use client";

import React, { useState } from 'react';
import { Video } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';


interface MeetingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  handleStartMeeting: (title: string) => void; // pass title
}

export default function MeetingModal({ 
  isOpen, 
  onOpenChange,
  handleStartMeeting,
}: MeetingModalProps) {

  const [meetingTitle, setMeetingTitle] = useState('');

  const handleStart = () => {
    if (!meetingTitle.trim()) {
      // Optional: Add a toast if you have Sonner or other UI feedback
      alert('Please enter a meeting title');
      return;
    }
    handleStartMeeting(meetingTitle);
    setMeetingTitle('');
    onOpenChange(false);
  };

  return (
    <VisuallyHidden>
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A3D64] border-[#0C2B4E] text-[#F4F4F4] max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#1D546C] to-[#0C2B4E] flex items-center justify-center">
              <Video className="text-[#F4F4F4]" size={32} />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-[#F4F4F4]">
            Start a New Meeting
          </DialogTitle>
          <DialogDescription className="text-center text-[#F4F4F4]/70 pt-2">
            Enter a title and create an instant meeting
          </DialogDescription>
        </DialogHeader>

        {/* Input field for meeting title */}
        <div className="mt-4 space-y-3">
          <label htmlFor="meetingTitle" className="text-sm font-medium text-[#F4F4F4]/80">
            Meeting Title
          </label>
          <Input
            id="meetingTitle"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            placeholder="e.g. Team Sync-up"
            className="bg-[#0C2B4E] text-[#F4F4F4] border-[#1D546C] placeholder:text-[#F4F4F4]/50"
          />
        </div>

        <div className="mt-6">
          <Button 
            onClick={handleStart}
            className="w-full bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] h-12 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </VisuallyHidden>
  );
}
