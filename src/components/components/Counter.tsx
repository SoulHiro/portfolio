// /components/Portfolio/components/Counter.tsx
"use client";
import React, { useState, useEffect } from 'react';

interface SectionCounterProps {
  totalSections: number;  // Número total de seções
}

const SectionCounter: React.FC<SectionCounterProps> = ({ totalSections }) => {
  const [activeSection, setActiveSection] = useState(1);

  useEffect(() => {
    // Configura os observadores para cada seção
    const sectionObservers: IntersectionObserver[] = [];
    const options: IntersectionObserverInit = {
      root: null, // usando a viewport como elemento de referência
      rootMargin: '-50% 0px', // considera o elemento visível quando está pelo menos 50% na tela
      threshold: 0 // dispara quando qualquer parte do elemento está visível
    };

    // Observer callback
    const handleIntersect = (
      entries: IntersectionObserverEntry[]
    ): void => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          // Extrai o número da seção do ID do elemento
          const sectionId = entry.target.id;
          const sectionNumber = parseInt(sectionId.replace('section-', ''));
          setActiveSection(sectionNumber);
        }
      });
    };

    // Cria um observador para cada seção
    for (let i = 1; i <= totalSections; i++) {
      const sectionElement = document.getElementById(`section-${i}`);
      if (sectionElement) {
        const observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(sectionElement);
        sectionObservers.push(observer);
      }
    }

    // Limpa os observadores quando o componente é desmontado
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