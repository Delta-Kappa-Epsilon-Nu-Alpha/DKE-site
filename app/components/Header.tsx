import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-100 h-16">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 h-full">
        <div className="flex items-center justify-center w-10 h-10">
          <Link href="/" className="block">
            <Image
              src="/badge.png"
              alt="Fraternity Badge"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </Link>
        </div>

        <Navigation />
      </div>
    </header>
  );
}
