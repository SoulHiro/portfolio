"use client";
import '@/app/globals.css';
import { FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import SectionCounter from './components/Counter';
import { usePathname, Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { FaGlobeAmericas } from 'react-icons/fa';

const socialLinks = [
  {
    href: "https://github.com/SoulHiro",
    label: "GitHub",
    icon: <FaGithub aria-hidden="true" />,
  },
  {
    href: "https://www.instagram.com/victormts.oficial/",
    label: "Instagram",
    icon: <FaInstagram aria-hidden="true" />,
  },
  {
    href: "mailto:victormts@dherocorp.com",
    label: "Email",
    icon: <MdEmail aria-hidden="true" />,
  },
  {
    href: "https://disboard.org/pt-br/server/1061343817778860173",
    label: "Discord",
    icon: <FaDiscord aria-hidden="true" />,
  },
];

const languageNames = {
  pt: "Português",
  en: "English"
};

const Laterals_Portfolio: React.FC = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "pt" ? "en" : "pt";

  return (
    <>
      {/* Lateral Esquerda - Fixada (apenas desktop) */}
      <div className="hidden lg:block">
        <SectionCounter totalSections={4} />
      </div>

      {/* Lateral Direita - Barra de navegação social + switcher de linguagem */}
      <nav
        aria-label="Redes Sociais"
        className="hidden lg:flex fixed right-0 top-0 bottom-0 mx-auto flex-col w-16 md:w-20 h-full justify-between items-center py-6 z-50 pointer-events-auto"
        tabIndex={-1}
      >
        <div className="flex-1" aria-hidden="true"></div>
        <div className="flex flex-col gap-5 md:gap-7 text-2xl text-white">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="relative group transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full p-2"
              aria-label={link.label}
              tabIndex={0}
            >
              {link.icon}
              {/* Tooltip acessível */}
              <span className="sr-only">{link.label}</span>
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2 py-1 text-xs rounded bg-black/80 text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap"
                aria-hidden="true"
              >
                {link.label}
              </span>
            </a>
          ))}
        </div>
        {/* Switcher de linguagem */}
        <div className="mt-8 mb-5">
          <Link
            href={pathname}
            locale={nextLocale}
            className="group flex flex-col items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full p-2"
            aria-label={locale === "pt" ? "Switch to English" : "Trocar para Português"}
            tabIndex={0}
          >
            <FaGlobeAmericas className="text-xl text-indigo-300 group-hover:text-indigo-400 transition-colors" aria-hidden="true" />
            <span className="text-xs text-gray-400 group-hover:text-white transition-colors font-medium select-none">
              {languageNames[nextLocale]}
            </span>
          </Link>
        </div>
        <div className="flex-1" aria-hidden="true"></div>
      </nav>
    </>
  );
};

export default Laterals_Portfolio;