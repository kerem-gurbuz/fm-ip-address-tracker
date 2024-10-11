'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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
import { searchTermSchema } from '@/lib/definitions/search';
import { setCurrentSearchTerm } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';
import { ArrowIcon } from './arrow-icon';

/*
  NOTE
  ------------------------------------------------------------------------
  InfoDisplay.tsx
  Uses: useGeolocationQueryBySearchTerm (reads searchTerm from Redux store)
 */

const formSchema = z.object({
  input: searchTermSchema,
});

type SearchBarProps = {
  className?: React.ComponentProps<'form'>['className'];
};

export function SearchBar({ className }: SearchBarProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  const {
    control,
    reset,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isDirty,
    },
  } = form;

  const dispatch = useAppDispatch();

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      setCurrentSearchTerm({
        searchTerm: values.input,
      }),
    );
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('relative w-full max-w-[555px]', className)}
      >
        <FormField
          name="input"
          control={control}
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
                      'text-form-error-state focus-visible:ring-form-error-state':
                        errors.input,
                      'text-form-success-state focus-visible:ring-form-success-state':
                        isSubmitted && isDirty && !errors.input,
                    },
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Search for any IP address or domain
              </FormDescription>
              <FormMessage className="sr-only" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          aria-label="Search"
          disabled={isSubmitting}
          className={cn(
            'absolute right-0 top-0 z-10 h-[58px] w-[58px] rounded-none rounded-r-[13px] bg-black transition-colors duration-500 hover:bg-[#3F3F3F]',
            {
              'bg-form-error-state hover:bg-form-error-state': errors.input,
              'bg-form-success-state hover:bg-form-success-state':
                isSubmitted && isDirty && !errors.input,
            },
          )}
        >
          <ArrowIcon className="h-[14px] w-[11px] stroke-white" />
        </Button>
      </form>
    </Form>
  );
}
