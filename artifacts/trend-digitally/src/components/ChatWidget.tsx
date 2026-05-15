import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, Phone, Mail, ChevronDown, Sparkles } from 'lucide-react';
import logoSrc from '@assets/TD_1778579526586.png';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
  followUps?: string[];
}

const getTime = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

interface BotEntry {
  keywords: string[];
  reply: string;
  followUps: string[];
}

const BOT_RESPONSES: BotEntry[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste'],
    reply: "Hello! Great to have you here 👋 I'm the Trend Digitally assistant. How can I help you grow your brand today?",
    followUps: ['Our Services', 'Pricing', 'About Us', 'Book a Call'],
  },
  {
    keywords: ['service', 'services', 'offer', 'do you do', 'what do'],
    reply:
      "We offer a full range of digital services:\n\n• Social Media Marketing\n• Branding Strategy\n• Website Designing\n• Performance Marketing\n• SEO & Content Writing\n• Influencer & WhatsApp Marketing\n• Product Photoshoots\n• App & Software Development\n\nWant to know more about any specific one?",
    followUps: ['Social Media', 'Branding', 'Website Design', 'Google Ads', 'Pricing'],
  },
  {
    keywords: ['price', 'pricing', 'cost', 'charge', 'fees', 'package', 'budget', 'how much'],
    reply:
      "Our packages are tailored to your brand's goals and scale. We'd love to understand your needs and give you a custom proposal.\n\n📞 +91 90133 42230\n\nOr fill the inquiry form on this page!",
    followUps: ['Book a Call', 'Send Inquiry', 'Our Services', 'About Us'],
  },
  {
    keywords: ['social media', 'instagram', 'facebook', 'reels', 'posts', 'content'],
    reply:
      "Our Social Media Marketing covers everything — scroll-stopping reels, carousels, stories, captions, and data-driven strategies to grow your audience and engagement. End-to-end, no stress on your side! 🚀",
    followUps: ['Pricing?', 'Branding too?', 'Get Started', 'Other Services'],
  },
  {
    keywords: ['branding', 'logo', 'brand identity', 'brand design'],
    reply:
      "We build premium brand identities — logo, visual system, typography, brand voice — everything that makes your brand impossible to ignore. Ready to be unforgettable? ✨",
    followUps: ['See Our Work', 'Pricing?', 'Website Design too?', 'Get Started'],
  },
  {
    keywords: ['website', 'web', 'landing page', 'ecommerce', 'e-commerce'],
    reply:
      "We design and develop high-converting websites — landing pages to full e-commerce stores. Built for performance, optimised for SEO from day one. 💻",
    followUps: ['Pricing?', 'Do you do SEO?', 'Performance Ads?', 'Book a Call'],
  },
  {
    keywords: ['ads', 'google ads', 'meta ads', 'facebook ads', 'performance', 'paid'],
    reply:
      "We run full-funnel paid campaigns on Google & Meta — from strategy and creatives to targeting and optimisation — engineered for maximum ROI. 📈",
    followUps: ['Pricing?', 'SEO too?', 'Social Media?', 'Book a Call'],
  },
  {
    keywords: ['seo', 'search engine', 'ranking', 'organic'],
    reply:
      "Our SEO covers technical audits, content strategy, on-page optimisation, and link building — to rank where your customers are already searching. 🔍",
    followUps: ['Pricing?', 'Website Design?', 'Content Writing?', 'Book a Call'],
  },
  {
    keywords: ['contact', 'reach', 'phone', 'call', 'number', 'whatsapp', 'book a call', 'book'],
    reply:
      "You can reach us right now:\n📞 +91 90133 42230\n📞 +91 77805 11564\n📧 trenddigitallyy@gmail.com\n\nOr fill the inquiry form below and we'll respond within 24 hours!",
    followUps: ['Our Services', 'Pricing', 'About Us'],
  },
  {
    keywords: ['email', 'mail', 'gmail', 'send inquiry', 'inquiry'],
    reply:
      "You can email us at:\n📧 trenddigitallyy@gmail.com\n\nWe respond within 24 hours — or scroll down to fill the inquiry form directly!",
    followUps: ['Book a Call', 'Our Services', 'Pricing'],
  },
  {
    keywords: ['location', 'address', 'where', 'hyderabad', 'based', 'city'],
    reply:
      "We're based in Hyderabad, India — but we work with brands across the country and beyond. 🇮🇳",
    followUps: ['Our Services', 'About Us', 'Book a Call'],
  },
  {
    keywords: ['about', 'who are you', 'team', 'founder', 'aayush', 'shraddha'],
    reply:
      "Trend Digitally is a Hyderabad-based creative growth agency founded by Aayush and Shraddha in 2024. In just over a year, we've helped 50+ brands build authority, grow their audience, and scale revenue through strategic digital marketing. 🏆",
    followUps: ['Our Services', 'Our Work', 'Pricing', 'Book a Call'],
  },
  {
    keywords: ['experience', 'portfolio', 'clients', 'brands', 'work', 'our work', 'see our work'],
    reply:
      "We've partnered with 50+ brands across jewellery, fashion, healthcare, hospitality, lighting, textiles, and more. Scroll to the 'Our Work' section on this page to see our creatives!",
    followUps: ['Pricing?', 'Book a Call', 'Our Services'],
  },
  {
    keywords: ['onboard', 'start', 'begin', 'how to', 'process', 'next step', 'get started'],
    reply:
      "Getting started is easy:\n1️⃣ Book a free strategy call\n2️⃣ We audit your brand & goals\n3️⃣ We present a custom plan\n4️⃣ Onboarding takes just 7–10 days\n\nReady? Call us at +91 90133 42230!",
    followUps: ['Book a Call', 'Pricing', 'Our Services'],
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'good', 'nice', 'perfect', 'okay', 'ok'],
    reply:
      "You're welcome! 😊 Is there anything else I can help you with?",
    followUps: ['Our Services', 'Pricing', 'Book a Call', 'About Us'],
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    reply:
      "Thanks for stopping by! Looking forward to growing your brand with you. 🚀",
    followUps: ['Book a Call', 'Send Inquiry'],
  },
];

const DEFAULT_ENTRY: Pick<BotEntry, 'reply' | 'followUps'> = {
  reply:
    "Great question! For detailed information, I'd recommend speaking directly with our team.\n\n📞 +91 90133 42230\n📧 trenddigitallyy@gmail.com\n\nOr fill the inquiry form below — we reply within 24 hours!",
  followUps: ['Our Services', 'Pricing', 'Book a Call'],
};

function getBotEntry(input: string): Pick<BotEntry, 'reply' | 'followUps'> {
  const lower = input.toLowerCase();
  for (const item of BOT_RESPONSES) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return { reply: item.reply, followUps: item.followUps };
    }
  }
  return DEFAULT_ENTRY;
}

let msgId = 0;
const newMsg = (from: 'bot' | 'user', text: string, followUps?: string[]): Message => ({
  id: ++msgId,
  from,
  text,
  time: getTime(),
  followUps,
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [usedFollowUps, setUsedFollowUps] = useState<Set<number>>(new Set());
  const [messages, setMessages] = useState<Message[]>([
    newMsg(
      'bot',
      "Hey there! 👋 I'm the Trend Digitally assistant.\n\nHow can I help you grow your brand today?",
      ['Our Services', 'Pricing', 'Book a Call', 'About Us']
    ),
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('td_chat_seen');
    if (!seen) {
      const t1 = setTimeout(() => setShowBubble(true), 2500);
      const t2 = setTimeout(() => {
        setOpen(true);
        setShowBubble(false);
        sessionStorage.setItem('td_chat_seen', '1');
      }, 5500);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  }, [messages, open, minimised, typing]);

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open, minimised]);

  const openChat = () => {
    setOpen(true);
    setShowBubble(false);
    sessionStorage.setItem('td_chat_seen', '1');
  };

  const dispatchBotReply = (text: string) => {
    const entry = getBotEntry(text);
    setTyping(true);
    const delay = 800 + Math.random() * 500;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, newMsg('bot', entry.reply, entry.followUps)]);
    }, delay);
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, newMsg('user', text)]);
    dispatchBotReply(text);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuick = (q: string, msgId: number) => {
    setUsedFollowUps((prev) => new Set(prev).add(msgId));
    setMessages((prev) => [...prev, newMsg('user', q)]);
    dispatchBotReply(q);
  };

  const lastBotMsgId = [...messages].reverse().find((m) => m.from === 'bot')?.id;

  return (
    <>
      {/* Notification bubble */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="fixed top-[4.2rem] right-[5rem] z-[9999] cursor-pointer max-w-[210px]"
            onClick={openChat}
          >
            <div className="bg-gradient-to-br from-[#1e1410] to-[#2a1f18] border border-[#C79D7D]/50 text-[#EDE9E5] text-xs font-sans px-4 py-3 shadow-2xl relative"
              style={{ borderRadius: '12px 12px 2px 12px' }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <img src={logoSrc} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="font-semibold text-[#C79D7D] text-[11px] tracking-wide">Trend Digitally</span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full ml-auto" />
              </div>
              <p className="text-[#D8C2B2] leading-snug">Hey! How may I help you? 👋</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — redesigned */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="fixed top-[4.2rem] right-4 z-[9998]"
          >
            {/* Pulse rings */}
            <motion.div
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-[#C79D7D]/40 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.85], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
              className="absolute inset-0 rounded-full bg-[#C79D7D]/20 pointer-events-none"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={openChat}
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #C79D7D 0%, #9A6E55 50%, #C79D7D 100%)',
                boxShadow: '0 8px 32px rgba(199,157,125,0.5), 0 2px 8px rgba(0,0,0,0.4)',
              }}
              aria-label="Chat with us"
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                <img src={logoSrc} alt="Trend Digitally" className="w-8 h-8 rounded-full object-cover border-2 border-white/30" />
              </motion.div>
              {/* Unread dot */}
              <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 border-2 border-[#1a1210] rounded-full" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed top-14 right-4 z-[9999] w-[340px] sm:w-[390px] flex flex-col overflow-hidden"
            style={{
              borderRadius: '16px',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(199,157,125,0.2)',
              maxHeight: minimised ? 'auto' : '560px',
              background: '#0d0a09',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1e1410 0%, #2a1c14 50%, #1a1210 100%)',
                borderBottom: '1px solid rgba(199,157,125,0.15)',
              }}
            >
              {/* Decorative shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C79D7D]/5 to-transparent pointer-events-none" />

              <div className="relative flex-shrink-0">
                <img src={logoSrc} alt="Trend Digitally" className="w-10 h-10 rounded-full object-cover border-2 border-[#C79D7D]/40" />
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#1e1410] rounded-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[#EDE9E5] text-sm font-bold font-sans leading-none tracking-wide">Trend Digitally</p>
                  <Sparkles className="w-3 h-3 text-[#C79D7D]" />
                </div>
                <p className="text-green-400 text-[10px] font-sans mt-0.5 tracking-wider">● Online · Replies instantly</p>
              </div>

              <div className="flex items-center gap-0.5">
                <a href="tel:+919013342230"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all"
                  title="Call us"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a href="mailto:trenddigitallyy@gmail.com"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all"
                  title="Email us"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setMinimised(!minimised)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] hover:bg-[#C79D7D]/10 transition-all"
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${minimised ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A8F88] hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimised && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages area */}
                  <div
                    className="overflow-y-auto px-4 py-4 space-y-3"
                    style={{
                      maxHeight: '360px',
                      background: 'linear-gradient(180deg, #110e0d 0%, #0d0a09 100%)',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(199,157,125,0.2) transparent',
                    }}
                  >
                    {messages.map((msg, idx) => {
                      const isLastBot = msg.id === lastBotMsgId;
                      const followUpsUsed = usedFollowUps.has(msg.id);
                      return (
                        <React.Fragment key={msg.id}>
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.28 }}
                            className={`flex gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                          >
                            {msg.from === 'bot' && (
                              <img src={logoSrc} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-1 border border-[#C79D7D]/20" />
                            )}
                            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                              <div
                                className={`px-4 py-2.5 text-xs font-sans leading-relaxed whitespace-pre-line ${
                                  msg.from === 'bot'
                                    ? 'text-[#EDE9E5]'
                                    : 'text-[#1a1210] font-semibold'
                                }`}
                                style={
                                  msg.from === 'bot'
                                    ? {
                                        background: 'linear-gradient(135deg, #1e1712 0%, #211a15 100%)',
                                        border: '1px solid rgba(199,157,125,0.18)',
                                        borderRadius: '4px 14px 14px 14px',
                                      }
                                    : {
                                        background: 'linear-gradient(135deg, #C79D7D 0%, #b8845e 100%)',
                                        borderRadius: '14px 4px 14px 14px',
                                        boxShadow: '0 2px 12px rgba(199,157,125,0.3)',
                                      }
                                }
                              >
                                {msg.text}
                              </div>
                              <span className="text-[#9A8F88]/35 text-[9px] font-sans px-1">{msg.time}</span>
                            </div>
                          </motion.div>

                          {/* Follow-up chips — shown after the last bot message if not yet used */}
                          {msg.from === 'bot' && msg.followUps && isLastBot && !followUpsUsed && !typing && (
                            <motion.div
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.15 }}
                              className="flex flex-wrap gap-1.5 pl-9"
                            >
                              {msg.followUps.map((q) => (
                                <motion.button
                                  key={q}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.96 }}
                                  onClick={() => handleQuick(q, msg.id)}
                                  className="text-[10px] font-sans font-medium px-3 py-1.5 tracking-wide transition-all duration-200"
                                  style={{
                                    background: 'linear-gradient(135deg, rgba(199,157,125,0.12) 0%, rgba(199,157,125,0.06) 100%)',
                                    border: '1px solid rgba(199,157,125,0.35)',
                                    borderRadius: '20px',
                                    color: '#C79D7D',
                                  }}
                                  onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(199,157,125,0.25) 0%, rgba(199,157,125,0.15) 100%)';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(199,157,125,0.7)';
                                  }}
                                  onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.background = 'linear-gradient(135deg, rgba(199,157,125,0.12) 0%, rgba(199,157,125,0.06) 100%)';
                                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(199,157,125,0.35)';
                                  }}
                                >
                                  {q}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </React.Fragment>
                      );
                    })}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {typing && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex gap-2.5"
                        >
                          <img src={logoSrc} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-[#C79D7D]/20" />
                          <div
                            className="px-4 py-3 flex items-center gap-1.5"
                            style={{
                              background: 'linear-gradient(135deg, #1e1712 0%, #211a15 100%)',
                              border: '1px solid rgba(199,157,125,0.18)',
                              borderRadius: '4px 14px 14px 14px',
                            }}
                          >
                            {[0, 0.18, 0.36].map((d, i) => (
                              <motion.span
                                key={i}
                                className="block rounded-full"
                                style={{ width: 7, height: 7, background: 'linear-gradient(135deg, #C79D7D, #9A6E55)' }}
                                animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.65, repeat: Infinity, delay: d }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                  </div>

                  {/* Input bar */}
                  <div
                    className="px-3 py-3 flex items-center gap-2 flex-shrink-0"
                    style={{
                      background: '#110e0d',
                      borderTop: '1px solid rgba(199,157,125,0.12)',
                    }}
                  >
                    <div className="flex-1 flex items-center relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Ask anything about your brand…"
                        className="w-full text-[#EDE9E5] text-xs font-sans pl-4 pr-4 py-2.5 outline-none placeholder:text-[#9A8F88]/35 transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(199,157,125,0.18)',
                          borderRadius: '24px',
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(199,157,125,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(199,157,125,0.18)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                      style={{
                        background: input.trim()
                          ? 'linear-gradient(135deg, #C79D7D 0%, #9A6E55 100%)'
                          : 'rgba(199,157,125,0.15)',
                        boxShadow: input.trim() ? '0 4px 16px rgba(199,157,125,0.4)' : 'none',
                      }}
                    >
                      <Send className="w-4 h-4 text-[#1a1210]" />
                    </motion.button>
                  </div>

                  {/* Footer branding */}
                  <div className="text-center py-1.5" style={{ background: '#110e0d', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                    <p className="text-[#9A8F88]/30 text-[9px] font-sans tracking-widest uppercase">Powered by Trend Digitally</p>
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
