import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

interface FlipPageProps {
  image: string;
  title: string;
  description: string;
  pageNumber: number;
  side: "left" | "right";
  showContent?: boolean;
}

export function FlipPage({
  image,
  title,
  description,
  pageNumber,
  side,
  showContent = true,
}: FlipPageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  // --- CONFIGURAÇÃO VISUAL ---
  const imageVariants = {
    closed: {
      scale: 1,
      filter: "blur(0px)",
      opacity: 1
    },
    open: {
      scale: 1.05,
      filter: "blur(0px)", // Removed blur animation for performance
      opacity: 0.4
    }
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden select-none group">

      {/* 1. IMAGEM DE FUNDO */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          initial="closed"
          animate={isExpanded ? "open" : "closed"}
          variants={imageVariants}
          transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }} // smooth cinematic transition
          className="w-full h-full object-cover"
        />

        {/* Overlay do fundo */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isExpanded ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
        />
      </div>

      {/* 2. CAMADA DE CONTEÚDO */}
      {showContent && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex flex-col z-10"
          initial={{ height: "auto", backgroundColor: "rgba(255, 255, 255, 0)" }}
          animate={{
            height: isExpanded ? "100%" : "auto",
            backgroundColor: isExpanded ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0)"
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 1
          }}
        >
          {/* Botão de Fechar (X) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: -45 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                onClick={toggleExpand}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-gray-800 z-50 shadow-sm transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Wrapper do Conteúdo */}
          <motion.div
            className={`relative flex flex-col ${isExpanded ? "h-full p-8 pt-16" : "p-8 pb-10"} ${pageNumber === 1 ? "items-center justify-end text-center pb-16" : ""}`}
          >

            {/* Título */}
            <motion.h3
              layout="position"
              animate={{ color: isExpanded ? "#111827" : "#ffffff" }}
              transition={{ duration: 0.4 }}
              className="font-serif font-bold text-3xl mb-2 z-20 origin-left"
            >
              {title}
            </motion.h3>

            {/* Área Dinâmica (Texto vs Botão) - Escondida na Capa e se não houver descrição */}
            {pageNumber !== 1 && description && (
              <div className="relative z-20 flex-1 min-h-0 flex flex-col">
                <AnimatePresence>
                  {isExpanded ? (
                    // --- MODO ABERTO (Texto Completo) ---
                    <motion.div
                      key="expanded-text"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
                      className="text-gray-700 text-lg leading-relaxed mt-4 overflow-y-auto pr-2 no-scrollbar flex-1"
                    >
                      <p>{description}</p>

                    </motion.div>
                  ) : (
                    // --- MODO FECHADO (Botão) ---
                    <motion.div
                      key="closed-button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.button
                        onClick={toggleExpand}
                        className="mt-2 flex items-center gap-2 text-white/90 text-xs font-bold uppercase tracking-widest hover:text-amber-400 transition-colors group/btn cursor-pointer"
                      >
                        <span>Descobrir</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Número da Página */}
          <motion.div
            layout="position"
            animate={{ color: isExpanded ? "#9CA3AF" : "rgba(255,255,255,0.6)" }}
            className="absolute bottom-6 right-6 text-xs font-medium z-20"
          >
            {pageNumber}
          </motion.div>

        </motion.div>
      )}
    </div>
  );
}