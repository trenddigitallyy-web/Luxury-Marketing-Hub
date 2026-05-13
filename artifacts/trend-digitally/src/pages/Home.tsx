import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
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

// Reusable animated section component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const yHero = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <div className="noise-overlay"></div>

      {/* 1. Sticky Navbar */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#EDE9E5]/90 backdrop-blur-md py-3 border-b border-[#D8C2B2]/60 shadow-sm' 
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
            <button onClick={() => scrollToSection('services')} className={`transition-colors duration-300 ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}>Services</button>
            <button onClick={() => scrollToSection('work')} className={`transition-colors duration-300 ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}>Work</button>
            <button onClick={() => scrollToSection('about')} className={`transition-colors duration-300 ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}>About</button>
            <button onClick={() => scrollToSection('pricing')} className={`transition-colors duration-300 ${isScrolled ? 'hover:text-[#5E4E45]' : 'hover:text-[#C79D7D]'}`}>Pricing</button>
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

      {/* 2. Hero Section — Dark Cinematic */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#1a1210]">
        {/* Deep radial gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(94,78,69,0.55)_0%,rgba(26,18,16,0)_70%)]" />

        {/* Animated blobs — now on dark bg so they glow */}
        <div className="absolute top-[10%] left-[10%] w-[55vw] h-[55vw] bg-[#5E4E45] rounded-full blob opacity-40" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-[5%] right-[5%] w-[45vw] h-[45vw] bg-[#C79D7D] rounded-full blob opacity-20" style={{ animationDelay: '-7s' }} />
        <div className="absolute top-[50%] left-[55%] w-[30vw] h-[30vw] bg-[#D8C2B2] rounded-full blob opacity-10" style={{ animationDelay: '-14s' }} />

        {/* Decorative thin lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#C79D7D]/20 to-transparent" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#C79D7D]/10 to-transparent" />
          <div className="absolute top-1/3 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#C79D7D]/15 to-transparent" />
        </div>

        {/* Large ghosted TD letters background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-serif text-[30vw] font-bold text-white/[0.03] leading-none tracking-tighter">TD</span>
        </div>

        {/* Floating badge */}
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
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-[#C79D7D] text-xs font-sans uppercase tracking-[0.4em] mb-8 flex items-center gap-4"
          >
            <span className="w-8 h-px bg-[#C79D7D]/60" />
            Since 2019 · 150+ Brands
            <span className="w-8 h-px bg-[#C79D7D]/60" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-[#EDE9E5] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] leading-[1.05] tracking-tight max-w-6xl"
          >
            We Don't Follow<br />
            <span className="italic text-[#C79D7D]">Trends.</span>
          </motion.h1>

          {/* Secondary headline */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="font-serif text-[#EDE9E5]/80 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] leading-[1.05] tracking-tight max-w-6xl mt-2"
          >
            We Create <span className="italic text-[#D8C2B2]">Digital Authority.</span>
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-24 h-px bg-[#C79D7D]/50 mt-10 mb-8"
          />

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="font-sans text-[#9A8F88] text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed"
          >
            Trend Digitally helps ambitious brands dominate social media, performance marketing, content strategy, and creative storytelling.
          </motion.p>

          {/* CTA Buttons */}
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
            <button
              onClick={() => scrollToSection('work')}
              data-testid="button-hero-work"
              className="group border border-[#EDE9E5]/20 text-[#EDE9E5] px-10 py-4 text-sm font-sans font-medium tracking-widest uppercase hover:border-[#C79D7D]/60 hover:text-[#C79D7D] transition-all duration-300 backdrop-blur-sm"
            >
              View Our Work
            </button>
          </motion.div>

          {/* Scroll indicator */}
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

      {/* 3. Trusted By Brands Marquee — real logos */}
      <section className="py-8 bg-[#1a1210] border-t border-white/5 overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[#9A8F88]/40 mb-6 font-sans">Trusted by brands across India</p>
        <div className="relative w-full overflow-hidden">
          {/* left & right fade masks */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#1a1210] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#1a1210] to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex items-center">
            {/* Set 1 */}
            {clientLogos.map((logo, i) => (
              <div key={`a-${i}`} className="flex-shrink-0 mx-10 h-16 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 max-w-[140px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {/* Set 2 — duplicate for seamless loop */}
            {clientLogos.map((logo, i) => (
              <div key={`b-${i}`} className="flex-shrink-0 mx-10 h-16 flex items-center justify-center" aria-hidden="true">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 max-w-[140px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Agency */}
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
                {[{ n: '150+', l: 'Brands' }, { n: '4', l: 'Continents' }, { n: '2019', l: 'Founded' }].map((s, i) => (
                  <div key={i}>
                    <div className="text-3xl font-serif text-[#5E4E45]">{s.n}</div>
                    <div className="text-xs text-[#9A8F88] uppercase tracking-widest mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.25} className="lg:col-span-7 lg:pl-12 border-l border-[#D8C2B2]/60">
              <div className="space-y-8 text-[#5E4E45]/80 text-lg leading-relaxed font-sans">
                <p>
                  We believe that true influence isn't bought — it's built. Trend Digitally treats every brand like a luxury client, crafting narratives that resonate and strategies that convert with precision.
                </p>
                <p>
                  Where strategy meets artistry, that's where we operate. We don't do cookie-cutter campaigns. We build digital empires for those bold enough to stand out in a world drowning in noise.
                </p>
                <p>
                  Our team of strategists, creatives, and performance marketers obsess over one thing: your growth. Every post, every ad, every piece of content is a deliberate step toward market dominance.
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

      {/* 5. Services */}
      <section id="services" className="py-32 bg-[#1a1210]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">What We Do</p>
              <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Expertise</h2>
            </div>
            <p className="text-[#9A8F88] max-w-xs text-sm leading-relaxed">Comprehensive solutions for brands demanding excellence across every touchpoint.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {[
              { num: '01', name: 'Social Media Marketing', desc: 'Dominate every feed with scroll-stopping, community-building content that converts.' },
              { num: '02', name: 'Branding', desc: 'Identities that command attention and signal premium positioning from first glance.' },
              { num: '03', name: 'Video Editing', desc: 'Cinematic storytelling for the digital age — reels, ads, and brand films.' },
              { num: '04', name: 'Paid Ads', desc: 'Performance marketing engineered to deliver measurable, scalable ROI.' },
              { num: '05', name: 'Content Strategy', desc: 'Data-backed narratives that educate, engage, and convert your ideal client.' },
              { num: '06', name: 'Web Design', desc: 'Digital experiences that build trust, reduce friction, and drive action.' },
              { num: '07', name: 'AI Automation', desc: 'Intelligent systems that scale your operations without scaling your headcount.' },
              { num: '08', name: 'Performance Marketing', desc: 'Full-funnel growth engines obsessed with one metric: your return.' }
            ].map((service, i) => (
              <FadeIn
                key={i}
                delay={i * 0.04}
                className="group relative bg-[#1a1210] border border-white/[0.06] p-8 flex flex-col justify-between min-h-[220px] hover:bg-[#5E4E45]/20 transition-all duration-500 cursor-default"
              >
                <div className="text-xs text-[#9A8F88]/50 font-mono mb-6">{service.num}</div>
                <div>
                  <h3 className="text-lg font-serif text-[#EDE9E5] mb-3 leading-snug">{service.name}</h3>
                  <p className="text-[#9A8F88] text-sm leading-relaxed opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">{service.desc}</p>
                </div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border border-[#C79D7D]/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-[#C79D7D]" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats */}
      <section className="py-28 bg-[#5E4E45]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-white/10">
            {[
              { val: '150+', label: 'Brands Transformed' },
              { val: '3.2B+', label: 'Impressions Delivered' },
              { val: '98%', label: 'Client Retention' },
              { val: '40+', label: 'Team Members' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="px-8 py-4 text-center">
                <div className="text-4xl md:text-6xl font-serif text-[#EDE9E5] mb-2">{stat.val}</div>
                <div className="text-xs text-[#D8C2B2]/70 uppercase tracking-widest font-sans">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Case Studies */}
      <section id="work" className="py-32 bg-[#EDE9E5]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Our Work</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45] leading-tight">Featured Work</h2>
              <button className="inline-flex items-center gap-2 text-[#5E4E45] text-sm font-medium hover:text-[#C79D7D] transition-colors group">
                View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Lumière Rebrand', industry: 'Luxury Retail', result: '+340% Engagement', tag: 'Branding + Social', bg: 'bg-[#C79D7D]/25' },
              { name: 'Nova Labs Launch', industry: 'Tech Startup', result: '2.4M Reach / 30 Days', tag: 'Paid Ads + Content', bg: 'bg-[#9A8F88]/20' },
              { name: 'Apex Studio', industry: 'Creative Agency', result: '$1.2M Revenue Generated', tag: 'Performance Marketing', bg: 'bg-[#D8C2B2]/40' }
            ].map((study, i) => (
              <FadeIn key={i} delay={i * 0.12} className="group cursor-pointer">
                <div className={`${study.bg} aspect-[3/4] relative overflow-hidden mb-5 flex items-end p-6`}>
                  <div className="absolute inset-0 bg-[#5E4E45]/0 group-hover:bg-[#5E4E45]/10 transition-all duration-500" />
                  <div className="absolute top-6 right-6 w-10 h-10 bg-[#EDE9E5] rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg">
                    <ArrowRight className="w-4 h-4 text-[#5E4E45]" />
                  </div>
                  <div className="relative z-10 bg-[#EDE9E5]/90 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest text-[#9A8F88] font-sans">{study.tag}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-[#9A8F88] uppercase tracking-widest font-sans">{study.industry}</div>
                  <h3 className="text-2xl font-serif text-[#5E4E45] group-hover:text-[#C79D7D] transition-colors">{study.name}</h3>
                  <div className="text-sm font-semibold text-[#C79D7D] font-sans">{study.result}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Process Timeline */}
      <section className="py-32 bg-[#1a1210]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-24 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">How We Work</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#EDE9E5] leading-tight">Our Methodology</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-[#C79D7D]/20" />
            {[
              { phase: '01', title: 'Discover', desc: 'Deep dive into your brand DNA, market positioning, and untapped growth opportunities.' },
              { phase: '02', title: 'Strategise', desc: 'Crafting the blueprint for domination — data-backed, creatively driven, ruthlessly focused.' },
              { phase: '03', title: 'Create', desc: 'Execution with uncompromising quality. Every asset engineered to perform and impress.' },
              { phase: '04', title: 'Scale', desc: 'Iterative optimisation turns early traction into compounding, long-term authority.' }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.12} className="relative z-10 flex flex-col items-center text-center p-8 group">
                <div className="w-16 h-16 border border-[#C79D7D]/30 bg-[#1a1210] flex items-center justify-center font-mono text-[#C79D7D] text-sm mb-8 group-hover:bg-[#5E4E45]/30 transition-colors">
                  {step.phase}
                </div>
                <h3 className="text-xl font-serif text-[#EDE9E5] mb-4">{step.title}</h3>
                <p className="text-[#9A8F88] text-sm leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-32 bg-[#EDE9E5]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-20 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Client Stories</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45] leading-tight">What They Say</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Trend Digitally didn't just grow our audience — they completely redefined our market positioning. They operate on a different frequency.", name: "Elena Rostova", role: "CMO, Maison X" },
              { quote: "The most ruthless, creative, and effective agency we've ever partnered with. Our ROI tripled in the first quarter working with them.", name: "Marcus Chen", role: "Founder, Nova Labs" },
              { quote: "They understand luxury like no other digital agency. Every campaign feels bespoke, premium, and impossible to ignore.", name: "Sarah Jenkins", role: "VP Marketing, Lumière" }
            ].map((test, i) => (
              <FadeIn key={i} delay={i * 0.15} className="bg-white/60 backdrop-blur-sm border border-[#D8C2B2]/60 p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
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

      {/* 10. Pricing */}
      <section id="pricing" className="py-32 bg-[#F5F0EC]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Transparent Pricing</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45] mb-4">Investment</h2>
            <p className="text-[#9A8F88] max-w-xl mx-auto font-sans">Choose the level of growth you're ready for.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start max-w-5xl mx-auto">
            <FadeIn delay={0.1} className="bg-white border border-[#D8C2B2]/60 p-8">
              <p className="text-xs uppercase tracking-widest text-[#9A8F88] mb-4 font-sans">Tier 01</p>
              <h3 className="text-2xl font-serif text-[#5E4E45] mb-1">Growth</h3>
              <div className="text-4xl font-serif text-[#5E4E45] mt-4 mb-8">$2,500<span className="text-base text-[#9A8F88] font-sans font-normal">/mo</span></div>
              <div className="h-px bg-[#D8C2B2]/60 mb-8" />
              <ul className="space-y-4 mb-10 font-sans">
                {['Core Social Strategy', '12 Custom Posts/mo', 'Basic Community Mgt', 'Monthly Reporting'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5E4E45]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79D7D] mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button data-testid="button-price-growth" onClick={() => scrollToSection('contact')} className="w-full py-3.5 border border-[#5E4E45] text-[#5E4E45] text-xs tracking-widest uppercase font-semibold hover:bg-[#5E4E45] hover:text-[#EDE9E5] transition-all duration-300 font-sans">Book a Call</button>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-[#5E4E45] border border-[#5E4E45] p-8 relative shadow-2xl md:-mt-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C79D7D] text-[#1a1210] px-4 py-1 text-[10px] font-bold uppercase tracking-widest font-sans whitespace-nowrap">Most Popular</div>
              <p className="text-xs uppercase tracking-widest text-[#C79D7D] mb-4 font-sans">Tier 02</p>
              <h3 className="text-2xl font-serif text-[#EDE9E5] mb-1">Authority</h3>
              <div className="text-4xl font-serif text-[#EDE9E5] mt-4 mb-8">$5,500<span className="text-base text-[#D8C2B2]/60 font-sans font-normal">/mo</span></div>
              <div className="h-px bg-white/10 mb-8" />
              <ul className="space-y-4 mb-10 font-sans">
                {['Omnichannel Strategy', '30 Custom Posts/mo', '4 High-End Videos', 'Paid Ads Management', 'Bi-weekly Strategy Calls'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#EDE9E5]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79D7D] mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button data-testid="button-price-authority" onClick={() => scrollToSection('contact')} className="w-full py-3.5 bg-[#C79D7D] text-[#1a1210] text-xs tracking-widest uppercase font-semibold hover:bg-[#D8C2B2] transition-all duration-300 font-sans">Book a Call</button>
            </FadeIn>

            <FadeIn delay={0.3} className="bg-white border border-[#D8C2B2]/60 p-8">
              <p className="text-xs uppercase tracking-widest text-[#9A8F88] mb-4 font-sans">Tier 03</p>
              <h3 className="text-2xl font-serif text-[#5E4E45] mb-1">Empire</h3>
              <div className="text-4xl font-serif text-[#5E4E45] mt-4 mb-8">Custom<span className="text-base text-[#9A8F88] font-sans font-normal">/mo</span></div>
              <div className="h-px bg-[#D8C2B2]/60 mb-8" />
              <ul className="space-y-4 mb-10 font-sans">
                {['Full Digital Takeover', 'Dedicated Growth Team', 'Unlimited Content Assets', 'Influencer Partnerships'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5E4E45]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C79D7D] mt-1.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button data-testid="button-price-empire" onClick={() => scrollToSection('contact')} className="w-full py-3.5 border border-[#5E4E45] text-[#5E4E45] text-xs tracking-widest uppercase font-semibold hover:bg-[#5E4E45] hover:text-[#EDE9E5] transition-all duration-300 font-sans">Book a Call</button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-32 bg-[#EDE9E5]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] mb-4 font-sans">Common Questions</p>
            <h2 className="text-5xl md:text-6xl font-serif text-[#5E4E45]">Answers.</h2>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible className="w-full space-y-0 divide-y divide-[#D8C2B2]/60">
              {[
                { q: "How long does onboarding take?", a: "Our onboarding is comprehensive but efficient. Typically 7–14 days from contract signing to campaign launch, ensuring we have a deep understanding of your brand DNA." },
                { q: "Do you work with early-stage startups?", a: "We partner with brands at all stages, provided they have ambitious goals and the commitment to support aggressive growth strategies." },
                { q: "What makes Trend Digitally different?", a: "We don't sell deliverables — we sell authority. Our approach combines luxury-tier creative with ruthless performance marketing. We are a growth partner, not an order-taker." },
                { q: "Can we see results in the first month?", a: "Yes. While compounding growth takes time, our initial sprints are designed to capture immediate wins and demonstrate ROI within the first 30 days." },
                { q: "What industries do you specialise in?", a: "We excel in luxury retail, high-tech startups, premium hospitality, and D2C e-commerce brands where brand perception drives revenue." },
                { q: "How do we get started?", a: "Book a strategy call using any button on this page. We'll discuss your goals, audit your digital presence, and determine if we're a mutual fit." }
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

      {/* 12. Final CTA */}
      <section id="contact" className="py-40 bg-[#1a1210] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(94,78,69,0.4)_0%,rgba(26,18,16,0)_70%)]" />
        <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-[#C79D7D] rounded-full blob opacity-10" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 right-0 w-[35vw] h-[35vw] bg-[#5E4E45] rounded-full blob opacity-20" style={{ animationDelay: '-8s' }} />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-8 font-sans">Ready to grow?</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#EDE9E5] leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
              Ready to Build Your <span className="italic text-[#C79D7D]">Digital Authority?</span>
            </h2>
            <p className="text-[#9A8F88] max-w-xl mx-auto mb-14 text-lg font-sans leading-relaxed">
              Let's build something unforgettable together. Your first strategy call is on us.
            </p>
            <button
              data-testid="button-cta-final"
              onClick={() => scrollToSection('contact')}
              className="group bg-[#C79D7D] text-[#1a1210] px-14 py-5 text-xs font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300 shadow-2xl inline-flex items-center gap-3 font-sans"
            >
              Book Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 13. Footer */}
      <footer className="bg-[#0f0c0b] text-[#EDE9E5] pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <img src={logoSrc} alt="Trend Digitally" className="h-12 w-12 rounded-full object-cover opacity-90" />
                <span className="font-serif text-2xl font-bold text-[#EDE9E5]">Trend Digitally</span>
              </div>
              <p className="text-[#9A8F88] max-w-xs leading-relaxed text-sm font-sans mb-8">
                The creative growth agency for brands that refuse to blend in. We build digital empires.
              </p>
              <div className="flex gap-3">
                {[
                  { id: 'instagram', icon: <SiInstagram className="w-4 h-4" /> },
                  { id: 'linkedin', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { id: 'twitter', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                  { id: 'tiktok', icon: <SiTiktok className="w-4 h-4" /> }
                ].map((s) => (
                  <a key={s.id} href="#" data-testid={`link-${s.id}`} className="w-9 h-9 border border-white/10 flex items-center justify-center text-[#9A8F88] hover:border-[#C79D7D]/50 hover:text-[#C79D7D] transition-all duration-300">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-7">
              <p className="text-xs uppercase tracking-widest text-[#9A8F88] mb-6 font-sans">Navigate</p>
              <ul className="space-y-3 font-sans">
                {['services', 'work', 'about', 'pricing'].map((link) => (
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
                <li><a href="mailto:hello@trenddigitally.com" className="text-[#9A8F88] hover:text-[#C79D7D] transition-colors">hello@trenddigitally.com</a></li>
                <li className="text-[#9A8F88]/60">New York, NY</li>
                <li className="text-[#9A8F88]/60">San Francisco, CA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9A8F88]/40 font-sans">
            <p>&copy; 2025 Trend Digitally. All rights reserved.</p>
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
