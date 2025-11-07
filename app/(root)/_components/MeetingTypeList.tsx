'use client';

import React, { useState } from 'react';
import HomeCard from './HomeCard';
import { Calendar, Video, Clock, Users } from 'lucide-react';
import MeetingModal from './MeetingModal';
import ScheduleMeetingModal from '../_components/MeetingScheduleModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function MeetingTypeList() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: ""
  });
  const [calldetails, setCallDetails] = useState<Call>();

  const handleStartMeeting = async () => {
    if (!values.dateTime) {
      toast("Please fill all required information");
      return;
    }
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Call not found');
      const startAt = values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description }
        }
      });

      setCallDetails(call);
      if (!values.description) {
        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`);
      }
      toast("Meeting created successfully");
    } catch (error) {
      toast("Something went wrong while starting the meeting");
    }
  };

const handleScheduleMeeting = async (title: string, description: string, dateTime: Date) => {
  if (!client || !user) return;

  try {
    const id = crypto.randomUUID();
    const call = client.call('default', id);
    if (!call) throw new Error('Call not found');

    await call.getOrCreate({
      data: {
        starts_at: dateTime.toISOString(),
        custom: {
          title,
          description,
        },
      },
    });

    setCallDetails(call);
    toast("Meeting scheduled successfully");
    setOpenSchedule(false);
  } catch (error) {
    toast("Something went wrong while scheduling the meeting");
  }
};

  return (
    <div>
      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <HomeCard
          setOpen={setOpen}
          icon={Calendar}
          mainText="New Meeting"
          secondaryText="Start an instant meeting and connect with your team in seconds."
          bgClassName='bg-[#F87B1B]'
        />
        <HomeCard 
          setOpen={() => setOpenSchedule(true)}  // ✅ schedule modal trigger
          icon={Clock}
          mainText="Schedule Meeting"
          secondaryText="Plan meetings ahead of time and send invites to participants."
          bgClassName='bg-[#3B9797]'
        />
        {/* <HomeCard 
          setOpen={setOpen}
          icon={Users}
          mainText="View Recordings"
          secondaryText="Access and manage past meeting recordings securely anytime."
          bgClassName='bg-[#CD2C58]'
        /> */}
      </div>
      
      <MeetingModal
        handleStartMeeting={handleStartMeeting}
        isOpen={open}
        onOpenChange={setOpen}
      />

      <ScheduleMeetingModal
        isOpen={openSchedule}
        onOpenChange={setOpenSchedule}
        onSchedule={handleScheduleMeeting} // ✅ added the schedule handler
      />
    </div>
  );
}
