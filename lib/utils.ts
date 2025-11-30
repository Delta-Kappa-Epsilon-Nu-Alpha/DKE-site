import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImgUrl(key: string): string {
  //S3 bucket use case -- older verson
  // const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
  // If running into caching issues, use first line to load cache (don't push)
  //return `${baseUrl}/${key}?t=${Date.now()}`;
  // return `${baseUrl}/${key}`;
  return `/dke_media/${key}`;
}
