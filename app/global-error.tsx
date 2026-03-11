"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-[#030712]">
        <div className="flex flex-col items-center justify-center min-h-screen font-sans text-white">
          <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
          <p className="mb-8 text-gray-400">
            An unexpected error has occurred. Please try again.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-lg bg-sky-500 text-white text-base cursor-pointer hover:bg-sky-600 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
