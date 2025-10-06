import { Link, Terminal } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="w-full h-[50dvh] lg:h-[69dvh] relative overflow-hidden z-10 p-4 lg:p-[60px] flex flex-col items-center justify-center gap-6">
      <Image
        alt="background"
        fill
        className="object-cover max-md:object-top w-full h-full absolute -z-10 opacity-90"
        src="/images/bgmain.svg"
      />
      
      <div className="w-full lg:max-w-3xl space-y-3 text-center">
        <h1 className="text-5xl text-[2.8rem] lg:text-7xl lg:text-[6rem] font-medium tracking-tighter">
          Knowledge quests for curious minds
        </h1>
        <p className="w-full lg:text-2xl tracking-tight font-light sm:max-w-lg mx-auto lg:max-w-4xl lg:text-balance text-[#e1e1e1]">
         A Gamified Learning Experience Designed to Turn Every Question Into a Rewarding Adventure
        </p>
      </div>

      <div className="cursor-pointer z-30">
        <Link href="/dashboard/home" className="block">
          <button className="flex gap-2 border-x border-t-2 border-[#6348fc] items-center justify-center bg-gradient-to-b from-[#5728f4] to-[#5100FF] px-5 py-3 rounded-[16px] relative [box-shadow:0px_-2px_0px_-0px_#2c04b1_inset] hover:opacity-90 transition-opacity duration-100 text-white font-medium">
            <Terminal className="w-5 h-5" />
            Get Started
          </button>
        </Link>
      </div>

      <div className="absolute h-[50%] w-full bg-gradient-to-t from-[#101010] via-transparent to-transparent bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
  );
}