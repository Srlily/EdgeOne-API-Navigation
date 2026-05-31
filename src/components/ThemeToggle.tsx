'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else if (stored === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setTimeout(() => setIsAnimating(false), 300);
  }, [theme, isAnimating]);

  if (!mounted) {
    return (
      <div className="fixed top-5 right-5 z-50">
        <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-700 backdrop-blur-xl" />
      </div>
    );
  }

  return (
    <div className="fixed top-5 right-5 z-50">
      <button
        onClick={toggleTheme}
        className={`
          relative w-10 h-10 rounded-xl 
          bg-white/80 dark:bg-gray-900/80 
          border border-gray-200 dark:border-gray-700
          backdrop-blur-xl
          shadow-sm hover:shadow-md
          transition-all duration-300 ease-out
          hover:scale-105 active:scale-95
          group
          ${isAnimating ? 'pointer-events-none' : ''}
        `}
        aria-label="Toggle Dark Mode"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            transition-all duration-300 ease-out
            ${theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}
          `}>
            <svg className="w-4.5 h-4.5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div className={`
            absolute transition-all duration-300 ease-out
            ${theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
          `}>
            <svg className="w-4.5 h-4.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </div>
        </div>

        <div className={`
          absolute inset-0 rounded-xl transition-opacity duration-300
          bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900
          opacity-0 group-hover:opacity-100
        `} />
      </button>
    </div>
  );
}
