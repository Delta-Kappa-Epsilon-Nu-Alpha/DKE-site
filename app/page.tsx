import { getS3Url, photos } from "@/lib/utils";
import RedirectButton from "@/app/components/RedirectButton";
import ScrollArrow from "@/app/components/ScrollArrow";
import GridMotion from "@/app/components/photoGrid";
import GridOverlay from "@/app/components/GridOverlay";
import InteractiveImages from "@/app/components/InteractiveImages";
import SplitText from "@/app/components/SplitText";
import Image from "next/image";

function HomeHero() {
  const letterStyle = {
    fontFamily: "'Garamond', 'Times New Roman', serif",
    textShadow: `
      0 0 4px rgba(0, 0, 0, 0.6),
      1px 1px 2px rgba(0, 0, 0, 0.7),
      0 0 10px rgba(0, 0, 0, 0.3)
    `,
    filter:
      "drop-shadow(0 0 6px rgba(0, 0, 0, 0.4)) contrast(1.05) brightness(1.02)",
    WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.4)",
    letterSpacing: "0.05em",
  };

  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${getS3Url(photos.home.landing)})`,
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <div className="text-center pt-4 md:pt-8">
        <div
          className="flex flex-row justify-center items-start gap-8 md:gap-16"
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <span
            className="text-[7rem] md:text-[12rem] font-bold text-white leading-none mb-0"
            style={letterStyle}
          >
            Δ
          </span>
          <span
            className="text-[7rem] md:text-[12rem] font-bold text-white leading-none mb-0"
            style={letterStyle}
          >
            K
          </span>
          <span
            className="text-[7rem] md:text-[12rem] font-bold text-white leading-none mb-0"
            style={letterStyle}
          >
            E
          </span>
        </div>
      </div>
      <div className="text-center -mt-4 md:-mt-6">
        <h2
          className="text-2xl md:text-3xl font-medium text-white tracking-wide"
          style={{
            fontFamily: "'Garamond', 'Times New Roman', serif",
            textShadow: `
              0 0 3px rgba(0, 0, 0, 0.6),
              1px 1px 1px rgba(0, 0, 0, 0.7),
              0 0 8px rgba(0, 0, 0, 0.3)
            `,
            filter:
              "drop-shadow(0 0 4px rgba(0, 0, 0, 0.4)) contrast(1.05) brightness(1.02)",
            WebkitTextStroke: "0.2px rgba(0, 0, 0, 0.4)",
          }}
        >
          Nu Alpha Chapter, Northeastern University
        </h2>
      </div>

      <div className="flex flex-row gap-15 md:gap-80 mt-12 md:mt-4">
        <RedirectButton
          href="/rush"
          textColor="white"
          glassEffect={true}
          className="text-lg md:text-2xl font-bold hover:shadow-blue-500/30 hover:scale-110 hover:text-gold-300 transition-all duration-300"
        >
          Rush
        </RedirectButton>
        <RedirectButton
          href="/about"
          textColor="white"
          glassEffect={true}
          className="text-lg md:text-2xl font-bold hover:shadow-blue-500/30 hover:scale-110 hover:text-gold-300 transition-all duration-300"
        >
          About
        </RedirectButton>
      </div>
      <ScrollArrow />
    </div>
  );
}

function HomeImagesSection() {
  return <InteractiveImages />;
}

function HomeQuoteSection() {
  return (
    <section className="w-full bg-white overflow-hidden relative py-8 md:py-0">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
          {/* Lion SVG - hidden on mobile, visible on desktop */}
          <div className="hidden md:block flex-shrink-0 overflow-hidden">
            <Image
              src={getS3Url("images/dkelion.svg")}
              alt="Lion"
              width={320}
              height={320}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 filter grayscale opacity-60 -my-8 md:-my-12"
            />
          </div>

          {/* Lion SVG - behind text on mobile */}
          <div className="md:hidden absolute inset-0 flex items-center justify-start z-0">
            <Image
              src={getS3Url("images/dkelion.svg")}
              alt="Lion"
              width={320}
              height={320}
              className="w-64 h-64 filter grayscale opacity-20 -ml-20"
            />
          </div>

          {/* Quote with SplitText */}
          <div className="flex-1 text-center md:text-left relative z-10 pl-8 md:pl-0">
            <SplitText
              text={`"I drank beer with my friends. Almost everyone did. Sometimes I
           had too many beers. Sometimes others did. I liked beer. I still like
           beer." - Brett Kavanaugh, Phi Yale`}
              className="text-base md:text-xl lg:text-2xl font-normal text-gray-800 leading-tight"
              splitType="words"
              delay={50}
              duration={0.8}
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeGridSection() {
  return (
    <section className="w-full h-screen relative overflow-hidden">
      <GridMotion
        items={photos.home.gridImages.map((img) => getS3Url(img))}
        gradientColor="rgba(0, 0, 0, 0.1)"
      />
      <GridOverlay />
    </section>
  );
}

export default function HomeWithImages() {
  return (
    <>
      <HomeHero />
      <HomeImagesSection />
      <HomeQuoteSection />
      <HomeGridSection />
    </>
  );
}
