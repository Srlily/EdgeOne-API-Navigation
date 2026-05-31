'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import MagneticCard from './MagneticCard';

interface APIItem {
  name: string;
  url: string;
  desc: string;
  icon: React.ReactNode;
  status: 'active' | 'maintenance';
}

const ImageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const apiList: APIItem[] = [
  {
    name: '随机图片',
    url: '/api/img',
    desc: '随机返回一张图片',
    icon: <ImageIcon />,
    status: 'active'
  }
];

export default function APIGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const useFlexLayout = apiList.length <= 5;

  const containerClass = apiList.length <= 5 
    ? 'max-w-5xl mx-auto' 
    : 'max-w-7xl';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const headerContainer = document.querySelector('.api-header');
    const items = gridRef.current?.querySelectorAll('.api-item');
    
    if (headerContainer) {
      const headerElements = headerContainer.querySelectorAll('.animate-fade-in');
      if (headerElements.length > 0) {
        gsap.fromTo(
          headerElements,
          { 
            opacity: 0, 
            y: -10 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }
    }

    if (items && items.length > 0) {
      gsap.fromTo(
        items,
        { 
          opacity: 0, 
          y: 40, 
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <div className={`mt-12 w-full ${containerClass} mx-auto`}>
      <div className="flex items-center justify-center gap-2 mb-8 api-header">
        <div className="h-px w-8 bg-white/30 dark:bg-white/30 opacity-0 animate-fade-in" />
        <span className="text-xs font-medium text-white/80 dark:text-white/60 uppercase tracking-widest opacity-0 animate-fade-in">
          API 接口
        </span>
        <div className="h-px w-8 bg-white/30 dark:bg-white/30 opacity-0 animate-fade-in" />
      </div>

      <div ref={gridRef} className={useFlexLayout ? 'flex justify-center gap-4' : `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-center`}>
        {apiList.map((api, index) => (
          <MagneticCard
            key={index}
            href={api.url}
            className="api-item opacity-0"
          >
            <div className="group relative h-full rounded-2xl p-6 backdrop-blur-lg bg-white/15 dark:bg-gray-900/20 border border-white/10 dark:border-gray-700/20 hover:bg-white/25 dark:hover:bg-gray-900/30 transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/30">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent dark:from-white/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 dark:bg-white/5 text-white/80 dark:text-white/70 mb-4 group-hover:bg-white/20 dark:group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 ease-out">
                {api.icon}
              </div>
              
              <div className="relative">
                <h3 className="text-lg font-bold text-white dark:text-white mb-2 group-hover:text-white transition-all duration-500 ease-out">
                  {api.name}
                </h3>
                
                <p className="text-sm text-white/80 dark:text-white/80 mb-4 leading-relaxed transition-all duration-500 ease-out">
                  {api.desc}
                </p>
                
                <div className="flex items-center text-white/70 dark:text-white/70 group-hover:text-white text-sm font-medium transition-all duration-500 ease-out">
                  <span>查看详情</span>
                  <ArrowIcon />
                </div>
              </div>
            </div>
          </MagneticCard>
        ))}
      </div>
    </div>
  );
}
