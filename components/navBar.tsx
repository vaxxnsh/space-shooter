import { Terminal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="z-40 flex items-center justify-between px-4 py-3 bg-neutral-900/5 backdrop-blur-xl border-white/10 fixed rounded-3xl top-4 border w-[94%] md:w-[80%] mx-auto left-1/2 -translate-x-1/2 animate-fade-in">
      {/* Logo Section */}
      <div className="text-2xl font-medium tracking-tighter flex items-center gap-2">
        <div className="w-10 aspect-square overflow-hidden relative">
          <Image
            alt="Opensox AI Logo"
            fill
            className="object-cover"
            src="/images/logo.svg"
          />
        </div>
        <span>Edu-Ease.ai</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-5 tracking-tight text-lg font-light text-[#d1d1d1]">
        <Link href="/maps" className="cursor-pointer hover:text-white transition-colors">
          Courses
        </Link>
        <Link href="/#features" className="cursor-pointer hover:text-white transition-colors">
          3d Hackathon Search
        </Link>
        <Link href="/#demo" className="cursor-pointer hover:text-white transition-colors">
          Extensions
        </Link>
        <Link href="/game-room" className="cursor-pointer hover:text-white transition-colors">
          Learning Games
        </Link>
        <Link href=" http://localhost:3001/ai-playground" className="cursor-pointer hover:text-white transition-colors">
          Project Builder
        </Link>
        {/* <Link href="/#Contact" className="cursor-pointer hover:text-white transition-colors">
          Contact
        </Link> */}
      </div>

      {/* CTA Button */}
      <div>
        <Link href="/dashboard/home" className="cursor-pointer z-30">
          <button className="flex gap-2 border-x border-t-2 border-[#6348fc] items-center justify-center bg-gradient-to-b from-[#5728f4] to-[#5100FF] px-5 py-3 rounded-[16px] relative [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90 transition-opacity duration-100 text-white font-medium">
            <Terminal className="w-5 h-5" />
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}