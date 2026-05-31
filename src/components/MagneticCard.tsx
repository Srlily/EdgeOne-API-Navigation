'use client';

import { useRef, useState, useCallback } from 'react';

interface MagneticCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticCard({ href, children, className = '' }: MagneticCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = (y / rect.height) * -8;
      const rotateY = (x / rect.width) * 8;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    }
    setIsHovered(false);
    setIsPressed(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsPressed(true);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(0.98)';
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  return (
    <a
      ref={cardRef}
      href={href}
      className={`cursor-pointer transition-all duration-300 ease-out ${className} ${
        isHovered ? 'z-10' : ''
      } ${isPressed ? 'scale-[0.98]' : ''}`}
      style={{
        transition: isPressed ? 'transform 0.1s ease-out' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </a>
  );
}
