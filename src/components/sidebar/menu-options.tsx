import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { MENU_OPTIONS } from '@/lib/constants/sidebar-menu-options';

export function MenuOptions() {
  return (
    <nav role="navigation" className="mb-6">
      <ul className="space-y-2">
        {MENU_OPTIONS.map((option) => (
          <li key={option.label}>
            <Button
              variant="ghost"
              className="w-full justify-between text-white hover:bg-gray-800 hover:text-white"
              asChild
            >
              <Link href={option.href}>
                <span className="inline-flex items-center gap-2">
                  {option.icon}
                  {option.label}
                </span>
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
