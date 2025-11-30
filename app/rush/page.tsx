"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import Image from "next/image";
import { getImgUrl } from "@/lib/utils";
import { rushData } from "./rushData";

// ============================================
// CONSTANTS
// ============================================
const MOBILE_BREAKPOINT = 768;
const ANIMATION_DURATION = 500; // ms for expand/collapse animations
const SCROLL_TO_CENTER_DURATION = 600; // ms for centering animation
const OPACITY_FADE_FACTOR = 0.3;
const MIN_OPACITY = 0.2;

// Spacing constants
const SPACING = {
  desktop: {
    selectedGap: 100,
    nonSelectedGap: 60,
  },
  mobile: {
    selectedGap: 80,
    nonSelectedGap: 50,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatDate = (datetime: string): string => {
  const date = new Date(datetime);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  return `${month} ${day}`;
};

const formatTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const calculateOpacity = (distance: number): number => {
  return Math.max(MIN_OPACITY, 1 - Math.abs(distance) * OPACITY_FADE_FACTOR);
};

const calculatePosition = (distance: number, isMobile: boolean): number => {
  if (distance === 0) return 0;

  const spacing = isMobile ? SPACING.mobile : SPACING.desktop;

  if (Math.abs(distance) === 1) {
    return distance * spacing.selectedGap;
  }

  const sign = distance > 0 ? 1 : -1;
  const absDistance = Math.abs(distance);
  let totalSpacing = 0;

  for (let i = 1; i <= absDistance; i++) {
    totalSpacing += i === 1 ? spacing.selectedGap : spacing.nonSelectedGap;
  }

  return sign * totalSpacing;
};

// ============================================
// SUB-COMPONENTS
// ============================================

// Tick marks component
const TickMarks = ({
  side,
  selectedIndex,
  showText,
  isMobile,
}: {
  side: "left" | "right";
  selectedIndex: number;
  showText: boolean;
  isMobile: boolean;
}) => {
  const totalEvents = rushData.length;
  const ticks = [];

  for (let i = 0; i < totalEvents; i++) {
    const distance = i - selectedIndex;
    const opacity = calculateOpacity(distance);
    const isSelected = i === selectedIndex;
    const position = calculatePosition(distance, isMobile);

    // Main tick
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

    // Intermediate ticks
    if (i < totalEvents - 1) {
      const nextDistance = i + 1 - selectedIndex;
      const nextPosition = calculatePosition(nextDistance, isMobile);
      const totalGap = nextPosition - position;
      const quarterGap = totalGap / 4;

      for (let k = 1; k <= 3; k++) {
        const intermediatePosition = position + quarterGap * k;
        const intermediateOpacity = Math.max(
          0.1,
          Math.min(opacity, calculateOpacity(nextDistance)) * 0.6
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

  return <>{ticks}</>;
};

// Timeline text component
const TimelineText = ({
  selectedIndex,
  showText,
  isMobile,
  type,
}: {
  selectedIndex: number;
  showText: boolean;
  isMobile: boolean;
  type: "title" | "date";
}) => {
  return (
    <>
      {rushData.map((event, index) => {
        const distance = index - selectedIndex;
        const opacity = calculateOpacity(distance);
        const isSelected = index === selectedIndex;
        const position = calculatePosition(distance, isMobile);

        const content =
          type === "title" ? event.name : formatDate(event.datetime);
        const alignment = type === "title" ? "left-0" : "right-0 text-right";
        const translateX =
          type === "title"
            ? showText
              ? "0"
              : "-100px"
            : showText
            ? "0"
            : "100px";

        return (
          <div
            key={index}
            className={`absolute ${alignment} transition-all duration-700 ease-in-out ${
              isSelected
                ? `text-yellow-400 font-black tracking-tight ${
                    isMobile ? "text-xl leading-5" : "text-6xl leading-none"
                  }`
                : `text-white ${
                    isMobile ? "text-xs leading-4" : "text-sm leading-none"
                  }`
            } ${isMobile ? "" : "whitespace-nowrap"}`}
            style={{
              opacity: showText ? opacity : 0,
              transform: `translateY(-50%) translateX(${translateX})`,
              top: `calc(50% + ${position}px)`,
              fontFamily: 'Impact, "Arial Black", sans-serif',
              fontWeight: isSelected ? 900 : 100,
              maxWidth: isMobile ? (isSelected ? "100px" : "80px") : "none",
            }}
          >
            {content}
          </div>
        );
      })}
    </>
  );
};

// Image overlay component
const ImageOverlay = ({
  event,
  isExpanded,
  isMobile,
}: {
  event: (typeof rushData)[0];
  isExpanded: boolean;
  isMobile: boolean;
}) => {
  return (
    <div
      className={`absolute inset-0 bg-black/50 rounded-2xl flex flex-col justify-end p-6 pointer-events-none ${
        isMobile && !isExpanded ? "opacity-0" : "opacity-100"
      }`}
      style={{
        transition: `opacity ${ANIMATION_DURATION}ms ease-out`,
      }}
    >
      <div className="text-white">
        <p
          className={`font-semibold mb-1 ${isMobile ? "text-base" : "text-lg"}`}
        >
          {event.location} • {formatTime(event.datetime)}
        </p>
        {event.description && (
          <p className={`opacity-90 ${isMobile ? "text-xs" : "text-sm"}`}>
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
export default function Rush() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Trigger timeline animation on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300); // Small delay to ensure page is rendered

    return () => clearTimeout(timer);
  }, []);

  // Smooth image expansion/collapse handler
  const handleImageInteraction = useCallback(
    (index: number | null, shouldCenter: boolean = true) => {
      if (isAnimating) return;

      setIsAnimating(true);

      // If we're closing an expanded image
      if (index === null) {
        setExpandedImageIndex(null);
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
        return;
      }

      // If clicking on already expanded image, close it
      if (expandedImageIndex === index) {
        setExpandedImageIndex(null);
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
        return;
      }

      // Update selected index
      setSelectedIndex(index);

      // For mobile, handle smooth centering and expansion
      if (isMobile && shouldCenter) {
        const images =
          containerRef.current?.querySelectorAll(".timeline-image");
        if (images && images[index]) {
          const targetImage = images[index] as HTMLElement;
          const rect = targetImage.getBoundingClientRect();
          const imageCenter = rect.top + rect.height / 2;
          const viewportCenter = window.innerHeight / 2;
          const scrollOffset = imageCenter - viewportCenter;

          // Scroll to center if needed
          if (Math.abs(scrollOffset) > 10) {
            window.scrollBy({
              top: scrollOffset,
              behavior: "smooth",
            });
          }

          // Delay expansion to allow centering to complete
          setTimeout(() => {
            setExpandedImageIndex(index);
            setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
          }, SCROLL_TO_CENTER_DURATION);
        }
      } else {
        setExpandedImageIndex(index);
        setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
      }
    },
    [expandedImageIndex, isMobile, isAnimating]
  );

  // Handle click on image
  const handleImageClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      e.stopPropagation();
      handleImageInteraction(index);
    },
    [handleImageInteraction]
  );

  // Handle background click to close
  const handleBackgroundClick = useCallback(() => {
    if (expandedImageIndex !== null) {
      handleImageInteraction(null, false);
    }
  }, [expandedImageIndex, handleImageInteraction]);

  // Scroll handler
  useLayoutEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const viewportCenter = window.innerHeight / 2;
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full bg-black" onClick={handleBackgroundClick}>
      {/* Title Section */}
      <div className="w-full bg-black py-8 text-center">
        <h1
          className={`font-black text-white tracking-tight ${
            isMobile ? "text-4xl" : "text-6xl"
          }`}
          style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
        >
          DKE Rush Calendar
        </h1>
      </div>

      {/* Timeline Section */}
      <div className="w-full min-h-screen bg-black relative" ref={containerRef}>
        {/* Red line */}
        <div
          className={`fixed top-1/2 left-0 w-full h-0.5 bg-red-500/40 z-10 transform -translate-y-1/2 transition-opacity duration-700 ease-in-out ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Left tick marks */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 z-15 ${
            isMobile ? "left-3" : "left-6"
          }`}
        >
          <div className="relative h-screen">
            <TickMarks
              side="left"
              selectedIndex={selectedIndex}
              showText={showText}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Right tick marks */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 z-15 ${
            isMobile ? "right-3" : "right-6"
          }`}
        >
          <div className="relative h-screen">
            <TickMarks
              side="right"
              selectedIndex={selectedIndex}
              showText={showText}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Left text (titles) */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 z-20 ${
            isMobile ? "left-8" : "left-12"
          }`}
        >
          <div className="relative h-screen">
            <TimelineText
              selectedIndex={selectedIndex}
              showText={showText}
              isMobile={isMobile}
              type="title"
            />
          </div>
        </div>

        {/* Right text (dates) */}
        <div
          className={`fixed top-1/2 transform -translate-y-1/2 z-20 ${
            isMobile ? "right-8" : "right-12"
          }`}
        >
          <div className="relative h-screen">
            <TimelineText
              selectedIndex={selectedIndex}
              showText={showText}
              isMobile={isMobile}
              type="date"
            />
          </div>
        </div>

        {/* Images Section - with extra padding at bottom to allow last image to center */}
        <div
          className={`flex flex-col items-center pt-20 ${
            isMobile ? "space-y-6" : "space-y-8"
          }`}
          style={{
            paddingBottom: "50vh",
            paddingLeft: isMobile ? "15px" : "0px", // Shift mobile images right to center between text
          }}
        >
          {rushData.map((event, index) => {
            const isExpanded = expandedImageIndex === index;
            const isSelected = index === selectedIndex;

            return (
              <div key={index} className="relative">
                {/* Image container wrapper for proper transitions */}
                <div
                  className={`timeline-image relative cursor-pointer ${
                    !isExpanded ? "" : "pointer-events-none"
                  }`}
                  style={{
                    transform:
                      isSelected && !isMobile && !isExpanded
                        ? "scale(1.1)"
                        : isSelected && isMobile && !isExpanded
                        ? "scale(1.05)"
                        : !isExpanded && isMobile
                        ? "scale(0.95)"
                        : !isExpanded
                        ? "scale(0.9)"
                        : "",
                    opacity:
                      isSelected || isExpanded ? 1 : isMobile ? 0.8 : 0.7,
                    transition: `all ${ANIMATION_DURATION}ms ease-out`,
                  }}
                  onClick={(e) => !isExpanded && handleImageClick(index, e)}
                >
                  <Image
                    src={getImgUrl(event.image)}
                    alt={event.name}
                    width={isMobile ? 200 : 500}
                    height={isMobile ? 250 : 500}
                    className={`object-cover rounded-2xl shadow-lg ${
                      isMobile ? "w-[200px] h-[250px]" : "w-[500px] h-[500px]"
                    }`}
                  />

                  {/* Overlay with details - only visible on desktop or when NOT expanded on mobile */}
                  {!isExpanded && (
                    <ImageOverlay
                      event={event}
                      isExpanded={false}
                      isMobile={isMobile}
                    />
                  )}

                  {/* Mobile tap hint */}
                  {isMobile && !isExpanded && (
                    <div
                      className={`absolute bottom-2 right-2 bg-black/70 rounded-full px-2 py-1`}
                      style={{
                        opacity: isSelected ? 1 : 0.7,
                        transition: `opacity ${ANIMATION_DURATION}ms ease-out`,
                      }}
                    >
                      <p className="text-white text-xs">Tap for details</p>
                    </div>
                  )}
                </div>

                {/* Expanded state - separate element for smooth animation */}
                {isMobile && (
                  <>
                    {/* Background overlay */}
                    <div
                      className={`fixed inset-0 bg-black/80 z-40 pointer-events-auto ${
                        isExpanded ? "" : "pointer-events-none"
                      }`}
                      style={{
                        opacity: isExpanded ? 1 : 0,
                        transition: `opacity ${ANIMATION_DURATION}ms ease-out`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageInteraction(null, false);
                      }}
                    />

                    {/* Expanded image */}
                    <div
                      className={`fixed z-50 ${
                        isExpanded ? "" : "pointer-events-none"
                      }`}
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) scale(${
                          isExpanded ? 1 : 0.8
                        })`,
                        opacity: isExpanded ? 1 : 0,
                        transition: `all ${ANIMATION_DURATION}ms ease-out`,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageInteraction(null, false);
                      }}
                    >
                      <Image
                        src={getImgUrl(event.image)}
                        alt={event.name}
                        width={320}
                        height={400}
                        className="object-cover rounded-2xl shadow-2xl w-[80vw] max-w-[320px] h-auto max-h-[60vh]"
                      />

                      {/* Overlay for expanded image with fade-in animation */}
                      <div
                        className="absolute inset-0 bg-black/50 rounded-2xl flex flex-col justify-end p-6"
                        style={{
                          opacity: isExpanded ? 1 : 0,
                          transition: `opacity ${ANIMATION_DURATION}ms ease-out ${
                            isExpanded ? "200ms" : "0ms"
                          }`,
                        }}
                      >
                        <div className="text-white">
                          <p className="font-semibold mb-1 text-base">
                            {event.location} • {formatTime(event.datetime)}
                          </p>
                          {event.description && (
                            <p className="opacity-90 text-xs">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
