'use client';

import { MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { MenuOptions } from './menu-options';
import { SearchHistory } from './search-history';

type SidebarProps = {
  className?: React.ComponentProps<'div'>['className'];
};

export function Sidebar({ className }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Toggle menu"
          variant="ghost"
          size="icon"
          className="fixed left-[21px] top-[23px] z-[1200] text-white transition-colors duration-300 hover:text-black md:top-[30px]"
        >
          <MenuIcon className="h-[30px] w-[30px]" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={cn('z-[1200] bg-black text-left text-white', className)}
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl font-bold text-white">
            IP Address Tracker
          </SheetTitle>
          <SheetDescription className="text-gray-400">
            Track and analyze IP addresses and domains
          </SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <MenuOptions />
          <SearchHistory />
        </div>
      </SheetContent>
    </Sheet>
  );
}
