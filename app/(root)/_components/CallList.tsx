'use client';

import { CalendarClock, Users, PlayCircle, Video, Trash2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface MeetingCardProps {
  type: 'upcoming' | 'previous' | 'recording';
  title: string;
  description: string;
  participants?: string[];
  time?: string;
  recordingUrl?: string;
  onJoin?: () => void;
  onStart?: () => void;
  onCopyLink?: () => void;
  onReplay?: () => void;
  onDelete?: () => void;
}

export const CallList = ({
  type,
  title,
  description,
  participants = [],
  time,
  recordingUrl,
  onJoin,
  onStart,
  onCopyLink,
  onReplay,
  onDelete,
}: MeetingCardProps) => {
  const isUpcoming = type === 'upcoming';
  const isPrevious = type === 'previous';
  const isRecording = type === 'recording';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative flex flex-col justify-between bg-[#0C2B4E] border border-[#1D546C] rounded-xl p-5 w-full max-w-[350px] min-h-[230px] text-[#F4F4F4] shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {/* 🗑️ Delete Button */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 p-1.5 rounded-md bg-[#1A3D64] hover:bg-red-600 transition-all duration-300"
          title="Delete"
        >
          <Trash2 size={16} className="text-[#F4F4F4]" />
        </button>
      )}

      {/* Header */}
      <div className="flex-1 space-y-1">
        <h2 className="text-lg font-semibold text-[#F4F4F4] line-clamp-1">
          {title}
        </h2>
        <p className="text-sm text-[#F4F4F4]/80 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Meta Info */}
      <div className="mt-3 space-y-2 text-sm">
        {participants.length > 0 && (
          <div className="flex items-center gap-2 text-[#F4F4F4]/80">
            <Users size={14} />
            <span>
              {participants.length} {participants.length === 1 ? 'participant' : 'participants'}
            </span>
          </div>
        )}

        {time && (
          <div className="flex items-center gap-2 text-[#F4F4F4]/70">
            <CalendarClock size={14} />
            <span>{time}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-2 justify-end">
        {isUpcoming && (
          <>
            <Button
              onClick={onStart}
              className="flex items-center gap-2 bg-[#1D546C] hover:bg-[#1A3D64] text-[#F4F4F4] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
            >
              <Video size={16} />
              Start
            </Button>
            <Button
              onClick={onCopyLink}
              className="flex items-center gap-2 bg-[#1A3D64] hover:bg-[#1D546C] text-[#F4F4F4] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
            >
              <Share2 size={16} />
              Copy Link
            </Button>
          </>
        )}

        {isPrevious && (
          <Button
            disabled
            className="flex items-center gap-2 bg-[#1D546C]/40 text-[#F4F4F4]/60 px-4 py-2 rounded-lg text-sm"
          >
            <Video size={16} />
            Ended
          </Button>
        )}

        {isRecording && (
          <Button
            onClick={onReplay}
            className="flex items-center gap-2 bg-[#1D546C] hover:bg-[#1A3D64] text-[#F4F4F4] px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow hover:shadow-lg"
          >
            <PlayCircle size={16} />
            Watch
          </Button>
        )}
      </div>
    </motion.div>
  );
};