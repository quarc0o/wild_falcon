"use client";

import { useState } from "react";
import Image from "next/image";

// Grid tile config: path + whether it's a correct answer
const TILES: { src: string; correct: boolean }[] = [
  { src: "/images/captcha/random-1.jpg", correct: false },
  { src: "/images/captcha/him-1.jpg", correct: true },
  { src: "/images/captcha/random-2.jpg", correct: false },
  { src: "/images/captcha/him-2.jpg", correct: true },
  { src: "/images/captcha/random-3.jpg", correct: false },
  { src: "/images/captcha/him-3.jpg", correct: true },
  { src: "/images/captcha/random-4.jpg", correct: false },
  { src: "/images/captcha/him-4.jpg", correct: true },
  { src: "/images/captcha/random-5.jpg", correct: false },
];

const CORRECT_INDICES = new Set(
  TILES.map((t, i) => (t.correct ? i : -1)).filter((i) => i !== -1),
);

export default function CaptchaPuzzle({ onSolved }: { onSolved?: () => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [error, setError] = useState(false);
  const [solved, setSolved] = useState(false);

  const toggleCell = (index: number) => {
    if (solved) return;
    setError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleVerify = () => {
    const isCorrect =
      selected.size === CORRECT_INDICES.size &&
      [...selected].every((i) => CORRECT_INDICES.has(i));

    if (isCorrect) {
      setSolved(true);
      onSolved?.();
    } else {
      setError(true);
      setSelected(new Set());
    }
  };

  return (
    <div className="w-full max-w-75 bg-white shadow-2xl overflow-hidden border border-gray-300">
      {/* Header — Google reCAPTCHA style */}
      <div className="bg-[#4285f4] px-4 py-3">
        <p className="text-white text-[13px] leading-tight">
          Velg alle rutene med
        </p>
        <p className="text-white text-xl font-bold leading-tight mt-0.5">
          din valentine
        </p>
        <p className="text-white/80 text-[11px] mt-1">
          Om det ikke er noen, klikk hopp over
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-0.5 bg-[#dfe1e5] p-0.5">
        {TILES.map((tile, i) => (
          <button
            key={i}
            onClick={() => toggleCell(i)}
            className="relative aspect-square overflow-hidden focus:outline-none bg-gray-200"
          >
            <Image
              src={tile.src}
              alt=""
              fill
              className="object-cover"
              sizes="100px"
            />

            {/* Selection overlay */}
            {selected.has(i) && !solved && (
              <div className="absolute inset-0 border-[3px] border-[#4285f4] bg-[#4285f4]/20">
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#4285f4] rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Solved overlay for correct tiles */}
            {solved && CORRECT_INDICES.has(i) && (
              <div className="absolute inset-0 border-[3px] border-green-500 bg-green-500/20">
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-xs text-center py-1.5 bg-red-50">
          Hmm, prøv igjen...
        </p>
      )}

      {/* Solved message */}
      {solved && (
        <p className="text-green-600 text-xs text-center py-1.5 bg-green-50 font-semibold">
          Du kjenner din valentine! ✓
        </p>
      )}

      {/* Footer toolbar — reCAPTCHA style */}
      <div className="flex items-center justify-between px-3 py-2.5 bg-[#f9f9f9] border-t border-gray-300">
        {/* Left icons */}
        <div className="flex items-center gap-3">
          {/* Refresh */}
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={() => {
              if (!solved) {
                setSelected(new Set());
                setError(false);
              }
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          {/* Headphones */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
          {/* Info */}
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        {/* Verify / Skip button */}
        <button
          onClick={handleVerify}
          disabled={solved}
          className="px-5 py-1.5 bg-[#4285f4] text-white text-sm font-medium rounded-sm hover:bg-[#3367d6] disabled:opacity-50 transition-colors uppercase tracking-wide"
        >
          {solved
            ? "Verifisert"
            : selected.size === 0
              ? "Hopp over"
              : "Bekreft"}
        </button>
      </div>
    </div>
  );
}
