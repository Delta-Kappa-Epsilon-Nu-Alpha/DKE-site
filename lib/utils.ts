import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getS3Url(key: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  // If running into caching issues, use first line to load cache (don't push)
  //return `${baseUrl}/${key}?t=${Date.now()}`;
  return `${baseUrl}/${key}`;
}

export const photos = {
  home: {
    landing: "images/formalBeach.JPG",
    gentlemen: ["images/formalCoolers.JPG", "images/fallFest.JPG"],
    scholars: ["images/poker.JPG", "images/fallFest.JPG"],
    jollyGoodFellows: ["images/mexico4.JPG", "images/fallFest.JPG"],
    gridImages: [
      "images/allGrads.jpg",
      "images/fire2.JPG",
      "images/mexico3.JPG",
      "images/gioGator.JPG",
      "images/ianJayden.jpg",
      "images/hammocks.jpg",
      "images/roof.jpg",
      "images/woods.jpg",
      "images/band1.jpg",
      "images/band2.jpg",
      "images/band3.jpg",
      "images/band4.jpg",
      "images/bird.jpg",
      "images/kappa.jpg",
      "images/lambda.jpg",
      "images/dance1.jpg",
      "images/dance2.jpg",
      "images/dance3.jpg",
      "images/springFormal.jpg",
      "images/rodGrad.jpg",
      "images/halloweenDj.JPG",
      "images/podesta.JPG",
      "images/roof.jpg",
      "images/partyDark.JPG",
      "images/hammocks.jpg",
      "images/ianJayden.jpg",
      "images/sunglasses.JPG",
      "images/roof.jpg",
    ],
  },
  about: {
    landing: ""
  }
};
