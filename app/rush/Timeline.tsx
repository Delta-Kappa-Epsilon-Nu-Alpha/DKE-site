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
  LINE_THICKNESS: 4, // Timeline thickness in pixels
  PROGRESS_THICKNESS: 6, // Progress line thickness in pixels
  ANIMATION_DURATION: 2000, // Animation duration in milliseconds
  SELECTED_SPACING_MULTIPLIER: 1.2, // How much extra spacing to add around selected event
  SELECTION_TRANSITION_DURATION: 600, // Duration for spacing transition in ms
  ACCENT_COLOR: "gold", // Gold color for progress line, selected elements, and popup glow
  BUFFER_PERCENT: 8, // Percentage buffer from event centers to prevent progress line from being hidden behind images
  POPUP_HEIGHT: 120, // Height of the fixed popup in pixels
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
  const selectedEvent = events[currentSelectedIndex];

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
  const timelineHeight = containerHeight - TIMELINE_CONFIG.POPUP_HEIGHT; // Reserve space for popup

  const padding = isHorizontal
    ? (containerWidth * TIMELINE_CONFIG.PADDING_PERCENT) / 100
    : (timelineHeight * TIMELINE_CONFIG.PADDING_PERCENT) / 100;

  const amplitude = isHorizontal
    ? (timelineHeight * TIMELINE_CONFIG.AMPLITUDE_PERCENT) / 100
    : (containerWidth * TIMELINE_CONFIG.AMPLITUDE_PERCENT) / 100;

  // Generate timeline path and event positions with dynamic spacing
  const generateTimelinePath = () => {
    const points: string[] = [];
    const eventPositions: Array<{
      x: number;
      y: number;
    }> = [];

    const positions = calculateEventPositions();

    if (isHorizontal) {
      // Horizontal timeline
      const startX = padding;
      const endX = containerWidth - padding;
      const midY = TIMELINE_CONFIG.POPUP_HEIGHT + timelineHeight / 2; // Adjust for popup space
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
        eventPositions.push({ x, y });
      });
    } else {
      // Vertical timeline
      const startY = TIMELINE_CONFIG.POPUP_HEIGHT + padding;
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
        eventPositions.push({ x, y });
      });
    }

    return { path: points.join(" "), eventPositions };
  };

  const { path, eventPositions } = generateTimelinePath();

  // Generate progress path
  const generateProgressPath = () => {
    const currentProgress = calculateCurrentProgress();
    const animatedProgress = currentProgress * animationProgress;

    if (animatedProgress <= 0) return { path: "" };

    const progressPoints: string[] = [];

    if (isHorizontal) {
      const startX = padding;
      const endX = containerWidth - padding;
      const midY = TIMELINE_CONFIG.POPUP_HEIGHT + timelineHeight / 2; // Adjust for popup space
      const totalLength = endX - startX;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      // Find the two events we're between for progress calculation
      const now = new Date("2025-09-16T18:00:00");
      const eventDates = events.map((event) => new Date(event.datetime));

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
          currentSegment = Math.max(0, i - 1);
          progressInSegment = now < eventDates[0] ? 0 : 1;
          break;
        } else if (i === eventDates.length - 2 && now > eventDates[i + 1]) {
          currentSegment = eventDates.length - 1;
          progressInSegment = 1;
          break;
        }
      }

      // Calculate buffer-adjusted positions
      const bufferDistance =
        (TIMELINE_CONFIG.BUFFER_PERCENT / 100) * totalLength;

      // Calculate the actual progress position using evenly spaced positions (not affected by selection)
      let targetPosition = 0;
      if (events.length <= 1) {
        targetPosition = animatedProgress;
      } else if (currentSegment >= events.length - 1) {
        // After last event - stop at buffer distance from last event
        const lastEventPos = 1; // Use fixed position, not dynamic
        targetPosition = Math.min(
          1,
          lastEventPos + bufferDistance / totalLength
        );
      } else {
        // Use evenly spaced positions for progress calculation
        const segmentStartPos = currentSegment / (events.length - 1);
        const segmentEndPos = (currentSegment + 1) / (events.length - 1);
        const segmentProgress = progressInSegment * animatedProgress;

        if (progressInSegment === 0) {
          // Just after start event - stop at buffer distance from start event
          targetPosition = segmentStartPos + bufferDistance / totalLength;
        } else if (progressInSegment === 1) {
          // Just before end event - stop at buffer distance from end event
          targetPosition = segmentEndPos - bufferDistance / totalLength;
        } else {
          // Between events - interpolate with buffer consideration
          const segmentLength = segmentEndPos - segmentStartPos;
          const bufferOffset = (bufferDistance / totalLength) * 2; // Buffer on both sides
          const adjustedSegmentLength = Math.max(
            0.01,
            segmentLength - bufferOffset
          );
          const adjustedProgress = Math.max(
            0,
            Math.min(1, (segmentProgress - 0.1) / 0.8)
          ); // Compress progress to avoid buffers
          targetPosition =
            segmentStartPos +
            bufferDistance / totalLength +
            adjustedSegmentLength * adjustedProgress;
        }
      }

      // Generate points along the path up to the target position
      const numPoints = Math.max(2, Math.floor(targetPosition * 100));

      for (let i = 0; i <= numPoints; i++) {
        const progress = (i / numPoints) * targetPosition;
        const x = startX + totalLength * progress;
        const y = midY + amplitude * Math.sin((x - startX) / period);
        progressPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
      }
    } else {
      const startY = TIMELINE_CONFIG.POPUP_HEIGHT + padding;
      const endY = containerHeight - padding;
      const midX = containerWidth / 2;
      const totalLength = endY - startY;
      const period =
        totalLength / TIMELINE_CONFIG.PERIOD_MULTIPLIER / (2 * Math.PI);

      // Find the two events we're between for progress calculation
      const now = new Date("2025-09-16T18:00:00");
      const eventDates = events.map((event) => new Date(event.datetime));

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
          currentSegment = Math.max(0, i - 1);
          progressInSegment = now < eventDates[0] ? 0 : 1;
          break;
        } else if (i === eventDates.length - 2 && now > eventDates[i + 1]) {
          currentSegment = eventDates.length - 1;
          progressInSegment = 1;
          break;
        }
      }

      // Calculate buffer-adjusted positions
      const bufferDistance =
        (TIMELINE_CONFIG.BUFFER_PERCENT / 100) * totalLength;

      // Calculate the actual progress position using evenly spaced positions (not affected by selection)
      let targetPosition = 0;
      if (events.length <= 1) {
        targetPosition = animatedProgress;
      } else if (currentSegment >= events.length - 1) {
        // After last event - stop at buffer distance from last event
        const lastEventPos = 1; // Use fixed position, not dynamic
        targetPosition = Math.min(
          1,
          lastEventPos + bufferDistance / totalLength
        );
      } else {
        // Use evenly spaced positions for progress calculation
        const segmentStartPos = currentSegment / (events.length - 1);
        const segmentEndPos = (currentSegment + 1) / (events.length - 1);
        const segmentProgress = progressInSegment * animatedProgress;

        if (progressInSegment === 0) {
          // Just after start event - stop at buffer distance from start event
          targetPosition = segmentStartPos + bufferDistance / totalLength;
        } else if (progressInSegment === 1) {
          // Just before end event - stop at buffer distance from end event
          targetPosition = segmentEndPos - bufferDistance / totalLength;
        } else {
          // Between events - interpolate with buffer consideration
          const segmentLength = segmentEndPos - segmentStartPos;
          const bufferOffset = (bufferDistance / totalLength) * 2; // Buffer on both sides
          const adjustedSegmentLength = Math.max(
            0.01,
            segmentLength - bufferOffset
          );
          const adjustedProgress = Math.max(
            0,
            Math.min(1, (segmentProgress - 0.1) / 0.8)
          ); // Compress progress to avoid buffers
          targetPosition =
            segmentStartPos +
            bufferDistance / totalLength +
            adjustedSegmentLength * adjustedProgress;
        }
      }

      // Generate points along the path up to the target position
      const numPoints = Math.max(2, Math.floor(targetPosition * 100));

      for (let i = 0; i <= numPoints; i++) {
        const progress = (i / numPoints) * targetPosition;
        const y = startY + totalLength * progress;
        const x = midX + amplitude * Math.sin((y - startY) / period);
        progressPoints.push(i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
      }
    }

    return {
      path: progressPoints.join(" "),
    };
  };

  const { path: progressPath } = generateProgressPath();

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
      {/* Fixed Event Popup */}
      {selectedEvent && (
        <div
          className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg z-20"
          style={{ height: `${TIMELINE_CONFIG.POPUP_HEIGHT}px` }}
        >
          <div className="flex items-center justify-center h-full px-4">
            <div className="flex items-center space-x-4 max-w-4xl w-full">
              {/* Event Image */}
              <div
                className="relative rounded-full border-4 bg-white overflow-hidden flex-shrink-0"
                style={{
                  width: "4rem",
                  height: "4rem",
                  borderColor: TIMELINE_CONFIG.ACCENT_COLOR,
                }}
              >
                <Image
                  src={getS3Url(selectedEvent.image)}
                  alt={selectedEvent.name}
                  fill
                  className="object-cover"
                  sizes="4rem"
                />
              </div>

              {/* Event Information */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-black mb-1">
                  {selectedEvent.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {formatDate(selectedEvent.datetime)}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {selectedEvent.location}
                  </span>
                </div>
                {selectedEvent.description && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {selectedEvent.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
            stroke={TIMELINE_CONFIG.ACCENT_COLOR}
            strokeWidth={TIMELINE_CONFIG.PROGRESS_THICKNESS}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="none"
          />
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
              className={`relative rounded-full border-4 bg-white overflow-hidden transition-all duration-300 ease-out hover:scale-105`}
              style={{
                width: imageSize,
                height: imageSize,
                borderColor: isSelected
                  ? TIMELINE_CONFIG.ACCENT_COLOR
                  : "black",
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
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
