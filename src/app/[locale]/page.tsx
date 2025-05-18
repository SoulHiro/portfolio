import React from "react";
import DeveloperProfile from "../../components/DeveloperProfile";
import Section0_Portfolio from "../../components/HeroSection";
import Laterals_Portfolio from "../../components/laterais";
import ProjectsProfile from "../../components/ProjectsProfile";
import ServicesProfile from "../../components/ServicesProfile";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* BACKGROUND ÚNICO, fixo e atrás de tudo */}
      <Image
        width={1920}
        height={1080}
        src="/section1.jpg"
        alt=""
        className="fixed inset-0 w-screen h-screen object-cover z-0 pointer-events-none select-none"
        style={{
          filter: 'blur(2px) brightness(0.45)'
        }}
        draggable="false"
      />
      {/* FADE LATERAIS globais */}
      <div className="pointer-events-none select-none fixed inset-0 z-10">
        <div className="absolute left-0 top-0 h-full w-28 md:w-44 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-28 md:w-44 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
        <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute left-0 bottom-0 w-full h-20 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Conteúdo do portfólio (fica acima do bg) */}
      <div className="relative z-20 flex flex-col min-h-screen">
        <Laterals_Portfolio />
        <div id='section-1' className="min-h-screen w-full"><Section0_Portfolio /></div>
        <div id='section-2' className="min-h-screen w-full"><DeveloperProfile /></div>
        <div id='section-3' className="min-h-screen w-full"><ProjectsProfile /></div>
        <div id='section-4' className="min-h-screen w-full"><ServicesProfile /></div>
      </div>
    </div>
  );
}