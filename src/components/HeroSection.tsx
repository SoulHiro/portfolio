"use client";
import { useTranslations } from 'next-intl';
import '@/app/globals.css';

const HeroSection: React.FC = () => {
  const t = useTranslations('herosection');

  // Função para scroll suave até a próxima seção
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextSection = document.getElementById('section-2');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center px-3 md:px-8 z-10"
      aria-label={t('ariaLabel')}
    >
      <header className="w-full max-w-6xl flex flex-1 flex-col items-center justify-center pt-20 md:pt-28">
        <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg">
          {t('title')}
        </h1>
        {/* Elemento decorativo (ponto) com linhas */}
        <div className="flex items-center justify-center my-4" aria-hidden="true">
          <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
          <div className="w-2 h-2 bg-indigo-400 rounded-full mx-2"></div>
          <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
        <p className="font-titillium text-base text-center sm:text-lg md:text-xl mt-2 text-gray-200 max-w-xl mx-auto leading-relaxed whitespace-pre-line">
          {t('description')}
        </p>
      </header>
      {/* Indicador de rolagem para baixo */}
      <button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center group outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
        aria-label={t('seePortfolio')}
        onClick={handleScroll}
        tabIndex={0}
      >
        <span className="font-caveat text-gray-400 text-sm md:text-base mb-2 group-hover:text-indigo-300 transition-colors">
          {t('seePortfolio')}
        </span>
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-gray-400 group-hover:text-indigo-300 transition-colors"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="presentation"
            aria-hidden="true"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </button>
    </section>
  );
};

export default HeroSection;