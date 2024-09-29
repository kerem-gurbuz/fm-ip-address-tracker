'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowIcon } from './arrow-icon';

// TODO: Change this placeholder to the actual validation schema.
const searchInputSchema = z.object({
  input: z
    .string()
    .min(1, { message: 'Please enter a valid IP address or domain' }),
});

export function SearchBar() {
  const form = useForm<z.infer<typeof searchInputSchema>>({
    resolver: zodResolver(searchInputSchema),
    defaultValues: {
      input: '',
    },
  });

  function onSubmit(values: z.infer<typeof searchInputSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative w-full max-w-[555px]"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Search</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Search for any IP address or domain"
                  className={cn(
                    'h-[58px] rounded-[15px] border-none bg-white px-[24px] pb-[19px] pt-[18px] text-[18px] leading-[21px] text-very-dark-gray transition-all duration-500 placeholder:text-very-dark-gray placeholder:opacity-50 focus-visible:ring-2 focus-visible:ring-transparent max-[480px]:placeholder-transparent',
                    {
                      'text-destructive focus-visible:ring-destructive':
                        form.formState.errors.input,
                    },
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Search for any IP address or domain
              </FormDescription>
              <div
                className={cn('h-[24px] transition-all duration-500', {
                  'animate-in fade-in': form.formState.errors.input,
                })}
              >
                <FormMessage className="pl-6 text-left text-xs leading-[24px] md:text-base" />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          aria-label="Search"
          className={cn(
            'absolute right-0 top-0 z-10 h-[58px] w-[58px] rounded-none rounded-r-[15px] bg-black transition-colors duration-500 hover:bg-[#3F3F3F]',
            {
              'bg-destructive hover:bg-destructive':
                form.formState.errors.input,
            },
          )}
        >
          <ArrowIcon className="h-[14px] w-[11px] stroke-white" />
        </Button>
      </form>
    </Form>
  );
}
