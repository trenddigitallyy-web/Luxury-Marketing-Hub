import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { ArrowRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.9, delay, ease: easeExpo }}
      className={className}
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

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const yHero = useTransform(scrollY, [0, 1000], [0, 280]);

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
            Since 2024 · 20+ Brands
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
            <button
              onClick={() => scrollToSection('contact')}
              data-testid="button-hero-book"
              className="group relative bg-[#C79D7D] text-[#1a1210] px-10 py-4 text-sm font-sans font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Book Strategy Call</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
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
                {[{ n: '20+', l: 'Brands Scaled' }, { n: '1000+', l: 'Creatives Made' }, { n: '2024', l: 'Founded' }].map((s, i) => (
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
                  In a short span, we have helped 20+ businesses establish stronger brand identities, expand audience reach, and create impactful digital presence across multiple industries — from jewellery and fashion to healthcare and hospitality.
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
      <section id="services" className="py-32 bg-[#1a1210]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Expertise</h2>
            </div>
            <p className="text-[#9A8F88] max-w-xs text-sm leading-relaxed font-sans">Full-spectrum digital solutions for brands demanding excellence at every touchpoint.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { num: '01', name: 'Social Media Marketing', desc: 'Scroll-stopping content strategies that grow communities and drive consistent engagement.' },
              { num: '02', name: 'Branding Strategy', desc: 'Premium brand identities that position you as the authority in your market.' },
              { num: '03', name: 'Website Designing', desc: 'High-converting digital experiences that build trust and turn visitors into clients.' },
              { num: '04', name: 'Performance Marketing', desc: 'Full-funnel paid campaigns engineered for measurable, scalable return on investment.' },
              { num: '05', name: 'SEO', desc: 'Organic dominance through technical precision, content authority, and link strategy.' },
              { num: '06', name: 'Google Ads', desc: 'Laser-targeted search campaigns that capture high-intent buyers at the right moment.' },
              { num: '07', name: 'WhatsApp Marketing', desc: 'Direct, personalised outreach that converts at higher rates than any other channel.' },
              { num: '08', name: 'Influencer Marketing', desc: 'Curated partnerships with creators who move audiences and build brand credibility.' },
              { num: '09', name: 'Content Writing', desc: 'Strategic narratives crafted to educate, engage, and guide your audience to action.' },
              { num: '10', name: 'Copywriting', desc: 'Words that sell. Every headline, caption, and CTA engineered to convert.' },
              { num: '11', name: 'App Development', desc: 'Intuitive mobile experiences that extend your brand and delight your customers.' },
              { num: '12', name: 'Software Development', desc: 'Custom digital tools and platforms built to streamline operations and power growth.' },
              { num: '13', name: 'Product Photoshoots', desc: 'Studio-quality visuals that elevate your product and elevate purchase intent.' },
              { num: '14', name: 'Google My Business', desc: 'Dominate local search and build your reputation where customers are looking.' },
              { num: '15', name: 'Email Marketing', desc: 'Automated nurture sequences and campaigns that convert subscribers into buyers.' },
              { num: '16', name: '360° Marketing', desc: 'End-to-end digital ecosystem management — from awareness to conversion to retention.' },
            ].map((service, i) => (
              <FadeIn
                key={i}
                delay={i * 0.03}
                className="group relative bg-[#1a1210] border border-white/[0.06] p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#5E4E45]/20 hover:border-[#C79D7D]/20 transition-all duration-500 cursor-default"
              >
                <div className="text-xs text-[#9A8F88]/50 font-mono mb-6">{service.num}</div>
                <div>
                  <h3 className="text-lg font-serif text-[#EDE9E5] mb-3 leading-snug group-hover:text-[#D8C2B2] transition-colors duration-300">{service.name}</h3>
                  <p className="text-[#9A8F88] text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">{service.desc}</p>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border border-[#C79D7D]/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-[#C79D7D]" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Stats ── */}
      <section className="py-28 bg-[#5E4E45]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { val: '20+', label: 'Brands Scaled' },
              { val: '15M+', label: 'Organic Reach Generated' },
              { val: '1000+', label: 'Creatives Delivered' },
              { val: '∞', label: 'Multi-Industry Experience' },
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="px-8 py-4 text-center">
                <div className="text-4xl md:text-6xl font-serif text-[#EDE9E5] mb-2">{stat.val}</div>
                <div className="text-xs text-[#D8C2B2]/70 uppercase tracking-widest font-sans">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-32 bg-[#1a1210]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">How We Work</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Methodology</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#C79D7D]/20" />
            {[
              { phase: '01', title: 'Discover', desc: 'Deep dive into your brand DNA, market positioning, audience behaviour, and untapped growth opportunities.' },
              { phase: '02', title: 'Strategise', desc: 'Crafting the blueprint — data-backed, creatively driven, and ruthlessly focused on your specific growth goal.' },
              { phase: '03', title: 'Create', desc: 'Execution with zero compromise. Every asset is engineered to perform, impress, and convert.' },
              { phase: '04', title: 'Scale', desc: 'Iterative optimisation turns early traction into compounding, long-term brand authority.' },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.12} className="relative z-10 flex flex-col items-center text-center p-8 group">
                <div className="w-16 h-16 border border-[#C79D7D]/30 bg-[#1a1210] flex items-center justify-center font-mono text-[#C79D7D] text-sm mb-8 group-hover:bg-[#5E4E45]/30 group-hover:border-[#C79D7D]/60 transition-all duration-400">
                  {step.phase}
                </div>
                <h3 className="text-xl font-serif text-[#EDE9E5] mb-4 group-hover:text-[#C79D7D] transition-colors duration-300">{step.title}</h3>
                <p className="text-[#9A8F88] text-sm leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Why Brands Choose Us (NEW) ── */}
      <section className="py-32 bg-[#120e0d] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(94,78,69,0.18)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">The Difference</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Why Brands Choose Us</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                num: '01',
                title: 'Strategy First',
                desc: 'We build data-backed marketing systems, not random content. Every move is deliberate, measurable, and tied to your growth goals.',
              },
              {
                num: '02',
                title: 'Luxury Brand Positioning',
                desc: 'We create premium digital identities that make brands impossible to ignore — and impossible to forget.',
              },
              {
                num: '03',
                title: 'Creative + Performance',
                desc: 'Every campaign is designed to look exceptional and convert efficiently. Beauty and results are not a trade-off.',
              },
              {
                num: '04',
                title: 'End-to-End Execution',
                desc: 'From branding to ads to websites, we manage the complete digital ecosystem — so you focus on running your business.',
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group relative border border-white/[0.07] p-10 hover:border-[#C79D7D]/30 hover:-translate-y-1 transition-all duration-500 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5E4E45]/0 to-[#5E4E45]/0 group-hover:from-[#5E4E45]/10 group-hover:to-transparent transition-all duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs text-[#C79D7D]/50">{card.num}</span>
                    <div className="flex-1 h-px bg-[#C79D7D]/15 group-hover:bg-[#C79D7D]/40 transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#EDE9E5] mb-4 group-hover:text-[#C79D7D] transition-colors duration-300">{card.title}</h3>
                  <p className="text-[#9A8F88] text-sm leading-relaxed font-sans">{card.desc}</p>
                </div>
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

      {/* ── 12. Final CTA ── */}
      <section id="contact" className="py-40 bg-[#1a1210] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(94,78,69,0.4)_0%,rgba(26,18,16,0)_70%)]" />
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#C79D7D] rounded-full blob opacity-10" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-[#5E4E45] rounded-full blob opacity-20" style={{ animationDelay: '-8s' }} />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-8 font-sans">Ready to grow?</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#EDE9E5] leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
              Build a Brand <span className="italic text-[#C79D7D]">People Remember.</span>
            </h2>
            <p className="text-[#9A8F88] max-w-2xl mx-auto mb-14 text-lg font-sans leading-relaxed">
              Trend Digitally combines strategy, creativity, and performance marketing to help ambitious brands dominate digitally.
            </p>
            <button
              data-testid="button-cta-final"
              onClick={() => scrollToSection('contact')}
              className="group bg-[#C79D7D] text-[#1a1210] px-14 py-5 text-xs font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300 shadow-2xl inline-flex items-center gap-3 font-sans"
            >
              Book Your Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </section>

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
                  <a href="mailto:work.trenddigitally@gmail.com" className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors break-all">
                    work.trenddigitally@gmail.com
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
