import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useDragControls } from 'framer-motion';
import { X, Send, Phone, Mail, ChevronDown, Sparkles, GripHorizontal } from 'lucide-react';
import logoSrc from '@assets/TD_1778579526586.png';

/* ─────────────────────────────────────────────
   Animated Face SVG
   mood: 'idle' | 'thinking' | 'greet' | 'happy'
───────────────────────────────────────────── */
function BotFace({ mood, size = 56 }: { mood: string; size?: number }) {
  const s = size;
  const isThink = mood === 'thinking';
  const isGreet = mood === 'greet';
  const isHappy = mood === 'happy';

  return (
    <motion.svg
      width={s} height={s} viewBox="0 0 56 56" fill="none"
      animate={isGreet ? { rotate: [0, -12, 12, -7, 7, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <defs>
        {/* Skin: warm copper, lighter top-left */}
        <radialGradient id="faceGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#EDD6BC" />
          <stop offset="50%" stopColor="#C8956A" />
          <stop offset="100%" stopColor="#7A4E2D" />
        </radialGradient>
        {/* Inner face shadow (bottom) */}
        <radialGradient id="faceShadow" cx="50%" cy="110%" r="60%">
          <stop offset="0%" stopColor="rgba(50,20,5,0.28)" />
          <stop offset="100%" stopColor="rgba(50,20,5,0)" />
        </radialGradient>
        {/* Eye white */}
        <radialGradient id="eyeWhite" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0E4D6" />
        </radialGradient>
        {/* Iris: warm amber-brown */}
        <radialGradient id="irisGrad" cx="35%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#C07A32" />
          <stop offset="50%" stopColor="#7B3D10" />
          <stop offset="100%" stopColor="#2A0D02" />
        </radialGradient>
        {/* Mouth fill */}
        <radialGradient id="mouthFill" cx="50%" cy="10%" r="90%">
          <stop offset="0%" stopColor="#D44040" />
          <stop offset="100%" stopColor="#7B1A1A" />
        </radialGradient>
      </defs>

      {/* ── Face base ── */}
      <ellipse cx="28" cy="28.5" rx="25.5" ry="25" fill="url(#faceGrad)" />
      {/* Bottom shadow depth */}
      <ellipse cx="28" cy="28.5" rx="25.5" ry="25" fill="url(#faceShadow)" />
      {/* Subtle rim/outline */}
      <ellipse cx="28" cy="28.5" rx="25.5" ry="25" stroke="rgba(80,35,10,0.18)" strokeWidth="1" fill="none" />

      {/* Top-left shine */}
      <ellipse cx="18" cy="14" rx="7.5" ry="4.5" fill="white" opacity="0.2" transform="rotate(-28 18 14)" />
      {/* Secondary micro shine */}
      <ellipse cx="36" cy="11" rx="3" ry="1.8" fill="white" opacity="0.1" transform="rotate(-15 36 11)" />

      {/* Soft cheek blush */}
      <ellipse cx="8.5" cy="36" rx="6.5" ry="4.5" fill="#D4607A" opacity="0.22" />
      <ellipse cx="47.5" cy="36" rx="6.5" ry="4.5" fill="#D4607A" opacity="0.22" />

      {/* ── Eyebrows ── */}
      {isThink ? (
        <>
          <path d="M11 17.5 Q17 13.5 23 16.5" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M33 14.5 Q39 10.5 45 14.5" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      ) : isGreet ? (
        <>
          <path d="M11 13 Q17 8.5 23 12" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M33 11.5 Q39 7.5 45 11.5" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      ) : isHappy ? (
        <>
          <path d="M11 15.5 Q17 11 23 14.5" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
          <path d="M33 14 Q39 10 45 14" stroke="#4A2208" strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M11 17.5 Q17 14 23 17" stroke="#4A2208" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M33 17 Q39 14 45 17.5" stroke="#4A2208" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </>
      )}

      {/* ── Eyes ── */}
      {isThink ? (
        /* Squinting eyes for thinking */
        <>
          <motion.g style={{ transformOrigin: '18px 24px' }}
            animate={{ scaleY: [1, 0.15, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}>
            {/* Sclera */}
            <ellipse cx="18" cy="24" rx="6.5" ry="5.5" fill="url(#eyeWhite)" />
            {/* Iris */}
            <circle cx="18" cy="24.5" r="3.8" fill="url(#irisGrad)" />
            {/* Pupil */}
            <circle cx="18" cy="24.5" r="2" fill="#160600" />
            {/* Shines */}
            <circle cx="20" cy="22.5" r="1.5" fill="white" opacity="0.95" />
            <circle cx="16.5" cy="26.5" r="0.6" fill="white" opacity="0.5" />
          </motion.g>
          <motion.g style={{ transformOrigin: '38px 24px' }}
            animate={{ scaleY: [1, 0.15, 1] }} transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}>
            <ellipse cx="38" cy="24" rx="6.5" ry="5.5" fill="url(#eyeWhite)" />
            <circle cx="38" cy="24.5" r="3.8" fill="url(#irisGrad)" />
            <circle cx="38" cy="24.5" r="2" fill="#160600" />
            <circle cx="40" cy="22.5" r="1.5" fill="white" opacity="0.95" />
            <circle cx="36.5" cy="26.5" r="0.6" fill="white" opacity="0.5" />
          </motion.g>
        </>
      ) : (
        /* Normal / happy / greet — wide expressive eyes with periodic blink */
        <>
          <motion.g style={{ transformOrigin: '18px 24px' }}
            animate={{ scaleY: [1, 1, 1, 1, 1, 0.06, 1, 1, 1, 1, 1, 0.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}>
            {/* Sclera */}
            <ellipse cx="18" cy="24" rx="6.5" ry={isGreet ? 7 : isHappy ? 6.3 : 5.8} fill="url(#eyeWhite)" />
            {/* Iris */}
            <circle cx="18.3" cy="24.5" r={isGreet ? 4.5 : 4} fill="url(#irisGrad)" />
            {/* Pupil */}
            <circle cx="18.3" cy="24.5" r={isGreet ? 2.3 : 2.1} fill="#160600" />
            {/* Main shine */}
            <circle cx="20.2" cy="22.2" r="1.6" fill="white" opacity="1" />
            <circle cx="21" cy="21.5" r="0.65" fill="white" opacity="0.7" />
            {/* Bottom micro-shine */}
            <circle cx="16.2" cy="27" r="0.7" fill="white" opacity="0.45" />
          </motion.g>
          <motion.g style={{ transformOrigin: '38px 24px' }}
            animate={{ scaleY: [1, 1, 1, 1, 1, 0.06, 1, 1, 1, 1, 1, 0.06, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5, delay: 0.18 }}>
            <ellipse cx="38" cy="24" rx="6.5" ry={isGreet ? 7 : isHappy ? 6.3 : 5.8} fill="url(#eyeWhite)" />
            <circle cx="38.3" cy="24.5" r={isGreet ? 4.5 : 4} fill="url(#irisGrad)" />
            <circle cx="38.3" cy="24.5" r={isGreet ? 2.3 : 2.1} fill="#160600" />
            <circle cx="40.2" cy="22.2" r="1.6" fill="white" opacity="1" />
            <circle cx="41" cy="21.5" r="0.65" fill="white" opacity="0.7" />
            <circle cx="36.2" cy="27" r="0.7" fill="white" opacity="0.45" />
          </motion.g>
        </>
      )}

      {/* ── Nose — two small nostrils ── */}
      <ellipse cx="25.5" cy="33" rx="1.6" ry="1.1" fill="rgba(80,35,10,0.32)" />
      <ellipse cx="30.5" cy="33" rx="1.6" ry="1.1" fill="rgba(80,35,10,0.32)" />

      {/* ── Mouth ── */}
      {isThink ? (
        /* Thoughtful asymmetric smirk */
        <path d="M20 38.5 Q24 36.5 29 38.5 Q32 40 34 38" stroke="#5C1A00" strokeWidth="2.3" strokeLinecap="round" fill="none" />
      ) : isHappy ? (
        /* Big open happy smile with teeth */
        <>
          <path d="M15 36 Q28 50 41 36" fill="url(#mouthFill)" stroke="#5C1A00" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 36 Q28 43.5 41 36" fill="white" opacity="0.92" />
          <line x1="21" y1="36" x2="21" y2="40" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
          <line x1="28" y1="36" x2="28" y2="41" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
          <line x1="35" y1="36" x2="35" y2="40" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
          {/* Tongue */}
          <ellipse cx="28" cy="44" rx="5.5" ry="3.5" fill="#D4607A" opacity="0.88" />
          <ellipse cx="28" cy="43" rx="5.5" ry="1.5" fill="#E8809A" opacity="0.5" />
        </>
      ) : isGreet ? (
        /* Excited wide smile */
        <>
          <path d="M16 36 Q28 48.5 40 36" fill="url(#mouthFill)" stroke="#5C1A00" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 36 Q28 43 40 36" fill="white" opacity="0.9" />
          <line x1="22" y1="36" x2="22" y2="40" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
          <line x1="28" y1="36" x2="28" y2="41.5" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
          <line x1="34" y1="36" x2="34" y2="40" stroke="#DDC0A8" strokeWidth="0.8" opacity="0.5" />
        </>
      ) : (
        /* Clean friendly smile */
        <path d="M18 37 Q28 46 38 37" stroke="#5C1A00" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}

      {/* ── Greet sparkles ── */}
      {isGreet && (
        <>
          <motion.text x="1" y="10" fontSize="8" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} style={{ transformOrigin: '5px 5px' }} transition={{ duration: 0.9, repeat: Infinity }}>⭐</motion.text>
          <motion.text x="44" y="9" fontSize="7" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} style={{ transformOrigin: '48px 4px' }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.35 }}>✨</motion.text>
          <motion.text x="0" y="27" fontSize="6" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.7 }}>💫</motion.text>
        </>
      )}

      {/* ── Thinking dots (thought bubble style) ── */}
      {isThink && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.circle key={i} cx={43 + i * 4.5} cy={13 - i * 2.5} r={1.8 - i * 0.2} fill="#7B4F00"
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
              transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.22 }} />
          ))}
        </>
      )}

      {/* ── Happy little stars ── */}
      {isHappy && (
        <>
          <motion.text x="1" y="20" fontSize="7" animate={{ opacity: [0, 1, 0], y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity }}>✨</motion.text>
          <motion.text x="47" y="18" fontSize="6" animate={{ opacity: [0, 1, 0], y: [0, -4, 0] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }}>⭐</motion.text>
        </>
      )}

      {/* Outline */}
      <ellipse cx="28" cy="29" rx="26" ry="25.5" stroke="#E8A000" strokeWidth="1.8" fill="none" opacity="0.55" />
    </motion.svg>
  );
}

/* ─────────────────────────────────────────────
   Bot responses
───────────────────────────────────────────── */
interface Message { id: number; from: 'bot' | 'user'; text: string; time: string; followUps?: string[] }
const getTime = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

interface BotEntry { keywords: string[]; reply: string; followUps: string[] }
const BOT_RESPONSES: BotEntry[] = [
  { keywords: ['hi','hello','hey','hii','helo','namaste'], reply: "Hello! Great to have you here! I'm the Trend Digitally assistant. How can I help you grow your brand today?", followUps: ['Our Services','Pricing','About Us','Book a Call'] },
  { keywords: ['service','services','offer','do you do','what do'], reply: "We offer a full range of digital services:\n\n• Social Media Marketing\n• Branding Strategy\n• Website Designing\n• Performance Marketing\n• SEO & Content Writing\n• Influencer & WhatsApp Marketing\n• Product Photoshoots\n• App & Software Development\n\nWant to know more about any specific one?", followUps: ['Social Media','Branding','Website Design','Google Ads','Pricing'] },
  { keywords: ['price','pricing','cost','charge','fees','package','budget','how much'], reply: "Our packages are tailored to your brand's goals and scale. We'd love to understand your needs and give you a custom proposal.\n\nCall us at +91 90133 42230 or fill the inquiry form on this page!", followUps: ['Book a Call','Send Inquiry','Our Services','About Us'] },
  { keywords: ['social media','instagram','facebook','reels','posts','content'], reply: "Our Social Media Marketing covers everything — scroll-stopping reels, carousels, stories, captions, and data-driven strategies to grow your audience. End-to-end!", followUps: ['Pricing?','Branding too?','Get Started','Other Services'] },
  { keywords: ['branding','logo','brand identity','brand design'], reply: "We build premium brand identities — logo, visual system, typography, brand voice — everything that makes your brand impossible to ignore. Ready to be unforgettable?", followUps: ['See Our Work','Pricing?','Website Design too?','Get Started'] },
  { keywords: ['website','web','landing page','ecommerce','e-commerce'], reply: "We design and develop high-converting websites — landing pages to full e-commerce stores. Built for performance, optimised for SEO from day one.", followUps: ['Pricing?','Do you do SEO?','Performance Ads?','Book a Call'] },
  { keywords: ['ads','google ads','meta ads','facebook ads','performance','paid'], reply: "We run full-funnel paid campaigns on Google and Meta — from strategy and creatives to targeting and optimisation — engineered for maximum ROI.", followUps: ['Pricing?','SEO too?','Social Media?','Book a Call'] },
  { keywords: ['seo','search engine','ranking','organic'], reply: "Our SEO covers technical audits, content strategy, on-page optimisation, and link building — to rank where your customers are already searching.", followUps: ['Pricing?','Website Design?','Content Writing?','Book a Call'] },
  { keywords: ['contact','reach','phone','call','number','whatsapp','book a call','book'], reply: "You can reach us right now:\nPhone: +91 90133 42230\nPhone: +91 77805 11564\nEmail: trenddigitallyy@gmail.com\n\nOr fill the inquiry form below and we'll respond within 24 hours!", followUps: ['Our Services','Pricing','About Us'] },
  { keywords: ['email','mail','gmail','send inquiry','inquiry'], reply: "You can email us at trenddigitallyy@gmail.com and we respond within 24 hours. Or scroll down to fill the inquiry form directly!", followUps: ['Book a Call','Our Services','Pricing'] },
  { keywords: ['location','address','where','hyderabad','based','city'], reply: "We're based in Hyderabad, India — but we work with brands across the country and beyond!", followUps: ['Our Services','About Us','Book a Call'] },
  { keywords: ['about','who are you','team','founder','aayush','shraddha'], reply: "Trend Digitally is a Hyderabad-based creative growth agency founded by Aayush and Shraddha in 2024. In just over a year, we've helped 50 plus brands build authority, grow their audience, and scale revenue.", followUps: ['Our Services','Our Work','Pricing','Book a Call'] },
  { keywords: ['experience','portfolio','clients','brands','work','our work','see our work'], reply: "We've partnered with 50 plus brands across jewellery, fashion, healthcare, hospitality, lighting, textiles, and more. Scroll to the Our Work section to see our creatives!", followUps: ['Pricing?','Book a Call','Our Services'] },
  { keywords: ['onboard','start','begin','how to','process','next step','get started'], reply: "Getting started is easy! First, book a free strategy call. Then we audit your brand and goals. Then we present a custom plan. Onboarding takes just 7 to 10 days. Ready? Call us at +91 90133 42230!", followUps: ['Book a Call','Pricing','Our Services'] },
  { keywords: ['thank','thanks','great','awesome','good','nice','perfect','okay','ok'], reply: "You're welcome! Is there anything else I can help you with?", followUps: ['Our Services','Pricing','Book a Call','About Us'] },
  { keywords: ['bye','goodbye','see you','later'], reply: "Thanks for stopping by! Looking forward to growing your brand with you!", followUps: ['Book a Call','Send Inquiry'] },
];
const DEFAULT_ENTRY = { reply: "Great question! For detailed info, I'd recommend speaking directly with our team. Call us at +91 90133 42230 or email trenddigitallyy@gmail.com. We reply within 24 hours!", followUps: ['Our Services','Pricing','Book a Call'] };

function getBotEntry(input: string) {
  const lower = input.toLowerCase();
  for (const item of BOT_RESPONSES) if (item.keywords.some((k) => lower.includes(k))) return item;
  return DEFAULT_ENTRY;
}

let msgId = 0;
const newMsg = (from: 'bot'|'user', text: string, followUps?: string[]): Message => ({ id: ++msgId, from, text, time: getTime(), followUps });

const PANEL_W = 370;
const BTN_SIZE = 64;
const MARGIN = 16;

function getSavedPos() {
  try { const s = localStorage.getItem('td_widget_pos'); if (s) return JSON.parse(s); } catch {}
  return { x: (typeof window !== 'undefined' ? window.innerWidth : 1280) - BTN_SIZE - MARGIN, y: 70 };
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [faceMood, setFaceMood] = useState<'idle'|'thinking'|'greet'|'happy'>('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [usedFollowUps, setUsedFollowUps] = useState<Set<number>>(new Set());
  const [messages, setMessages] = useState<Message[]>([
    newMsg('bot', "Hey there! I'm Trendy, your Trend Digitally assistant.\n\nHow can I help you grow your brand today?", ['Our Services','Pricing','Book a Call','About Us']),
  ]);

  const saved = getSavedPos();
  const btnX = useMotionValue(saved.x);
  const btnY = useMotionValue(saved.y);
  const panelDragControls = useDragControls();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const savePos = useCallback(() => {
    localStorage.setItem('td_widget_pos', JSON.stringify({ x: btnX.get(), y: btnY.get() }));
  }, [btnX, btnY]);

  // Auto-open
  useEffect(() => {
    const seen = sessionStorage.getItem('td_chat_seen');
    if (!seen) {
      const t1 = setTimeout(() => setShowBubble(true), 2500);
      const t2 = setTimeout(() => { setOpen(true); setShowBubble(false); sessionStorage.setItem('td_chat_seen','1'); setFaceMood('greet'); setTimeout(() => setFaceMood('idle'), 1500); }, 5500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    if (open && !minimised) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
  }, [messages, open, minimised, typing]);

  useEffect(() => {
    if (open && !minimised) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open, minimised]);

  const openChat = () => {
    if (isDragging) return;
    setOpen(true); setShowBubble(false);
    sessionStorage.setItem('td_chat_seen','1');
    setFaceMood('greet');
    setTimeout(() => setFaceMood('idle'), 1500);
  };

  const dispatchBotReply = (text: string) => {
    const entry = getBotEntry(text);
    setFaceMood('thinking');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const msg = newMsg('bot', entry.reply, entry.followUps);
      setMessages((prev) => [...prev, msg]);
      setFaceMood('happy');
      setTimeout(() => setFaceMood('idle'), 1200);
    }, 850 + Math.random() * 500);
  };

  const sendMessage = () => {
    const text = input.trim(); if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, newMsg('user', text)]);
    dispatchBotReply(text);
  };

  const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const handleQuick = (q: string, id: number) => {
    setUsedFollowUps((prev) => new Set(prev).add(id));
    setMessages((prev) => [...prev, newMsg('user', q)]);
    dispatchBotReply(q);
  };

  const lastBotMsgId = [...messages].reverse().find((m) => m.from === 'bot')?.id;

  const panelLeft = () => {
    const bx = btnX.get();
    if (window.innerWidth - bx - BTN_SIZE >= PANEL_W + 8) return bx + BTN_SIZE + 8;
    return Math.max(MARGIN, bx - PANEL_W - 8);
  };
  const panelTop = () => Math.min(btnY.get(), window.innerHeight - 560 - MARGIN);

  return (
    <>
      {/* Notification bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 10 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.85, x: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="fixed z-[9999] cursor-pointer max-w-[220px]"
            style={{ top: btnY.get() - 10, left: btnX.get() - 230 }}
            onClick={openChat}
          >
            <div className="text-[#EDE9E5] text-xs font-sans px-4 py-3 shadow-2xl relative"
              style={{ background: 'linear-gradient(135deg,#1e1410,#2a1f18)', border: '1px solid rgba(199,157,125,0.5)', borderRadius: '12px 12px 2px 12px' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-base">😄</span>
                <span className="font-semibold text-[#C79D7D] text-[11px] tracking-wide">Trendy</span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full ml-auto animate-pulse" />
              </div>
              <p className="text-[#D8C2B2] leading-snug">Hey! How may I help you? 👋</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable toggle — funny face button */}
      <AnimatePresence>
        {!open && (
          <motion.div
            drag dragMomentum={false} dragElastic={0}
            style={{ x: btnX, y: btnY, position: 'fixed', top: 0, left: 0, zIndex: 9998, width: BTN_SIZE, height: BTN_SIZE }}
            dragConstraints={{ left: 0, top: 0, right: window.innerWidth - BTN_SIZE, bottom: window.innerHeight - BTN_SIZE }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => { savePos(); setTimeout(() => setIsDragging(false), 100); }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {/* Pulse rings */}
            <motion.div animate={{ scale: [1, 1.65], opacity: [0.4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'rgba(199,157,125,0.4)' }} />
            <motion.div animate={{ scale: [1, 2.1], opacity: [0.2, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
              className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'rgba(199,157,125,0.2)' }} />

            {/* Drag hint */}
            <div className="absolute -top-1 -left-1 bg-[#1a1210] border border-[#C79D7D]/30 rounded-full w-5 h-5 flex items-center justify-center z-10" title="Drag to move">
              <GripHorizontal className="w-2.5 h-2.5 text-[#C79D7D]/70" />
            </div>

            {/* The face button */}
            <motion.button
              whileHover={{ scale: isDragging ? 1 : 1.12, rotate: isDragging ? 0 : [-2, 2, -2] }}
              whileTap={{ scale: 0.88 }}
              onClick={openChat}
              className="w-full h-full rounded-full flex items-center justify-center relative"
              style={{
                background: 'linear-gradient(135deg,#D8C2B2 0%,#C79D7D 50%,#5E4E45 100%)',
                boxShadow: '0 6px 28px rgba(199,157,125,0.55), 0 2px 8px rgba(0,0,0,0.4)',
                cursor: isDragging ? 'grabbing' : 'pointer',
              }}
              aria-label="Chat with Trendy"
            >
              <BotFace mood={faceMood} size={52} />
              {/* Online dot */}
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1 right-1 w-3.5 h-3.5 bg-green-400 border-2 border-[#1a1210] rounded-full" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draggable chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag dragControls={panelDragControls} dragListener={false} dragMomentum={false} dragElastic={0}
            dragConstraints={{ left: 0, top: 0, right: window.innerWidth - PANEL_W, bottom: window.innerHeight - 80 }}
            onDragEnd={savePos}
            initial={{ opacity: 0, scale: 0.92, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed flex flex-col overflow-hidden"
            style={{ top: panelTop(), left: panelLeft(), width: PANEL_W, zIndex: 9999, borderRadius: 18, maxHeight: minimised ? 'auto' : 570, background: '#0d0a09', boxShadow: '0 24px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(199,157,125,0.25)' }}
          >
            {/* Header — drag handle */}
            <div
              onPointerDown={(e) => panelDragControls.start(e)}
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0 relative overflow-hidden select-none"
              style={{ background: 'linear-gradient(135deg,#1e1410 0%,#2a1c14 60%,#1a1210 100%)', borderBottom: '1px solid rgba(199,157,125,0.2)', cursor: 'grab' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C79D7D]/5 to-transparent pointer-events-none" />
              {/* Grip bars */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-1">
                {[0,1,2].map((i) => <div key={i} className="w-5 h-0.5 rounded-full bg-[#C79D7D]/25" />)}
              </div>

              {/* Animated face in header */}
              <div className="flex-shrink-0 mt-1 relative">
                <BotFace mood={faceMood} size={42} />
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#1e1410] rounded-full" />
              </div>

              <div className="flex-1 min-w-0 mt-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-[#EDE9E5] text-sm font-bold font-sans leading-none">Trendy</p>
                  <span className="text-xs">😄</span>
                  <Sparkles className="w-3 h-3 text-[#C79D7D]" />
                </div>
                <p className="text-green-400 text-[10px] font-sans mt-0.5 tracking-wider">
                  {typing ? '💭 Thinking…' : '● Online · Replies instantly'}
                </p>
              </div>

              <div className="flex items-center gap-0.5 mt-1" onPointerDown={(e) => e.stopPropagation()}>
                <a href="tel:+919013342230" className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all" title="Call us">
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a href="mailto:trenddigitallyy@gmail.com" className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all" title="Email us">
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button onClick={() => setMinimised(!minimised)} className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all">
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${minimised ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={() => { setOpen(false); savePos(); setFaceMood('idle'); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-red-400 hover:bg-red-400/10 transition-all">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimised && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="flex flex-col flex-1 min-h-0">
                  {/* Messages */}
                  <div className="overflow-y-auto px-4 py-4 space-y-3"
                    style={{ maxHeight: 360, background: 'linear-gradient(180deg,#110e0d,#0d0a09)', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,184,0,0.15) transparent' }}
                  >
                    {messages.map((msg) => {
                      const isLastBot = msg.id === lastBotMsgId;
                      const fuUsed = usedFollowUps.has(msg.id);
                      return (
                        <React.Fragment key={msg.id}>
                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
                            className={`flex gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            {msg.from === 'bot' && (
                              <div className="flex-shrink-0 mt-1">
                                <BotFace mood={isLastBot ? faceMood : 'idle'} size={28} />
                              </div>
                            )}
                            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                              <div className={`px-4 py-2.5 text-xs font-sans leading-relaxed whitespace-pre-line ${msg.from === 'bot' ? 'text-[#EDE9E5]' : 'text-[#1a1210] font-semibold'}`}
                                style={msg.from === 'bot'
                                  ? { background: 'linear-gradient(135deg,#1e1712,#211a15)', border: '1px solid rgba(199,157,125,0.2)', borderRadius: '4px 14px 14px 14px' }
                                  : { background: 'linear-gradient(135deg,#C79D7D,#b8845e)', borderRadius: '14px 4px 14px 14px', boxShadow: '0 2px 12px rgba(199,157,125,0.3)' }
                                }
                              >
                                {msg.text}
                              </div>
                              <span className="text-[#9A8F88]/35 text-[9px] font-sans px-1">{msg.time}</span>
                            </div>
                          </motion.div>

                          {msg.from === 'bot' && msg.followUps && isLastBot && !fuUsed && !typing && (
                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="flex flex-wrap gap-1.5 pl-9">
                              {msg.followUps.map((q) => (
                                <motion.button key={q} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} onClick={() => handleQuick(q, msg.id)}
                                  className="text-[10px] font-sans font-medium px-3 py-1.5 tracking-wide transition-all duration-200"
                                  style={{ background: 'linear-gradient(135deg,rgba(199,157,125,0.12),rgba(199,157,125,0.05))', border: '1px solid rgba(199,157,125,0.3)', borderRadius: 20, color: '#C79D7D' }}
                                  onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(199,157,125,0.22)'; b.style.borderColor = 'rgba(199,157,125,0.65)'; }}
                                  onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'linear-gradient(135deg,rgba(199,157,125,0.12),rgba(199,157,125,0.05))'; b.style.borderColor = 'rgba(199,157,125,0.3)'; }}
                                >
                                  {q}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}

                    <AnimatePresence>
                      {typing && (
                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-2.5">
                          <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
                            <BotFace mood="thinking" size={28} />
                          </motion.div>
                          <div className="px-4 py-3 flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg,#1e1712,#211a15)', border: '1px solid rgba(199,157,125,0.2)', borderRadius: '4px 14px 14px 14px' }}>
                            {[0,0.18,0.36].map((d,i) => (
                              <motion.span key={i} className="block rounded-full" style={{ width: 7, height: 7, background: 'linear-gradient(135deg,#C79D7D,#5E4E45)' }}
                                animate={{ y: [0,-5,0], opacity: [0.5,1,0.5] }} transition={{ duration: 0.65, repeat: Infinity, delay: d }} />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                  </div>

                  {/* Input bar */}
                  <div className="px-3 py-3 flex items-center gap-2 flex-shrink-0" style={{ background: '#110e0d', borderTop: '1px solid rgba(199,157,125,0.15)' }}>
                    <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                      placeholder="Ask Trendy anything…"
                      className="flex-1 text-[#EDE9E5] text-xs font-sans pl-4 pr-4 py-2.5 outline-none placeholder:text-[#9A8F88]/35 transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(199,157,125,0.2)', borderRadius: 24 }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(199,157,125,0.55)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(199,157,125,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    />
                    <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={sendMessage} disabled={!input.trim()}
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                      style={{ background: input.trim() ? 'linear-gradient(135deg,#C79D7D,#5E4E45)' : 'rgba(199,157,125,0.12)', boxShadow: input.trim() ? '0 4px 16px rgba(199,157,125,0.4)' : 'none' }}
                    >
                      <Send className="w-4 h-4 text-[#1a1210]" />
                    </motion.button>
                  </div>

                  <div className="text-center py-1.5" style={{ background: '#110e0d', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                    <p className="text-[#9A8F88]/30 text-[9px] font-sans tracking-widest uppercase">Powered by Trend Digitally 😄</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
