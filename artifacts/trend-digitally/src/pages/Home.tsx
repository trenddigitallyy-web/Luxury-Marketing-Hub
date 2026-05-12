import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { ArrowRight, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import logoSrc from '@assets/TD_1778579526586.png';

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
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-border/50' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="Trend Digitally" className="h-12 w-12 rounded-full object-cover" />
            <span className="font-serif text-xl font-bold tracking-tight text-primary hidden sm:block">Trend Digitally</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-primary/80">
            <button onClick={() => scrollToSection('services')} className="hover:text-primary transition-colors">Services</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-primary transition-colors">Work</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Pricing</button>
          </nav>
          <button 
            data-testid="button-nav-book"
            onClick={() => scrollToSection('contact')}
            className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
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

      {/* 3. Trusted By Brands Slider */}
      <section className="py-20 border-y border-border/50 bg-background/50 overflow-hidden relative flex flex-col items-center">
        <p className="text-xs uppercase tracking-widest text-primary/50 mb-8 font-medium">Trusted by industry leaders</p>
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee flex items-center gap-24 pr-24">
            {['Lumière', 'Nova Labs', 'Velour Co.', 'Maison X', 'Apex Studio', 'Cipher Brand', 'The Collective', 'Origami Media'].map((brand, i) => (
              <span key={i} className="text-2xl md:text-3xl font-serif text-primary/40 whitespace-nowrap select-none">{brand}</span>
            ))}
            {/* Duplicate for infinite effect */}
            {['Lumière', 'Nova Labs', 'Velour Co.', 'Maison X', 'Apex Studio', 'Cipher Brand', 'The Collective', 'Origami Media'].map((brand, i) => (
              <span key={i + 'dup'} className="text-2xl md:text-3xl font-serif text-primary/40 whitespace-nowrap select-none">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. About Agency */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-serif text-primary leading-tight">
              Born to<br />Redefine Digital.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="space-y-6 text-lg text-primary/80">
            <p>
              We believe that true influence isn't bought—it's built. We treat every brand like a luxury client, crafting narratives that resonate and strategies that convert.
            </p>
            <p>
              Where strategy meets artistry, that's where we operate. We don't do cookie-cutter campaigns. We build digital empires for those bold enough to stand out.
            </p>
            <div className="pt-6 border-t border-border mt-8 flex flex-wrap gap-4 text-sm font-medium tracking-wide">
              <span>Founded 2019</span>
              <span className="text-primary/30">•</span>
              <span>150+ Brands Transformed</span>
              <span className="text-primary/30">•</span>
              <span>4 Continents</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5. Services Bento Grid */}
      <section id="services" className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="mb-16 md:mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Our Expertise</h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">Comprehensive solutions for brands demanding excellence.</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
            {[
              { name: 'Social Media Marketing', desc: 'Dominate the feed with scroll-stopping content.', cols: 'md:col-span-2', rows: 'row-span-2' },
              { name: 'Branding', desc: 'Crafting identities that command attention.', cols: 'col-span-1', rows: 'row-span-1' },
              { name: 'Video Editing', desc: 'Cinematic storytelling for the digital age.', cols: 'col-span-1', rows: 'row-span-1' },
              { name: 'Paid Ads', desc: 'Performance marketing that actually performs.', cols: 'col-span-1', rows: 'row-span-2' },
              { name: 'Content Strategy', desc: 'Data-driven narratives that convert.', cols: 'col-span-1 md:col-span-2 lg:col-span-2', rows: 'row-span-1' },
              { name: 'Web Design', desc: 'Digital experiences that convert.', cols: 'col-span-1', rows: 'row-span-1' },
              { name: 'AI Automation', desc: 'Scale seamlessly with intelligent systems.', cols: 'col-span-1', rows: 'row-span-1' },
              { name: 'Performance Marketing', desc: 'ROI-obsessed growth engines.', cols: 'md:col-span-2 lg:col-span-2', rows: 'row-span-1' }
            ].map((service, i) => (
              <FadeIn 
                key={i} 
                delay={i * 0.05}
                className={`group relative overflow-hidden bg-background/5 border border-white/10 p-8 flex flex-col justify-end hover:bg-white/10 transition-colors ${service.cols} ${service.rows}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-serif mb-2">{service.name}</h3>
                  <p className="text-primary-foreground/60 text-sm md:text-base opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{service.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Stats Counter Section */}
      <section className="py-32 border-b border-border/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-border">
            {[
              { val: '150+', label: 'Brands Transformed' },
              { val: '3.2B+', label: 'Impressions Delivered' },
              { val: '98%', label: 'Client Retention' },
              { val: '40+', label: 'Team Members' }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1} className="flex flex-col items-center justify-center">
                <span className="text-4xl md:text-6xl font-serif text-primary mb-2">{stat.val}</span>
                <span className="text-sm font-medium text-primary/60 uppercase tracking-wider">{stat.label}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Case Studies */}
      <section id="work" className="py-32 bg-background relative">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Featured Work</h2>
              <p className="text-primary/70 text-lg">Results that speak louder than words.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-primary hover:opacity-70 transition-opacity font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Lumière Rebrand', industry: 'Luxury Retail', result: '+340% engagement', color: 'bg-[#C79D7D]/20' },
              { name: 'Nova Labs Launch', industry: 'Tech Startup', result: '2.4M reach in 30 days', color: 'bg-[#9A8F88]/20' },
              { name: 'Apex Studio Campaign', industry: 'Creative Agency', result: '$1.2M revenue generated', color: 'bg-[#D8C2B2]/20' }
            ].map((study, i) => (
              <FadeIn key={i} delay={i * 0.1} className="group cursor-pointer">
                <div className={`aspect-[4/5] w-full ${study.color} mb-6 relative overflow-hidden flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
                  <motion.div 
                    className="w-16 h-16 bg-background rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-xl"
                  >
                    <ArrowRight className="text-primary w-6 h-6" />
                  </motion.div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary/60 font-medium">{study.industry}</span>
                    <span className="text-accent font-bold">{study.result}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-primary group-hover:text-accent transition-colors">{study.name}</h3>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Creative Process Timeline */}
      <section className="py-32 bg-[#F5F2EF]">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Our Methodology</h2>
            <p className="text-primary/70 max-w-2xl mx-auto text-lg">A systematic approach to unpredictable creativity.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-primary/10"></div>
            {[
              { phase: '01', title: 'Discover', desc: 'Deep dive into your brand DNA, market positioning, and untapped opportunities.' },
              { phase: '02', title: 'Strategy', desc: 'Crafting the blueprint for domination. Data-backed, creatively driven.' },
              { phase: '03', title: 'Create', desc: 'Execution with uncompromising quality. Every asset designed to perform.' },
              { phase: '04', title: 'Scale', desc: 'Iterative optimization to turn traction into sustainable, long-term growth.' }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-background border border-border flex items-center justify-center text-xl font-serif text-primary mb-8 shadow-sm">
                  {step.phase}
                </div>
                <h3 className="text-xl font-serif text-primary mb-4">{step.title}</h3>
                <p className="text-primary/70 text-sm leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0"></div>
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/20 rounded-full mix-blend-screen blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-primary-foreground mb-6">Whispers from the Top</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "Trend Digitally didn't just grow our audience; they completely redefined our market positioning. They operate on a different frequency.", name: "Elena Rostova", role: "CMO, Maison X" },
              { quote: "The most ruthless, creative, and effective agency we've ever partnered with. Our ROI tripled in the first quarter.", name: "Marcus Chen", role: "Founder, Nova Labs" },
              { quote: "They understand luxury like no other digital agency. Every campaign feels bespoke, premium, and impossible to ignore.", name: "Sarah Jenkins", role: "VP Marketing, Lumière" }
            ].map((test, i) => (
              <FadeIn key={i} delay={i * 0.15} className="bg-background/10 backdrop-blur-xl border border-white/10 p-8 flex flex-col justify-between shadow-2xl">
                <div className="mb-8">
                  <div className="flex gap-1 text-accent mb-6">
                    {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                  </div>
                  <p className="text-primary-foreground/90 text-lg leading-relaxed font-serif italic">"{test.quote}"</p>
                </div>
                <div>
                  <p className="font-bold text-primary-foreground">{test.name}</p>
                  <p className="text-primary-foreground/60 text-sm">{test.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Pricing Preview */}
      <section id="pricing" className="py-32">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6">Investment</h2>
            <p className="text-primary/70 max-w-2xl mx-auto text-lg">Transparent tiers for serious growth.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Growth */}
            <FadeIn delay={0.1} className="border border-border bg-background p-8 relative">
              <h3 className="text-2xl font-serif text-primary mb-2">Growth</h3>
              <div className="text-3xl font-light text-primary mb-6">$2,500<span className="text-sm text-primary/50">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-primary/80">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Core Social Strategy</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> 12 Custom Posts/mo</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Basic Community Mgt</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Monthly Reporting</li>
              </ul>
              <button className="w-full py-3 border border-primary text-primary hover:bg-primary/5 transition-colors font-medium">Book a Call</button>
            </FadeIn>

            {/* Authority - Highlighted */}
            <FadeIn delay={0.2} className="border border-primary bg-primary text-primary-foreground p-10 relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-accent text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider">Most Popular</div>
              <h3 className="text-2xl font-serif mb-2">Authority</h3>
              <div className="text-4xl font-light mb-6">$5,500<span className="text-sm text-primary-foreground/50">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-primary-foreground/90">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Omnichannel Strategy</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> 30 Custom Posts/mo</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> 4 High-End Videos</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Paid Ads Management</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Bi-weekly Strategy Calls</li>
              </ul>
              <button className="w-full py-3 bg-accent text-primary hover:bg-accent/90 transition-colors font-medium">Book a Call</button>
            </FadeIn>

            {/* Empire */}
            <FadeIn delay={0.3} className="border border-border bg-background p-8 relative">
              <h3 className="text-2xl font-serif text-primary mb-2">Empire</h3>
              <div className="text-3xl font-light text-primary mb-6">Custom<span className="text-sm text-primary/50">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-primary/80">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Full Digital Takeover</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Dedicated Growth Team</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Unlimited Content Assets</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-accent shrink-0" /> Influencer Partnerships</li>
              </ul>
              <button className="w-full py-3 border border-primary text-primary hover:bg-primary/5 transition-colors font-medium">Book a Call</button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 11. FAQ Accordion */}
      <section className="py-32 bg-[#F5F2EF]">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl font-serif text-primary">Answers.</h2>
          </FadeIn>

          <FadeIn>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "How long does onboarding take?", a: "Our onboarding is comprehensive but efficient. Typically, it takes 7-14 days from contract signing to campaign launch, ensuring we have a deep understanding of your brand DNA." },
                { q: "Do you work with early-stage startups?", a: "We partner with brands at all stages, provided they have ambitious goals and the budgets to support aggressive growth strategies." },
                { q: "What makes Trend Digitally different from other agencies?", a: "We don't sell deliverables; we sell authority. Our approach combines luxury-tier creative with ruthless performance marketing. We are a growth partner, not an order-taker." },
                { q: "Can we see results in the first month?", a: "Yes. While compounding growth takes time, our initial sprints are designed to capture low-hanging fruit and demonstrate immediate ROI within the first 30 days." },
                { q: "What industries do you specialize in?", a: "We excel in luxury retail, high-tech startups, premium hospitality, and D2C e-commerce brands." },
                { q: "How do we get started?", a: "Book a strategy call using any button on this page. We'll discuss your goals, audit your current digital presence, and determine if we're a mutual fit." }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border/50 bg-background px-6">
                  <AccordionTrigger className="text-left font-serif text-lg text-primary hover:no-underline py-6 data-[state=open]:text-accent transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-primary/70 pb-6 text-base leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* 12. Final CTA Banner */}
      <section id="contact" className="py-40 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#C79D7D]/30 rounded-full mix-blend-multiply blob"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#D8C2B2]/40 rounded-full mix-blend-multiply blob" style={{ animationDelay: '-5s' }}></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-serif text-primary leading-tight mb-12">
              Ready to Build Your<br />Digital Authority?
            </h2>
            <button className="bg-primary text-primary-foreground px-12 py-5 text-lg font-medium tracking-wide hover:bg-primary/90 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Book Strategy Call
            </button>
          </FadeIn>
        </div>
      </section>

      {/* 13. Premium Footer */}
      <footer className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="font-serif text-3xl font-bold mb-6">Trend Digitally.</div>
              <p className="text-primary-foreground/60 max-w-sm mb-8">
                The creative growth agency for brands that refuse to blend in. We build digital empires.
              </p>
              <div className="flex gap-4">
                <a href="#" data-testid="link-instagram" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"><SiInstagram className="w-4 h-4" /></a>
                <a href="#" data-testid="link-linkedin" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" data-testid="link-twitter" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" data-testid="link-tiktok" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"><SiTiktok className="w-4 h-4" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Explore</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors">Work</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-primary-foreground/70">
                <li><a href="mailto:hello@trenddigitally.com" className="hover:text-white transition-colors">hello@trenddigitally.com</a></li>
                <li>New York, NY</li>
                <li>San Francisco, CA</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/40">
            <p>&copy; 2025 Trend Digitally. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
