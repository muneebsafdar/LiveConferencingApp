"use client"

import Link from 'next/link';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';
import Sidebar from './SideNav';
import logo from '@/public/logo.svg'

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0C2B4E] shadow-lg z-50 border-b border-[#1A3D64]">
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-[#F4F4F4] hover:bg-[#1A3D64] hover:text-[#F4F4F4]"
            >
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-[#1A3D64] border-r border-[#0C2B4E]">
            <div className="pt-4">
              <Sidebar mobile onNavigate={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <img src={logo.src} alt=""  className='w-36 h-56'/>
        </Link>

        {/* Dashboard Button */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard">
                {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
                }
                <Button 
                  className="flex items-center space-x-1 md:space-x-2 bg-[#1D546C] text-[#F4F4F4] hover:bg-[#1A3D64] transition-all duration-300 text-sm md:text-base px-3 md:px-4"
                  size="default"
                >
                  <LayoutDashboard size={18} className="md:w-5 md:h-5" />
                  <span className="font-medium hidden xs:inline">Dashboard</span>
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}