import Timeline from "./Timeline";
import { getS3Url } from "@/lib/utils";
import ScrollArrow from "../components/ScrollArrow";

export default function Rush() {
  return (
    <div className="w-full min-h-screen">
      {/* Fullscreen Video Section */}
      <div className="relative w-full h-screen overflow-hidden">
        <video
          src={getS3Url("videos/rushVideo1.mp4")}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay for Arrow and Text */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col items-center pb-12 z-10">
          <span className="text-white text-xl font-semibold mb-2 drop-shadow-lg">
            Come Meet Us
          </span>
          <ScrollArrow />
        </div>
        {/* Optional: Add a dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>
      {/* Timeline Section */}
      <section className="w-full bg-white py-12" id="timeline-section">
        <h1 className="text-4xl font-bold mb-6 text-center">Rush Events</h1>
        <Timeline />
      </section>
    </div>
  );
}
