import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#0C2B4E] shadow-lg z-50 border-b border-[#1A3D64]">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-linear-to-br from-[#1D546C] to-[#1A3D64] rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-105">
            <span className="text-[#F4F4F4] font-bold text-xl">L</span>
          </div>
          <span className="text-[#F4F4F4] font-semibold text-xl hidden sm:block">
            Logo
          </span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <Button 
                  className="flex items-center space-x-2 bg-[#1D546C] text-[#F4F4F4] hover:bg-[#1A3D64] transition-all duration-300"
                  size="default"
                >
                  <LayoutDashboard size={20} />
                  <span className="font-medium">Dashboard</span>
                </Button>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}