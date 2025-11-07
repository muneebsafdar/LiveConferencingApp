"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import logo from "@/public/logo.svg"
import { Video, Users, Shield, Zap, Monitor, Clock } from "lucide-react";
import { useRouter } from "next/navigation";


const Index = () => {

  const router=useRouter()
  const onsignin=()=>{
    router.push('/home')
  }
  const onsignUp=()=>{
    router.push('/home')
  }
  return (
    <div className="min-h-screen bg-[#0C2B4E] text-[#F4F4F4]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#1A3D64]/80 backdrop-blur-md border-b border-[#1D546C] z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <img src={logo.src} className="w-44" alt="" />
            
          </div>


          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onsignin} className="hidden sm:inline-flex text-[#F4F4F4] hover:text-[#F87B1B]">
              Sign In
            </Button>
            <Button onClick={onsignUp} className="bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4]">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-linear-to-br from-[#1A3D64] to-[#0C2B4E] relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Connect Your Team{" "}
                <span className="text-[#F87B1B]">Anywhere</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-[#F4F4F4]/90">
                Experience crystal-clear video conferencing with Meetly. Host
                unlimited meetings, share screens, and collaborate seamlessly
                with your team.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button onClick={onsignUp}
                  size="lg"
                  className="bg-[#1D546C] hover:bg-[#0C2B4E] text-[#F4F4F4] shadow-lg"
                >
                  <Video className="mr-2 h-5 w-5" />
                  Start Meeting
                </Button>
              </div>

              <div className="mt-8 flex items-center gap-6 text-[#F4F4F4]/80">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">End-to-End Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Unlimited Participants</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#1D546C]/50">
                <img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Video conferencing"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-[#0C2B4E]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F4F4F4]">
              Everything You Need
            </h2>
            <p className="text-xl text-[#F4F4F4]/70 max-w-2xl mx-auto">
              Powerful features designed to make your meetings more productive
              and engaging
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Video className="h-8 w-8 text-[#F87B1B]" />,
                title: "HD Video Quality",
                description: "Crystal-clear video up to 1080p for professional meetings",
              },
              {
                icon: <Monitor className="h-8 w-8 text-[#F87B1B]" />,
                title: "Screen Sharing",
                description: "Share your screen with one click for seamless presentations",
              },
              {
                icon: <Users className="h-8 w-8 text-[#F87B1B]" />,
                title: "Unlimited Participants",
                description: "Host meetings with as many people as you need",
              },
              {
                icon: <Shield className="h-8 w-8 text-[#F87B1B]" />,
                title: "Secure & Private",
                description: "End-to-end encryption keeps your conversations safe",
              },
              {
                icon: <Zap className="h-8 w-8 text-[#F87B1B]" />,
                title: "Lightning Fast",
                description: "Join meetings instantly with no downloads required",
              },
              {
                icon: <Clock className="h-8 w-8 text-[#F87B1B]" />,
                title: "Meeting Recording",
                description: "Record and share your meetings for future reference",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="p-6 bg-[#1A3D64] border border-[#1D546C] hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="mb-4 w-12 h-12 bg-[#1D546C]/30 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#F4F4F4]">
                  {feature.title}
                </h3>
                <p className="text-[#F4F4F4]/70">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#1A3D64] border-t border-[#1D546C]">
        <div className="container mx-auto text-center">
          <p className="text-sm text-[#F4F4F4]/70">
            © 2025 Meetly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
