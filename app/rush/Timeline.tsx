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
  SELECTED_SPACING_MULTIPLIER: 1.2, // How much extra spacing to add around selected event
  SELECTION_TRANSITION_DURATION: 600, // Duration for spacing transition in ms
};

const Timeline: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number>(0);
  const [spacingTransition, setSpacingTransition] = useState(0);
  const animationHasRun = useRef(false);
  const spacingAnimationRef = useRef<number | null>(null);

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

  // Set default selected event
  useEffect(() => {
    if (!isClient || selectedEventIndex !== null) return;

    const events: RushEvent[] = rushInfo;
    const now = new Date("2025-09-16T18:00:00");

    // Find next upcoming event or last event
    let defaultIndex = events.length - 1; // Default to last event

    for (let i = 0; i < events.length; i++) {
      const eventDate = new Date(events[i].datetime);
      if (eventDate > now) {
        defaultIndex = i;
        break;
      }
    }

    setSelectedEventIndex(defaultIndex);
  }, [isClient, selectedEventIndex]);

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

  // Handle spacing animation when selected event changes
  useEffect(() => {
    if (spacingAnimationRef.current) {
      cancelAnimationFrame(spacingAnimationRef.current);
    }

    const startTime = Date.now();
    const startTransition = spacingTransition;
    const targetTransition = 1;

    const animateSpacing = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(
        elapsed / TIMELINE_CONFIG.SELECTION_TRANSITION_DURATION,
        1
      );

      // Easing function
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newTransition =
        startTransition + (targetTransition - startTransition) * easeOutCubic;

      setSpacingTransition(newTransition);

      if (progress < 1) {
        spacingAnimationRef.current = requestAnimationFrame(animateSpacing);
      }
    };

    spacingAnimationRef.current = requestAnimationFrame(animateSpacing);

    return () => {
      if (spacingAnimationRef.current) {
        cancelAnimationFrame(spacingAnimationRef.current);
      }
    };
  }, [selectedEventIndex]);

  // Handle event selection
  const handleEventClick = (index: number) => {
    setSelectedEventIndex(index);
  };

  const handleEventHover = (index: number) => {
    setSelectedEventIndex(index);
  };

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  const events: RushEvent[] = rushInfo;
  const currentSelectedIndex = selectedEventIndex;

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

  // Calculate dynamic spacing for events
  const calculateEventPositions = () => {
    if (events.length <= 1) return [0.5]; // Single event in center
    if (events.length === 2) return [0, 1]; // Two events at ends

    // Start with evenly spaced positions
    const basePositions = events.map((_, index) => index / (events.length - 1));

    if (currentSelectedIndex === null) return basePositions;

    // Calculate the spacing adjustments
    const adjustedPositions = [...basePositions];
    const extraSpacing =
      (TIMELINE_CONFIG.SELECTED_SPACING_MULTIPLIER - 1) *
      spacingTransition *
      0.1; // Scale down the effect

    // Only adjust middle events, never the first or last
    for (let i = 1; i < events.length - 1; i++) {
      const distanceFromSelected = Math.abs(i - currentSelectedIndex);

      if (distanceFromSelected === 0) {
        // This is the selected event - don't move it
        continue;
      } else if (distanceFromSelected === 1) {
        // Adjacent to selected event - move away to create space
        if (i < currentSelectedIndex) {
          // Move towards the beginning
          adjustedPositions[i] = basePositions[i] - extraSpacing;
        } else {
          // Move towards the end
          adjustedPositions[i] = basePositions[i] + extraSpacing;
        }
      }
    }

    // Ensure first and last positions remain fixed
    adjustedPositions[0] = 0;
    adjustedPositions[events.length - 1] = 1;

    // Ensure positions remain in order and within bounds
    for (let i = 1; i < adjustedPositions.length - 1; i++) {
      adjustedPositions[i] = Math.max(
        adjustedPositions[i - 1] + 0.02,
        Math.min(adjustedPositions[i + 1] - 0.02, adjustedPositions[i])
      );
    }

    return adjustedPositions;
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

  // Generate timeline path and event positions with dynamic spacing
  const generateTimelinePath = () => {
    const points: string[] = [];
    const eventPositions: Array<{
      x: number;
      y: number;
      isAbove: boolean;
      isLeft: boolean;
    }> = [];

    const positions = calculateEventPositions();

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

      // Calculate event positions using the calculated positions
      events.forEach((_, index) => {
        const progress = positions[index];
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

      // Calculate event positions using the calculated positions
      events.forEach((_, index) => {
        const progress = positions[index];
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

        const isSelected = currentSelectedIndex === index;
        const baseImageSize = isHorizontal ? 6 : 4;
        const imageSize = isSelected
          ? `${baseImageSize * 1.5}rem`
          : `${baseImageSize}rem`;

        return (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: isSelected ? 10 : 1,
            }}
            onClick={() => handleEventClick(index)}
            onMouseEnter={() => handleEventHover(index)}
          >
            {/* Event Image */}
            <div
              className={`relative rounded-full border-4 ${
                isSelected
                  ? "border-yellow-400 shadow-lg shadow-yellow-400/50"
                  : "border-black"
              } bg-white overflow-hidden transition-all duration-300 ease-out hover:scale-105`}
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
                sizes="(max-width: 768px) 4rem, 6rem"
              />
            </div>

            {/* Event Text */}
            <div
              className={`absolute transition-all duration-300 ease-out ${
                isHorizontal
                  ? position.isAbove
                    ? "bottom-full mb-2 left-1/2 transform -translate-x-1/2"
                    : "top-full mt-2 left-1/2 transform -translate-x-1/2"
                  : position.isLeft
                  ? "right-full mr-2 top-1/2 transform -translate-y-1/2"
                  : "left-full ml-2 top-1/2 transform -translate-y-1/2"
              }`}
            >
              <div
                className={`bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border text-center transition-all duration-300 ease-out ${
                  isSelected
                    ? "w-72 max-w-sm border-yellow-400 shadow-yellow-400/20"
                    : "w-40 max-w-xs"
                }`}
              >
                <h3
                  className={`font-semibold ${
                    isSelected ? "text-base md:text-lg" : "text-sm md:text-base"
                  } text-black transition-all duration-300`}
                >
                  {event.name}
                </h3>
                <p
                  className={`${
                    isSelected ? "text-sm md:text-base" : "text-xs md:text-sm"
                  } text-gray-600 transition-all duration-300`}
                >
                  {formatDate(event.datetime)}
                </p>
                <p
                  className={`text-xs ${
                    isSelected ? "md:text-sm" : ""
                  } text-gray-500 transition-all duration-300`}
                >
                  {event.location}
                </p>
                {isSelected && event.description && (
                  <p className="text-xs md:text-sm text-gray-700 mt-2 border-t pt-2 whitespace-normal break-words">
                    {event.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
