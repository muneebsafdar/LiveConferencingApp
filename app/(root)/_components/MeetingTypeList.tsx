import React from 'react'
import HomeCard from './HomeCard'
import { Calendar, Video, Clock, Users } from 'lucide-react';

export default function MeetingTypeList() {
  return (
    <div className='grid md:grid-cols-3 gap-4 '>
  <HomeCard 
    icon={Calendar}
    mainText="New Meeting"
    secondaryText="Start an instant meeting and connect with your team in seconds."
    bgClassName='bg-[#F87B1B]'
  />
  <HomeCard 
    icon={Video}
    mainText="Join Meeting"
    secondaryText="Enter a meeting code or link to join ongoing sessions instantly."
    bgClassName='bg-[#FF3F7F]'
  />
  <HomeCard 
    icon={Clock}
    mainText="Schedule Meeting"
    secondaryText="Plan meetings ahead of time and send invites to participants."
    bgClassName='bg-[#3B9797]'
  />
  <HomeCard 
    icon={Users}
    mainText="View Recordings"
    secondaryText="Access and manage past meeting recordings securely anytime."
    bgClassName='bg-[#CD2C58]'
  />
</div>

  )
}
