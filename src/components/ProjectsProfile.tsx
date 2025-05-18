"use client";
import React, { useState } from 'react';
import { User, Lightbulb, Target, Code2, Layers, ChevronRight, Hourglass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Ícones mapeados para usar por nome no JSON
const iconMap = {
  User,
  Lightbulb,
  Target,
  Code2,
  Layers,
  ChevronRight,
  Hourglass,
} as const;
type IconKey = keyof typeof iconMap;

// Tipagem dos projetos
type Project = {
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  solution: string;
  role: string;
  results: string;
  technologies: string[];
  icon: IconKey;
  gradient: string;
  status: "development" | "done";
  link?: string;
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const stagger = {
  show: {
    transition: {
      staggerChildren: 0.23
    }
  }
};

const ProjectsProfile = () => {
  const t = useTranslations('projectsProfile');
  // Busca todos os projetos do arquivo de tradução
  const projects = (t.raw('projects') as Project[]).map((project) => ({
    ...project,
    icon: iconMap[project.icon as IconKey] ?? Layers,
  }));

  const [currentBar, setCurrentBar] = useState(0);
  const project = projects[currentBar];

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-2 md:px-6 lg:px-8 py-8 md:py-16"
      aria-label={t('sectionLabel')}
    >
      <motion.div
        className="relative z-20 w-full max-w-6xl rounded-2xl shadow-2xl bg-black/60 backdrop-blur-md p-4 md:p-10 flex flex-col items-center border border-indigo-900/40"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Header animado */}
        <motion.header variants={fadeInUp} className="text-center mb-8 mt-8 md:mb-12 md:mt-12 w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg font-display">
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

        {/* Card premium do projeto */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:flex-row items-stretch w-full mt-2 mb-8 gap-4"
        >
          {/* Ícone e nome/projeto */}
          <motion.div
            variants={fadeInUp}
            className="md:w-1/3 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b md:bg-gradient-to-br from-indigo-900/80 to-purple-900/60 shadow-lg border-r border-indigo-800/40"
          >
            <div className="mb-4" aria-hidden="true">
              {/* O ícone vem da tradução, mas é resolvido aqui */}
              {React.createElement(project.icon, { size: 40, className: "text-purple-400" })}
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-indigo-200 text-center">{project.title}</h2>
            <span className="bg-indigo-900/50 text-indigo-300 text-xs px-4 py-1 rounded-full mb-2">{project.subtitle}</span>
            {/* Badge de status */}
            {project.status === "development" && (
              <span className="flex items-center gap-1 text-xs bg-yellow-800/70 text-yellow-300 px-3 py-1 rounded-full mt-2 mb-2 font-semibold">
                <Hourglass size={14} /> {t('status.development')}
              </span>
            )}
            {project.status === "done" && (
              <span className="flex items-center gap-1 text-xs bg-green-900/60 text-green-300 px-3 py-1 rounded-full mt-2 mb-2 font-semibold">
                &#9679; {t('status.done')}
              </span>
            )}
            <div className="mt-4 text-xs text-indigo-400 text-center">{project.technologies.join(" · ")}</div>
            {/* Botão/Link do projeto */}
            {project.status === "done" && project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block px-6 py-2 rounded bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm shadow hover:scale-105 transition-transform"
              >
                {t('access_project')}
              </a>
            )}
            {project.status === "development" && (
              <span className="mt-6 inline-block px-6 py-2 rounded bg-gray-800 text-gray-400 font-medium text-sm opacity-70 cursor-not-allowed select-none">
                {t('soon')}
              </span>
            )}
          </motion.div>

          {/* Conteúdo detalhado */}
          <motion.div
            variants={fadeInUp}
            className="md:w-2/3 flex flex-col justify-between p-6 rounded-r-2xl"
          >
            {/* Resultados */}
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} className="text-indigo-400" aria-hidden="true" />
              <span className="text-indigo-300 font-medium text-sm uppercase tracking-wider">{t('results')}</span>
            </div>
            <div className="mb-3 text-base text-white font-semibold">{project.results}</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              {/* Desafio */}
              <div className="rounded-lg bg-indigo-900/30 p-4 flex flex-col min-h-[90px] shadow-inner">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb size={18} className="text-indigo-400" aria-hidden="true" />
                  <span className="text-indigo-300 text-xs font-bold">{t('challenge')}</span>
                </div>
                <p className="text-sm text-gray-300">{project.challenge}</p>
              </div>
              {/* Solução */}
              <div className="rounded-lg bg-purple-900/30 p-4 flex flex-col min-h-[90px] shadow-inner">
                <div className="flex items-center gap-2 mb-1">
                  <Code2 size={18} className="text-purple-300" aria-hidden="true" />
                  <span className="text-purple-200 text-xs font-bold">{t('solution')}</span>
                </div>
                <p className="text-sm text-gray-300">{project.solution}</p>
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <ChevronRight size={18} className="text-indigo-400" aria-hidden="true" />
                <span className="text-indigo-200 text-xs font-bold">{t('description')}</span>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">{project.description}</p>
            </div>

            {/* Papel */}
            <div className="mb-2">
              <div className="flex items-center gap-2 mb-1">
                <User size={18} className="text-pink-300" aria-hidden="true" />
                <span className="text-pink-200 text-xs font-bold">{t('role')}</span>
              </div>
              <p className="text-sm text-pink-100">{project.role}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Navegação dos projetos */}
        <motion.nav
          variants={fadeInUp}
          className="flex gap-4 md:gap-8 justify-center items-end mt-2 flex-wrap"
          aria-label={t('projects_nav')}
        >
          {projects.map((p, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded`}
              onClick={() => setCurrentBar(idx)}
              aria-label={`${t('see_project')} ${p.title}`}
              tabIndex={0}
            >
              <div className={`w-14 md:w-20 h-2 rounded-full transition-all duration-300 ${
                currentBar === idx
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-110 shadow-lg shadow-indigo-600/20"
                  : "bg-gray-700 group-hover:bg-indigo-900"
              }`} />
              <span className={`mt-2 text-xs font-semibold transition-colors duration-300 ${
                currentBar === idx ? "text-indigo-300" : "text-gray-500 group-hover:text-indigo-200"
              }`}>
                {p.title}
              </span>
            </button>
          ))}
        </motion.nav>
      </motion.div>
    </section>
  );
};

export default ProjectsProfile;