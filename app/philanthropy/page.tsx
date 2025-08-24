"use client";

import React, { useState, useEffect } from "react";
import { Heart, ChevronUp, DollarSign, Clock, Users } from "lucide-react";
import { getImgUrl } from "@/lib/utils";
import { philanthropyData } from "./philanthropyData";
import Image from "next/image";

const PhilanthropyPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Icon mapping function
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "dollar":
        return <DollarSign className="w-5 h-5" />;
      case "clock":
        return <Clock className="w-5 h-5" />;
      case "heart":
        return <Heart className="w-5 h-5" />;
      case "users":
        return <Users className="w-5 h-5" />;
      default:
        return null;
    }
  };

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDonate = (charityName: string, donationUrl?: string) => {
    if (donationUrl) {
      window.open(donationUrl, "_blank");
    } else {
      alert(
        `Thank you for your interest in donating to ${charityName}! You will be redirected to the donation page.`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute -top-100 left-0 w-full h-[calc(100%+25rem)] object-cover"
        >
          <source
            src={getImgUrl(
              philanthropyData.hero.videoUrl || "/videos/philanthropy-hero.mp4"
            )}
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80" />

        {/* Animated background effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-6 transition-all duration-1000 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "-translate-y-10 opacity-0"
            }`}
          >
            {philanthropyData.hero.title}
          </h1>

          <p
            className={`text-lg sm:text-xl text-gray-200 text-center max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-200 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {philanthropyData.hero.subtitle}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {philanthropyData.hero.stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer delay-${
                  index * 100
                } ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-200 flex items-center gap-2">
                  {getIcon(stat.iconName)}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Charities Section */}
      <section className="bg-white rounded-t-3xl -mt-8 relative z-10 pt-16 pb-20 overflow-hidden">
        {/* SVG Pattern Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Pattern 1 - Top Left */}
          <div className="absolute top-10 left-10 w-64 h-64 opacity-10">
            <Image
              src={getImgUrl("images/dkelion.svg")}
              alt=""
              width={256}
              height={256}
              className="transform"
            />
          </div>
          {/* Pattern 2 - Top Right */}
          <div className="absolute top-82 right-20 w-48 h-48 opacity-10">
            <Image
              src={getImgUrl("images/dkelion.svg")}
              alt=""
              width={192}
              height={192}
              className="transform"
            />
          </div>
          {/* Pattern 3 - Middle Left */}
          <div className="absolute top-1/2 left-100 w-72 h-72 transform -translate-y-1/2 -translate-x-1/3 opacity-10">
            <Image
              src={getImgUrl("images/dkelion.svg")}
              alt=""
              width={288}
              height={288}
              className="transform"
            />
          </div>
          {/* Pattern 4 - Bottom Right */}
          <div className="absolute bottom-20 right-10 w-56 h-56 opacity-10">
            <Image
              src={getImgUrl("images/dkelion.svg")}
              alt=""
              width={224}
              height={224}
              className="transform"
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Partner Charities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6 rounded-full" />
            <p className="text-lg text-gray-600">
              Click on any charity to learn more about our partnership
            </p>
          </div>

          {/* Charity Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {philanthropyData.charities.map((charity, index) => (
              <div
                key={charity.id}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-fadeInUp`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Header/Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center overflow-hidden group">
                  {charity.imageUrl ? (
                    <Image
                      src={getImgUrl(charity.imageUrl)}
                      alt={charity.name}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg text-center px-4">
                      {charity.imagePlaceholder}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {charity.name}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {charity.description}
                  </p>

                  {/* Stats */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-500">
                          {charity.stats.primaryValue}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {charity.stats.primaryLabel}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-500">
                          {charity.stats.secondaryValue}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {charity.stats.secondaryLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <button
                    onClick={() =>
                      handleDonate(charity.name, charity.donationUrl)
                    }
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Donate Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 ${
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PhilanthropyPage;
