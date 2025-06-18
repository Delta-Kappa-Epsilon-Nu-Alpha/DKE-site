import { getS3Url } from "@/lib/utils";
import RedirectButton from "@/app/components/RedirectButton";

export default function Home() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative"
      style={{
        backgroundImage: `url(${getS3Url("images/formalBeach.JPG")})`,
        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <div className="text-center pt-4 md:pt-8">
        <h1
          className="text-6xl md:text-8xl font-bold text-white tracking-wide leading-tight md:leading-normal"
          style={{
            fontFamily: "'Garamond', 'Times New Roman', serif",
            textShadow: `
              0 0 4px rgba(0, 0, 0, 0.6),
              1px 1px 2px rgba(0, 0, 0, 0.7),
              0 0 10px rgba(0, 0, 0, 0.3)
            `,
            filter:
              "drop-shadow(0 0 6px rgba(0, 0, 0, 0.4)) contrast(1.05) brightness(1.02)",
            WebkitTextStroke: "0.3px rgba(0, 0, 0, 0.4)",
          }}
        >
          <span className="inline mr-2 md:inline md:mr-4">Delta</span>
          <span className="inline mr-2 md:inline md:mr-4">Kappa</span>
          <span className="block md:inline">Epsilon</span>
        </h1>
      </div>

      <div className="flex flex-row gap-15 md:gap-80 mt-12 md:mt-4">
        <RedirectButton
          href="/rush"
          borderColor="black"
          textColor="black"
          borderWidth="1.5px"
          className="text-lg md:text-2xl font-bold shadow-2xl hover:shadow-blue-500/30 hover:bg-blue-900/20 hover:scale-110 hover:border-gold-400 hover:text-gold-300 backdrop-blur-sm transition-all duration-300"
        >
          Rush
        </RedirectButton>
        <RedirectButton
          href="/about"
          borderColor="black"
          textColor="black"
          borderWidth="1.5px"
          className="text-lg md:text-2xl font-bold shadow-2xl hover:shadow-blue-500/30 hover:bg-blue-900/20 hover:scale-110 hover:border-gold-400 hover:text-gold-300 backdrop-blur-sm transition-all duration-300"
        >
          About
        </RedirectButton>
      </div>

      <div className="text-center absolute bottom-[15%] md:bottom-[8%]">
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
          <span className="block mr-2 md:inline md:mr-4">Gentlemen.</span>
          <span className="block mr-2 md:inline md:mr-4">Scholars.</span>
          <span className="block mr-2 md:inline md:mr-4">
            Jolly Good Fellows.
          </span>
        </h2>
      </div>
    </div>
  );
}
