'use client';

import { AlertCircleIcon, RefreshCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import { Button } from '@/components/ui/button';
import { resetGeolocationState } from '@/lib/redux-store/features/geolocation';
import { resetSearchState } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';

// TODO: Log the error to an error reporting service

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetGeolocationState());
    dispatch(resetSearchState());

    // Attempt to recover by trying to re-render the segment
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="relative z-[9999] flex min-h-[calc(100vh-300px)] items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 text-gray-100 md:min-h-[calc(100vh-280px)]">
      <div className="w-full max-w-md">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Oops!
            </h2>
            <p className="text-xl text-gray-400">Something Went Wrong</p>
          </div>
          <div className="mx-auto hidden h-20 w-20 items-center justify-center rounded-full border-2 border-gray-700 md:flex">
            <AlertCircleIcon className="h-10 w-10 animate-pulse text-destructive" />
          </div>
          <p className="mx-auto max-w-sm text-sm text-gray-500">
            We encountered an unexpected error while processing your request.
            Our team has been notified and is working on a solution.{' '}
            {error.digest ? `(${error.digest})` : null}
          </p>
          <div className="space-y-4">
            <Button
              aria-label="Reset"
              onClick={handleReset}
              className="mx-auto flex items-center justify-center gap-2 rounded-md border border-gray-700 bg-gray-800 px-6 py-2 text-gray-100 transition-colors duration-300 hover:bg-gray-700"
            >
              <RefreshCcwIcon className="h-4 w-4" />
              Reset
            </Button>
            <p className="text-xs text-gray-600">
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
