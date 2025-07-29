"use client";

import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { getImgUrl } from "@/lib/utils";
import rushInfo from "./rushInfo.json";

export default function Rush() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to format date from datetime string
  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  // Function to format time from datetime string
  const formatTime = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
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

          // Check if we've scrolled to the first event
          if (images.length > 0) {
            const firstImage = images[0];
            const rect = firstImage.getBoundingClientRect();
            const firstImageTop = rect.top;
            const firstImageBottom = rect.bottom;

            // Show text only when the first image is fully visible on screen
            if (firstImageTop >= 0 && firstImageBottom <= window.innerHeight) {
              setShowText(true);
            } else if (firstImageTop > window.innerHeight) {
              // Hide text when scrolling back up above the timeline section
              setShowText(false);
            }
            // Don't hide when scrolling past the first element (removed that logic)
          }

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
          className={`absolute transition-all duration-700 ease-in-out ${
            side === "left" ? "left-0" : "right-0"
          }`}
          style={{
            opacity: showText ? opacity : 0,
            top: `calc(50% + ${position}px)`,
            transform: `translateY(-50%) translateX(${
              showText ? "0" : side === "left" ? "-50px" : "50px"
            })`,
          }}
        >
          <div
            className={`bg-white transition-all duration-700 ease-in-out ${
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
              className={`absolute transition-all duration-700 ease-in-out ${
                side === "left" ? "left-0" : "right-0"
              }`}
              style={{
                opacity: showText ? intermediateOpacity : 0,
                top: `calc(50% + ${intermediatePosition}px)`,
                transform: `translateY(-50%) translateX(${
                  showText ? "0" : side === "left" ? "-50px" : "50px"
                })`,
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
    <div className="w-full bg-black">
      {/* Video Section */}
      <div className="w-full h-screen bg-black relative">
        <div className="w-full flex justify-center pt-5">
          <video
            src={getImgUrl("videos/rushVideo1.mp4")}
            className="w-1/4 h-3/4 object-cover rounded-2xl shadow-2xl"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
          <div className="text-2xl font-bold mb-4">See Our Rush Schedule</div>
          <div
            className="animate-bounce cursor-pointer"
            onClick={() => {
              const firstEvent = document.querySelector(".timeline-image");
              if (firstEvent) {
                const rect = firstEvent.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const targetScrollTop =
                  window.pageYOffset +
                  rect.top -
                  windowHeight / 2 +
                  rect.height / 2;
                window.scrollTo({
                  top: targetScrollTop,
                  behavior: "smooth",
                });
              }
            }}
          >
            <svg
              className="w-8 h-8 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full min-h-screen bg-black relative" ref={containerRef}>
        {/* Red line across the middle of the screen */}
        <div
          className={`fixed top-1/2 left-0 w-full h-0.5 bg-red-500/40 z-10 transform -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        ></div>

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
                  className={`absolute left-0 transition-all duration-700 ease-in-out whitespace-nowrap ${
                    isSelected
                      ? "text-yellow-400 text-6xl font-black tracking-tight leading-none"
                      : "text-white text-sm leading-none"
                  }`}
                  style={{
                    opacity: showText ? opacity : 0,
                    transform: `translateY(-50%) translateX(${
                      showText ? "0" : "-100px"
                    })`,
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
                  className={`absolute right-0 transition-all duration-700 ease-in-out whitespace-nowrap ${
                    isSelected
                      ? "text-yellow-400 text-6xl font-black tracking-tight leading-none"
                      : "text-white text-sm leading-none"
                  }`}
                  style={{
                    opacity: showText ? opacity : 0,
                    transform: `translateY(-50%) translateX(${
                      showText ? "0" : "100px"
                    })`,
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
              className={`timeline-image transition-all duration-300 ease-in-out relative ${
                index === selectedIndex
                  ? "scale-110 opacity-100"
                  : "scale-90 opacity-70"
              }`}
            >
              <Image
                src={getImgUrl(event.image)}
                alt={event.name}
                width={500}
                height={500}
                className="w-[500px] h-[500px] object-cover rounded-2xl shadow-lg"
              />
              {/* Event details overlay */}
              <div className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col justify-end p-6">
                <div className="text-white">
                  <p className="text-lg font-semibold mb-1">
                    {event.location} • {formatTime(event.datetime)}
                  </p>
                  {event.description && (
                    <p className="text-sm opacity-90">{event.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
