"use client";

import { useState } from "react";
import CaptchaPuzzle from "@/app/components/steps/CaptchaPuzzle";

export default function Home() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [verified, setVerified] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Valentine card */}
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 text-center">
          <div className="text-6xl">💌</div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Happy Valentine&apos;s Day
            </h1>
            <p className="text-sm text-gray-500 mt-2 leading-relaxed">
              Noen har sendt deg et valentinkort!
              <br />
              Men først må du bevise at du fortjener det...
            </p>
          </div>

          <button
            onClick={() => setShowCaptcha(true)}
            disabled={verified}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl active:scale-95 transition-transform disabled:opacity-50"
          >
            {verified ? "Verifisert ✓" : "Åpne kortet"}
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
