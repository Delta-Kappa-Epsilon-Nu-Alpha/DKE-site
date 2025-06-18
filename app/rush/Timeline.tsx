"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { getS3Url } from "@/lib/utils";
import rushInfo from "./rushInfo.json";

interface RushEvent {
  name: string;
  description: string;
  datetime: string;
  location: string;
  image: string;
  open: boolean;
}

// Configuration constants
const TIMELINE_CONFIG = {
  AMPLITUDE_PERCENT: 17, // Percentage of height (horizontal) or width (vertical)
  PERIOD_MULTIPLIER: 1, // Multiplier for the sine wave period
  PADDING_PERCENT: 10, // Percentage padding on sides (horizontal) or top/bottom (vertical)
  LINE_THICKNESS: 8, // Timeline thickness in pixels
  PROGRESS_THICKNESS: 12, // Progress line thickness in pixels
  ANIMATION_DURATION: 2000, // Animation duration in milliseconds
};

const Timeline: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);
  const animationHasRun = useRef(false);

  useEffect(() => {
    setIsClient(true);

    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
      setIsHorizontal(width > height);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Animation effect for progress line
  useEffect(() => {
    if (!isClient || animationHasRun.current) return;

    animationHasRun.current = true;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(
        elapsed / TIMELINE_CONFIG.ANIMATION_DURATION,
        1
      );

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(easeOutCubic);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation after a brief delay
    const timeout = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isClient]);

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  const events: RushEvent[] = rushInfo;

  // Calculate current progress based on time
  const calculateCurrentProgress = () => {
    const now = new Date("2025-09-16T18:00:00");
    const eventDates = events.map((event) => new Date(event.datetime));

    // Find the two events we're between
    let currentSegment = 0;
    let progressInSegment = 0;

    for (let i = 0; i < eventDates.length - 1; i++) {
      if (now >= eventDates[i] && now <= eventDates[i + 1]) {
        currentSegment = i;
        const segmentStart = eventDates[i].getTime();
        const segmentEnd = eventDates[i + 1].getTime();
        const currentTime = now.getTime();
        progressInSegment =
          (currentTime - segmentStart) / (segmentEnd - segmentStart);
        break;
      } else if (now < eventDates[i]) {
        // Before first event or between events
        currentSegment = Math.max(0, i - 1);
        progressInSegment = now < eventDates[0] ? 0 : 1;
        break;
      } else if (i === eventDates.length - 2 && now > eventDates[i + 1]) {
        // After last event
        currentSegment = eventDates.length - 1;
        progressInSegment = 1;
        break;
      }
    }

    // Convert to overall progress (0 to 1)
    const overallProgress =
      events.length <= 1
        ? now.getTime() > eventDates[0]?.getTime()
          ? 1
          : 0
        : (currentSegment + progressInSegment) / (events.length - 1);

    return Math.max(0, Math.min(1, overallProgress));
  };

  // Calculate timeline dimensions
  const containerHeight = isHorizontal ? dimensions.height : 1200;
  const containerWidth = dimensions.width;

  const padding = isHorizontal
    ? (containerWidth * TIMELINE_CONFIG.PADDING_PERCENT) / 100
    : (containerHeight * TIMELINE_CONFIG.PADDING_PERCENT) / 100;

  const amplitude = isHorizontal
    ? (containerHeight * TIMELINE_CONFIG.AMPLITUDE_PERCENT) / 100
    : (containerWidth * TIMELINE_CONFIG.AMPLITUDE_PERCENT) / 100;

  // Generate timeline path and event positions
  const generateTimelinePath = () => {
    const points: string[] = [];
    const eventPositions: Array<{
      x: number;
      y: number;
      isAbove: boolean;
      isLeft: boolean;
    }> = [];

    if (isHorizontal) {
      // Horizontal timeline
      const startX = padding;
      const endX = containerWidth - padding;
      const midY = containerHeight / 2;
      const totalLength = endX - startX;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      // Generate path points
      for (let i = 0; i <= 100; i++) {
        const progress = i / 100;
        const x = startX + totalLength * progress;
        const y = midY + amplitude * Math.sin((x - startX) / period);
        points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
      }

      // Calculate event positions
      events.forEach((_, index) => {
        const progress = index / Math.max(events.length - 1, 1);
        const x = startX + totalLength * progress;
        const y = midY + amplitude * Math.sin((x - startX) / period);
        const isAbove = y > midY; // Reversed: text above when event is below center
        eventPositions.push({ x, y, isAbove, isLeft: false });
      });
    } else {
      // Vertical timeline
      const startY = padding;
      const endY = containerHeight - padding;
      const midX = containerWidth / 2;
      const totalLength = endY - startY;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      // Generate path points
      for (let i = 0; i <= 100; i++) {
        const progress = i / 100;
        const y = startY + totalLength * progress;
        const x = midX + amplitude * Math.sin((y - startY) / period);
        points.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
      }

      // Calculate event positions
      events.forEach((_, index) => {
        const progress = index / Math.max(events.length - 1, 1);
        const y = startY + totalLength * progress;
        const x = midX + amplitude * Math.sin((y - startY) / period);
        const isLeft = x > midX; // Reversed: text left when event is right of center
        eventPositions.push({ x, y, isAbove: false, isLeft });
      });
    }

    return { path: points.join(" "), eventPositions };
  };

  const { path, eventPositions } = generateTimelinePath();

  // Generate progress path
  const generateProgressPath = () => {
    const currentProgress = calculateCurrentProgress();
    const animatedProgress = currentProgress * animationProgress;

    if (animatedProgress <= 0) return { path: "", arrowPosition: null };

    const progressPoints: string[] = [];
    let arrowPosition: { x: number; y: number; angle: number } | null = null;

    if (isHorizontal) {
      const startX = padding;
      const endX = containerWidth - padding;
      const midY = containerHeight / 2;
      const totalLength = endX - startX;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      // const progressLength = totalLength * animatedProgress;
      const numPoints = Math.max(2, Math.floor(animatedProgress * 100));

      for (let i = 0; i <= numPoints; i++) {
        const progress = (i / numPoints) * animatedProgress;
        const x = startX + totalLength * progress;
        const y = midY + amplitude * Math.sin((x - startX) / period);
        progressPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);

        // Calculate arrow position and angle at the end
        if (i === numPoints) {
          const prevProgress = Math.max(0, progress - 0.01);
          const prevX = startX + totalLength * prevProgress;
          const prevY = midY + amplitude * Math.sin((prevX - startX) / period);
          const angle = (Math.atan2(y - prevY, x - prevX) * 180) / Math.PI;

          // Position arrow slightly ahead of the progress line end
          const offsetDistance = 20; // pixels ahead of the line
          const offsetX = offsetDistance * Math.cos((angle * Math.PI) / 180);
          const offsetY = offsetDistance * Math.sin((angle * Math.PI) / 180);

          arrowPosition = {
            x: x + offsetX,
            y: y + offsetY,
            angle,
          };
        }
      }
    } else {
      const startY = padding;
      const endY = containerHeight - padding;
      const midX = containerWidth / 2;
      const totalLength = endY - startY;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      const numPoints = Math.max(2, Math.floor(animatedProgress * 100));

      for (let i = 0; i <= numPoints; i++) {
        const progress = (i / numPoints) * animatedProgress;
        const y = startY + totalLength * progress;
        const x = midX + amplitude * Math.sin((y - startY) / period);
        progressPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);

        // Calculate arrow position and angle at the end
        if (i === numPoints) {
          const prevProgress = Math.max(0, progress - 0.01);
          const prevY = startY + totalLength * prevProgress;
          const prevX = midX + amplitude * Math.sin((prevY - startY) / period);
          const angle = (Math.atan2(y - prevY, x - prevX) * 180) / Math.PI;

          // Position arrow slightly ahead of the progress line end
          const offsetDistance = 20; // pixels ahead of the line
          const offsetX = offsetDistance * Math.cos((angle * Math.PI) / 180);
          const offsetY = offsetDistance * Math.sin((angle * Math.PI) / 180);

          arrowPosition = {
            x: x + offsetX,
            y: y + offsetY,
            angle,
          };
        }
      }
    }

    return {
      path: progressPoints.join(" "),
      arrowPosition,
    };
  };

  const { path: progressPath, arrowPosition } = generateProgressPath();

  const formatDate = (datetime: string) => {
    const date = new Date(datetime);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `${containerHeight}px` }}
    >
      {/* Timeline SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${containerWidth} ${containerHeight}`}
        preserveAspectRatio="none"
      >
        {/* Base timeline path */}
        <path
          d={path}
          stroke="black"
          strokeWidth={TIMELINE_CONFIG.LINE_THICKNESS}
          fill="none"
        />

        {/* Progress path outline */}
        {progressPath && (
          <path
            d={progressPath}
            stroke="black"
            strokeWidth={TIMELINE_CONFIG.PROGRESS_THICKNESS + 2}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="none"
          />
        )}

        {/* Progress path */}
        {progressPath && (
          <path
            d={progressPath}
            stroke="#FFD700"
            strokeWidth={TIMELINE_CONFIG.PROGRESS_THICKNESS}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="none"
            style={{
              filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.6))",
            }}
          />
        )}

        {/* Arrow at current position */}
        {arrowPosition && (
          <g
            transform={`translate(${arrowPosition.x}, ${arrowPosition.y}) rotate(${arrowPosition.angle})`}
          >
            <path
              d="M 0 0 L -48 -24 L -32 0 L -48 24 Z"
              fill="#FFD700"
              stroke="black"
              strokeWidth="1"
              style={{
                filter: "drop-shadow(0 0 4px rgba(255, 215, 0, 0.8))",
              }}
            />
          </g>
        )}
      </svg>

      {/* Event Items */}
      {events.map((event, index) => {
        const position = eventPositions[index];
        if (!position) return null;

        const imageSize = isHorizontal ? "6rem" : "4rem";

        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
          >
            {/* Event Image */}
            <div
              className="relative rounded-full border-4 border-black bg-white overflow-hidden"
              style={{
                width: imageSize,
                height: imageSize,
              }}
            >
              <Image
                src={getS3Url(event.image)}
                alt={event.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 3rem, 4rem"
              />
            </div>

            {/* Event Text */}
            <div
              className={`absolute ${
                isHorizontal
                  ? position.isAbove
                    ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
                    : "top-full mt-2 left-1/2 transform -translate-x-1/2"
                  : position.isLeft
                  ? "right-full mr-2 top-1/2 transform -translate-y-1/2"
                  : "left-full ml-2 top-1/2 transform -translate-y-1/2"
              }`}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border text-center min-w-max max-w-xs whitespace-nowrap">
                <h3 className="font-semibold text-sm md:text-base text-black">
                  {event.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">
                  {formatDate(event.datetime)}
                </p>
                <p className="text-xs text-gray-500">{event.location}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
