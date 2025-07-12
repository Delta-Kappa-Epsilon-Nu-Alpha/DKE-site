"use client";

import { getS3Url } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  width?: number;
  height?: number;
  minInterval?: number;
  maxInterval?: number;
  className?: string;
  fullScreen?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  width = 300,
  height = 400,
  minInterval = 2000,
  maxInterval = 5000,
  className = "",
  fullScreen = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideOffset, setSlideOffset] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const getRandomInterval = (): number =>
      Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval;

    const scheduleNext = (): NodeJS.Timeout => {
      const timeout = setTimeout(() => {
        setIsAnimating(true);

        // Start the slide animation
        const slideDistance = fullScreen ? -100 : -width;
        setSlideOffset(slideDistance);

        // After animation completes, reset and update index
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          setSlideOffset(0);
          setIsAnimating(false);
        }, 500);

        scheduleNext();
      }, getRandomInterval());

      return timeout;
    };

    const timeout = scheduleNext();
    return () => clearTimeout(timeout);
  }, [images.length, minInterval, maxInterval, width, fullScreen]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 ${
          fullScreen ? "w-full h-full" : "rounded-lg"
        } ${className}`}
        style={fullScreen ? {} : { width: `${width}px`, height: `${height}px` }}
      >
        <p className="text-gray-500">No images provided</p>
      </div>
    );
  }

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void => {
    console.error("Image failed to load:", e);
    const target = e.target as HTMLImageElement;
    target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="#6b7280" font-family="Arial, sans-serif" font-size="16">
          Image not found
        </text>
      </svg>
    `)}`;
  };

  const nextIndex = (currentIndex + 1) % images.length;

  // For debugging
  console.log("ImageCarousel props:", {
    images,
    fullScreen,
    currentIndex,
    slideOffset,
  });

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 ${
        fullScreen ? "w-full h-full" : "rounded-lg shadow-lg"
      } ${className}`}
      style={fullScreen ? {} : { width: `${width}px`, height: `${height}px` }}
    >
      {/* Sliding container with both images */}
      <div
        className={`flex ${
          isAnimating ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{
          transform: fullScreen
            ? `translateX(${slideOffset}vw)`
            : `translateX(${slideOffset}px)`,
          width: fullScreen ? "200vw" : `${width * 2}px`,
        }}
      >
        {/* Current Image */}
        <div
          className="flex-shrink-0 relative"
          style={
            fullScreen
              ? { width: "100vw", height: "100vh" }
              : { width: `${width}px`, height: `${height}px` }
          }
        >
          <Image
            src={getS3Url(images[currentIndex])}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            onError={handleImageError}
            priority={fullScreen}
          />
        </div>

        {/* Next Image */}
        <div
          className="flex-shrink-0 relative"
          style={
            fullScreen
              ? { width: "100vw", height: "100vh" }
              : { width: `${width}px`, height: `${height}px` }
          }
        >
          <Image
            src={getS3Url(images[nextIndex])}
            alt={`Slide ${nextIndex + 1}`}
            fill
            className="object-cover"
            onError={handleImageError}
            priority={fullScreen}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
