import React from "react";
import Link from "next/link";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <Link href="/" style={{ color: "white", margin: "0 10px" }}>
          Home
        </Link>{" "}
        |
        <Link href="/about" style={{ color: "white", margin: "0 10px" }}>
          About Us
        </Link>{" "}
        |
        <Link href="/philanthropy" style={{ color: "white", margin: "0 10px" }}>
          Philanthropy
        </Link>{" "}
        |
        <Link href="/rush" style={{ color: "white", margin: "0 10px" }}>
          Rush
        </Link>
      </div>
      <div
        style={{
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          href="https://www.linkedin.com"
          style={{ color: "white", margin: "0 10px" }}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://www.instagram.com"
          style={{ color: "white", margin: "0 10px" }}
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com"
          style={{ color: "white", margin: "0 10px" }}
        >
          <FaFacebook />
        </a>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <Link
          href="https://collect.crowded.me/collection/8620c6a3-2b16-4adc-925e-d52526098ace"
          passHref
        >
          <button
            style={{
              cursor: "pointer",
              border: "2px solid gold",
              color: "gold",
              backgroundColor: "transparent",
              padding: "5px 15px",
              borderRadius: "20px",
            }}
          >
            Donate
          </button>
        </Link>
      </div>
      <div style={{ fontSize: "12px" }}>
        © Nu Alpha Chapter of Delta Kappa Epsilon 2025
      </div>
    </footer>
  );
};

export default Footer;
