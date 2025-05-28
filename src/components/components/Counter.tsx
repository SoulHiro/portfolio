"use client";
import React, { useState, useEffect } from 'react';

interface SectionCounterProps {
  totalSections: number;
}

const SectionCounter: React.FC<SectionCounterProps> = ({ totalSections }) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    const sectionObservers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const handleIntersect = (
      entries: IntersectionObserverEntry[]
    ): void => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const sectionNumber = parseInt(sectionId.replace('section-', ''));
          setActiveSection(sectionNumber);
        }
      });
    };

    for (let i = 1; i <= totalSections; i++) {
      const sectionElement = document.getElementById(`section-${i}`);
      if (sectionElement) {
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(sectionElement);
        sectionObservers.push(observer);
      }
    }

    return () => {
      sectionObservers.forEach((observer: IntersectionObserver) => observer.disconnect());
    };
  }, [totalSections]);

  return (
    <div className="flex flex-col w-24 h-full justify-center items-center fixed left-0 top-0 z-100">
      <div className='bg-gray-600 h-48 w-0.5 my-10'></div>
      <p className='text-4xl font-bold text-white'>{activeSection}</p>
      <div className='bg-gray-600 h-48 w-0.5 my-10'></div>
    </div>
  );
};

export default SectionCounter;
