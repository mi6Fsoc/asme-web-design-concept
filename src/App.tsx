/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { ArrowRight, Globe, Instagram, Twitter } from "lucide-react";
import { AboutSection } from "./components/AboutSection";
import { FeaturedVideoSection } from "./components/FeaturedVideoSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ServicesSection } from "./components/ServicesSection";

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeAnimation: number;

    const animateOpacity = (start: number, end: number, duration: number, callback?: () => void) => {
      const startTime = performance.now();
      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        if (video) {
        	video.style.opacity = (start + (end - start) * progress).toString();
        }
        if (progress < 1) {
          fadeAnimation = requestAnimationFrame(update);
        } else if (callback) {
          callback();
        }
      };
      cancelAnimationFrame(fadeAnimation);
      fadeAnimation = requestAnimationFrame(update);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {});
      animateOpacity(0, 1, 500);
    };

    let fadingOut = false;
    const handleTimeUpdate = () => {
      if (!video) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOut) {
        fadingOut = true;
        animateOpacity(parseFloat(video.style.opacity || '1'), 0, 500);
      }
    };

    const handleEnded = () => {
      if (!video) return;
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
        fadingOut = false;
        animateOpacity(0, 1, 500);
      }, 100);
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      cancelAnimationFrame(fadeAnimation);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden relative flex flex-col bg-black">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
        className="absolute inset-0 w-full h-full object-cover object-bottom"
        muted
        playsInline
        preload="auto"
        style={{ opacity: 0 }}
      />
      
      <nav className="relative z-20 px-6 py-6 w-full">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-white" />
              <span className="text-white font-semibold text-lg">Asme</span>
            </div>
            <div className="hidden md:flex gap-8 ml-10">
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Features</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Pricing</a>
              <a href="#" className="text-white/80 hover:text-white text-sm font-medium transition-colors">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white text-sm font-medium hidden sm:block">Sign Up</button>
            <button className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium">Login</button>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center transform -translate-y-8 md:-translate-y-16">
        <h1 className="text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-12 font-serif">
          Know it <em className="italic">all</em>.
        </h1>
        
        <div className="w-full max-w-xl flex flex-col items-center gap-6">
            <div className="liquid-glass rounded-full w-full pl-6 pr-2 py-2 flex items-center gap-3">
            <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 text-base"
            />
            <button className="bg-white rounded-full p-3 text-black transition-transform hover:scale-105">
                <ArrowRight className="w-5 h-5" />
            </button>
            </div>
            <p className="text-white text-sm leading-relaxed px-4 max-w-md">
            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>
            <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors mt-2">
                Manifesto
            </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12 mt-auto">
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group">
          <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group">
          <Twitter className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
        <button className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group">
          <Globe className="w-5 h-5 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white/20 selection:text-white">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  );
}
