"use client";
import React, { useState } from 'react';
import {
  ChevronRight, Code, PenTool, Database, Users,
  LayoutGrid, Monitor, Server, Smartphone, Layers, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

type ServiceDetailJSON = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
};
type ProcessStepJSON = {
  number: number;
  icon: string;
  title: string;
  description: string;
  details: string;
};
type PricingPlanJSON = {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  active?: boolean;
};
type PortfolioProjectJSON = {
  title: string;
  type: string;
  description: string;
  technologies: string[];
  active?: boolean;
};
type ServiceDataJSON = {
  serviceDetails: ServiceDetailJSON[];
  processStepsByService: Record<string, ProcessStepJSON[]>;
  pricingPlansByService: Record<string, PricingPlanJSON[]>;
  portfolioByService: Record<string, PortfolioProjectJSON[]>;
};

const iconMap = {
  Code,
  PenTool,
  Database,
  Users,
  LayoutGrid,
  Monitor,
  Server,
  Smartphone,
  Layers,
  ChevronRight,
  AlertCircle
} as const;
type IconKey = keyof typeof iconMap;

// Tabs com tipagem
const tabKeys = ['visao', 'processo', 'precos', 'portfolio'] as const;
type TabKey = typeof tabKeys[number];

// Animações
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.3, ease: 'easeIn' } }
};
const stagger = {
  show: {
    transition: {
      staggerChildren: 0.13
    }
  }
};

const ServicesProfile = () => {
  const t = useTranslations('services');

  // Dados das mensagens traduzidas
  const data: ServiceDataJSON = t.raw('serviceData');

  // Adiciona o componente do ícone nos dados
  const serviceDetails = data.serviceDetails.map(service => ({
    ...service,
    icon: iconMap[service.icon as IconKey] ?? Code
  }));

  const processStepsByService: Record<string, Array<Omit<ProcessStepJSON, 'icon'> & { icon: React.ElementType }>> =
    Object.fromEntries(
      Object.entries(data.processStepsByService).map(([serviceTitle, steps]) => [
        serviceTitle,
        steps.map(step => ({
          ...step,
          icon: iconMap[step.icon as IconKey] ?? ChevronRight
        }))
      ])
    );

  const [activeTab, setActiveTab] = useState<TabKey>('visao');
  const [activeDot, setActiveDot] = useState<number>(0);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const currentService = serviceDetails[activeDot];
  const currentProcessSteps = processStepsByService[currentService.title] || [];
  const currentPricingPlans = (data.pricingPlansByService[currentService.title] || []).filter((plan) => (plan as PricingPlanJSON).active !== false);

  const currentPortfolioAll = data.portfolioByService[currentService.title] || [];
  const currentPortfolio = currentPortfolioAll.filter((p) => p.active);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'visao':
        return (
          <motion.div
            key="visao"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            exit="exit"
            className="py-10 px-4 text-center max-w-4xl mx-auto"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{currentService.title}</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">{currentService.description}</p>
            <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-6 mt-10">
              {currentService.features.map((feature: string, index: number) => (
                <motion.div variants={fadeInUp} key={index} className="flex items-start group">
                  <div className="mr-3 text-indigo-400 mt-1 group-hover:text-indigo-300 transition-colors">
                    <ChevronRight size={16} aria-hidden="true" />
                  </div>
                  <p className="text-sm text-left text-gray-300 group-hover:text-white transition-colors">{feature}</p>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-12 mb-10">
              <h4 className="text-white text-lg mb-4">{t('tech_used')}</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {currentService.technologies.map((tech: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-indigo-900/50 border border-indigo-700 text-sm text-indigo-300 rounded-full hover:bg-indigo-800 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <motion.button
              className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              onClick={() => setActiveTab('precos')}
              whileHover={{ scale: 1.05 }}
              aria-label={t('see_pricing')}
            >
              {t('see_pricing')}
            </motion.button>
          </motion.div>
        );
      case 'processo':
        return (
          <motion.div
            key="processo"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            exit="exit"
            className="py-12 px-4"
          >
            <div className="flex flex-col items-center">
              <div className="w-full max-w-5xl mb-16">
                <motion.div variants={stagger} initial="hidden" animate="show" className="relative grid md:grid-cols-3 gap-10">
                  {currentProcessSteps.map((step, index) => (
                    <motion.div
                      variants={fadeInUp}
                      key={index}
                      className="flex flex-col items-center relative group"
                      tabIndex={0}
                      aria-label={`Passo ${step.number}: ${step.title}`}
                    >
                      <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-indigo-600 mb-4 z-10 bg-gray-900 group-hover:bg-indigo-900 transition-all duration-300 relative">
                        <span className="text-white font-bold absolute opacity-30 text-2xl">{step.number}</span>
                        <div className="text-indigo-400 group-hover:text-white transition-colors">
                          <step.icon size={24} aria-hidden="true" />
                        </div>
                      </div>
                      <h3 className="text-white mb-2 text-center font-semibold">{step.title}</h3>
                      <p className="text-gray-400 text-sm text-center mb-3">{step.description}</p>
                      <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <p className="text-indigo-300 text-xs text-center px-4">{step.details}</p>
                      </div>
                      {index < currentProcessSteps.length - 1 && index % 3 !== 2 && (
                        <div className="absolute top-8 left-[60%] w-full h-px bg-indigo-800/50 hidden md:block" aria-hidden="true"></div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <motion.button
                className="mt-4 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                onClick={() => setActiveTab('precos')}
                whileHover={{ scale: 1.05 }}
                aria-label={t('see_plans')}
              >
                {t('see_plans')}
              </motion.button>
            </div>
          </motion.div>
        );
      case 'precos': {
        const centralizePlans = currentPricingPlans.length === 1 || currentPricingPlans.length === 2;
        const cardWidthClass = centralizePlans ? "w-full md:w-[340px]" : "";

        return (
          <motion.div
            key="precos"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            exit="exit"
            className="py-12 px-4"
          >
            <div className={
              centralizePlans
                ? "flex justify-center gap-6 max-w-5xl mx-auto"
                : "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            }>
              {currentPricingPlans.map((plan: PricingPlanJSON, index: number) => (
                <motion.div
                  variants={fadeInUp}
                  key={index}
                  className={`relative border ${plan.popular ? 'border-indigo-500' : 'border-indigo-900'} bg-gray-900 bg-opacity-40 p-6 flex flex-col rounded-lg transition-all duration-300 ${
                    hoveredPlan === index ? 'transform scale-105 shadow-lg shadow-indigo-900/40' : ''
                  } ${plan.popular ? 'z-10 shadow-md shadow-indigo-900/30' : ''} ${cardWidthClass}`}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.045 }}
                  tabIndex={0}
                  aria-label={`Plano: ${plan.title}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs px-3 py-1 rounded-bl rounded-tr -mt-px -mr-px">
                      {t('most_popular')}
                    </div>
                  )}
                  <h3 className="text-white text-xl mb-2 font-bold">{plan.title}</h3>
                  <div className={`text-white text-3xl font-bold mb-1 ${plan.popular ? 'text-indigo-400' : ''}`}>{plan.price}</div>
                  <p className="text-gray-400 text-sm mb-6">{plan.subtitle}</p>
                  <div className="flex-grow">
                    {plan.features.map((feature: string, i: number) => (
                      <div key={i} className="flex items-center mb-3 group">
                        <div className="text-indigo-400 mr-2 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">✓</div>
                        <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <button className={`mt-6 w-full py-3 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-indigo-900 hover:bg-indigo-800 text-white'
                  }`}>
                    {plan.buttonText}
                  </button>
                </motion.div>
              ))}
            </div>
            <p className="text-gray-400 text-sm text-center mt-10 max-w-3xl mx-auto">
              {t('all_packages')}
              <span className="block mt-2">
                {t('contact_for_eval')}
              </span>
            </p>
          </motion.div>
        );
      }
      case 'portfolio': {
        return (
          <motion.div
            key="portfolio"
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            exit="exit"
            className="py-12 px-4"
          >
            <div className="max-w-5xl mx-auto">
              <p className="text-gray-300 text-center mb-10">
                {t('portfolio_intro')}
              </p>
              {currentPortfolio.length > 0 ? (
                <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-6 mb-12">
                  {currentPortfolio.map((project: PortfolioProjectJSON, index: number) => (
                    <motion.div
                      variants={fadeInUp}
                      key={index}
                      className="border border-gray-800 bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden group hover:border-indigo-900 transition-colors"
                      tabIndex={0}
                      aria-label={`Projeto: ${project.title}`}
                    >
                      <div className="h-40 bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-6">
                        <h3 className="text-xl text-white font-bold text-center">{project.title}</h3>
                      </div>
                      <div className="p-5">
                        <span className="inline-block px-3 py-1 bg-indigo-900/30 text-indigo-400 text-xs rounded-full mb-3">
                          {project.type}
                        </span>
                        <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-indigo-400">
                  <AlertCircle size={48} className="mb-4" />
                  <span className="text-lg font-semibold">{t('portfolio_empty') || "Nenhum projeto disponível para esta categoria."}</span>
                  <span className="text-gray-400 mt-2 text-sm">
                    Em breve novos projetos serão publicados aqui!
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-2 md:px-6 lg:px-8 py-8 md:py-16"
      aria-label={t('sectionLabel')}
    >
      <motion.div
        className="relative z-20 w-full max-w-6xl bg-black/60 backdrop-bl-sm flex flex-col items-center rounded-xl shadow-xl shadow-purple-900/10 px-4"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {/* Header com animação */}
        <motion.header variants={fadeInUp} className="text-center mb-12 mt-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text font-display">{t('title')}</h1>
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full mx-3 animate-pulse"></div>
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
          <p className="text-gray-400 text-sm max-w-lg mx-auto font-titillium">
            {t('subtitle')}
          </p>
        </motion.header>
        {/* Serviços Dots com Animação */}
        <motion.nav
          variants={stagger}
          className="flex justify-center space-x-6 md:space-x-8 mb-10"
          aria-label="Navegação entre serviços"
        >
          {serviceDetails.map((service, index) => (
            <motion.button
              variants={fadeInUp}
              key={service.id}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                activeDot === index
                  ? 'bg-indigo-900 border-2 border-indigo-500 shadow-lg shadow-indigo-900/50'
                  : 'border border-indigo-800 hover:border-indigo-600'
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400`}
              aria-label={service.title}
              onClick={() => {
                setActiveDot(index);
                if (activeTab !== 'visao') setActiveTab('visao');
              }}
              whileHover={{ scale: 1.09 }}
              tabIndex={0}
            >
              <div className={`transition-colors ${activeDot === index ? 'text-indigo-400' : 'text-gray-400'}`}>
                <service.icon size={22} aria-hidden="true" />
              </div>
            </motion.button>
          ))}
        </motion.nav>
        {/* Título do Serviço Selecionado */}
        <motion.header variants={fadeInUp} className="text-center w-full mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">{currentService.title}</h2>
          <p className="text-indigo-400 text-sm mb-10">{t('custom_solutions')}</p>
        </motion.header>
        {/* Tabs com Animação no Hover */}
        <nav
          className="
            w-full max-w-lg border-b border-gray-800 flex justify-center mb-8
            overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-700 scrollbar-track-transparent
          "
          aria-label="Seções do serviço"
        >
          <div className="flex w-full max-w-lg">
            {tabKeys.map(tab => (
              <button
                key={tab}
                className={`
                  flex-shrink-0
                  px-3 py-2
                  sm:px-5 sm:py-3
                  text-xs sm:text-sm
                  transition-all relative
                  ${activeTab === tab
                    ? 'text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                  min-w-[90px] sm:min-w-[120px]
                  text-center
                `}
                onClick={() => setActiveTab(tab)}
                aria-label={`Selecionar ${tab}`}
              >
                {t(`tabs.${tab}`)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
        {/* Conteúdo da Tab */}
        <AnimatePresence mode="wait">{renderTabContent()}</AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ServicesProfile;
