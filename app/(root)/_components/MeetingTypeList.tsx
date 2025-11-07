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

// UUID generator function
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID generation
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

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
    console.log('=== Meeting Creation Debug ===');
    console.log('Client available:', !!client);
    console.log('User authenticated:', !!user);
    console.log('User ID:', user?.id);
    console.log('DateTime:', values.dateTime);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Base URL:', process.env.NEXT_PUBLIC_BASE_URL);
    console.log('==============================');

    if (!values.dateTime) {
      toast("Please fill all required information");
      return;
    }
    
    // Add more detailed client checks
    if (!client) {
      console.error('Stream client not initialized');
      toast("Video service not available");
      return;
    }
    
    if (!user) {
      console.error('User not authenticated');
      toast("Please sign in to start a meeting");
      return;
    }

    try {
      const id = generateUUID();
      const call = client.call('default', id);
      
      if (!call) {
        throw new Error('Failed to create call instance');
      }

      const startAt = values.dateTime.toISOString();
      const description = values.description || "instant meeting";

      // Add timeout for the API call
      const createCallPromise = call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: { description }
        }
      });

      // Timeout after 10 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
      });

      await Promise.race([createCallPromise, timeoutPromise]);

      setCallDetails(call);
      
      // Use relative path for routing instead of absolute URL
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      
      toast("Meeting created successfully");
      
    } catch (error: any) {
      console.error('Meeting creation error:', error);
      
      // More specific error messages
      if (error.message === 'Request timeout') {
        toast("Network timeout. Please check your connection.");
      } else if (error.message?.includes('auth') || error.message?.includes('token')) {
        toast("Authentication failed. Please refresh the page.");
      } else {
        toast("Something went wrong while starting the meeting");
      }
    }
  };

  const handleScheduleMeeting = async (title: string, description: string, dateTime: Date) => {
    console.log('=== Schedule Meeting Debug ===');
    console.log('Client available:', !!client);
    console.log('User authenticated:', !!user);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('DateTime:', dateTime);
    console.log('==============================');

    if (!client || !user) {
      toast("Video service not available or user not authenticated");
      return;
    }

    try {
      const id = generateUUID();
      const call = client.call('default', id);
      
      if (!call) {
        throw new Error('Failed to create call instance');
      }

      // Add timeout for the API call
      const createCallPromise = call.getOrCreate({
        data: {
          starts_at: dateTime.toISOString(),
          custom: {
            title,
            description,
          },
        },
      });

      // Timeout after 10 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 10000);
      });

      await Promise.race([createCallPromise, timeoutPromise]);

      setCallDetails(call);
      toast("Meeting scheduled successfully");
      setOpenSchedule(false);
    } catch (error: any) {
      console.error('Schedule meeting error:', error);
      
      // More specific error messages
      if (error.message === 'Request timeout') {
        toast("Network timeout. Please check your connection.");
      } else if (error.message?.includes('auth') || error.message?.includes('token')) {
        toast("Authentication failed. Please refresh the page.");
      } else {
        toast("Something went wrong while scheduling the meeting");
      }
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
          setOpen={() => setOpenSchedule(true)}
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
        onSchedule={handleScheduleMeeting}
      />
    </div>
  );
}