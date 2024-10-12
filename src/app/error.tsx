'use client';

import { AlertCircleIcon, RefreshCcwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';

import { Button } from '@/components/ui/button';
import { resetGeolocationState } from '@/lib/redux-store/features/geolocation';
import { resetSearchState } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';

// TODO: Log the error to an error reporting service

/*
  NOTES:

  Error boundary reset doesn't seem to work
  https://github.com/vercel/next.js/issues/63369
  ------------------------------------------------------------------------
  "You need to call the startTransition() function to re-render both client-side and server-side components in a synchronized manner."

  startTransition
  https://react.dev/reference/react/startTransition
  ------------------------------------------------------------------------
  The startTransition function lets you mark a state update as a Transition.

  # Parameters 

    - scope: A function that updates some state by calling one or more set functions. React immediately calls scope with no arguments and marks all state updates scheduled synchronously during the scope function call as Transitions. They will be non-blocking and will not display unwanted loading indicators.

  # Returns 

    startTransition does not return anything.

  # Caveats 

    ...
    - You can wrap an update into a Transition only if you have access to the set function of that state. If you want to start a Transition in response to some prop or a custom Hook return value, try useDeferredValue instead.

    - THE FUNCTION YOU PASS TO START_TRANSITION MUST BE SYNCHRONOUS. React immediately executes this function, marking all state updates that happen while it executes as Transitions. If you try to perform more state updates later (for example, in a timeout), they won’t be marked as Transitions.

    - A state update marked as a Transition will be interrupted by other state updates. For example, if you update a chart component inside a Transition, but then start typing into an input while the chart is in the middle of a re-render, React will restart the rendering work on the chart component after handling the input state update.
    ...
 */

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
    startTransition(() => {
      // Dispatch the the Redux state updates
      dispatch(resetGeolocationState());
      dispatch(resetSearchState());

      // Attempt to recover by trying to re-render the segment
      router.refresh();
      reset();
    });
  };

  return (
    <div
      id="error"
      className="relative z-[9000] flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-8 text-gray-100"
    >
      <div className="w-full max-w-md">
        <div className="space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Oops!
            </h2>
            <p className="text-xl text-gray-400">Something Went Wrong</p>
          </div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-gray-700">
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
