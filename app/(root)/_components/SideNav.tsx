import Link from 'next/link';
import { Home, Users, Settings, FileText, BarChart3, Calendar, Mail, Bell } from 'lucide-react';
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

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Calendar, label: 'Calendar', href: '/calendar' },
  { icon: Mail, label: 'Messages', href: '/messages' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#1A3D64] shadow-xl border-r border-[#0C2B4E]">
      <ScrollArea className="h-[calc(100%-5rem)]">
        <nav className="p-4 space-y-2">
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[#F4F4F4] hover:bg-[#1D546C] hover:text-[#F4F4F4] transition-all duration-300 h-12"
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
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0C2B4E]">
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