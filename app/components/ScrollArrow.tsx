"use client";

import { useState } from "react";
import Image from "next/image";

export default function ScrollArrow() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);

    // Scroll to the next section
    const nextSection = document.querySelector("section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }

    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={handleClick}
        className={`transition-transform duration-300 ease-in-out hover:scale-110 animate-bounce ${
          isAnimating ? "translate-y-2" : ""
        }`}
        aria-label="Scroll down"
        style={{
          animation: "bounce 2s infinite",
        }}
      >
        <Image
          src="/arrow_down.png"
          alt="Scroll down"
          width={60}
          height={60}
          className="drop-shadow-lg brightness-0 invert"
        />
      </button>
      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
