'use client';

import * as AccordionPrimitive from '@radix-ui/react-accordion';
// import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { ArrowIcon } from '@/components/header/search-bar/arrow-icon';
import { cn } from '@/lib/utils';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    // className={cn("border-b", className)}
    className={cn(className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        // 'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        'flex flex-1 items-center justify-between py-4 transition-all duration-300 hover:underline [&[data-state=open]>svg]:rotate-[270deg]',
        className,
      )}
      {...props}
    >
      {children}
      {/* <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" /> */}
      <ArrowIcon className="h-[14px] w-[11px] shrink-0 rotate-90 stroke-white transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    // className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden"
    {...props}
  >
    {/* <div className={cn('pb-4 pt-0', className)}>{children}</div> */}
    <div className={cn(className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
