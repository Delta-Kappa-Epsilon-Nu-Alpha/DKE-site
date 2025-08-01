"use client";

import { useEffect, useRef, FC } from "react";
import { gsap } from "gsap";

interface GridMotionProps {
  items?: string[];
  gradientColor?: string;
}

const GridMotion: FC<GridMotionProps> = ({
  items = [],
  gradientColor = "black",
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(0);
  const scrollYRef = useRef<number>(0);

  const totalItems = 28;
  const defaultItems = Array.from(
    { length: totalItems },
    (_, index) => `Item ${index + 1}`
  );
  const combinedItems =
    items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    // Initialize mouse position after component mounts
    mouseXRef.current = window.innerWidth / 2;

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const handleScroll = (): void => {
      scrollYRef.current = window.scrollY;
    };

    const updateMotion = (): void => {
      const isMobile = window.innerWidth < 768;
      const maxMoveAmount = isMobile ? 400 : 300; // Slightly more movement range on mobile
      const baseDuration = 0.8;
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2];
      const scrollProgress = Math.min(
        scrollYRef.current / (window.innerHeight * 2),
        1
      );

      // Combine mouse and scroll effects
      const mouseEffect =
        (mouseXRef.current / window.innerWidth) * maxMoveAmount -
        maxMoveAmount / 2;

      // Enhanced scroll effect for mobile - more movement to show off-screen photos
      const scrollMultiplier = isMobile ? 1.2 : 0.5; // Slightly stronger scroll effect on mobile
      const scrollEffect =
        (scrollProgress * maxMoveAmount - maxMoveAmount / 2) * scrollMultiplier;

      const combinedEffect = mouseEffect + scrollEffect;

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount = combinedEffect * direction;

          gsap.to(row, {
            x: moveAmount,
            duration:
              baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      removeAnimationLoop();
    };
  }, []);

  return (
    <div ref={gridRef} className="h-full w-full overflow-hidden">
      <section
        className="w-full h-screen overflow-hidden relative flex items-center justify-center"
        style={{
          background: `radial-gradient(circle, ${gradientColor} 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 pointer-events-none z-[4] bg-[length:250px]"></div>
        <div className="gap-2 md:gap-4 flex-none relative w-[300vw] md:w-[150vw] h-[150vh] grid grid-rows-4 grid-cols-1 rotate-[-15deg] origin-center z-[2]">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-2 md:gap-4 grid-cols-7"
              style={{ willChange: "transform, filter" }}
              ref={(el) => {
                if (el) rowRefs.current[rowIndex] = el;
              }}
            >
              {Array.from({ length: 7 }, (_, itemIndex) => {
                const content = combinedItems[rowIndex * 7 + itemIndex];
                return (
                  <div key={itemIndex} className="relative">
                    <div className="relative w-full h-full overflow-hidden rounded-[10px] bg-[#111] flex items-center justify-center text-white text-[1.5rem]">
                      {typeof content === "string" ? (
                        <div
                          className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                          style={{
                            backgroundImage: `url(${content})`,
                            aspectRatio: "1 / 1",
                          }}
                        ></div>
                      ) : (
                        <div className="p-4 text-center z-[1]">{content}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="relative w-full h-full top-0 left-0 pointer-events-none"></div>
      </section>
    </div>
  );
};

export default GridMotion;
