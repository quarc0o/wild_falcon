"use client";

import { useState } from "react";
import Image from "next/image";

const FRONT_PHOTOS = [
  {
    src: "/images/card/her_small.JPG",
    rotate: "-4deg",
    top: "5%",
    left: "3%",
    w: "52%",
    h: "45%",
  },
  {
    src: "/images/card/test.jpg",
    rotate: "4deg",
    top: "5%",
    right: "3%",
    w: "52%",
    h: "45%",
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

              {/* Text – bottom area */}
              <div className="absolute left-0 right-0 bottom-[8%] flex justify-center pointer-events-none">
                <p
                  className="text-blue-400 text-center"
                  style={{
                    transform: "rotate(-2deg)",
                    fontSize: "clamp(2rem, 9vw, 3rem)",
                    fontFamily: "var(--font-dancing)",
                  }}
                >
                  Kjære Vilde
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

              {/* Celebrate sticker – top right */}
              <div
                className="absolute"
                style={{
                  top: "-3%",
                  right: "-3%",
                  width: "45%",
                  transform: "rotate(6deg)",
                  filter:
                    "drop-shadow(0 0 0 white) drop-shadow(0 0 0 white) drop-shadow(2px 0 0 white) drop-shadow(-2px 0 0 white) drop-shadow(0 2px 0 white) drop-shadow(0 -2px 0 white) drop-shadow(1px 1px 0 white) drop-shadow(-1px -1px 0 white) drop-shadow(1px -1px 0 white) drop-shadow(-1px 1px 0 white) drop-shadow(0 3px 6px rgba(0,0,0,0.15))",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/card/celebrate.png"
                  alt=""
                  className="w-full h-auto"
                />
              </div>

              {/* Title – top left, beside celebrate sticker */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "12%",
                  left: "0%",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <h2
                  className="text-gray-800"
                  style={{
                    transform: "rotate(-2deg)",
                    fontSize: "clamp(1.6rem, 8vw, 2.6rem)",
                    lineHeight: 1.2,
                    fontFamily: "var(--font-dancing)",
                  }}
                >
                  Happy valentines
                </h2>
              </div>

              {/* Message – center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-[12%] text-center pointer-events-none">
                <p
                  className="text-gray-600 leading-relaxed"
                  style={{
                    transform: "rotate(-1deg)",
                    fontSize: "clamp(0.75rem, 3.5vw, 1.1rem)",
                    fontFamily: "var(--font-lora)",
                  }}
                >
                  Ønsker min favoritt-kvinne en god valentinsdag!
                  <br />
                  Jeg setter veldig stor pris på deg, og at du holder ut med
                  ragebaitingen min 😎
                  <br />
                  Ser frem til flere gode minner med deg ❤️
                </p>
              </div>

              {/* Signature – bottom right */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "4%",
                  right: "5%",
                  fontSize: "clamp(0.7rem, 3vw, 1rem)",
                  fontFamily: "var(--font-dancing)",
                  transform: "rotate(2deg)",
                }}
              >
                <p className="text-gray-500">— Disco boy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flip button – below the card */}
      <button
        onClick={() => setFlipped(!flipped)}
        className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl active:scale-95 transition-transform shadow-lg"
      >
        {flipped ? "Snu tilbake" : "Snu kortet"}
      </button>
    </div>
  );
}
