import {
  BarChartIcon,
  LogOutIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react';

type MenuOption = {
  icon: React.ReactNode;
  label: string;
  href: string;
};

export const MENU_OPTIONS: MenuOption[] = [
  {
    icon: <UserIcon className="h-4 w-4" />,
    label: 'Profile',
    href: '#',
  },
  {
    icon: <MessageSquareIcon className="h-4 w-4" />,
    label: 'Messages',
    href: '#',
  },
  {
    icon: <BarChartIcon className="h-4 w-4" />,
    label: 'Analytics',
    href: '#',
  },
  {
    icon: <SettingsIcon className="h-4 w-4" />,
    label: 'Settings',
    href: '#',
  },
  {
    icon: <LogOutIcon className="h-4 w-4" />,
    label: 'Logout',
    href: '#',
  },
];
