import { getS3Url, photos } from "@/lib/utils";
import RedirectButton from "@/app/components/RedirectButton";
import ScrollArrow from "@/app/components/ScrollArrow";
import ImageCarousel from "@/app/components/ImageCarousel";
import GridMotion from "@/app/components/photoGrid";
import GridOverlay from "@/app/components/GridOverlay";

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
  const sections = [
    {
      label: "Gentlemen.",
      images: photos.home.gentlemen,
      alt: "Gentlemen",
    },
    {
      label: "Scholars.",
      images: photos.home.scholars,
      alt: "Scholars",
    },
    {
      label: "Jolly Good Fellows.",
      images: photos.home.jollyGoodFellows,
      alt: "Jolly Good Fellows",
    },
  ];

  return (
    <section className="w-full py-8 md:py-16 px-4 md:px-16 flex flex-col items-center relative min-h-screen md:h-screen overflow-hidden bg-white">
      {/* SVG overlays on left and right */}
      <div
        className="hidden md:block absolute left-0 top-[85%] -translate-y-1/3 z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url(${getS3Url("images/dkelion.svg")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          height: "110%",
          width: "30vw",
          minWidth: "340px",
          maxWidth: "600px",
          left: "72px",
          transform: "translateY(-33%)",
        }}
      />
      <div
        className="hidden md:block absolute right-0 top-[45%] -translate-y-1/3 z-10 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url(${getS3Url("images/dkelion.svg")})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right center",
          height: "110%",
          width: "30vw",
          minWidth: "340px",
          maxWidth: "600px",
          right: "32px",
          transform: "scaleX(-1) translateY(-33%)",
        }}
      />
      {/* Removed background image and overlay, set bg-white */}
      <div className="max-w-6xl w-full flex flex-col items-center justify-start gap-8 md:gap-12 relative z-20 h-full">
        {/* Images with labels above, bottom-aligned */}
        <div className="flex flex-col md:flex-row w-full justify-center items-end gap-16 md:gap-20 h-full min-h-[500px] md:min-h-[700px] translate-y-8 md:translate-y-16 transition-transform duration-500">
          {sections.map((section, idx) => (
            <div
              key={section.label + "-img"}
              className={`flex flex-col items-center w-full max-w-[280px] md:max-w-sm h-full ${
                idx === 0
                  ? "md:-translate-y-8 md:-translate-y-16 self-start md:self-auto"
                  : idx === 1
                  ? "md:translate-y-0 self-end md:self-auto"
                  : idx === 2
                  ? "md:translate-y-8 md:translate-y-16 self-start md:self-auto"
                  : ""
              } transition-transform duration-500`}
            >
              <span
                className="text-4xl md:text-5xl font-extrabold text-black text-center drop-shadow-2xl flex items-center justify-center min-h-[4.5rem] mb-4 h-[5.5rem] md:h-[6.5rem]"
                style={{
                  textShadow: `0 0 8px rgba(0,0,0,0.07), 2px 2px 6px rgba(0,0,0,0.08)`,
                  WebkitTextStroke: "1px rgba(0,0,0,0.08)",
                  letterSpacing: "0.04em",
                }}
              >
                {section.label}
              </span>
              <ImageCarousel images={section.images} />
            </div>
          ))}
        </div>
      </div>
      {/* Bottom text below images */}
      <div className="w-full flex justify-center mt-16 md:mt-6 z-30 relative">
        <p className="max-w-3xl text-center text-lg md:text-xl text-gray-700 font-serif opacity-90">
          &quot;I drank beer with my friends. Almost everyone did. Sometimes I
          had too many beers. Sometimes others did. I liked beer. I still like
          beer.&quot; - Brett Kavanaugh, Phi Yale
        </p>
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
      <HomeGridSection />
    </>
  );
}
