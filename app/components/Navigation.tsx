"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getS3Url } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Rush", href: "/rush" },
  { name: "Philanthropy", href: "/philanthropy" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center">
      <div className="hidden sm:flex items-center">
        <ul className="flex justify-end items-center">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="ml-10 uppercase hover:border-b-2 hover:border-white text-xl hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-800 rounded-md transition-colors sm:hidden"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      <div
        className={`fixed left-0 top-16 w-full h-[calc(100vh-4rem)] sm:hidden z-40 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-500 ease-in-out ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out delay-100 ${
            isMenuOpen ? "opacity-30" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${getS3Url("images/dkelion.svg")})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "multiply",
          }}
        />
        <nav
          className={`relative text-center flex flex-col justify-center h-full z-50 transition-all duration-500 ease-out delay-100 ${
            isMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          <ul className="space-y-8">
            {navigationItems.map((item, index) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className={`text-black text-4xl md:text-6xl font-bold hover:text-gray-300 transition-all duration-500 block relative z-10 ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isMenuOpen
                      ? `${300 + index * 100}ms`
                      : "0ms",
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
