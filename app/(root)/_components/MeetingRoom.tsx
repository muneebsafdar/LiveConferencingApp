import React, { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
} from '@stream-io/video-react-sdk';
import { LayoutList, Users, PhoneOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();
  const { user } = useUser();
  const call = useCall();

  // Check if current user is the meeting creator
  const isMeetingOwner = call?.state.createdBy?.id === user?.id;

  if (callingState !== 'joined') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1A3D64]">
        <div className="text-center">
          <div className="text-[#F4F4F4] text-xl font-semibold">
            Loading meeting...
          </div>
        </div>
      </div>
    );
  }

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleEndCallForEveryone = async () => {
    if (call) {
      await call.endCall();
      router.push('/');
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0C2B4E]">
      {/* Main Content Area */}
      <div className="relative flex h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] w-full">
        {/* Video Layout Area */}
        <div className="flex flex-1 items-center justify-center w-full h-full overflow-hidden">
          <div className="w-full h-full">
            <CallLayout />
          </div>
        </div>

        {/* Participants Sidebar - Mobile Overlay / Desktop Sidebar */}
        {showParticipants && (
          <>
            {/* Mobile: Full screen overlay with backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowParticipants(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed md:relative right-0 top-0 h-full w-[85vw] max-w-[320px] md:w-[320px] bg-[#1A3D64] border-l border-[#0C2B4E] shadow-2xl z-50 overflow-y-auto">
              {/* Close button for mobile */}
              <button
                onClick={() => setShowParticipants(false)}
                className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-[#0C2B4E] hover:bg-[#1D546C] transition-colors z-10"
              >
                <X size={20} className="text-[#F4F4F4]" />
              </button>
              
              <CallParticipantsList onClose={() => setShowParticipants(false)} />
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls Bar - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-4 bg-[#1A3D64] px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 border-t border-[#0C2B4E] z-40">
        {/* Main Call Controls */}
        <div className="flex items-center scale-90 sm:scale-95 md:scale-100">
          <CallControls />
        </div>

        {/* Additional Controls - Responsive */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          {/* Layout Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
              >
                <LayoutList size={16} className="sm:size-[18px]" />
                <span className="hidden lg:inline ml-2">Layout</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1A3D64] border-[#0C2B4E] text-[#F4F4F4]">
              <DropdownMenuItem
                onClick={() => setLayout('grid')}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLayout('speaker-left')}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Speaker Left
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLayout('speaker-right')}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Speaker Right
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Call Stats - Hidden on mobile */}
          <div className="hidden sm:block">
            <CallStatsButton />
          </div>

          {/* Participants Toggle */}
          <Button
            onClick={() => setShowParticipants((prev) => !prev)}
            variant="ghost"
            className="bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
          >
            <Users size={16} className="sm:size-[18px]" />
            <span className="hidden lg:inline ml-2">
              {showParticipants ? 'Hide' : 'Show'}
            </span>
          </Button>

          {/* End Call for Everyone - Only for Meeting Owner */}
          {isMeetingOwner && (
            <Button
              onClick={handleEndCallForEveryone}
              variant="ghost"
              className="bg-red-600 hover:bg-red-700 text-[#F4F4F4] px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
            >
              <PhoneOff size={16} className="sm:size-[18px]" />
              <span className="hidden lg:inline ml-2">End Call</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;