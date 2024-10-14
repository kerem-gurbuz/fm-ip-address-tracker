import {
  BarChartIcon,
  LogOutIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

type MenuOption = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const MENU_OPTIONS: MenuOption[] = [
  {
    label: 'Profile',
    icon: <UserIcon className="h-4 w-4" />,
    href: '#',
  },
  {
    label: 'Messages',
    icon: <MessageSquareIcon className="h-4 w-4" />,
    href: '#',
  },
  {
    label: 'Analytics',
    icon: <BarChartIcon className="h-4 w-4" />,
    href: '#',
  },
  {
    label: 'Settings',
    icon: <SettingsIcon className="h-4 w-4" />,
    href: '#',
  },
  {
    label: 'Logout',
    icon: <LogOutIcon className="h-4 w-4" />,
    href: '#',
  },
];
