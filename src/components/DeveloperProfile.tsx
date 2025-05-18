"use client";
import React from 'react';
import { Code, Layers, Tag } from 'lucide-react';
import Skills from './components/Skills';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};
const stagger = {
  show: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const profileIcons = [
  { icon: <span className="font-bold">N</span>, label: 'Next.js' },
  { icon: <span className="font-bold">TS</span>, label: 'TypeScript' },
  { icon: <Layers size={20} />, label: 'Arquitetura' },
  { icon: <Code size={20} />, label: 'Código' },
  { icon: <Tag size={20} />, label: 'Tags' }
];

const DeveloperProfile = () => {
  const t = useTranslations('profile');
  const experiences = t.raw('experiences') as Array<{ years: string; title: string }>;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-2 md:px-6 lg:px-8 py-8 md:py-16"
      aria-label={t('title')}
    >
      <motion.div
        className="relative z-20 w-full max-w-6xl rounded-2xl shadow-2xl bg-black/60 backdrop-blur-md px-2 md:px-10 py-8 md:py-12 flex flex-col items-center border border-indigo-900/40"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* HEADER */}
        <motion.header variants={fadeInUp} className="text-center mb-8 md:mb-10 mt-2 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg font-display">
            {t('title')}
          </h1>
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full mx-3 animate-pulse"></div>
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto font-titillium">
            {t('subtitle')}
          </p>
        </motion.header>

        {/* PERFIL */}
        <div className="flex flex-col md:flex-row items-center md:items-end w-full mb-8 md:mb-10 gap-6 md:gap-0">
          {/* Foto */}
          <motion.div
            variants={fadeInUp}
            className="md:w-1/3 flex justify-center items-end mb-4 md:mb-0"
          >
            <div className="relative flex justify-center items-end">
              <Image
                src="/profile.png"
                alt="Foto de Victor, desenvolvedor e designer"
                width={288}
                height={288}
                className="relative z-10 h-48 w-48 md:h-72 md:w-72 rounded-lg border-4 border-indigo-900 shadow-lg shadow-indigo-900/40 object-cover"
                draggable="false"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          {/* Texto */}
          <motion.div
            variants={fadeInUp}
            className="md:w-2/3 md:pl-10 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h2 className="text-2xl md:text-3xl font-caveatbrush text-indigo-300 mb-1">{t('greeting')}</h2>
            <h3 className="text-base md:text-lg text-indigo-500 font-caveat mb-2">{t('role')}</h3>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed font-titillium mb-3 whitespace-pre-line">
              {t('bio')}
            </p>
            {/* Experiências */}
            <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start" aria-label="Experiências">
              {experiences.map((exp, idx) => (
                <motion.div
                  variants={fadeInUp}
                  key={idx}
                  className="bg-gradient-to-br from-indigo-900/60 to-purple-900/40 border border-indigo-800/60 p-4 h-20 w-24 flex flex-col justify-center items-center rounded-lg shadow shadow-indigo-900/10 transition-all duration-300 hover:scale-105 hover:border-indigo-400"
                  tabIndex={0}
                  aria-label={exp.title}
                  role="listitem"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-200">{exp.years}</h2>
                  <p className="text-xs text-indigo-300 text-center">{exp.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SKILLS */}
        <motion.section
          variants={fadeInUp}
          className="w-full mb-8 md:mb-10"
          aria-label="Habilidades Técnicas"
        >
          <Skills />
        </motion.section>

        {/* RODAPÉ COM ÍCONES */}
        <motion.footer variants={fadeInUp} className="mt-6 md:mt-8 pb-4 w-full flex flex-col items-center">
          <div className="flex gap-4 md:gap-6 mb-2 justify-center" aria-label="Stacks e áreas">
            {profileIcons.map((item, idx) => (
              <div
                key={idx}
                className="bg-indigo-950 border border-indigo-800 p-3 rounded-full w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-indigo-300 shadow shadow-indigo-900/20 hover:bg-indigo-900/60 hover:text-white transition-colors duration-200 group"
                tabIndex={0}
                aria-label={item.label}
                title={item.label}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </motion.footer>
      </motion.div>
    </section>
  );
};

export default DeveloperProfile;