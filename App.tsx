import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  CheckCircle2, 
  Star, 
  Clock, 
  ShieldCheck, 
  Heart,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { EXPERT_INFO, IMAGES } from './constants';

// --- Sub-components ---

const CTAButton: React.FC<{ label: string; secondary?: boolean; pulse?: boolean }> = ({ label, secondary, pulse }) => (
  <a 
    href={EXPERT_INFO.igDirectLink}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl w-full max-w-sm mx-auto
      ${secondary 
        ? "bg-white text-black border-2 border-gray-100" 
        : "premium-gradient text-white"}
      ${pulse ? "animate-bounce" : ""}
    `}
  >
    <Instagram size={22} />
    <span>{label}</span>
  </a>
);

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => (
  <section id={id} className={`py-16 px-6 max-w-4xl mx-auto ${className || ""}`}>
    {children}
  </section>
);

const Lightbox: React.FC<{ src: string; onClose: () => void }> = ({ src, onClose }) => (
  <div 
    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 transition-opacity duration-300"
    onClick={onClose}
  >
    <button className="absolute top-6 right-6 text-white p-2" onClick={onClose}>
      <X size={32} />
    </button>
    <img 
      src={src} 
      alt="Resultado Ampliado" 
      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
    />
  </div>
);

// --- Sections ---

const Hero = () => (
  <section className="relative flex flex-col bg-black overflow-hidden">
    {/* Foto do Expert - Revertido para o tamanho original */}
    <div className="relative w-full flex justify-center bg-black">
      <img 
        src={IMAGES.hero} 
        alt={EXPERT_INFO.name} 
        className="w-full h-auto max-h-[85vh] object-contain object-top"
      />
      {/* Overlay gradiente para legibilidade do texto que ficará por cima */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
    </div>

    {/* Conteúdo POSICIONADO EM CIMA DA FOTO */}
    <div className="relative z-10 -mt-20 px-6 pb-16 text-center animate-fade-in">
      <div className="mb-6 space-y-3">
        <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-[0.3em] uppercase text-[#c5a059]">
          Cirurgião Dentista
        </span>
        <h1 className="text-3xl font-bold leading-tight">
          Eu sou o <span className="block">Dr. {EXPERT_INFO.name},</span> 
          <span className="text-[#c5a059] text-xl block mt-1">Dentista em {EXPERT_INFO.location}.</span>
        </h1>
        <p className="text-gray-300 text-sm font-light max-w-xs mx-auto leading-relaxed">
          Especialista focado em devolver sua autoestima com segurança, precisão e tecnologia.
        </p>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        <CTAButton label="Agendar no Instagram" />
        <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
          Excelência em cada detalhe • Agende sua avaliação
        </p>
      </div>
    </div>
  </section>
);

const About = () => (
  <Section className="bg-[#0a0a0a]">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="relative">
        <div className="absolute -inset-4 premium-gradient opacity-10 blur-3xl rounded-full"></div>
        <img 
          src={IMAGES.about} 
          alt="Dr. João Victor Torres" 
          className="relative rounded-2xl shadow-2xl border border-white/10 w-full"
        />
      </div>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-[#c5a059] pl-4">Excelência e Proximidade</h2>
        <div className="space-y-4 text-gray-300 text-base leading-relaxed text-left">
          <p>
            Minha missão vai além de procedimentos técnicos. Busco entender as dores e os sonhos de cada paciente para devolver a autoestima através de um sorriso saudável.
          </p>
          <ul className="space-y-3">
            {[
              "Especialista em Ortodontia",
              "Pós-graduado em Prótese e Cirurgia Oral",
              "Atendimento focado no seu conforto",
              "Planejamento digital personalizado"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-[#c5a059] mt-1 shrink-0" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </Section>
);

const ResultsGrid = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <Section className="bg-neutral-950">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">A Arte de Transformar Sorrisos</h2>
        <p className="text-gray-400 max-w-xl mx-auto italic text-sm">
          Cada caso é único, planejado com precisão para devolver a harmonia e a confiança que você merece.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {IMAGES.results.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setSelectedImg(img)}
          >
            <img 
              src={img} 
              alt={`Transformação ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-white border border-white/40 px-3 py-1 rounded">Ver Detalhes</span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-tighter">
        * Resultados individuais podem variar. Fotos com fins educativos.
      </p>

      {selectedImg && <Lightbox src={selectedImg} onClose={() => setSelectedImg(null)} />}
    </Section>
  );
};

const Differentiators = () => {
  const cards = [
    { icon: <ShieldCheck size={32} />, title: "Avaliação Honesta", desc: "Transparência total sobre seu caso, sem procedimentos desnecessários." },
    { icon: <Heart size={32} />, title: "Atendimento Humanizado", desc: "Entendemos que o dentista pode gerar ansiedade. Nosso foco é seu bem-estar." },
    { icon: <Star size={32} />, title: "Foco no Resultado", desc: "A busca pela perfeição estética unida à funcionalidade perfeita." },
    { icon: <Clock size={32} />, title: "Respeito ao Tempo", desc: "Valorizamos seu tempo com horários rigorosamente cumpridos." },
  ];

  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Por que confiar em mim?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl flex flex-col gap-4">
            <div className="text-[#c5a059]">{card.icon}</div>
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Steps = () => {
  const steps = [
    { icon: <Instagram size={28} />, title: "Direct", desc: "Envie uma mensagem solicitando agendamento." },
    { icon: <Calendar size={28} />, title: "Reserva", desc: "Definimos o melhor horário para sua visita." },
    { icon: <CheckCircle2 size={28} />, title: "Consulta", desc: "Realizamos sua avaliação diagnóstica completa." }
  ];

  return (
    <Section className="bg-[#0a0a0a]">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Sua Jornada para o Novo Sorriso</h2>
        <p className="text-[#c5a059] font-bold text-sm uppercase tracking-widest">Processo simples e focado em você.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center justify-between">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-4 group w-full">
            <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center text-[#c5a059] group-hover:premium-gradient group-hover:text-white transition-all shadow-lg">
              {step.icon}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">{step.title}</h3>
              <p className="text-gray-400 text-sm max-w-[150px] mx-auto">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const HobbyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.hobby.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.hobby.length) % IMAGES.hobby.length);
  };

  return (
    <Section className="bg-neutral-950">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-4 text-[#c5a059]">Propósito e Estilo de Vida</h2>
      <p className="text-gray-400 text-sm">Momentos e paixões que fazem parte de quem eu sou.</p>
    </div>
      
      <div className="relative max-w-sm mx-auto group">
        <div className="overflow-hidden rounded-2xl aspect-[4/5] shadow-lg border border-white/5 relative">
          <img 
            src={IMAGES.hobby[currentIndex]} 
            alt={`Estilo de vida ${currentIndex}`} 
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Próximo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {IMAGES.hobby.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir para imagem ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm font-medium text-gray-600 italic">
        "Excelência em cada detalhe, dentro e fora do trabalho."
      </div>
    </Section>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/5 py-12 px-6">
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white uppercase tracking-[0.3em]">Dr. {EXPERT_INFO.name}</h2>
        <p className="text-[#c5a059] text-xs font-semibold uppercase">{EXPERT_INFO.profession}</p>
        <p className="text-gray-500 text-[10px] italic tracking-widest">{EXPERT_INFO.location}</p>
      </div>
      
      <div className="flex justify-center gap-8">
        <a 
          href={EXPERT_INFO.instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110"
        >
          <Instagram size={24} />
        </a>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-4">
        <p className="text-gray-700 text-[9px] uppercase tracking-[0.2em] font-medium">
          © {new Date().getFullYear()} • Todos os direitos reservados
        </p>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
      <a 
        href={EXPERT_INFO.igDirectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="premium-gradient p-4 rounded-full shadow-2xl flex items-center justify-center text-white transform hover:scale-110 active:scale-90 transition-all border border-white/20"
      >
        <Instagram size={28} />
      </a>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="antialiased select-none bg-black">
      <Hero />
      <About />
      <ResultsGrid />
      <Differentiators />
      
      {/* Intermediate CTA */}
      <div className="bg-[#c5a059]/10 py-20 px-6 border-y border-[#c5a059]/20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold italic">"Sua saúde bucal é o meu maior compromisso."</h2>
          <p className="text-gray-300 text-sm">Não adie mais o cuidado com você mesmo. Vamos conversar agora?</p>
          <CTAButton label="Agendar via Instagram" />
        </div>
      </div>

      <Steps />
      <HobbyGallery />

      {/* Final Decision Block */}
      <Section className="bg-black py-24">
        <div className="glass-card p-10 rounded-3xl text-center space-y-8 border-[#c5a059]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Star size={80} className="text-[#c5a059]" />
          </div>
          <h2 className="text-3xl font-bold">Pronto para transformar seu sorriso?</h2>
          <p className="text-gray-300 text-base">
            Dê o primeiro passo agora. Estou pronto para te atender pessoalmente e planejar seu novo sorriso.
          </p>
          <div className="flex flex-col items-center gap-6">
            <CTAButton label="Garantir minha consulta no Direct" pulse />
            <div className="flex items-center gap-2 text-[10px] text-pink-500 font-bold tracking-[0.2em] uppercase">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              Resposta Rápida no Instagram
            </div>
          </div>
        </div>
      </Section>

      <Footer />
      <FloatingCTA />
    </div>
  );
}
