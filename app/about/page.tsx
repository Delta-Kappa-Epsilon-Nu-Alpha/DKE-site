"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImgUrl } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Quote,
  Users,
  Calendar,
  DollarSign,
  Heart,
  BookOpen,
  Star,
  Award,
  Target,
} from "lucide-react";
import { aboutData } from "./aboutData";

// Type definitions
interface StatItemProps {
  number: string;
  label: string;
  icon?: React.ReactNode;
}

interface MasonryItemProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  height: number;
}

interface TextBlockProps {
  title: string;
  content: string[];
  align?: "left" | "center" | "right";
  icon?: React.ReactNode;
}

// Text Block Component
const TextBlock: React.FC<TextBlockProps> = ({
  title,
  content,
  align = "left",
  icon,
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px" }}
      className={`max-w-4xl ${align === "center" ? "mx-auto" : ""} mb-8`}
    >
      {icon && (
        <div className={`mb-6 ${alignmentClasses[align]}`}>
          <span className="inline-block p-4 bg-gradient-to-br from-rose-400 to-rose-500 rounded-full text-white shadow-lg">
            {icon}
          </span>
        </div>
      )}
      <h3
        className={`text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent ${alignmentClasses[align]}`}
        style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
      >
        {title}
      </h3>
      {content.map((paragraph, index) => (
        <p
          key={index}
          className={`text-lg text-gray-700 mb-4 leading-relaxed ${alignmentClasses[align]}`}
        >
          {paragraph}
        </p>
      ))}
    </motion.div>
  );
};

// Stat Item Component
const StatItem: React.FC<StatItemProps> = ({ number, label, icon }) => {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(number.replace(/\D/g, ""));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetNumber]);

  const displayNumber = number.includes("$")
    ? `$${(count / 1000000).toFixed(1)}M`
    : number.includes("+")
    ? `${count.toLocaleString()}+`
    : count.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, margin: "-30px" }}
      className="text-center group"
    >
      {icon && (
        <div className="mb-3 flex justify-center text-amber-500 group-hover:text-amber-400 transition-colors duration-300">
          {icon}
        </div>
      )}
      <span
        className="block text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent"
        style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
      >
        {displayNumber}
      </span>
      <span className="mt-2 block text-sm uppercase tracking-widest text-gray-600 font-medium">
        {label}
      </span>
    </motion.div>
  );
};

// Masonry Item Component
const MasonryItem: React.FC<MasonryItemProps> = ({
  src,
  alt,
  title,
  description,
  height,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10px" }}
      className="relative overflow-hidden rounded-xl mb-6 group cursor-pointer break-inside-avoid shadow-lg hover:shadow-2xl transition-shadow duration-500"
      style={{ height: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 md:opacity-0 opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-800/90 to-transparent text-white p-6 transform translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-400">
        <h3 className="text-lg font-bold mb-1 text-amber-100">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>
    </motion.div>
  );
};

// Main About Page Component
const AboutPage: React.FC = () => {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 50]);

  const scrollToHistory = () => {
    const historySection = document.getElementById("history-section");
    if (historySection) {
      historySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getIcon = (name?: string) => {
    switch (name) {
      case "Star":
        return <Star className="w-8 h-8" />;
      case "Users":
        return <Users className="w-8 h-8" />;
      case "Calendar":
        return <Calendar className="w-8 h-8" />;
      case "DollarSign":
        return <DollarSign className="w-8 h-8" />;
      case "Heart":
        return <Heart className="w-8 h-8" />;
      case "BookOpen":
        return <BookOpen className="w-8 h-8" />;
      case "Award":
        return <Award className="w-8 h-8" />;
      case "Target":
        return <Target className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white">
        <motion.div
          style={{ y: heroParallax }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={getImgUrl(aboutData.hero.image)}
            alt="Brotherhood Hero"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 border-2 border-amber-400 rounded-full text-amber-300 text-sm font-semibold tracking-widest uppercase mb-6">
              {aboutData.hero.est}
            </span>
          </motion.div>

          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wider mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent"
            style={{
              fontFamily: "'Garamond', 'Times New Roman', serif",
              textShadow: "0 0 30px rgba(0,0,0,0.8)",
            }}
          >
            {aboutData.hero.title}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl font-light text-gray-200 max-w-3xl mx-auto leading-relaxed"
          >
            {aboutData.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link href="/rush">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
                whileTap={{ scale: 0.95 }}
                className="w-fit px-6 md:px-8 py-2 md:py-3 bg-rose-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {aboutData.hero.buttons.rush}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#fbbf24" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToHistory}
              className="w-fit px-6 md:px-8 py-2 md:py-3 border-2 border-amber-400 text-amber-300 font-semibold rounded-full hover:bg-amber-400/10 transition-all duration-300"
            >
              {aboutData.hero.buttons.history}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Introduction Text Block */}
      <section
        id="history-section"
        className="py-16 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <TextBlock
            title={aboutData.history.title}
            content={aboutData.history.content}
            align="center"
            icon={getIcon(aboutData.history.iconName)}
          />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-12"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-amber-200 mb-4"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              {aboutData.stats.title}
            </h2>
            <p className="text-gray-300 text-lg">{aboutData.stats.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {aboutData.stats.items.map((stat, index) => (
              <StatItem
                key={index}
                number={stat.number}
                label={stat.label}
                icon={getIcon(stat.iconName)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-gradient-to-br from-amber-50 to-rose-50 py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-30px" }}
            className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-amber-200"
          >
            <Quote className="w-16 h-16 md:w-20 md:h-20 text-amber-500 opacity-30 absolute -top-8 left-1/2 transform -translate-x-1/2" />
            <blockquote
              className="text-xl md:text-2xl lg:text-3xl italic text-slate-700 leading-relaxed mt-4"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              &ldquo;{aboutData.quote.text}&rdquo;
            </blockquote>
            <cite className="block mt-8 text-lg text-rose-600 font-semibold not-italic">
              {aboutData.quote.author}
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Values Text Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-30px" }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              {aboutData.values.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutData.values.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {aboutData.values.items.map((value, index) => (
              <TextBlock
                key={index}
                title={value.title}
                content={value.content}
                icon={getIcon(value.iconName)}
                align="center"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-30px" }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent mb-4"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              {aboutData.gallery.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutData.gallery.subtitle}
            </p>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
            {aboutData.gallery.items.map((item, index) => {
              // Define heights based on index to maintain the masonry look
              const heights = [320, 400, 350, 280, 380, 340];
              const height = heights[index % heights.length];

              return (
                <MasonryItem
                  key={index}
                  src={getImgUrl(item.src)}
                  alt={item.alt}
                  title={item.title}
                  description={item.description}
                  height={height}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Athletics and Leadership Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <TextBlock
            title={aboutData.brotherhood.title}
            content={aboutData.brotherhood.content}
            align="center"
            icon={getIcon(aboutData.brotherhood.iconName)}
          />
        </div>
      </section>

      {/* Excellence Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={getImgUrl(aboutData.excellence.image)}
                  alt="Brotherhood Excellence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="inline-block px-4 py-2 bg-amber-500/90 rounded-full text-slate-800 text-sm font-semibold">
                    {aboutData.excellence.badge}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                  {aboutData.excellence.missionBadge}
                </span>
                <h2
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-800 bg-clip-text text-transparent mb-6"
                  style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
                >
                  {aboutData.excellence.title}
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed">
                {aboutData.excellence.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-rose-600 mb-1">
                    {aboutData.excellence.stats.championships}
                  </div>
                  <div className="text-sm text-gray-600">Championships</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-md">
                  <div className="text-2xl font-bold text-rose-600 mb-1">
                    {aboutData.excellence.stats.gpa}
                  </div>
                  <div className="text-sm text-gray-600">Average GPA</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section with Images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {aboutData.journey.title}
              </h2>
              {aboutData.journey.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-600 mb-4 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-5 order-1 lg:order-2"
            >
              {aboutData.journey.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-48 md:h-64 rounded-lg overflow-hidden ${
                    index % 2 !== 0 ? "mt-8 md:mt-10" : ""
                  }`}
                >
                  <Image
                    src={getImgUrl(image)}
                    alt={`Historic Photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brotherhood Experience Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <TextBlock
              title="The Brotherhood Experience"
              content={[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
              ]}
              align="center"
            />
          </div>
        </div>
      </section>

      {/* Dark Quote Section */}
      <section className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-30px" }}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-amber-400/30"
          >
            <Quote className="w-16 h-16 md:w-20 md:h-20 text-amber-400 opacity-40 absolute -top-8 left-1/2 transform -translate-x-1/2" />
            <blockquote
              className="text-xl md:text-2xl lg:text-3xl italic text-white leading-relaxed mt-4"
              style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
            >
              &ldquo;{aboutData.darkQuote.text}&rdquo;
            </blockquote>
            <cite className="block mt-8 text-lg text-amber-300 font-semibold not-italic">
              {aboutData.darkQuote.author}
            </cite>
          </motion.div>
        </div>
      </section>

      {/* Final Text Block - Why Join */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <TextBlock
            title={aboutData.whyJoin.title}
            content={aboutData.whyJoin.content}
            align="center"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-30px" }}
          className="container mx-auto text-center text-white relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 border-2 border-amber-400 rounded-full text-amber-300 text-sm font-semibold tracking-widest uppercase mb-8">
              {aboutData.cta.badge}
            </span>
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent"
            style={{ fontFamily: "'Garamond', 'Times New Roman', serif" }}
          >
            {aboutData.cta.title}
          </h2>

          <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {aboutData.cta.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link href="/rush">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
                whileTap={{ scale: 0.95 }}
                className="w-fit bg-amber-500 text-slate-800 px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {aboutData.cta.buttons.rush}
              </motion.button>
            </Link>
            <motion.button
              whileHover={{
                scale: 1.05,
                borderColor: "#fbbf24",
                backgroundColor: "rgba(251, 191, 36, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-fit border-2 border-white text-white px-6 md:px-10 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:border-amber-400 hover:text-amber-300 transition-all duration-300"
            >
              {aboutData.cta.buttons.contact}
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default AboutPage;
