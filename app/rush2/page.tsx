"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { getS3Url } from "@/lib/utils";
import rushInfo from "./rushInfo.json";

export default function Rush2() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to format date from datetime string
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  useLayoutEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          // Use window viewport center instead of container center
          const viewportCenter = window.innerHeight / 2;

          // Find which image is closest to the center
          const images =
            containerRef.current.querySelectorAll(".timeline-image");
          let closestIndex = 0;
          let minDistance = Infinity;

          images.forEach((image, index) => {
            const rect = image.getBoundingClientRect();
            const imageCenter = rect.top + rect.height / 2;
            const distance = Math.abs(imageCenter - viewportCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });

          setSelectedIndex(closestIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Listen to window scroll instead of container scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Generate tick marks for both sides
  const generateTickMarks = (side: "left" | "right") => {
    const ticks = [];
    const totalEvents = rushInfo.length;

    // Add ticks for each event
    for (let i = 0; i < totalEvents; i++) {
      const distance = i - selectedIndex;
      const opacity = Math.max(0.2, 1 - Math.abs(distance) * 0.3);
      const isSelected = i === selectedIndex;

      // Calculate position similar to titles/dates
      const position = (() => {
        if (distance === 0) return 0; // selected tick
        if (Math.abs(distance) === 1) return distance * 100; // adjacent to selected
        // For non-selected ticks, accumulate spacing
        const sign = distance > 0 ? 1 : -1;
        const absDistance = Math.abs(distance);
        let totalSpacing = 0;

        // Add spacing for each step
        for (let j = 1; j <= absDistance; j++) {
          if (j === 1) {
            totalSpacing += 100; // gap to selected tick
          } else {
            totalSpacing += 60; // gap between non-selected ticks
          }
        }

        return sign * totalSpacing;
      })();

      // Add the main tick for this event
      ticks.push(
        <div
          key={`tick-${i}`}
          className={`absolute transition-all duration-300 ease-in-out ${
            side === "left" ? "left-0" : "right-0"
          }`}
          style={{
            opacity,
            top: `calc(50% + ${position}px)`,
            transform: "translateY(-50%)",
          }}
        >
          <div
            className={`bg-white transition-all duration-300 ease-in-out ${
              isSelected ? "w-3 h-0.25" : "w-2 h-0.25"
            }`}
          />
        </div>
      );

      // Add intermediate ticks between events (except after the last event)
      if (i < totalEvents - 1) {
        const nextDistance = i + 1 - selectedIndex;
        const nextPosition = (() => {
          if (nextDistance === 0) return 0;
          if (Math.abs(nextDistance) === 1) return nextDistance * 100;
          const sign = nextDistance > 0 ? 1 : -1;
          const absDistance = Math.abs(nextDistance);
          let totalSpacing = 0;
          for (let j = 1; j <= absDistance; j++) {
            if (j === 1) {
              totalSpacing += 100;
            } else {
              totalSpacing += 60;
            }
          }
          return sign * totalSpacing;
        })();

        // Calculate positions for 3 intermediate ticks
        const totalGap = nextPosition - position;
        const quarterGap = totalGap / 4;

        for (let k = 1; k <= 3; k++) {
          const intermediatePosition = position + quarterGap * k;
          const intermediateOpacity = Math.max(
            0.1,
            Math.min(opacity, Math.max(0.2, 1 - Math.abs(nextDistance) * 0.3)) *
              0.6
          );

          ticks.push(
            <div
              key={`intermediate-${i}-${k}`}
              className={`absolute transition-all duration-300 ease-in-out ${
                side === "left" ? "left-0" : "right-0"
              }`}
              style={{
                opacity: intermediateOpacity,
                top: `calc(50% + ${intermediatePosition}px)`,
                transform: "translateY(-50%)",
              }}
            >
              <div className="bg-white w-1 h-0.25" />
            </div>
          );
        }
      }
    }

    return ticks;
  };

  return (
    <div className="w-full min-h-screen bg-black relative" ref={containerRef}>
      {/* Red line across the middle of the screen */}
      <div className="fixed top-1/2 left-0 w-full h-0.5 bg-red-500/40 z-10 transform -translate-y-1/2"></div>

      {/* Left side tick marks */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-15">
        <div className="relative h-screen">{generateTickMarks("left")}</div>
      </div>

      {/* Right side tick marks */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-15">
        <div className="relative h-screen">{generateTickMarks("right")}</div>
      </div>

      {/* Text titles on the left side */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="relative h-screen">
          {rushInfo.map((event, index) => {
            const distance = index - selectedIndex;
            const opacity = Math.max(0.2, 1 - Math.abs(distance) * 0.3);
            const isSelected = index === selectedIndex;

            return (
              <div
                key={index}
                className={`absolute left-0 transition-all duration-300 ease-in-out whitespace-nowrap ${
                  isSelected
                    ? "text-yellow-400 text-6xl font-black tracking-tight leading-none"
                    : "text-white text-sm leading-none"
                }`}
                style={{
                  opacity,
                  top: `calc(50% + ${(() => {
                    if (distance === 0) return 0; // selected title
                    if (Math.abs(distance) === 1) return distance * 100; // adjacent to selected
                    // For non-selected titles, accumulate spacing
                    const sign = distance > 0 ? 1 : -1;
                    const absDistance = Math.abs(distance);
                    let totalSpacing = 0;

                    // Add spacing for each step
                    for (let i = 1; i <= absDistance; i++) {
                      if (i === 1) {
                        totalSpacing += 100; // gap to selected title
                      } else {
                        totalSpacing += 60; // gap between non-selected titles
                      }
                    }

                    return sign * totalSpacing;
                  })()}px)`,
                  transform: "translateY(-50%)",
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  fontWeight: isSelected ? 900 : 100,
                }}
              >
                {event.name}
              </div>
            );
          })}
        </div>
      </div>

      {/* Dates on the right side */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="relative h-screen">
          {rushInfo.map((event, index) => {
            const distance = index - selectedIndex;
            const opacity = Math.max(0.2, 1 - Math.abs(distance) * 0.3);
            const isSelected = index === selectedIndex;

            return (
              <div
                key={index}
                className={`absolute right-0 transition-all duration-300 ease-in-out whitespace-nowrap ${
                  isSelected
                    ? "text-yellow-400 text-6xl font-black tracking-tight leading-none"
                    : "text-white text-sm leading-none"
                }`}
                style={{
                  opacity,
                  top: `calc(50% + ${(() => {
                    if (distance === 0) return 0; // selected date
                    if (Math.abs(distance) === 1) return distance * 100; // adjacent to selected
                    // For non-selected dates, accumulate spacing
                    const sign = distance > 0 ? 1 : -1;
                    const absDistance = Math.abs(distance);
                    let totalSpacing = 0;

                    // Add spacing for each step
                    for (let i = 1; i <= absDistance; i++) {
                      if (i === 1) {
                        totalSpacing += 100; // gap to selected date
                      } else {
                        totalSpacing += 60; // gap between non-selected dates
                      }
                    }

                    return sign * totalSpacing;
                  })()}px)`,
                  transform: "translateY(-50%)",
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  fontWeight: isSelected ? 900 : 100,
                }}
              >
                {formatDate(event.datetime)}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center py-20 space-y-8">
        {rushInfo.map((event, index) => (
          <div
            key={index}
            className={`timeline-image transition-all duration-300 ease-in-out ${
              index === selectedIndex
                ? "scale-110 opacity-100"
                : "scale-90 opacity-70"
            }`}
          >
            <Image
              src={getS3Url(event.image)}
              alt={event.name}
              width={500}
              height={500}
              className="w-[500px] h-[500px] object-cover rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
