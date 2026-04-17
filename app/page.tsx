// Como o Renderização no Servidor é a regra padrão do Next.js
// e entrega apenas um HTML puro, quue é estático e por isso é necessário colocar a 
// diretiva "use client" para ter interatividade e rodar no
// navegador do cliente
// "use client" é basicamente uma diretiva de compilação, deve
// ser colocado obrigatoriamente na primeira linha do código,
// antes dos imports, porque ela basicamente tua como uma divisa de rede
// que vai enviar o pacote js para rodar no navegador do usuário (cliente)
"use client";

// importando essa bibliotecas, porque o servidor não tem "estado" de interface
// ou seja, ele não sabe o que o usuário está fazendo com o mouse e a tela, por 
// isso a regra é (pelo menos a que eu sigo):
// se tem necessidade de saber o que o usuário está fazendo com o mouse, a tela ou o 
//teclado no site, o componente deve ser um Client Component.

// por isso é usado useSatete para para saber o estado da interface
// a barra de rolagem e a tela com o useScroll, useRef para referenciar os elementos
// diretamente e a biblioteca de animação framer-motion para mostrar os elementos
// com animações "tateis" que ou aumentam ou diminuem 
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, HTMLMotionProps } from 'framer-motion';
import { 
  ArrowUpRight, 
  Mail, 
  Cpu, 
  Layers, 
  Zap, 
  Code2, 
  Globe, 
  ExternalLink,
  Plus,
  Briefcase,
  GraduationCap,
  BookText,
  PaintbrushVertical,
  Code,
  FileChartColumn,
  ChartNoAxesCombined,
  Bot,
  LucideIcon
} from 'lucide-react';
// Como a consistência é um princípio do UX Design
// coloquei o cva (class variance authority) que basicamente
// guarda o design padrão de um elemento e cria as "variantes"
// dele de forma limpa
// o cn age mais como um mediador de conflitos, 
// se tiver algum conflito em relação a um botão ser azul e vermelho
// ele decide qual vai prevalecer pelas regras do Tailwind,
// dessa forma evita os bugs visuais para os usuários
import { cva, type VariantProps } from 'class-variance-authority';
// uma explicação mais didática aqui: o cn ele recebe as classes CSS,
// o clsx agrupa e repassa para o twMerge, que tem a seguinte regra:
// se tem duas classes de espaçamento sendo enviadas ao mesmo tempo, ele 
//apaga a primeira e mantém a última, isso impede que o design quebre
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// com as explicações anteriores fica mais claro como a função abaixo funciona
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// aqui eu dividi as variações em duas categorias: intent para controlar a sombra e o padding o espaço
// dentro do elemento
const cardVariants = cva(
  "relative transition-all duration-200 border-4 border-black bg-white",
  {
    variants: {
      intent: {
        primary: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px]",
        secondary: "shadow-[12px_12px_0px_0px_rgba(34,197,94,1)] border-black",
        accent: "shadow-[8px_8px_0px_0px_rgba(249,115,22,1)]",
        flat: "shadow-none"
      },
      padding: {
        none: "p-0",
        small: "p-4",
        medium: "p-8",
        large: "p-12"
      }
    },
    // o default aqui é uma boa prática e por isso vou comentar ele aqui para explicar:
    // ele garante que se esquecer de passar as propriedades do card, ele não vai quebrar na tela
    // vai automaticamente assumir a sombra preta (primary) e o espaçamento médio (medium)
    defaultVariants: {
      intent: "primary",
      padding: "medium"
    }
  }
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// O SquishyButton é o botão que é aplicado a animação, usando a biblioteca 
//framermotion, daí ao vez de usar a tag HTML padrão "button" é usado motion-button
// para informar o react que o botão ele possui animação
// Além disso, como o TypeScript exige saber o que o botão vai receber, aqui abaixo informa isso
interface SquishyButtonProps extends HTMLMotionProps<"button"> { // a leitura dessa linha seria mais ou menos "O Squishy recebe as propriedades de um botaõ animado (HTMLMotionProps), um conteúdo interno (children) que pode ser um texto ou ícone e mais uma classse extra de estilo (ClassName)
  children: React.ReactNode;
  className?: string;
}

const SquishyButton = ({ children, className, ...props }: SquishyButtonProps) => {
  return (
    <motion.button
      // Quando o mouse passar por cima, o botão aumenta 5% (scale) e inclina levemente para a esquerda (rotate)
      whileHover={{ scale: 1.05, rotate: "-1deg" }}
      // Quando o usuário clica, ele encolhe para 90% do tamanho (scale) e inclina para a direita (rotate)
      // isso da o efeito esmagado "squishy"
      whileTap={{ scale: 0.9, rotate: "1deg" }}
      // O transition da o efeito mola (spring) e com as definições do stiffness e damping tu escolhe as propriedades dele e como
      // ele vai ser animado
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      // O cn aqui é usado para juntar o design amarelo padrão do botão com qualquer className extra que queira passar quando for usar o componente na página
      className={cn(
        "bg-yellow-400 border-4 border-black px-6 py-3 font-mono font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Cria uma camada de "ruído" como o nome diz, que é uma textura granulada, semelhante ao ruído de filme fotográfico antigo ou à textura de um papel impresso.
// isso da uma profundidade na tela do usuário
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const NarrativeSection = () => {
  // O React precisa saber que parte da tela o suário vai observar
  // o useRef cria uma etiqueta para isso
  const containerRef = useRef<HTMLElement>(null);
  // o FramerMotion "vigia" a sessão
  // a leitura dessas linhas seria: ele começa a calcular quando o topo da secção 
  //tocar no fundo do ecrã e para quando o fundo da secção tocar no topo do ecrã (start end, end start)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // O resultado disto é no scrollYProgress, um valor que vai de 0 (acabou de aparecer) a 1 (está prestes a desaparecer)
  // O x é o movimento horizonta, ele diz que, enquanto o progresso vai de 0 a 1, o elemento deve mover-se de 0px para 
  //-200px (para a esquerda)
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);
  // No rotate o progresso vai de 0 a 1, o elemento roda suavemente de -5 graus para 5 graus
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section id="sobre" ref={containerRef} className="py-24 relative overflow-hidden bg-orange-50">
      <style>{`
        .brutalist-scrollbar::-webkit-scrollbar {
          width: 14px;
        }
        .brutalist-scrollbar::-webkit-scrollbar-track {
          background: #fef08a; /* yellow-200 */
          border-left: 3px solid black;
        }
        .brutalist-scrollbar::-webkit-scrollbar-thumb {
          background: black;
          border-left: 3px solid black;
        }
        .brutalist-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>

      <motion.div style={{ x, rotate }} className="absolute -top-10 -right-20 opacity-10 whitespace-nowrap">
        <span className="text-[15rem] font-serif italic font-bold">ANALISTA DE SISTEMAS</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            <div className={cn(cardVariants({ intent: "secondary", padding: "medium" }), "flex flex-col h-[500px] md:h-[600px]")}>
              <h2 className="text-4xl font-serif font-black mb-6 shrink-0">
                Resumo profissional.
              </h2>
              <div className="overflow-y-auto brutalist-scrollbar pr-4 space-y-6 font-mono text-base md:text-[1.05rem] text-neutral-800 flex-grow leading-relaxed">
                <p>
                  Estagiaria com foco em <span className="bg-yellow-200 px-1 font-bold">automação</span>, integração de dados e aplicações com <span className="bg-yellow-200 px-1 font-bold">IA Generativa</span>. Possuo experiência no desenvolvimento end-to-end utilizando <span className="bg-yellow-200 px-1 font-bold">Python</span> e <span className="bg-yellow-200 px-1 font-bold">JavaScript (Node.js)</span>.
                </p>
                <p>
                  Em Python, construi sistemas de monitoramento que coletam dados de hardware (via <span className="underline decoration-4 decoration-green-500 font-bold">Modbus</span>) e APIs, realizam o armazenamento em bancos relacionais (<span className="underline decoration-4 decoration-green-500 font-bold">SQLite</span>) e geram visualizações através de dashboards (<span className="underline decoration-4 decoration-green-500 font-bold">Streamlit</span>) e relatórios automatizados por e-mail.
                </p>
                <p>
                  Em JavaScript, desenvolvo backends com Express para integrar e gerenciar múltiplas APIs de LLMs (<span className="bg-yellow-200 px-1 font-bold">OpenAI, Gemini, Anthropic, Groq, LangChain</span>), criando interfaces com <span className="underline decoration-4 decoration-green-500 font-bold">Tailwind CSS</span> e gerenciando o deploy da aplicação em produção com PM2.
                </p>
                <p>
                  Em paralelo a programação, atuo na área de pesquisa sobre Inteligência Artificial, ministrando aulas práticas (oficinas) sobre o uso crítico, ético e seguro de ferramentas de Inteligência Artificial, além de desenvolver as aplicações para automatizar as tarefas dos professores e o curso MOOC (Massive Open Online Courses) sobre IA Generativa.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 h-[500px] md:h-[600px] flex items-center justify-center relative">
             <motion.div 
               animate={{ y: [0, -10, 0] }} 
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="relative"
             >
               <img 
                  src="https://github.com/rayssasza.png" 
                  alt="Foto de perfil da Rayssa no GitHub" 
                  className={cn(cardVariants({ intent: "accent", padding: "none" }), "w-72 h-72 lg:w-96 lg:h-96 object-cover rotate-3 lg:-translate-x-6")}
               />
               <div className="absolute -top-4 -right-4 lg:-right-12 bg-black text-white p-2 font-mono text-xs font-bold rotate-12 border-2 border-white">
                 STATUS: OPEN TO WORK
               </div>
             </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

const ResumeSection = () => {
  const experiences = [
    { 
      role: "Estagiaria em Análise de Dados", 
      company: "Grupo RBS", 
      period: "JAN, 2026 - Presente", 
      description: "Desenvolvimento em Python de plataformas de monitoramento elétrico e automatização de processos."
    },
    { 
      role: "Desenvolvedora e P&D de IA", 
      company: "IFRS", 
      period: "OUT, 2024 - Presente", 
      description: "Desenvolvimenro de plataformas para automatizar processos educacionais, conectando APIs de LLMs e realizando oficinas de uso ético e crítico da IA."
    },
    { 
      role: "Instrutora e Designer Instrucional", 
      company: "IFRS", 
      period: "ABR, 2024 - JAN 2025", 
      description: "Bolsa de Educação e Tecnologia, que envolvia o planejamento e condução de formações em lógica de programação para 70 professores da rede pública e criação de um eBook interativo e totalmente clicável sobre Tecnologias da Informação e Comunicação (TIC), elaborado no Canva com design funcional e intuitivo."
    }
  ];

  const educations = [
    {
      course: "Sistemas para Internet",
      institution: "Instituto Federal do Rio Grande do Sul",
      period: "2023 - ATUALMENTE"
    },
    {
      course: "Psicologia",
      institution: "UniRitter",
      period: "2018 - 2023"
    }
  ];

  return (
    <section id="curriculo" className="py-24 bg-neutral-100 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-purple-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Briefcase size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-serif font-black">Experiência.</h2>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-black">
              {experiences.map((exp, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] absolute left-0 md:left-1/2 -translate-x-1/2 z-10"></div>
                  <div className={cn(cardVariants({ intent: "flat", padding: "medium" }), "w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] ml-auto md:ml-0")}>
                    <div className="flex flex-col mb-2">
                      <span className="font-mono text-sm bg-black text-white px-2 py-1 w-max mb-2">{exp.period}</span>
                      <h3 className="text-xl font-bold font-serif">{exp.role}</h3>
                      <p className="font-mono font-bold text-neutral-500">{exp.company}</p>
                    </div>
                    <p className="font-mono text-sm text-neutral-700 mt-4 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-green-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <GraduationCap size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-4xl font-serif font-black">Educação.</h2>
            </div>

            <div className="space-y-8">
              {educations.map((edu, idx) => (
                <div key={idx} className={cardVariants({ intent: "primary", padding: "medium" })}>
                   <span className="font-mono text-sm border-2 border-black px-2 py-1 bg-neutral-100 mb-4 inline-block">{edu.period}</span>
                   <h3 className="text-xl font-bold font-serif mb-1">{edu.course}</h3>
                   <p className="font-mono text-neutral-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

interface StackCardProps {
  name: string;
  icon: LucideIcon;
  color?: string;
  project: string;
  proofLink: string;
  certificates?: { label: string; url: string }[]; 
}

const StackCard = ({ name, icon: Icon, color = "bg-white", project, proofLink, certificates }: StackCardProps) => {
  return (
    <motion.div
      className={cn(
        "group cursor-pointer",
        cardVariants({ intent: "primary", padding: "none" }),
        "flex flex-col h-full overflow-hidden"
      )}
    >
      <div className={cn("p-6 flex justify-between items-start border-b-4 border-black", color)}>
        <Icon size={32} strokeWidth={3} />
        <a href={proofLink} target="_blank" rel="noopener noreferrer" className="hover:bg-black hover:text-white p-1 border-2 border-black transition-colors" title="Ver Comprovativo do Projeto">
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="p-6 flex-grow bg-white flex flex-col">
        <h3 className="text-xl font-bold font-mono mb-2">{name}</h3>
        <p className="text-sm font-mono opacity-70 mb-4 italic leading-relaxed">Case/Projeto: {project}</p>
        
        {certificates && certificates.length > 0 && (
          <div className="flex flex-col gap-2 mb-6 mt-auto">
            <span className="text-[10px] font-bold font-mono uppercase bg-black text-white px-1 w-max">Certificações:</span>
            <div className="flex flex-wrap gap-2">
              {certificates.map((cert, i) => (
                <a 
                  key={i} 
                  href={cert.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono font-bold border-2 border-black px-2 py-1 bg-yellow-100 hover:bg-black hover:text-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  <ArrowUpRight size={12} strokeWidth={3} />
                  {cert.label}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-1 mt-auto pt-4">
          {[1,2,3].map(i => <div key={i} className="h-1 flex-grow bg-black/10" />)}
        </div>
      </div>
    </motion.div>
  );
};

const StackSection = () => {
  const stacks: StackCardProps[] = [
    { 
      name: "Tailwind CSS/ Node.JS/ LLMs", 
      icon: Bot, 
      color: "bg-pink-400", 
      project: "ProfIAs, plataforma criada para gerar planos de aulas automatizados para professores, integrado em múltiplas APIs de LLMs.", 
      proofLink: "https://profias.poa.ifrs.edu.br/",
      certificates: [
        { label: "Machine Learning", url: "https://www.dio.me/certificate/GGELQF0L" },
        { label: "Jornada de Aprendizado IA", url: "https://www.linkedin.com/posts/rayssa-souza-8474772b0_gostaria-de-compartilhar-que-finalizei-meu-activity-7318309150516486145-_mY7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAErR2vcB_VtIROkJzsr1Dm0RRIBINAbXfzM" },
        { label: "Fundamentos da IA", url: "https://www.linkedin.com/posts/rayssa-souza-8474772b0_inteligenciaartificial-machinelearning-visaetocomputacional-activity-7331505351726391297-tuYn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAErR2vcB_VtIROkJzsr1Dm0RRIBINAbXfzM" }
      ]
    },
    { 
      name: "Python/ Pandas/ Streamlit/ SQLite/ Docker", 
      icon: Code, 
      color: "bg-green-400", 
      project: "Sistema de Monitoramento Elétrico do ModBus, no qual coleta dados de consumo elétrico e envia os relatórios automatizados sobre os dados.", 
      proofLink: "https://github.com/rayssasza/energy/",
      certificates: [
        { label: "Desenvolvimetno Web Completo", url: "https://www.udemy.com/certificate/UC-2f8be870-4cf2-45aa-a3b6-f00e6b6057fe/" }
      ]
    },
    { 
      name: "JavaScript/ CSS", 
      icon: Code, 
      color: "bg-yellow-400", 
      project: "É uma versão adaptada do jogo da velha, onde os tradicionais X e O foram substituídos pelos bits 0 e 1, criando uma referência ao mundo da programação e sistemas binários. Escolhi dessa forma adaptada, porque a matéria que eu mais gostei no primeiro semestre de programação foi Fundamentos da Computação e quis referenciar a matéria em um projeto pessoal.", 
      proofLink: "https://github.com/rayssasza/JogodaVelha",
      certificates: [
        { label: "Algoritmos e Lógica de Programação", url: "https://www.udemy.com/certificate/UC-3e98e77e-f2da-4272-8730-d6a5a965ce80/" }
      ]
    },
    { 
      name: "Solis/ Matplotlib/ Python", 
      icon: Code, 
      color: "bg-blue-400", 
      project: "Sistema que coleta os dados das usinas solares via API Solis, monta os gráficos mensais, semanais e do dia anterior e os envia por e-mail.", 
      proofLink: "https://github.com/rayssasza/solis",
      certificates: [
        { label: "Python Avançado", url: "https://www.udemy.com/certificate/UC-2f8be870-4cf2-45aa-a3b6-f00e6b6057fe/" }
      ]
    },
    { 
      name: "Introdução à Cibersegurança e Scrum", 
      icon: GraduationCap, 
      color: "bg-white", 
      project: "Certificado emitido pela CISCO do curso Introduction to Cybersecurity, realizado em 2025 e o certificado da Metodologia Ágil Scrum, também realizado em 2025.", 
      proofLink: "https://www.credly.com/badges/e5e66de5-637d-43c7-b733-08cd83d42430/linked_in_profile",
      certificates: [
        { label: "CISCO", url: "https://www.credly.com/badges/e5e66de5-637d-43c7-b733-08cd83d42430/linked_in_profile" },
        { label: "SCRUM", url: "https://www.udemy.com/certificate/UC-f1ef345c-1bb2-43e7-b7fd-0c2c60544871/" }
      ]
    },
    { 
      name: "UX Design/ Figma", 
      icon: PaintbrushVertical, 
      color: "bg-pink-400", 
      project: "Protótipo do aplicativo CatMatch feito no Figma para o componente curricular Web Design, ele era basicamente uma plataforma de adoção de gatos.", 
      proofLink: "https://www.figma.com/design/5AlMw1KygIr2K5xYsGEpgG/CatMatch?node-id=0-1&t=qC1Y5dWqeUp6XsAS-1",
      certificates: [
        { label: "UI/UX Design", url: "https://www.udemy.com/certificate/UC-6be76dae-c903-4248-8d50-67b02cf99ee8/" }
      ]
    },
    { 
      name: "AI Agents/ Python/ LLMs", 
      icon: Bot, 
      color: "bg-green-400", 
      project: "Projetos do curso gratuito do Teo Me Why sobre Machine Learning.", 
      proofLink: "https://github.com/rayssasza/machinelearning.teo",
      certificates: [
        { label: "Desafio similar realizado", url: "https://github.com/rayssasza/case" }
      ]
    },
    { 
      name: "UX Design/ Figma", 
      icon: PaintbrushVertical, 
      color: "bg-yellow-400", 
      project: "Protótipo do aplicativo IFruta para o componente curricular Web Design", 
      proofLink: "https://www.figma.com/design/gc4VjBNpUVNcA1QAGK9SoN/IFruta?node-id=0-1&t=8zXBHyT5tgowbUrM-1", 
      certificates: [
        { label: " UX & Design Thinking", url: "https://www.udemy.com/certificate/UC-b2a776af-bbde-4b59-b7e1-91c30f6d711e/" }
      ]
    },
  ];

  return (
    <section id="skills" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <span className="font-mono text-sm uppercase tracking-widest bg-black text-white px-2 py-1">Hard_Skills</span>
          <h2 className="text-6xl font-serif font-black mt-4">Experiência Técnica.</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stacks.map((stack, idx) => (
            <div key={idx} className={cn(
              idx % 3 === 1 ? "md:mt-16" : "",
              idx === 4 ? "md:col-span-2" : ""
            )}>
              <StackCard {...stack} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contato" className="py-32 bg-yellow-400 border-t-8 border-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-5xl md:text-7xl font-serif font-black mb-6">Gostou do meu trabalho?</h2>
        <p className="font-mono text-xl mb-12">Entre em contato!</p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-8">
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }} 
              href="https://github.com/rayssasza" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 transition-shadow"
            >
                <GithubIcon />
                <span className="font-mono font-bold text-lg hidden sm:block">GitHub</span>
            </motion.a>
            
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }} 
              href="https://www.linkedin.com/in/rayssa-souza-8474772b0" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 border-4 border-black bg-[#0077b5] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 transition-shadow"
            >
                <LinkedinIcon />
                <span className="font-mono font-bold text-lg hidden sm:block">LinkedIn</span>
            </motion.a>

            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }} 
              href="mailto:rayssasza.dev@gmail.com" 
              className="p-6 border-4 border-black bg-orange-400 text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 transition-shadow"
            >
                <Mail size={24} strokeWidth={2.5} />
                <span className="font-mono font-bold text-lg hidden sm:block">E-mail</span>
            </motion.a>
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-100 text-black selection:bg-yellow-400 selection:text-black overflow-x-hidden scroll-smooth">
      <NoiseOverlay />
      
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 flex justify-between items-center mix-blend-difference invert pointer-events-none">
        <div className="font-serif font-black text-2xl tracking-tighter">CV_RAYSSA</div>
        <div className="flex items-center gap-4 md:gap-8 font-mono text-sm font-bold uppercase pointer-events-auto">
            <a href="#sobre" className="hover:underline">Sobre</a>
            <a href="#curriculo" className="hover:underline">Experiência</a>
            <a href="#contato" className="hover:underline">Contato</a>
        </div>
      </nav>

      <header className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto w-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 relative"
          >
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-serif font-black leading-[0.85] tracking-tighter mb-8">
              RAYSSA<br />
              <span className="text-yellow-500">SOUZA</span><br />
              PORTFOLIO.
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="max-w-md font-mono text-xl leading-relaxed border-l-8 border-black pl-6">
                Estudante de Sistemas para Internet com experiência em Python, automação e Inteligência Artificial aplicada à Educação.
              </div>
              <a href="#contato">
                <SquishyButton className="text-xl px-12 py-6">
                  ENTRAR EM CONTATO <Plus size={24} />
                </SquishyButton>
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      <main>
        <NarrativeSection />
        <ResumeSection />
        <StackSection />
        <ContactSection />
      </main>

      <footer className="bg-black text-white p-12 font-mono text-center">
        <p className="text-sm opacity-30 italic">© {new Date().getFullYear()} - PARA CORREÇÕES OU MELHORIAS ENTRE EM CONTATO COM RAYSSA SOUZA.</p>
      </footer>
    </div>
  );
}
