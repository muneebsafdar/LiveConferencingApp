"use client";

import React, { useState, useEffect } from "react";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { LayoutList, Users, PhoneOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const router = useRouter();
  const { user } = useUser();
  const call = useCall();

  const isMeetingOwner = call?.state.createdBy?.id === user?.id;

  // 🔹 Redirect when call ends
  useEffect(() => {
    if (!call) return;
    const handleCallEnded = () => {
      router.push("/home");
    };
    const unsubscribe = call.on("call.ended", handleCallEnded);
    return () => unsubscribe();
  }, [call, router]);

  if (callingState !== "joined") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#1A3D64]">
        <div className="text-center text-[#F4F4F4] text-xl font-semibold">
          Loading meeting...
        </div>
      </div>
    );
  }

  // 🔹 Responsive Layout
  const CallLayout = () => {
    // Mobile: show both participants side-by-side or stacked
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-full p-2 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full h-full">
            <div className="w-full h-[45vh] sm:h-full bg-[#0C2B4E] rounded-xl overflow-hidden">
              <VideoPreview className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="w-full h-[45vh] sm:h-full bg-[#0C2B4E] rounded-xl overflow-hidden">
              <PaginatedGridLayout />
            </div>
          </div>

          {/* Thumbnails or participant count */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="bg-[#1D546C] text-[#F4F4F4] text-xs px-3 py-1 rounded-full">
              {call?.state?.participants?.length || 1} Participants
            </div>
          </div>
        </div>
      );
    }

    // Desktop layouts (unchanged)
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  const handleEndCallForEveryone = async () => {
    if (call) {
      await call.endCall();
      router.push("/home");
    }
  };

  const handleLeaveCall = async () => {
    if (call) {
      await call.leave();
      router.push("/home");
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0C2B4E] text-[#F4F4F4]">
      {/* Main Video Area */}
      <div className="relative flex h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] w-full flex-col sm:flex-row">
        <div className="flex flex-1 items-center justify-center w-full h-full overflow-hidden">
          <div className="w-full h-full">
            <CallLayout />
          </div>
        </div>

        {/* Participants Sidebar */}
        {showParticipants && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowParticipants(false)}
            />
            <div className="fixed md:relative right-0 top-0 h-full w-[85vw] max-w-[320px] md:w-[320px] bg-[#1A3D64] border-l border-[#0C2B4E] shadow-2xl z-50 overflow-y-auto">
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

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 md:gap-4 bg-[#1A3D64] px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-4 border-t border-[#0C2B4E] z-40">
        <div className="flex items-center scale-90 sm:scale-95 md:scale-100">
          <CallControls onLeave={handleLeaveCall} />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
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
                onClick={() => setLayout("grid")}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Grid
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLayout("speaker-left")}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Speaker Left
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLayout("speaker-right")}
                className="hover:bg-[#1D546C] cursor-pointer"
              >
                Speaker Right
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden sm:block">
            <CallStatsButton />
          </div>

          <Button
            onClick={() => setShowParticipants((prev) => !prev)}
            variant="ghost"
            className="bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm md:text-base h-8 sm:h-9 md:h-10"
          >
            <Users size={16} className="sm:size-[18px]" />
            <span className="hidden lg:inline ml-2">
              {showParticipants ? "Hide" : "Show"}
            </span>
          </Button>

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
