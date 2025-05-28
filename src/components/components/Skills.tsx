"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const skills = [
  // 🥇 Grupo 1 – Core Técnico
  { name: "TypeScript", level: "Lv. 2 - 50%", color: "#3178C6" },
  { name: "React.js / Next.js", level: "Lv. 2 - 20%", color: "#61DAFB" },
  { name: "Node.js / Express", level: "Lv. 1 - 10%", color: "#3C873A" },
  { name: "PostgreSQL / Prisma", level: "Lv. 1 - 20%", color: "#336791" },

  // 🥈 Grupo 2 – Ferramentas Profissionais
  { name: "Git & GitHub", level: "Lv. 2 - 30%", color: "#F1502F" },
  { name: "Clean Code", level: "Lv. 1 - 70%", color: "#9B59B6" },
  { name: "Tailwind / Shadcn", level: "Lv. 3 - 20%", color: "#38BDF8" },
  { name: "Figma", level: "Lv. 3 - 70%", color: "#F24E1E" },

  // 🥉 Grupo 3 – Extras Técnicos e Automação
  { name: "Python", level: "Lv. 2 - 40%", color: "#3776AB" },
  { name: "APIs e Webhooks", level: "Lv. 1 - 70%", color: "#FF6B6B" },
  { name: "Docker / Containers", level: "Lv. 1 - 20%", color: "#0db7ed" },
  { name: "Bots (Discord, WhatsApp)", level: "Lv. 1 - 40%", color: "#5865F2" },

  // 🧠 Grupo 4 – Soft Skills
  { name: "Resolução de Problemas", level: "Lv. 2 - 40%", color: "#F9C74F" },
  { name: "Organização Pessoal", level: "Lv. 3 - 70%", color: "#90BE6D" },
  { name: "Comunicação Clara", level: "Lv. 2 - 40%", color: "#43AA8B" },
  { name: "Colaboração", level: "Lv. 4 - 20%", color: "#577590" },

  // 🌐 Grupo 5 – Idiomas
  { name: "Inglês", level: "Lv. 1 - 60%", color: "#2F4858" },
  { name: "Italiano", level: "Lv. 1 - 10%", color: "#B22234" },
  { name: "Documentação Técnica", level: "Lv. 2 - 50%", color: "#adb5bd" },
  { name: "Leitura Avançada", level: "Lv. 5 - 20%", color: "#6c757d" },

  // 💼 Grupo 6 – Marketing & Conteúdo
  { name: "Copywriting", level: "Lv. 2 - 50%", color: "#E63946" },
  { name: "Landing Pages", level: "Lv. 2 - 40%", color: "#FF9F1C" },
  { name: "Afiliados", level: "Lv. 1 - 30%", color: "#6A4C93" },
  { name: "Gatilhos Mentais", level: "Lv. 2 - 55%", color: "#F9844A" },
];




// Componente principal de perfil
const Skills = () => {
  const [page, setPage] = useState(0)

  const skillsPerPage = 4

  const totalPages = Math.ceil(skills.length / skillsPerPage);

  const currentSkills = skills.slice(
    page * skillsPerPage, // Aqui indica o Início. Ex: 0 * 4 = 0
    page * skillsPerPage + skillsPerPage // Aqui indica o Fim. 0 * 4 + 4 = 4
  ); // Isso retorna os itens de índice 0 a 3 (4 itens no total)

  return (
    <div className="text-white max-h-screen flex items-center justify-center">
      <div className="w-full my-auto">
        <div className="flex justify-between items-center mt-4">
          
          {/* Botão Esquerdo */}
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            className="text-white justify-center items-center disabled:opacity-40"
          >
            <FaChevronCircleLeft className='text-2xl'/>
          </button>

          {/* Conteúdo Central */}
          <div className="space-y-1 w-full px-4">
            {currentSkills.map((skill, index) => (
              <div key={index} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-['Segoe_UI'] font-semibold text-gray-600">{skill.name}</span>
                  <span className="text-xs font-['Segoe_UI'] font-semibold text-gray-600">{skill.level}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <motion.div
                    key={`${page}-${index}`}
                    initial={{ width: 0 }}
                    animate={{ width: skill.level.split(' - ')[1] }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-indigo-600 h-1.5 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Botão Direito */}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
            className="text-white disabled:opacity-40"
          >
            <FaChevronCircleRight className='text-2xl'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
