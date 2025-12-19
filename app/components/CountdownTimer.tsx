"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const rushEndDate = new Date("2026-01-23T21:30:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = rushEndDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <p className="text-lg md:text-3xl text-white font-medium mb-2">
        Rush Ends in...
      </p>
      <div className="flex gap-2 md:gap-6 justify-center items-center mb-4">
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold text-white">
            {timeLeft.days.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base text-white/90 uppercase tracking-wide">
            Days
          </span>
        </div>
        <span className="text-lg md:text-3xl font-bold text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold text-white">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base text-white/90 uppercase tracking-wide">
            Hours
          </span>
        </div>
        <span className="text-lg md:text-3xl font-bold text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold text-white">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base text-white/90 uppercase tracking-wide">
            Minutes
          </span>
        </div>
        <span className="text-lg md:text-3xl font-bold text-white">:</span>
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-4xl font-bold text-white">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-xs md:text-base text-white/90 uppercase tracking-wide">
            Seconds
          </span>
        </div>
      </div>
      <Link
        href="/rush"
        className="inline-flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300 group"
      >
        <span className="text-lg md:text-xl font-medium">
          See Our Schedule!
        </span>
        <svg
          className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L17.586 13H5a1 1 0 010-2h12.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </div>
  );
}
