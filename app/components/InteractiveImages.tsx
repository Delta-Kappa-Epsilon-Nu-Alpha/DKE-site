"use client";

import { useState, useEffect, useRef } from "react";
import { getS3Url } from "@/lib/utils";
import CountUp from "./CountUp";
import RotatingText from "./RotatingText";

export default function InteractiveImages() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const images = [
    "images/formalCoolers.JPG",
    "images/harrison.jpg",
    "images/mexico4.JPG",
  ];

  // Handle mobile scroll-based highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const windowHeight = window.innerHeight;

      // Calculate which image should be active based on which one's center crosses the window center
      const imageHeight = sectionHeight / 3;
      const windowCenter = windowHeight / 2;

      // Calculate the center of each image
      const image0Center = sectionTop + imageHeight / 2;
      const image1Center = sectionTop + imageHeight + imageHeight / 2;
      const image2Center = sectionTop + 2 * imageHeight + imageHeight / 2;

      // Determine which image's center has crossed the window center
      // We need to scroll far enough that the next image's center crosses the window center
      if (image0Center <= windowCenter && image1Center > windowCenter) {
        setActiveIndex(0);
      } else if (image1Center <= windowCenter && image2Center > windowCenter) {
        setActiveIndex(1);
      } else if (image2Center <= windowCenter) {
        setActiveIndex(2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInnerImageStyle = (index: number) => {
    const isActive =
      hoveredIndex === index ||
      (hoveredIndex === null && activeIndex === index);
    const isHovered = hoveredIndex === index;

    return {
      backgroundImage: `url(${getS3Url(images[index])})`,
      filter: isActive ? "none" : "grayscale(80%) brightness(0.7)",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      transition: "filter 0.3s ease-in-out, transform 0.3s ease-in-out",
    };
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen md:h-[90vh] flex flex-col md:flex-row"
    >
      {/* Left image */}
      <div
        className="w-full md:w-1/3 h-1/3 md:h-full overflow-hidden cursor-pointer relative flex flex-col"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-white text-3xl md:text-4xl lg:text-5xl font-serif font-semibold drop-shadow-2xl text-center uppercase tracking-wide [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
          Gentlemen
        </div>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={getInnerImageStyle(0)}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 text-white text-lg md:text-xl lg:text-2xl font-serif font-semibold drop-shadow-2xl text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)] pb-8 space-y-2">
          <div className="whitespace-nowrap">4x honored by IHQ</div>
          <div className="whitespace-nowrap">
            $
            <CountUp to={45000} from={0} duration={1.5} delay={0.25} />+ raised
            for charity
          </div>
        </div>
      </div>

      {/* Middle image */}
      <div
        className="w-full md:w-1/3 h-1/3 md:h-full overflow-hidden cursor-pointer relative flex flex-col"
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 text-white text-3xl md:text-4xl lg:text-5xl font-serif font-semibold drop-shadow-2xl text-center uppercase tracking-wide [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
          Scholars
        </div>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={getInnerImageStyle(1)}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 text-white text-lg md:text-xl lg:text-2xl font-serif font-semibold drop-shadow-2xl text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)] pb-8 space-y-2">
          <div className="whitespace-nowrap">
            Average GPA:{" "}
            <CountUp
              to={3.57}
              from={0}
              duration={1.5}
              delay={0.25}
              decimals={2}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="whitespace-nowrap">Dekes Are Working At:</span>
            <RotatingText
              texts={[
                "SpaceX",
                "Abiomed",
                "Goldman Sachs",
                "BCG",
                "Deloitte",
                "Frensius MC",
                "MORSE",
                "Draper",
                "Spectre",
                "Honeybee",
                "JPM",
                "notability",
                "Abbott",
                "Point 72",
              ]}
              mainClassName="text-white font-serif font-semibold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)] whitespace-nowrap"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden"
              elementLevelClassName="text-white font-serif font-semibold drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </div>
        </div>
      </div>

      {/* Right image */}
      <div
        className="w-full md:w-1/3 h-1/3 md:h-full overflow-hidden cursor-pointer relative flex flex-col"
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-white text-3xl md:text-4xl lg:text-5xl font-serif font-semibold drop-shadow-2xl text-center uppercase tracking-wide w-4/5 leading-tight [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
          Jolly Good Fellows
        </div>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={getInnerImageStyle(2)}
        />
        <div className="absolute bottom-0 left-0 right-0 z-10 text-white text-lg md:text-xl lg:text-2xl font-serif font-semibold drop-shadow-2xl text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)] pb-8 space-y-2">
          <div className="whitespace-nowrap">3,000,000+ Beers Consumed</div>
          <div className="whitespace-nowrap">
            Alphonsus Noise Complaints:{" "}
            <CountUp to={18} from={0} duration={1.5} delay={0.25} />
          </div>
        </div>
      </div>
    </section>
  );
}
