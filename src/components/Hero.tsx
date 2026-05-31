'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -10, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5 }
      );
    }

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current.querySelectorAll('.char'),
        { opacity: 0, y: 40, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0,
          rotateX: 0,
          duration: 0.8, 
          stagger: 0.04
        },
        '-=0.2'
      );
    }

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6 },
        '-=0.4'
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const titleText = 'SrlilyのAPI导航页';
  const chars = titleText.split('');

  return (
    <div ref={containerRef} className="text-center space-y-6 mb-16 relative">

      <h1 
        ref={titleRef}
        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient-gray dark:[&>span]:text-white [&>span]:text-black px-4 py-2"
        style={{ perspective: '1000px' }}
      >
        {chars.map((char, index) => (
          <span 
            key={index} 
            className={`char inline-block ${char === 'の' ? 'text-gray-400' : ''}`}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
      
      <div ref={lineRef} className="w-16 h-[2px] bg-gradient-to-r from-transparent via-white/40 dark:via-white/40 to-transparent mx-auto origin-center animate-breathe" />
      
      <p 
        ref={subtitleRef}
        className="text-lg text-white/70 dark:text-white/70 max-w-xl mx-auto leading-relaxed"
      >
        目前已经部署的API接口，方便快速访问
      </p>

    </div>
  );
}
