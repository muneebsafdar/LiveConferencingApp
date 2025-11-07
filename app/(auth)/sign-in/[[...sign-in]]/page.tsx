"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Video, Users, ShieldCheck } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen bg-[#0C2B4E] text-[#F4F4F4] flex-col md:flex-row">
      {/* LEFT SECTION — About App (hidden on small screens) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex flex-1 flex-col justify-center items-center px-8 py-12 text-center md:text-left md:px-16 bg-gradient-to-br from-[#1A3D64] to-[#1D546C]"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-snug">
          Welcome to <span className="text-[#F87B1B]">Meetly</span>
        </h1>
        <p className="text-[#F4F4F4]/90 text-base md:text-lg max-w-md mb-10">
          Connect, collaborate, and communicate seamlessly with your team using
          our secure and high-quality video calling platform.
        </p>

        <div className="space-y-6 max-w-sm w-full">
          <FeatureItem
            icon={<Video size={22} />}
            title="Crystal-clear calls"
            desc="Experience smooth video & audio powered by Stream SDK."
          />
          <FeatureItem
            icon={<Users size={22} />}
            title="Team collaboration"
            desc="Host large meetings and connect instantly with anyone."
          />
          <FeatureItem
            icon={<ShieldCheck size={22} />}
            title="Secure access"
            desc="Your meetings are protected with enterprise-level security."
          />
        </div>
      </motion.div>

      {/* RIGHT SECTION — Sign In */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex justify-center items-center bg-[#1A3D64] px-4 py-12 md:py-0"
      >
        <div className="w-full max-w-md">
          <SignIn
            appearance={{
              variables: {
                colorPrimary: "#1D546C",
                colorBackground: "#1A3D64",
                colorText: "#F4F4F4",
                colorInputBackground: "#0C2B4E",
                borderRadius: "0.5rem",
              },
              elements: {
                formButtonPrimary:
                  "bg-[#F87B1B] hover:bg-[#e06e17] text-white transition-all duration-300 shadow-md hover:shadow-lg h-10",
                formFieldInput:
                  "bg-[#0C2B4E] border-[#1D546C] text-[#F4F4F4] placeholder:text-[#F4F4F4]/50 focus:border-[#F87B1B] focus:ring-[#F87B1B] h-10",
              },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Small subcomponent for features
function FeatureItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-[#0C2B4E]">{icon}</div>
      <div>
        <h3 className="font-semibold text-[#F4F4F4]">{title}</h3>
        <p className="text-sm text-[#F4F4F4]/80">{desc}</p>
      </div>
    </div>
  );
}
