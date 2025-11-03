import React from 'react';

interface InfoCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  mainText: string;
  secondaryText: string;
  bgClassName?: string;
}

export default function HomeCard({ 
  icon: Icon, 
  mainText, 
  secondaryText,
  bgClassName = 'bg-[#1A3D64]'
}: InfoCardProps) {
  return (
    <div 
      className={`${bgClassName} rounded-xl p-6 border border-[#0C2B4E] hover:border-[#1D546C] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group`}
    >
      {/* Icon at top */}
      <div className="mb-6">
        <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#1D546C] to-[#0C2B4E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="text-[#F4F4F4]" size={24} />
        </div>
      </div>

      {/* Main Text */}
      <h3 className="text-[#F4F4F4] text-xl font-bold mb-2">
        {mainText}
      </h3>

      {/* Secondary Text */}
      <p className="text-[#F4F4F4]/70 text-sm leading-relaxed">
        {secondaryText}
      </p>
    </div>
  );
}