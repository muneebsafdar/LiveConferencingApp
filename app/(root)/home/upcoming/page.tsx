"use client";

import React, { useEffect, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { CallList } from "../../_components/CallList";
import { toast } from "sonner";

export default function Upcoming() {
  const client = useStreamVideoClient();
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    if (!client) return;

    try {
      const response = await client.queryCalls({
        filter_conditions: { "starts_at": { $gte: new Date().toISOString() } },
        sort: [{ field: "starts_at", direction: 1 }],
      });

      console.log("📅 Upcoming Calls:", response.calls);

      const upcomingCalls = response.calls.map((call) => ({
        type: "upcoming" as const,
        callId: call.id,
        call: call,
        title: call.state?.custom?.title || "Untitled Meeting",
        description: call.state?.custom?.description || "No description available",
        participants:
          call.state?.members?.map((m) => m.user?.name || m.user_id) || [],
        time: new Date(call.state?.startsAt ?? new Date()).toLocaleString(),
      }));

      setMeetings(upcomingCalls);
    } catch (err) {
      console.error("❌ Error fetching meetings:", err);
      toast.error("Failed to fetch meetings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, [client]);

  const handleStartMeeting = (callId: string) => {
    const meetingUrl = `${window.location.origin}/meeting/${callId}`;
    window.open(meetingUrl, '_blank');
    toast.success("Opening meeting in new tab");
  };

  const handleCopyLink = (callId: string) => {
    const meetingUrl = `${window.location.origin}/meeting/${callId}`;
    navigator.clipboard.writeText(meetingUrl);
    toast.success("Meeting link copied to clipboard!");
  };

  const handleDeleteMeeting = async (call: any) => {
    try {
      // Delete the call using Stream SDK
      await call.delete();
      
      toast.success("Meeting deleted successfully");
      
      // Refresh the meetings list
      fetchMeetings();
    } catch (err) {
      console.error("❌ Error deleting meeting:", err);
      toast.error("Failed to delete meeting");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#0C2B4E] text-[#F4F4F4]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#1D546C] border-solid mb-4"></div>
        <p className="text-lg tracking-wide">Loading upcoming meetings...</p>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {meetings.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold text-[#F4F4F4] mb-6 text-center">
            Upcoming Meetings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6">
            {meetings.map((meeting, index) => (
              <CallList
                key={index}
                type={meeting.type}
                title={meeting.title}
                description={meeting.description}
                participants={meeting.participants}
                time={meeting.time}
                onStart={() => handleStartMeeting(meeting.callId)}
                onCopyLink={() => handleCopyLink(meeting.callId)}
                onDelete={() => handleDeleteMeeting(meeting.call)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-[#F4F4F4]/80 text-lg mt-32">
          No upcoming meetings found.
        </div>
      )}
    </div>
  );
}