"use client";

import { useState } from "react";
import CaptchaPuzzle from "@/app/components/steps/CaptchaPuzzle";

export default function Home() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Login card */}
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Velkommen</h1>
            <p className="text-sm text-gray-500 mt-1">
              Logg inn for å fortsette
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <input
              type="text"
              placeholder="Brukernavn"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="Passord"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowCaptcha(true)}
            disabled={verified}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl active:scale-95 transition-transform disabled:opacity-50"
          >
            {verified ? "Verifisert ✓" : "Logg inn"}
          </button>
        </div>
      </div>

      {/* Captcha modal overlay */}
      {showCaptcha && !verified && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowCaptcha(false);
          }}
        >
          <div className="animate-fade-in">
            <CaptchaPuzzle
              onSolved={() => {
                setTimeout(() => {
                  setShowCaptcha(false);
                  setVerified(true);
                }, 1200);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
