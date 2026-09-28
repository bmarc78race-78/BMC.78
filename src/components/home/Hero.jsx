import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  
  const scrollToCase = (e) => {
    e.preventDefault();
    document.getElementById("anchor-case")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[760px] border-b border-border/70 logic-grid overflow-hidden">
      <div className="mx-auto grid min-h-[680px] max-w-7xl md:grid-cols-12">
        
        {/* Coluna da Esquerda: Textos */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="flex flex-col justify-center px-6 py-20 md:col-span-7 md:px-10 lg:px-14"
        >
          <div className="mb-6 inline-flex w-fit items-center gap-2 border border-border bg-card px-4 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            {t("hero.eyebrow")}
          </div>
          
          {/* H1 Corrigido: Escala reduzida de 7xl para 5xl/6xl e max-w ajustado */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
            {t("hero.text")}
          </p>
          
          <div className="mt-10 flex flex-wrap gap-3">
            <button onClick={scrollToCase} className="inline-flex items-center gap-3 bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.6)]">
              {t("hero.primary")}
              <ChevronDown className="h-4 w-4" />
            </button>
            <Link to="/sobre" className="inline-flex items-center gap-3 border border-border px-6 py-3.5 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]">
              {t("hero.secondary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Coluna da Direita: O Contador 27 */}
        {/* Corrigido: justify-center items-center ao invés de items-end, col-span-5 para dar mais espaço */}
        <div className="relative flex items-center justify-center p-8 md:col-span-5 lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/.15),transparent_40%)]" />
          <div className="absolute inset-10 rounded-full border border-primary/20 shadow-[0_0_80px_hsl(var(--primary)/0.12)]" />
          
          <motion.div 
            initial={{ opacity: 0, scale: .9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: .35 }} 
            className="relative flex flex-col items-center text-center"
          >
            {/* Removido o px-12 que empurrava o número */}
            <strong className="block font-black leading-none tracking-[-.05em] text-foreground text-8xl lg:text-9xl">
              27
            </strong>
            {/* Linha horizontal para ancorar a legenda */}
            <p className="mt-4 max-w-[180px] border-t-2 border-primary/70 pt-3 text-sm leading-5 text-muted-foreground">
              {t("hero.counter")}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}