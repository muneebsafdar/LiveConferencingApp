"use client"

import Link from 'next/link';
import { Home, CalendarClock, CalendarMinus, Video, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: Home, label: 'Home', href: '/home' },
  { icon: CalendarClock, label: 'Upcoming', href: '/home/upcoming' },
  { icon: CalendarMinus, label: 'Previous', href: '/home/previous' },
  { icon: Video, label: 'Recordings', href: '/home/recordings' },
  { icon: User, label: 'Personal Room', href: '/home/personal-room' },
];

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({ mobile = false, onNavigate }: SidebarProps) {


  const path=usePathname()


  return (
    <aside className={`${mobile ? 'relative h-full' : 'hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)]'} w-64 bg-[#1A3D64] shadow-xl border-r border-[#0C2B4E]`}>
      <ScrollArea className="h-[calc(100%-5rem)]">
        <nav className="p-4 space-y-2">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href} onClick={onNavigate}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-[#F4F4F4] hover:bg-[#1D546C] hover:text-[#F4F4F4] transition-all duration-300 h-12 ${path==item.href ? "bg-[#1D546C]" :""}`}
                    >
                      <item.icon size={22} className="mr-3 shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <Separator className="bg-[#0C2B4E]" />

      {/* User Profile Section */}
      <div className={`${mobile ? 'relative' : 'absolute bottom-0 left-0 right-0'} p-4`}>
        <div className="flex items-center space-x-3 px-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-linear-to-br from-[#1D546C] to-[#1A3D64] text-[#F4F4F4]">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-[#F4F4F4] font-medium text-sm truncate">John Doe</p>
            <p className="text-[#F4F4F4] text-xs opacity-70 truncate">john@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}