import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { ArrowRight, Share2, Fingerprint, Monitor, TrendingUp, Search, MousePointer2, MessageCircle, Users, PenTool, Type, Smartphone, Code2, Camera, MapPin, Mail, RotateCw } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ChatWidget from '@/components/ChatWidget';
import logoSrc from '@assets/TD_1778579526586.png';
import clientAryan from '@assets/ARYAN_POST-02_1778671423544.png';
import clientDisposal from '@assets/Disposal_walaa_1778671423551.png';
import clientSolitaire from '@assets/Elegant_Company_Profile_Presentation_20240917_200742_0000_1778671423551.png';
import clientFestival from '@assets/Festivalwalaa_1778671423552.png';
import clientInspire from '@assets/inspire_1778671423552.png';
import clientKamal from '@assets/Kamal,__1778671423552.png';
import clientKashi from '@assets/Kashi_1778671423552.png';
import clientKsi from '@assets/ksi_logo_1778671423552.png';
import clientMohiniLogo from '@assets/logo_mohini_1778671423552.png';
import clientMahadev from '@assets/MAHAdev_LIGHTING_STUDIO_1778671423553.png';
import clientMohiniFinal from '@assets/mohini_logo_final_1778671423553.png';
import clientOm from '@assets/om_1778671423553.png';
import clientPaam from '@assets/Paam_1778671423553.png';
import clientRangutsav from '@assets/rangutsav__1778671423553.png';
import clientShakti from '@assets/shakti_1778671423553.jpeg';
import clientToothFairy from '@assets/tooth_fairy_1778671423553.png';

const clientLogos = [
  { src: clientAryan, name: 'Arya' },
  { src: clientDisposal, name: 'Disposal Walaa' },
  { src: clientSolitaire, name: 'Solitaire Gallery' },
  { src: clientFestival, name: 'Festival Walaa' },
  { src: clientInspire, name: 'Inspire' },
  { src: clientKamal, name: 'Kamal Textiles' },
  { src: clientKashi, name: 'Kashi' },
  { src: clientKsi, name: 'KSI' },
  { src: clientMohiniLogo, name: 'Mohini Gems' },
  { src: clientMahadev, name: 'Mahadev Lighting' },
  { src: clientMohiniFinal, name: 'Mohini Jewels' },
  { src: clientOm, name: 'Om Marmo World' },
  { src: clientPaam, name: 'Paam Commercial' },
  { src: clientRangutsav, name: 'Rangutsav Events' },
  { src: clientShakti, name: 'Shakti' },
  { src: clientToothFairy, name: 'Tooth Fairy' },
];

const easeExpo = [0.16, 1, 0.3, 1] as const;

const FadeIn = ({ children, delay = 0, className = "", style }: { children: React.ReactNode, delay?: number, className?: string, style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.9, delay, ease: easeExpo }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 1, delay, ease: easeExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 2.2, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  useEffect(() => {
    if (!isInView && startOnView) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, startOnView]);
  return { count, ref };
}

/* ─────────────────────────────────────────────
   Floating Orb
───────────────────────────────────────────── */
function FloatingOrb({ x, y, size, color, delay, duration }: { x: string; y: string; size: number; color: string; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: `blur(${size * 0.4}px)` }}
      animate={{ y: [0, -28, 12, -18, 0], x: [0, 12, -8, 16, 0], scale: [1, 1.12, 0.94, 1.08, 1], opacity: [0.55, 0.75, 0.5, 0.7, 0.55] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─────────────────────────────────────────────
   Stats Section
───────────────────────────────────────────── */
function StatCard({ val, suffix, label, delay, symbol }: { val: number; suffix: string; label: string; delay: number; symbol?: string }) {
  const { count, ref } = useCountUp(val, 2.0);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center px-6 py-10 group"
    >
      {/* Card glow bg */}
      <div className="absolute inset-0 rounded-2xl bg-white/[0.03] border border-white/[0.08] group-hover:border-[#C79D7D]/30 group-hover:bg-white/[0.06] transition-all duration-500" />
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, #FFB800, transparent)' }}
        initial={{ width: 0 }}
        whileInView={{ width: '60%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: delay + 0.3 }}
      />
      {/* Glow dot */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full -translate-y-1"
        style={{ background: '#FFB800', boxShadow: '0 0 12px 4px rgba(255,184,0,0.6)' }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.4, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, delay }}
      />

      <div className="relative z-10">
        {/* Number */}
        <div className="flex items-end justify-center gap-1 mb-3">
          <span className="text-5xl md:text-7xl font-serif text-[#EDE9E5] leading-none tabular-nums">
            {symbol ?? count}
          </span>
          <span className="text-3xl md:text-5xl font-serif text-[#FFB800] leading-none mb-1">{suffix}</span>
        </div>
        {/* Divider */}
        <div className="w-8 h-px bg-[#C79D7D]/40 mx-auto mb-3" />
        {/* Label */}
        <p className="text-[10px] md:text-xs text-[#D8C2B2]/65 uppercase tracking-[0.25em] font-sans leading-relaxed">{label}</p>
      </div>
    </motion.div>
  );
}

function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: `${(i * 37 + 5) % 100}%`,
    y: `${(i * 53 + 8) % 100}%`,
    size: 2 + (i % 3),
    delay: (i * 0.18) % 3,
    duration: 3 + (i % 4),
  }));

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden">
      {/* ── Background layers ── */}
      {/* Base gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a0e08 0%, #2e1c0e 35%, #3d2510 55%, #2a1a0c 75%, #130b06 100%)' }} />

      {/* Radial centre glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,184,0,0.12) 0%, rgba(199,157,125,0.08) 35%, transparent 70%)' }} />

      {/* Top & bottom edge glows */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,184,0,0.5) 30%, rgba(255,184,0,0.8) 50%, rgba(255,184,0,0.5) 70%, transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(199,157,125,0.4) 50%, transparent 100%)' }} />

      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="statsGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,184,0,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#statsGrid)" />
      </svg>

      {/* Diagonal light streak */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '-20%', left: '-10%', width: '60%', height: '200%', background: 'linear-gradient(105deg, transparent 40%, rgba(255,184,0,0.04) 50%, transparent 60%)', transform: 'rotate(15deg)' }}
        animate={{ x: ['-10%', '130%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
      />

      {/* Floating orbs */}
      <FloatingOrb x="5%" y="15%" size={160} color="rgba(255,184,0,0.18)" delay={0} duration={7} />
      <FloatingOrb x="75%" y="5%" size={200} color="rgba(199,157,125,0.15)" delay={1.5} duration={9} />
      <FloatingOrb x="55%" y="60%" size={120} color="rgba(255,140,0,0.14)" delay={0.8} duration={8} />
      <FloatingOrb x="15%" y="65%" size={100} color="rgba(255,200,80,0.12)" delay={2.2} duration={6} />
      <FloatingOrb x="85%" y="55%" size={80} color="rgba(255,184,0,0.16)" delay={1.0} duration={7.5} />

      {/* Particle dots */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size, background: 'rgba(255,184,0,0.5)', boxShadow: '0 0 4px rgba(255,184,0,0.4)' }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.4, 0.8], y: [0, -8, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.p
          className="text-center text-[10px] uppercase tracking-[0.4em] text-[#C79D7D]/70 font-sans mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          Our Impact in Numbers
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard val={50} suffix="+" label="Brands Scaled" delay={0} />
          <StatCard val={15} suffix="M+" label="Organic Reach Generated" delay={0.12} />
          <StatCard val={1000} suffix="+" label="Creatives Delivered" delay={0.24} />
          <StatCard val={0} suffix="" label="Multi-Industry Experience" delay={0.36} symbol="∞" />
        </div>

        {/* Bottom ticker — auto-scrolling, all tags always visible */}
        <motion.div
          className="mt-14 overflow-hidden relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 h-full w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(26,14,8,1), transparent)' }} />
          <div className="absolute right-0 top-0 h-full w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(26,14,8,1), transparent)' }} />
          <div className="flex" style={{ animation: 'statsTicker 22s linear infinite' }}>
            {[...['Jewellery', 'Fashion', 'Healthcare', 'Hospitality', 'Lighting', 'Marble', 'Textiles', 'F&B', 'Real Estate', 'Education'],
              ...['Jewellery', 'Fashion', 'Healthcare', 'Hospitality', 'Lighting', 'Marble', 'Textiles', 'F&B', 'Real Estate', 'Education']
            ].map((tag, i) => (
              <span
                key={i}
                className="flex-shrink-0 text-[11px] uppercase tracking-widest font-sans px-4 py-2 mx-2 border border-[#C79D7D]/35 text-[#C79D7D] rounded-full whitespace-nowrap"
                style={{ background: 'rgba(255,184,0,0.05)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const yHero = useTransform(scrollY, [0, 1000], [0, 280]);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', brand: '', service: '', message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState('');

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('submitting');
    setFormError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', brand: '', service: '', message: '' });
    } catch {
      setFormStatus('error');
      setFormError('Something went wrong. Please try again or email us directly.');
    }
  }, [formData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="noise-overlay" />

      {/* ── 1. Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#EDE9E5]/92 backdrop-blur-lg py-3 border-b border-[#D8C2B2]/60 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Trend Digitally" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/20" />
            <span className={`font-serif text-lg font-bold tracking-tight hidden sm:block transition-colors duration-500 ${isScrolled ? 'text-[#5E4E45]' : 'text-[#EDE9E5]'}`}>
              Trend Digitally
            </span>
          </div>
          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-500 ${isScrolled ? 'text-[#5E4E45]/80' : 'text-[#EDE9E5]/80'}`}>
            {['services','about','contact'].map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
                className={`relative group transition-colors duration-300 capitalize ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C79D7D] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Link
              href="/work"
              className={`relative group transition-colors duration-300 ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}
            >
              Work
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C79D7D] group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
          <button
            data-testid="button-nav-book"
            onClick={() => scrollToSection('contact')}
            className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-500 ${
              isScrolled
                ? 'bg-[#5E4E45] text-[#EDE9E5] hover:bg-[#5E4E45]/80'
                : 'bg-[#C79D7D] text-[#1a1210] hover:bg-[#D8C2B2]'
            }`}
          >
            Book a Call
          </button>
        </div>
      </header>

      {/* ── 2. Hero ── */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#1a1210]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(94,78,69,0.55)_0%,rgba(26,18,16,0)_70%)]" />
        <div className="absolute top-[10%] left-[10%] w-[55vw] h-[55vw] bg-[#5E4E45] rounded-full blob opacity-40" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[45vw] h-[45vw] bg-[#C79D7D] rounded-full blob opacity-20" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[50%] left-[55%] w-[30vw] h-[30vw] bg-[#D8C2B2] rounded-full blob opacity-10" style={{ animationDelay: '-14s' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#C79D7D]/20 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#C79D7D]/10 to-transparent" />
          <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C79D7D]/15 to-transparent" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[30vw] font-bold text-white/[0.03] leading-none tracking-tighter">TD</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-32 right-8 md:right-16 hidden md:flex items-center gap-2 border border-[#C79D7D]/30 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-[#C79D7D] animate-pulse" />
          <span className="text-[#D8C2B2] text-xs tracking-widest uppercase font-sans">Creative Growth Agency</span>
        </motion.div>

        <motion.div style={{ y: yHero }} className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[#C79D7D] text-xs font-sans uppercase tracking-[0.4em] mb-8 flex items-center gap-4"
          >
            <span className="w-8 h-px bg-[#C79D7D]/60" />
            Since 2024 · 50+ Brands
            <span className="w-8 h-px bg-[#C79D7D]/60" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-[#EDE9E5] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] leading-[1.05] tracking-tight max-w-6xl"
          >
            We Don't Follow<br />
            <span className="italic text-[#C79D7D]">Trends.</span>
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-[#EDE9E5]/80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.05] tracking-tight max-w-6xl mt-2"
          >
            We Create <span className="italic text-[#D8C2B2]">Digital Authority.</span>
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-px bg-[#C79D7D]/50 mt-10 mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="font-sans text-[#9A8F88] text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            Trend Digitally helps ambitious brands dominate social media, performance marketing, content strategy, and creative storytelling — from Hyderabad to the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-5"
          >
            <a
              href="tel:+919013342230"
              data-testid="button-hero-book"
              className="group relative bg-[#C79D7D] text-[#1a1210] px-10 py-4 text-sm font-sans font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/work"
              data-testid="button-hero-work"
              className="group border border-[#EDE9E5]/20 text-[#EDE9E5] px-10 py-4 text-sm font-sans font-medium tracking-widest uppercase hover:border-[#C79D7D]/60 hover:text-[#C79D7D] transition-all duration-300 backdrop-blur-sm inline-flex items-center gap-3"
            >
              View Our Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[#9A8F88] text-[10px] tracking-widest uppercase font-sans">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-[#C79D7D]/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 3. Logo Marquee — DO NOT CHANGE DESIGN ── */}
      <section className="py-10 bg-[#1a1210] border-t border-white/5 overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[#9A8F88]/40 mb-8 font-sans">Trusted by brands across India</p>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#1a1210] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#1a1210] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track flex items-center">
            {clientLogos.map((logo, i) => (
              <div key={`a-${i}`} className="flex-shrink-0 mx-12 h-24 flex items-center justify-center">
                <img src={logo.src} alt={logo.name} className="h-20 max-w-[180px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-md" />
              </div>
            ))}
            {clientLogos.map((logo, i) => (
              <div key={`b-${i}`} className="flex-shrink-0 mx-12 h-24 flex items-center justify-center" aria-hidden="true">
                <img src={logo.src} alt={logo.name} className="h-20 max-w-[180px] w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 drop-shadow-md" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. About ── */}
      <section id="about" className="py-32 bg-[#EDE9E5] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <FadeIn className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-6 font-sans">About the Agency</p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#5E4E45] leading-[1.05] tracking-tight">
                Born to<br />
                <span className="italic text-[#C79D7D]">Redefine</span><br />
                Digital.
              </h2>
              <div className="mt-12 flex gap-12">
                {[{ n: '50+', l: 'Brands Scaled' }, { n: '1000+', l: 'Creatives Made' }, { n: '2024', l: 'Founded' }].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: easeExpo }}
                  >
                    <div className="text-3xl font-serif text-[#5E4E45]">{s.n}</div>
                    <div className="text-xs text-[#9A8F88] uppercase tracking-widest mt-1">{s.l}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="lg:col-span-7 lg:pl-12 border-l border-[#D8C2B2]/60">
              <div className="space-y-7 text-[#5E4E45]/80 text-lg leading-relaxed font-sans">
                <p>
                  Trend Digitally is a Hyderabad-based creative growth agency founded by <span className="text-[#5E4E45] font-semibold">Aayush and Shraddha</span> in 2024. We help ambitious brands build authority through strategic storytelling, social media marketing, branding, paid advertising, and high-converting digital experiences.
                </p>
                <p>
                  In a short span, we have helped 50+ businesses establish stronger brand identities, expand audience reach, and create impactful digital presence across multiple industries — from jewellery and fashion to healthcare and hospitality.
                </p>
                <p>
                  We combine creativity, strategy, and modern execution to craft brands that stand out in a crowded digital world. Every campaign, every creative, every click — engineered to convert.
                </p>
              </div>
              <div className="mt-12">
                <button
                  onClick={() => scrollToSection('contact')}
                  data-testid="button-about-book"
                  className="group inline-flex items-center gap-3 bg-[#5E4E45] text-[#EDE9E5] px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-[#C79D7D] transition-all duration-300"
                >
                  Start the Conversation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 5. Services ── */}
      <section id="services" className="py-32 bg-[#1a1210] relative overflow-hidden">

        {/* Dot-grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(199,157,125,0.13) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

        {/* Glowing orbs */}
        <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(199,157,125,0.10) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-1/2 -right-40 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(94,78,69,0.18) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute -bottom-24 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(199,157,125,0.08) 0%, transparent 70%)', filter: 'blur(45px)' }} />

        {/* Thin diagonal accent lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <line x1="0" y1="30%" x2="100%" y2="70%" stroke="#C79D7D" strokeWidth="1" />
          <line x1="0" y1="60%" x2="100%" y2="20%" stroke="#C79D7D" strokeWidth="0.5" />
          <line x1="15%" y1="0" x2="85%" y2="100%" stroke="#C79D7D" strokeWidth="0.5" />
        </svg>

        {/* Large ghosted "TD" watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[22vw] font-bold text-[#C79D7D] opacity-[0.03] leading-none tracking-tighter">TD</span>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Expertise</h2>
            </div>
            <p className="text-[#9A8F88] max-w-xs text-sm leading-relaxed font-sans">Full-spectrum digital solutions for brands demanding excellence at every touchpoint.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: '01', name: 'Social Media Marketing', desc: 'Scroll-stopping content strategies that grow communities and drive consistent engagement.', Icon: Share2, accent: 'from-[#C79D7D]/20 to-transparent' },
              { num: '02', name: 'Branding Strategy', desc: 'Premium brand identities that position you as the authority in your market.', Icon: Fingerprint, accent: 'from-[#D8C2B2]/15 to-transparent' },
              { num: '03', name: 'Website Designing', desc: 'High-converting digital experiences that build trust and turn visitors into clients.', Icon: Monitor, accent: 'from-[#9A8F88]/15 to-transparent' },
              { num: '04', name: 'Performance Marketing', desc: 'Full-funnel paid campaigns engineered for measurable, scalable return on investment.', Icon: TrendingUp, accent: 'from-[#C79D7D]/20 to-transparent' },
              { num: '05', name: 'SEO', desc: 'Organic dominance through technical precision, content authority, and link strategy.', Icon: Search, accent: 'from-[#5E4E45]/40 to-transparent' },
              { num: '06', name: 'Google Ads', desc: 'Laser-targeted search campaigns that capture high-intent buyers at the right moment.', Icon: MousePointer2, accent: 'from-[#C79D7D]/15 to-transparent' },
              { num: '07', name: 'WhatsApp Marketing', desc: 'Direct, personalised outreach that converts at higher rates than any other channel.', Icon: MessageCircle, accent: 'from-[#9A8F88]/20 to-transparent' },
              { num: '08', name: 'Influencer Marketing', desc: 'Curated partnerships with creators who move audiences and build brand credibility.', Icon: Users, accent: 'from-[#D8C2B2]/15 to-transparent' },
              { num: '09', name: 'Content Writing', desc: 'Strategic narratives crafted to educate, engage, and guide your audience to action.', Icon: PenTool, accent: 'from-[#C79D7D]/20 to-transparent' },
              { num: '10', name: 'Copywriting', desc: 'Words that sell. Every headline, caption, and CTA engineered to convert.', Icon: Type, accent: 'from-[#5E4E45]/40 to-transparent' },
              { num: '11', name: 'App Development', desc: 'Intuitive mobile experiences that extend your brand and delight your customers.', Icon: Smartphone, accent: 'from-[#9A8F88]/20 to-transparent' },
              { num: '12', name: 'Software Development', desc: 'Custom digital tools and platforms built to streamline operations and power growth.', Icon: Code2, accent: 'from-[#C79D7D]/15 to-transparent' },
              { num: '13', name: 'Product Photoshoots', desc: 'Studio-quality visuals that elevate your product and elevate purchase intent.', Icon: Camera, accent: 'from-[#D8C2B2]/20 to-transparent' },
              { num: '14', name: 'Google My Business', desc: 'Dominate local search and build your reputation where customers are looking.', Icon: MapPin, accent: 'from-[#C79D7D]/20 to-transparent' },
              { num: '15', name: 'Email Marketing', desc: 'Automated nurture sequences and campaigns that convert subscribers into buyers.', Icon: Mail, accent: 'from-[#9A8F88]/20 to-transparent' },
              { num: '16', name: '360° Marketing', desc: 'End-to-end digital ecosystem management — from awareness to conversion to retention.', Icon: RotateCw, accent: 'from-[#5E4E45]/40 to-transparent' },
            ].map((service, i) => (
              <FadeIn
                key={i}
                delay={i * 0.03}
                className="group relative overflow-hidden border border-white/10 p-6 flex flex-col gap-4 min-h-[260px] cursor-default transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C79D7D]/50 hover:shadow-[0_12px_40px_rgba(199,157,125,0.15)]"
                style={{ background: 'linear-gradient(160deg,#221810 0%,#160f0d 60%,#1a1210 100%)' }}
              >
                {/* Top accent bar — always visible, glows on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(90deg,#C79D7D 0%,rgba(199,157,125,0.2) 100%)' }} />

                {/* Glowing bg blob behind icon */}
                <div className="absolute top-4 right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(199,157,125,0.12) 0%, transparent 70%)' }} />

                {/* Icon block — big and prominent */}
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#C79D7D]/20 group-hover:border-[#C79D7D]/60 group-hover:bg-[#C79D7D]/10 transition-all duration-400"
                    style={{ background: 'linear-gradient(135deg,rgba(199,157,125,0.08),rgba(94,78,69,0.12))' }}>
                    <service.Icon className="w-7 h-7 text-[#C79D7D]/60 group-hover:text-[#C79D7D] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[11px] text-[#C79D7D]/30 tracking-widest mt-1 group-hover:text-[#C79D7D]/60 transition-colors duration-300">{service.num}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 flex-1 justify-end">
                  <h3 className="text-[15px] font-serif text-[#EDE9E5] leading-snug group-hover:text-[#C79D7D] transition-colors duration-300">{service.name}</h3>
                  <p className="text-[#9A8F88]/60 text-xs leading-relaxed group-hover:text-[#9A8F88] transition-colors duration-400">{service.desc}</p>
                </div>

                {/* Bottom line reveal */}
                <div className="pt-1 border-t border-white/[0.05] group-hover:border-[#C79D7D]/20 transition-colors duration-500">
                  <div className="h-px bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#C79D7D]/40 group-hover:to-transparent transition-all duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Stats ── */}
      <StatsSection />

      {/* ── 7. Our Work (floating grid) ── */}
      <section id="work" className="py-24 bg-[#1a1210] overflow-hidden">
        {/* Header */}
        <FadeIn className="text-center mb-16 px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">Our Work</p>
          <h2 className="text-5xl md:text-7xl font-serif text-[#EDE9E5] leading-tight">
            Posts &amp; <em className="italic text-[#C79D7D]">Reels</em>
          </h2>
        </FadeIn>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-4">
          <div className="work-row-ltr">
            {[
              { label: 'POST', tag: 'Jewellery', color: 'from-[#C79D7D]/40 to-[#9A8F88]/20', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Fashion', color: 'from-[#5E4E45] to-[#C79D7D]/30', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Branding', color: 'from-[#D8C2B2]/50 to-[#9A8F88]/30', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Healthcare', color: 'from-[#9A8F88]/40 to-[#5E4E45]/60', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Hospitality', color: 'from-[#C79D7D]/25 to-[#D8C2B2]/40', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Lighting', color: 'from-[#5E4E45]/80 to-[#C79D7D]/20', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Marble', color: 'from-[#D8C2B2]/60 to-[#9A8F88]/20', aspect: 'aspect-square', w: 'w-52' },
              { label: 'POST', tag: 'Textiles', color: 'from-[#9A8F88]/30 to-[#C79D7D]/40', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Jewellery', color: 'from-[#C79D7D]/50 to-[#5E4E45]/60', aspect: 'aspect-[9/16]', w: 'w-32' },
            ].flatMap((c, _, arr) => [...arr, ...arr]).map((card, i) => (
              <div key={i} className={`${card.w} flex-shrink-0 mx-2`}>
                <div className={`${card.aspect} bg-gradient-to-br ${card.color} relative overflow-hidden rounded-sm group`}>
                  <div className="absolute inset-0 bg-[#1a1210]/10" />
                  <div className="absolute top-3 left-3 text-[10px] font-sans font-bold tracking-widest text-[#EDE9E5]/60 bg-[#1a1210]/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                    {card.label}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#EDE9E5]/50 font-sans">{card.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden mb-4">
          <div className="work-row-rtl">
            {[
              { label: 'REEL', tag: 'Fashion', color: 'from-[#5E4E45] to-[#9A8F88]/50', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Branding', color: 'from-[#D8C2B2]/40 to-[#C79D7D]/30', aspect: 'aspect-square', w: 'w-52' },
              { label: 'POST', tag: 'Healthcare', color: 'from-[#9A8F88]/50 to-[#D8C2B2]/30', aspect: 'aspect-square', w: 'w-44' },
              { label: 'REEL', tag: 'Hospitality', color: 'from-[#C79D7D]/30 to-[#5E4E45]/70', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Marble', color: 'from-[#C79D7D]/45 to-[#9A8F88]/20', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Lighting', color: 'from-[#D8C2B2]/50 to-[#C79D7D]/40', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Jewellery', color: 'from-[#5E4E45]/60 to-[#C79D7D]/50', aspect: 'aspect-square', w: 'w-44' },
              { label: 'REEL', tag: 'Textiles', color: 'from-[#9A8F88]/40 to-[#D8C2B2]/50', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Fashion', color: 'from-[#D8C2B2]/35 to-[#5E4E45]/50', aspect: 'aspect-square', w: 'w-52' },
            ].flatMap((c, _, arr) => [...arr, ...arr]).map((card, i) => (
              <div key={i} className={`${card.w} flex-shrink-0 mx-2`}>
                <div className={`${card.aspect} bg-gradient-to-br ${card.color} relative overflow-hidden rounded-sm`}>
                  <div className="absolute inset-0 bg-[#1a1210]/10" />
                  <div className="absolute top-3 left-3 text-[10px] font-sans font-bold tracking-widest text-[#EDE9E5]/60 bg-[#1a1210]/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                    {card.label}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#EDE9E5]/50 font-sans">{card.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3 — scrolls left, slower */}
        <div className="overflow-hidden mb-16">
          <div className="work-row-ltr2">
            {[
              { label: 'POST', tag: 'Hospitality', color: 'from-[#C79D7D]/35 to-[#D8C2B2]/20', aspect: 'aspect-square', w: 'w-44' },
              { label: 'REEL', tag: 'Branding', color: 'from-[#5E4E45]/70 to-[#9A8F88]/40', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Jewellery', color: 'from-[#9A8F88]/30 to-[#C79D7D]/50', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Fashion', color: 'from-[#D8C2B2]/45 to-[#5E4E45]/60', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Marble', color: 'from-[#C79D7D]/20 to-[#9A8F88]/50', aspect: 'aspect-square', w: 'w-44' },
              { label: 'POST', tag: 'Lighting', color: 'from-[#D8C2B2]/30 to-[#C79D7D]/40', aspect: 'aspect-square', w: 'w-52' },
              { label: 'REEL', tag: 'Healthcare', color: 'from-[#9A8F88]/50 to-[#D8C2B2]/30', aspect: 'aspect-[9/16]', w: 'w-32' },
              { label: 'POST', tag: 'Textiles', color: 'from-[#5E4E45]/50 to-[#C79D7D]/30', aspect: 'aspect-square', w: 'w-44' },
              { label: 'REEL', tag: 'Marble', color: 'from-[#C79D7D]/40 to-[#5E4E45]/70', aspect: 'aspect-[9/16]', w: 'w-32' },
            ].flatMap((c, _, arr) => [...arr, ...arr]).map((card, i) => (
              <div key={i} className={`${card.w} flex-shrink-0 mx-2`}>
                <div className={`${card.aspect} bg-gradient-to-br ${card.color} relative overflow-hidden rounded-sm`}>
                  <div className="absolute inset-0 bg-[#1a1210]/10" />
                  <div className="absolute top-3 left-3 text-[10px] font-sans font-bold tracking-widest text-[#EDE9E5]/60 bg-[#1a1210]/40 px-2 py-1 rounded-sm backdrop-blur-sm">
                    {card.label}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#EDE9E5]/50 font-sans">{card.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Works CTA */}
        <FadeIn className="text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 bg-[#C79D7D] text-[#1a1210] px-10 py-4 text-sm font-sans font-bold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300"
          >
            All Works
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </section>

      {/* ── 8. Methodology ── */}
      <section className="py-32 relative overflow-hidden">
        {/* Base gradient — warm dark, echoing logo copper tones */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0e0805 0%, #1c1008 30%, #251508 55%, #1a0e07 75%, #0d0604 100%)' }} />

        {/* Radial amber centre glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(199,157,125,0.14) 0%, rgba(255,184,0,0.06) 40%, transparent 70%)' }} />

        {/* Top glow arc */}
        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(199,157,125,0.6) 30%, rgba(255,184,0,0.9) 50%, rgba(199,157,125,0.6) 70%, transparent 95%)' }} />

        {/* Animated diagonal mesh lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.055]" preserveAspectRatio="none">
          <defs>
            <pattern id="methGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C79D7D" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#methGrid)" />
          {/* Diagonal accent lines */}
          <line x1="0" y1="20%" x2="100%" y2="80%" stroke="#FFB800" strokeWidth="0.5" opacity="0.4" />
          <line x1="0" y1="70%" x2="100%" y2="10%" stroke="#C79D7D" strokeWidth="0.4" opacity="0.3" />
          <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#FFB800" strokeWidth="0.3" opacity="0.25" />
        </svg>

        {/* Floating copper orbs */}
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ left: '8%', top: '15%', width: 220, height: 220, background: 'rgba(199,157,125,0.14)', filter: 'blur(70px)' }}
          animate={{ y: [0, -24, 10, -16, 0], x: [0, 10, -6, 14, 0], scale: [1, 1.1, 0.95, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ right: '6%', top: '20%', width: 280, height: 280, background: 'rgba(255,184,0,0.1)', filter: 'blur(80px)' }}
          animate={{ y: [0, 20, -14, 18, 0], x: [0, -12, 8, -10, 0], scale: [1, 1.12, 0.93, 1.06, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }} />
        <motion.div className="absolute pointer-events-none rounded-full"
          style={{ left: '40%', bottom: '10%', width: 180, height: 180, background: 'rgba(216,194,178,0.1)', filter: 'blur(60px)' }}
          animate={{ y: [0, -18, 8, -12, 0], scale: [1, 1.08, 0.96, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }} />

        {/* Animated sweeping light streak */}
        <motion.div className="absolute pointer-events-none"
          style={{ top: '-30%', left: '-15%', width: '55%', height: '200%', background: 'linear-gradient(110deg, transparent 38%, rgba(199,157,125,0.07) 50%, transparent 62%)', transform: 'rotate(12deg)' }}
          animate={{ x: ['-20%', '160%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', repeatDelay: 6 }} />

        {/* Particle dots */}
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ left: `${(i * 43 + 7) % 100}%`, top: `${(i * 61 + 11) % 100}%`, width: 2 + (i % 2), height: 2 + (i % 2), background: i % 3 === 0 ? 'rgba(255,184,0,0.6)' : 'rgba(199,157,125,0.5)', boxShadow: '0 0 5px rgba(255,184,0,0.3)' }}
            animate={{ opacity: [0.15, 0.7, 0.15], scale: [0.8, 1.5, 0.8], y: [0, -7, 0] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: (i * 0.22) % 3 }} />
        ))}

        {/* Ghosted "TD" watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[22vw] font-bold leading-none tracking-tighter" style={{ color: 'rgba(199,157,125,0.04)' }}>TD</span>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="mb-24 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">How We Work</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Methodology</h2>
            {/* Animated underline */}
            <motion.div className="mx-auto mt-5 h-px rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #FFB800, #C79D7D, transparent)' }}
              initial={{ width: 0 }} whileInView={{ width: 180 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
          </FadeIn>

          {/* Connector line with animated travelling dot */}
          <div className="hidden md:block absolute left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] z-10" style={{ top: 'calc(32px + 6.5rem + 24px + 32px)' }}>
            <div className="relative h-px" style={{ background: 'linear-gradient(90deg, rgba(199,157,125,0.1), rgba(255,184,0,0.35), rgba(199,157,125,0.1))' }}>
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                style={{ background: 'radial-gradient(circle, #FFB800, #C79D7D)', boxShadow: '0 0 10px 3px rgba(255,184,0,0.6)' }}
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { phase: '01', title: 'Discover', desc: 'Deep dive into your brand DNA, market positioning, audience behaviour, and untapped growth opportunities.', icon: '🔍' },
              { phase: '02', title: 'Strategise', desc: 'Crafting the blueprint — data-backed, creatively driven, and ruthlessly focused on your specific growth goal.', icon: '🎯' },
              { phase: '03', title: 'Create', desc: 'Execution with zero compromise. Every asset is engineered to perform, impress, and convert.', icon: '✦' },
              { phase: '04', title: 'Scale', desc: 'Iterative optimisation turns early traction into compounding, long-term brand authority.', icon: '📈' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.13} className="relative z-10 group">
                <div className="relative flex flex-col items-center text-center p-8 h-full rounded-xl transition-all duration-500 group-hover:-translate-y-2"
                  style={{ background: 'linear-gradient(160deg, rgba(199,157,125,0.07) 0%, rgba(26,18,16,0.6) 60%, rgba(13,8,6,0.8) 100%)', border: '1px solid rgba(199,157,125,0.12)' }}>

                  {/* Card inner glow on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,184,0,0.08) 0%, transparent 70%)' }} />

                  {/* Top accent bar */}
                  <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-b-full"
                    style={{ background: 'linear-gradient(90deg, transparent, #FFB800, #C79D7D, transparent)' }}
                    initial={{ width: 0 }} whileInView={{ width: '70%' }} viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.15 }} />

                  {/* Glowing phase badge */}
                  <div className="relative mb-8">
                    <motion.div className="w-16 h-16 flex items-center justify-center relative"
                      style={{ background: 'linear-gradient(135deg, rgba(199,157,125,0.15), rgba(255,184,0,0.08))', border: '1px solid rgba(199,157,125,0.3)', borderRadius: 4 }}
                      whileHover={{ scale: 1.08 }}>
                      {/* Pulsing ring */}
                      <motion.div className="absolute inset-0 rounded-sm"
                        style={{ border: '1px solid rgba(255,184,0,0.4)' }}
                        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }} />
                      <span className="font-mono text-sm font-bold" style={{ color: '#FFB800' }}>{step.phase}</span>
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-serif text-[#EDE9E5] mb-4 group-hover:text-[#FFB800] transition-colors duration-300">{step.title}</h3>
                  <div className="w-6 h-px mb-4 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #C79D7D, transparent)' }} />
                  <p className="text-[#9A8F88] text-sm leading-relaxed group-hover:text-[#D8C2B2] transition-colors duration-400">{step.desc}</p>

                  {/* Bottom step number watermark */}
                  <div className="absolute bottom-4 right-5 font-serif text-5xl font-bold pointer-events-none select-none" style={{ color: 'rgba(199,157,125,0.07)', lineHeight: 1 }}>{step.phase}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Bottom edge line */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(199,157,125,0.3) 50%, transparent 90%)' }} />
      </section>

      {/* ── 9. Why Brands Choose Us ── */}
      <section className="py-32 relative overflow-hidden">
        {/* ── Unique BG: deep cream-to-dark split, NOT dark/particle like other sections ── */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #f5ede4 0%, #e8d5c0 18%, #2a1c10 45%, #150e08 100%)' }} />

        {/* Hexagonal honeycomb SVG overlay — unique pattern not used elsewhere */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.07 }} preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="hex" x="0" y="0" width="56" height="97" patternUnits="userSpaceOnUse">
              <polygon points="28,3 53,17 53,46 28,60 3,46 3,17" fill="none" stroke="#C79D7D" strokeWidth="1" />
              <polygon points="56,50 81,64 81,93 56,107 31,93 31,64" fill="none" stroke="#C79D7D" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        {/* Animated concentric rings from centre — completely different from orbs/particles */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{
              left: '50%', top: '50%',
              border: `1px solid rgba(199,157,125,${0.25 - i * 0.04})`,
              width: 200 + i * 160, height: 200 + i * 160,
              marginLeft: -(100 + i * 80), marginTop: -(100 + i * 80),
            }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
          />
        ))}

        {/* Central radial glow burst */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(199,157,125,0.18) 0%, rgba(255,184,0,0.08) 30%, transparent 65%)' }} />

        {/* Horizontal light beam shoots — unique to this section */}
        {[15, 40, 65, 85].map((top, i) => (
          <motion.div key={i} className="absolute pointer-events-none h-px"
            style={{ top: `${top}%`, left: 0, right: 0, background: `linear-gradient(90deg, transparent 0%, rgba(199,157,125,${0.3 + (i % 2) * 0.2}) 40%, rgba(255,184,0,0.4) 50%, rgba(199,157,125,${0.3 + (i % 2) * 0.2}) 60%, transparent 100%)` }}
            animate={{ scaleX: [0.3, 1, 0.3], opacity: [0, 0.7, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 1.1 }}
          />
        ))}

        {/* Animated corner accent arcs */}
        <svg className="absolute top-0 left-0 w-48 h-48 pointer-events-none" style={{ opacity: 0.5 }}>
          <motion.path d="M 0 80 Q 0 0 80 0" fill="none" stroke="url(#arcGrad1)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
          <defs><linearGradient id="arcGrad1" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#C79D7D" /><stop offset="100%" stopColor="#FFB800" /></linearGradient></defs>
        </svg>
        <svg className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none" style={{ opacity: 0.5 }}>
          <motion.path d="M 192 112 Q 192 192 112 192" fill="none" stroke="url(#arcGrad2)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
          <defs><linearGradient id="arcGrad2" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFB800" /><stop offset="100%" stopColor="#C79D7D" /></linearGradient></defs>
        </svg>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] mb-4 font-sans" style={{ color: '#C79D7D' }}>The Difference</p>
            <h2 className="text-5xl md:text-6xl font-serif leading-tight text-[#EDE9E5]" style={{ textShadow: '0 2px 30px rgba(255,184,0,0.25)' }}>
              Why Brands <span style={{ color: '#FFB800' }}>Choose</span> Us
            </h2>
            <motion.div className="h-0.5 mx-auto mt-5 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #FFB800, #C79D7D, #FFB800, transparent)' }}
              initial={{ width: 0 }} whileInView={{ width: 220 }} viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 }} />
          </FadeIn>

          {/* Cards — completely different style: large bold number left, content right, glowing left border */}
          <div className="max-w-5xl mx-auto space-y-4">
            {[
              { num: '01', title: 'Strategy First', desc: 'We build data-backed marketing systems, not random content. Every move is deliberate, measurable, and tied to your growth goals.', accent: '#C79D7D' },
              { num: '02', title: 'Luxury Brand Positioning', desc: 'We create premium digital identities that make brands impossible to ignore — and impossible to forget.', accent: '#FFB800' },
              { num: '03', title: 'Creative + Performance', desc: 'Every campaign is designed to look exceptional and convert efficiently. Beauty and results are not a trade-off.', accent: '#D8C2B2' },
              { num: '04', title: 'End-to-End Execution', desc: 'From branding to ads to websites, we manage the complete digital ecosystem — so you focus on running your business.', accent: '#C79D7D' },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="relative flex items-center gap-0 overflow-hidden cursor-default group"
                  style={{ background: 'rgba(20, 12, 7, 0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(199,157,125,0.12)' }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated left border glow */}
                  <motion.div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                    style={{ background: `linear-gradient(180deg, transparent, ${card.accent}, transparent)` }}
                    animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }} />

                  {/* Hover fill sweep */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `linear-gradient(135deg, rgba(199,157,125,0.07) 0%, transparent 60%)` }} />

                  {/* Big number */}
                  <div className="flex-shrink-0 w-28 md:w-36 flex items-center justify-center py-10 relative">
                    <span className="font-serif font-bold leading-none select-none" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: card.accent, opacity: 0.18 }}>{card.num}</span>
                    <span className="absolute font-mono text-xs font-bold tracking-widest" style={{ color: card.accent }}>{card.num}</span>
                  </div>

                  {/* Vertical divider */}
                  <div className="flex-shrink-0 self-stretch w-px" style={{ background: `linear-gradient(180deg, transparent, rgba(199,157,125,0.25), transparent)` }} />

                  {/* Content */}
                  <div className="flex-1 px-8 py-10">
                    <h3 className="text-xl md:text-2xl font-serif text-[#EDE9E5] mb-3 group-hover:text-[#FFB800] transition-colors duration-300">{card.title}</h3>
                    <p className="text-[#9A8F88] text-sm leading-relaxed font-sans group-hover:text-[#D8C2B2] transition-colors duration-400">{card.desc}</p>
                  </div>

                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Testimonials ── */}
      <section className="py-32 bg-[#EDE9E5]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Client Stories</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45] leading-tight">What They Say</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Before Trend Digitally, our social presence was inconsistent and forgettable. Within two months, our inquiries doubled and our brand finally looks the part.",
                name: "Riya Mehta",
                role: "Founder, Jewellery Label",
              },
              {
                quote: "They don't just post content — they think like brand builders. The Google Ads campaign alone brought us 3× more clinic bookings. Highly recommended.",
                name: "Dr. Arjun Reddy",
                role: "Owner, Dental Clinic",
              },
              {
                quote: "Working with Trend Digitally felt like hiring an in-house team. They understood our audience, our tone, and delivered results we could actually measure.",
                name: "Sahil Kapoor",
                role: "Director, Fashion Brand",
              },
            ].map((test, i) => (
              <FadeIn key={i} delay={i * 0.14} className="group bg-white/70 backdrop-blur-sm border border-[#D8C2B2]/60 p-10 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500">
                <div className="mb-10">
                  <div className="flex gap-1 text-[#C79D7D] text-sm mb-6">★★★★★</div>
                  <p className="text-[#5E4E45] text-lg leading-relaxed font-serif italic">"{test.quote}"</p>
                </div>
                <div className="border-t border-[#D8C2B2]/60 pt-6">
                  <p className="font-semibold text-[#5E4E45] font-sans">{test.name}</p>
                  <p className="text-[#9A8F88] text-sm font-sans mt-0.5">{test.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. FAQ ── */}
      <section className="py-32 bg-[#EDE9E5]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Common Questions</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45]">Answers.</h2>
          </FadeIn>
          <FadeIn>
            <Accordion type="single" collapsible className="w-full space-y-0 divide-y divide-[#D8C2B2]/60">
              {[
                {
                  q: "What industries do you work with?",
                  a: "We work across jewellery, fashion, healthcare, hospitality, interior design, food & beverage, real estate, and more. If your brand has growth ambitions, we have the strategy to match.",
                },
                {
                  q: "Do you provide complete branding solutions?",
                  a: "Yes. We offer end-to-end branding — from logo and visual identity to brand voice, social presence, and complete digital ecosystem design.",
                },
                {
                  q: "How long does onboarding take?",
                  a: "Typically 7–10 days from contract signing to campaign go-live. We take onboarding seriously — understanding your brand properly before we touch any creative.",
                },
                {
                  q: "Do you manage paid advertising campaigns?",
                  a: "Absolutely. We manage Meta Ads, Google Ads, and WhatsApp campaigns end-to-end — strategy, creative, targeting, optimisation, and reporting.",
                },
                {
                  q: "Can you redesign our existing brand?",
                  a: "Yes. Whether you need a complete rebrand or a strategic refresh, we audit what you have, understand where you want to go, and build accordingly.",
                },
                {
                  q: "Do you provide website development?",
                  a: "We do. From landing pages to full e-commerce and company websites — designed to convert, built for performance, and optimised for SEO from day one.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-none py-1">
                  <AccordionTrigger className="text-left font-serif text-lg text-[#5E4E45] hover:no-underline py-6 hover:text-[#C79D7D] transition-colors data-[state=open]:text-[#C79D7D]">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#5E4E45]/70 pb-6 text-base leading-relaxed font-sans">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ── 12. Inquiry / Contact ── */}
      <section id="contact" className="py-32 bg-[#1a1210] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(94,78,69,0.25)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-[35vw] h-[35vw] bg-[#C79D7D] rounded-full blob opacity-[0.06]" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] bg-[#5E4E45] rounded-full blob opacity-[0.12]" style={{ animationDelay: '-8s' }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-5 font-sans">Get In Touch</p>
            <h2 className="text-5xl md:text-7xl font-serif text-[#EDE9E5] leading-[1.05] tracking-tight mb-5">
              Build a Brand <em className="italic text-[#C79D7D]">People Remember.</em>
            </h2>
            <p className="text-[#9A8F88] max-w-xl mx-auto text-base font-sans leading-relaxed">
              Tell us about your brand and goals. We'll get back to you within 24 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="max-w-3xl mx-auto">
            {formStatus === 'success' ? (
              <div className="border border-[#C79D7D]/30 bg-[#5E4E45]/10 p-16 text-center">
                <div className="w-16 h-16 border border-[#C79D7D]/40 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7 text-[#C79D7D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-serif text-[#EDE9E5] mb-3">Inquiry Received</h3>
                <p className="text-[#9A8F88] font-sans text-sm leading-relaxed mb-8">
                  Thank you for reaching out. We'll review your brief and come back to you within 24 hours.
                </p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="text-xs uppercase tracking-widest text-[#C79D7D] hover:text-[#D8C2B2] font-sans transition-colors border-b border-[#C79D7D]/30 pb-0.5"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.04] border border-white/[0.06]">
                {/* Row 1 */}
                <div className="bg-[#1a1210] p-6 md:p-8">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Full Name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Aayush Sharma"
                    className="w-full bg-transparent text-[#EDE9E5] font-sans text-sm placeholder:text-[#9A8F88]/30 border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 transition-colors duration-300"
                  />
                </div>
                <div className="bg-[#1a1210] p-6 md:p-8">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    placeholder="hello@yourbrand.com"
                    className="w-full bg-transparent text-[#EDE9E5] font-sans text-sm placeholder:text-[#9A8F88]/30 border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 transition-colors duration-300"
                  />
                </div>
                {/* Row 2 */}
                <div className="bg-[#1a1210] p-6 md:p-8">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-transparent text-[#EDE9E5] font-sans text-sm placeholder:text-[#9A8F88]/30 border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 transition-colors duration-300"
                  />
                </div>
                <div className="bg-[#1a1210] p-6 md:p-8">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Brand / Company</label>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleFormChange}
                    placeholder="Your Brand Name"
                    className="w-full bg-transparent text-[#EDE9E5] font-sans text-sm placeholder:text-[#9A8F88]/30 border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 transition-colors duration-300"
                  />
                </div>
                {/* Row 3 — full width */}
                <div className="bg-[#1a1210] p-6 md:p-8 md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Service You're Interested In</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full bg-[#1a1210] text-[#EDE9E5] font-sans text-sm border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 transition-colors duration-300 cursor-pointer appearance-none"
                  >
                    <option value="" className="bg-[#1a1210]">Select a service…</option>
                    <option value="Social Media Marketing" className="bg-[#1a1210]">Social Media Marketing</option>
                    <option value="Branding Strategy" className="bg-[#1a1210]">Branding Strategy</option>
                    <option value="Website Designing" className="bg-[#1a1210]">Website Designing</option>
                    <option value="Performance Marketing" className="bg-[#1a1210]">Performance Marketing</option>
                    <option value="SEO" className="bg-[#1a1210]">SEO</option>
                    <option value="Google Ads" className="bg-[#1a1210]">Google Ads</option>
                    <option value="WhatsApp Marketing" className="bg-[#1a1210]">WhatsApp Marketing</option>
                    <option value="Influencer Marketing" className="bg-[#1a1210]">Influencer Marketing</option>
                    <option value="Content Writing" className="bg-[#1a1210]">Content Writing</option>
                    <option value="Product Photoshoots" className="bg-[#1a1210]">Product Photoshoots</option>
                    <option value="360° Marketing" className="bg-[#1a1210]">360° Marketing</option>
                    <option value="Other" className="bg-[#1a1210]">Other</option>
                  </select>
                </div>
                {/* Message */}
                <div className="bg-[#1a1210] p-6 md:p-8 md:col-span-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F88]/70 font-sans mb-3">Tell Us About Your Brand *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    rows={4}
                    placeholder="Describe your brand, your goals, and what you're looking to achieve with Trend Digitally…"
                    className="w-full bg-transparent text-[#EDE9E5] font-sans text-sm placeholder:text-[#9A8F88]/30 border-b border-white/10 focus:border-[#C79D7D]/50 outline-none pb-2 resize-none transition-colors duration-300"
                  />
                </div>
                {/* Submit */}
                <div className="bg-[#1a1210] p-6 md:p-8 md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-[#9A8F88]/50 text-xs font-sans">* Required fields. We reply within 24 hours.</p>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    data-testid="button-inquiry-submit"
                    className="group inline-flex items-center gap-3 bg-[#C79D7D] text-[#1a1210] px-10 py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-sans"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                {formStatus === 'error' && (
                  <div className="bg-[#1a1210] px-8 pb-6 md:col-span-2">
                    <p className="text-red-400/80 text-xs font-sans">{formError}</p>
                  </div>
                )}
              </form>
            )}
          </FadeIn>

          {/* Direct contact strip */}
          <FadeIn delay={0.25} className="mt-16 pt-12 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            <a href="mailto:trenddigitallyy@gmail.com" className="group flex items-center gap-3 text-[#9A8F88] hover:text-[#C79D7D] transition-colors font-sans text-sm">
              <div className="w-8 h-8 border border-white/10 group-hover:border-[#C79D7D]/40 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              trenddigitallyy@gmail.com
            </a>
            <a href="tel:+919013342230" className="group flex items-center gap-3 text-[#9A8F88] hover:text-[#C79D7D] transition-colors font-sans text-sm">
              <div className="w-8 h-8 border border-white/10 group-hover:border-[#C79D7D]/40 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              +91 90133 42230
            </a>
            <a href="tel:+917780511564" className="group flex items-center gap-3 text-[#9A8F88] hover:text-[#C79D7D] transition-colors font-sans text-sm">
              <div className="w-8 h-8 border border-white/10 group-hover:border-[#C79D7D]/40 flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              +91 77805 11564
            </a>
          </FadeIn>
        </div>
      </section>

      <ChatWidget />

      {/* ── 13. Footer ── */}
      <footer className="bg-[#0f0c0b] text-[#EDE9E5] pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoSrc} alt="Trend Digitally" className="h-12 w-12 rounded-full object-cover opacity-90" />
                <span className="font-serif text-2xl font-bold text-[#EDE9E5]">Trend Digitally</span>
              </div>
              <p className="text-[#9A8F88] max-w-xs leading-relaxed text-sm font-sans mb-8">
                A Hyderabad-based creative growth agency helping ambitious brands build authority, reach, and revenue — digitally.
              </p>
              <div className="flex gap-3">
                {[
                  { id: 'instagram', href: 'https://instagram.com/trenddigitally', icon: <SiInstagram className="w-4 h-4" /> },
                  { id: 'linkedin', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                  { id: 'twitter', href: '#', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                  { id: 'tiktok', href: '#', icon: <SiTiktok className="w-4 h-4" /> },
                ].map((s) => (
                  <a key={s.id} href={s.href} data-testid={`link-${s.id}`} className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#9A8F88] hover:border-[#C79D7D]/50 hover:text-[#C79D7D] transition-all duration-300">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="text-xs uppercase tracking-widest text-[#9A8F88] mb-6 font-sans">Navigate</p>
              <ul className="space-y-3 font-sans">
                {['services', 'work', 'about', 'contact'].map((link) => (
                  <li key={link}>
                    <button onClick={() => scrollToSection(link)} className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors text-sm capitalize">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-[#9A8F88] mb-6 font-sans">Contact</p>
              <ul className="space-y-3 font-sans text-sm">
                <li>
                  <a href="mailto:trenddigitallyy@gmail.com" className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors break-all">
                    trenddigitallyy@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+919013342230" className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors">+91 90133 42230</a>
                </li>
                <li>
                  <a href="tel:+917780511564" className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors">+91 77805 11564</a>
                </li>
                <li className="text-[#9A8F88]/60">Hyderabad, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9A8F88]/40 font-sans">
            <p>&copy; 2024 Trend Digitally. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#9A8F88] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#9A8F88] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
