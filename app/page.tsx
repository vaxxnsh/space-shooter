import FeaturesSection from "@/components/features";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <HeroSection/>
      <FeaturesSection/>
      <Footer/>
    </div>
  );
}
