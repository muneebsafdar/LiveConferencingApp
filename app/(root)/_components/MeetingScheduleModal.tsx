"use client";

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule: (title: string, description: string, dateTime: Date) => void;
}

export default function ScheduleMeetingModal({ 
  isOpen, 
  onOpenChange,
  onSchedule
}: ScheduleMeetingModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  const handleSchedule = () => {
    if (!title.trim()) {
      alert('Please enter a meeting title');
      return;
    }

    if (!description.trim()) {
      alert('Please enter a meeting description');
      return;
    }

    if (!dateTime) {
      alert('Please select a valid date and time');
      return;
    }

    onSchedule(title, description, dateTime);
    setTitle('');
    setDescription('');
    setDateTime(new Date());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A3D64] border-[#0C2B4E] text-[#F4F4F4] max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mx-auto mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D546C] to-[#0C2B4E] flex items-center justify-center">
              <Calendar className="text-[#F4F4F4]" size={32} />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-[#F4F4F4]">
            Schedule Meeting
          </DialogTitle>
          <DialogDescription className="text-center text-[#F4F4F4]/70 pt-2">
            Plan your meeting ahead of time
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Meeting Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#F4F4F4] font-medium">
              Meeting Title <span className="text-red-400">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter meeting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[#0C2B4E] border-[#1D546C] text-[#F4F4F4] placeholder:text-[#F4F4F4]/50 focus:border-[#1D546C] focus:ring-[#1D546C]"
            />
          </div>

          {/* Meeting Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#F4F4F4] font-medium">
              Meeting Description <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Enter meeting description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#0C2B4E] border-[#1D546C] text-[#F4F4F4] placeholder:text-[#F4F4F4]/50 focus:border-[#1D546C] focus:ring-[#1D546C] min-h-[100px]"
            />
          </div>

          {/* Date and Time Picker */}
          <div className="space-y-2">
            <Label htmlFor="datetime" className="text-[#F4F4F4] font-medium">
              Select Date & Time <span className="text-red-400">*</span>
            </Label>
            <div className="w-full">
              <DatePicker
                selected={dateTime}
                onChange={(date: Date | null) => setDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full bg-[#0C2B4E] border border-[#1D546C] text-[#F4F4F4] rounded-md px-3 py-2 focus:outline-none focus:border-[#1D546C] focus:ring-1 focus:ring-[#1D546C]"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          {/* Schedule Button */}
          <Button 
            onClick={handleSchedule}
            className="w-full bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] h-12 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl mt-6"
          >
            Schedule Meeting
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
