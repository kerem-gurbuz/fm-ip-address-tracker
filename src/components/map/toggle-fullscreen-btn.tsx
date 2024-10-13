import { FullscreenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toggleFullscreenMap } from '@/lib/redux-store/features/ui';
import { useAppDispatch } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';

type ToggleFullscreenBtnProps = {
  className?: React.ComponentProps<'button'>['className'];
};

export function ToggleFullscreenBtn({ className }: ToggleFullscreenBtnProps) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleFullscreenMap());
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Toggle fullscreen"
            onClick={handleClick}
            className={cn(
              'h-[30px] w-[50px] justify-start rounded-none rounded-r-full bg-white p-0 pl-[10px] hover:bg-[#f4f4f4]',
              className,
            )}
          >
            <FullscreenIcon className="h-5 w-5 stroke-black" />
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="font-bold">Toggle fullscreen</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
