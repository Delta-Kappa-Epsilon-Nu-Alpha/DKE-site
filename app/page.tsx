import { getS3Url } from "@/lib/utils";
import RedirectButton from "@/app/components/RedirectButton";

export default function Home() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${getS3Url("images/gatorArialVert.jpg")})`,
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <div className="text-center pt-4 md:pt-8">
        <h1
          className="text-6xl md:text-8xl font-bold text-white tracking-wide leading-tight md:leading-normal"
          style={{
            fontFamily: "'Times New Roman', serif",
            textShadow: `
              0 0 15px rgba(0, 0, 0, 1),
              2px 2px 4px rgba(0, 0, 0, 1),
              4px 4px 8px rgba(0, 0, 0, 0.95),
              6px 6px 12px rgba(0, 0, 0, 0.9),
              8px 8px 16px rgba(0, 0, 0, 0.8),
              0 0 40px rgba(0, 0, 0, 0.7),
              -2px -2px 4px rgba(255, 255, 255, 0.3),
              -1px -1px 2px rgba(255, 255, 255, 0.5),
              1px 1px 2px rgba(255, 255, 255, 0.2)
            `,
            filter:
              "drop-shadow(0 0 25px rgba(0, 0, 0, 0.9)) contrast(1.2) brightness(1.1)",
            WebkitTextStroke: "1px rgba(0, 0, 0, 0.8)",
          }}
        >
          <span className="inline mr-2 md:inline md:mr-4">Delta</span>
          <span className="inline mr-2 md:inline md:mr-4">Kappa</span>
          <span className="block md:inline">Epsilon</span>
        </h1>
      </div>

      <div className="flex flex-row gap-15 md:gap-80 mt-4 md:mt-0">
        <RedirectButton
          href="/rush"
          borderColor="white"
          textColor="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          borderWidth="3px"
          className="text-lg md:text-xl font-bold shadow-2xl hover:shadow-white/20 hover:bg-black/70 hover:scale-110 hover:border-yellow-400 hover:text-yellow-400 backdrop-blur-sm"
        >
          Rush
        </RedirectButton>
        <RedirectButton
          href="/about"
          borderColor="white"
          textColor="white"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          borderWidth="3px"
          className="text-lg md:text-xl font-bold shadow-2xl hover:shadow-white/20 hover:bg-black/70 hover:scale-110 hover:border-yellow-400 hover:text-yellow-400 backdrop-blur-sm"
        >
          About
        </RedirectButton>
      </div>

      <div className="text-center absolute bottom-[15%] md:bottom-[8%]">
        <h2
          className="text-xl md:text-3xl font-medium text-white tracking-wide"
          style={{
            fontFamily: "'Times New Roman', serif",
            textShadow: `
              0 0 12px rgba(0, 0, 0, 1),
              1px 1px 3px rgba(0, 0, 0, 1),
              2px 2px 6px rgba(0, 0, 0, 0.95),
              3px 3px 9px rgba(0, 0, 0, 0.9),
              4px 4px 12px rgba(0, 0, 0, 0.8),
              0 0 25px rgba(0, 0, 0, 0.7),
              -1px -1px 2px rgba(255, 255, 255, 0.3),
              -0.5px -0.5px 1px rgba(255, 255, 255, 0.5),
              0.5px 0.5px 1px rgba(255, 255, 255, 0.2)
            `,
            filter:
              "drop-shadow(0 0 20px rgba(0, 0, 0, 0.9)) contrast(1.2) brightness(1.1)",
            WebkitTextStroke: "0.5px rgba(0, 0, 0, 0.8)",
          }}
        >
          Gentlemen, Scholars, Jolly Good Fellows
        </h2>
      </div>
    </div>
  );
}
