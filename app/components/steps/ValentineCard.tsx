"use client";

import { useState } from "react";
import Image from "next/image";

const FRONT_PHOTOS = [
  {
    src: "/images/card/her_small.JPG",
    rotate: "-4deg",
    top: "-3%",
    left: "-2%",
    w: "38%",
    h: "32%",
  },
  {
    src: "/images/card/test.jpg",
    rotate: "5deg",
    top: "-2%",
    right: "-3%",
    w: "36%",
    h: "34%",
  },
];

const BACK_PHOTOS: PhotoConfig[] = [
  {
    src: "/images/card/Screenshot 2026-02-13 at 19.33.05-Photoroom.png",
    rotate: "4deg",
    top: "-10%",
    left: "-3%",
    w: "45%",
    sticker: true,
  },
  {
    src: "/images/card/IMG_3583-Photoroom.png",
    rotate: "0deg",
    bottom: "-4%",
    left: "0%",
    w: "44%",
    sticker: true,
  },
];

interface PhotoConfig {
  src: string;
  rotate: string;
  w: string;
  h?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  sticker?: boolean;
}

function ScatteredPhoto({ photo }: { photo: PhotoConfig }) {
  if (photo.sticker) {
    return (
      <div
        className="absolute"
        style={{
          transform: `rotate(${photo.rotate})`,
          top: photo.top,
          left: photo.left,
          right: photo.right,
          bottom: photo.bottom,
          width: photo.w,
          filter:
            "drop-shadow(0 0 0 white) drop-shadow(0 0 0 white) drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(0 3px 6px rgba(0,0,0,0.15))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt="" className="w-full h-auto" />
      </div>
    );
  }

  return (
    <div
      className="absolute bg-white shadow-md"
      style={{
        transform: `rotate(${photo.rotate})`,
        top: photo.top,
        left: photo.left,
        right: photo.right,
        bottom: photo.bottom,
        width: photo.w,
        height: photo.h,
        padding: "3%",
      }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={photo.src}
          alt=""
          fill
          className="object-cover"
          sizes="40vw"
        />
      </div>
    </div>
  );
}

const cardFaceStyles: React.CSSProperties = {
  backfaceVisibility: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
  aspectRatio: "3 / 4",
};

export default function ValentineCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Card with perspective */}
      <div className="w-full" style={{ perspective: "1200px" }}>
        <div
          className="relative w-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front side */}
          <div
            className="w-full rounded-xl bg-pink-50 border border-pink-200 overflow-hidden"
            style={cardFaceStyles}
          >
            <div className="relative w-full h-full overflow-hidden">
              {FRONT_PHOTOS.map((photo, i) => (
                <ScatteredPhoto key={i} photo={photo} />
              ))}

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p
                  className="text-pink-400 font-bold text-center"
                  style={{
                    transform: "rotate(-2deg)",
                    fontSize: "clamp(1rem, 5vw, 1.5rem)",
                  }}
                >
                  Til deg ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Back side */}
          <div
            className="w-full rounded-xl bg-pink-50 border border-pink-200 overflow-hidden absolute inset-0"
            style={{ ...cardFaceStyles, transform: "rotateY(180deg)" }}
          >
            <div className="relative w-full h-full overflow-hidden">
              {BACK_PHOTOS.map((photo, i) => (
                <ScatteredPhoto key={i} photo={photo} />
              ))}

              {/* Message in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] text-center pointer-events-none">
                <h2
                  className="font-bold text-gray-800"
                  style={{
                    transform: "rotate(1deg)",
                    fontSize: "clamp(1rem, 5vw, 1.5rem)",
                  }}
                >
                  Happy valentines 😘
                </h2>
                <p
                  className="text-gray-600 leading-relaxed mt-[3%]"
                  style={{
                    transform: "rotate(-1deg)",
                    fontSize: "clamp(0.7rem, 3.2vw, 1rem)",
                  }}
                >
                  Roses are red, violets are blue,
                  <br />
                  dette kortet er laget, bare for deg du.
                </p>
                <p
                  className="text-gray-400 italic mt-[4%]"
                  style={{ fontSize: "clamp(0.6rem, 2.5vw, 0.8rem)" }}
                >
                  — Disco boy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip button – below the card */}
      <button
        onClick={() => setFlipped(!flipped)}
        className="px-8 py-3 bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl active:scale-95 transition-transform shadow-lg"
      >
        {flipped ? "Snu tilbake" : "Snu kortet"}
      </button>
    </div>
  );
}
