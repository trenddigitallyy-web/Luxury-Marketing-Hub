import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Minimize2, Phone, Mail } from 'lucide-react';
import logoSrc from '@assets/TD_1778579526586.png';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

const BOT_RESPONSES: { keywords: string[]; reply: string }[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste'],
    reply: "Hello! Great to have you here 👋 I'm the Trend Digitally assistant. How can I help you grow your brand today?",
  },
  {
    keywords: ['service', 'services', 'offer', 'do you do', 'what do'],
    reply:
      "We offer a full range of digital services:\n\n• Social Media Marketing\n• Branding Strategy\n• Website Designing\n• Performance Marketing (Meta & Google Ads)\n• SEO & Content Writing\n• Influencer & WhatsApp Marketing\n• Product Photoshoots\n• App & Software Development\n\nWould you like to know more about any specific service?",
  },
  {
    keywords: ['price', 'pricing', 'cost', 'charge', 'fees', 'package', 'budget', 'how much'],
    reply:
      "Our packages are tailored to your brand's specific goals and scale. We'd love to understand your needs first and give you a custom proposal.\n\nBook a free strategy call with us:\n📞 +91 90133 42230\nor fill the inquiry form on this page!",
  },
  {
    keywords: ['social media', 'instagram', 'facebook', 'reels', 'posts', 'content'],
    reply:
      "Our Social Media Marketing includes scroll-stopping content, reels, carousels, stories, and data-driven strategies to grow your community and drive real engagement. We handle everything end-to-end! 🚀",
  },
  {
    keywords: ['branding', 'logo', 'brand identity', 'brand design'],
    reply:
      "We create premium brand identities — logo, visual language, typography, brand voice — everything that makes you impossible to ignore. Ready to build a brand people remember?",
  },
  {
    keywords: ['website', 'web', 'landing page', 'ecommerce', 'e-commerce'],
    reply:
      "We design and develop high-converting websites — from landing pages to full e-commerce stores. Built for performance, optimised for SEO from day one. 💻",
  },
  {
    keywords: ['ads', 'google ads', 'meta ads', 'facebook ads', 'performance', 'paid'],
    reply:
      "We run full-funnel paid ad campaigns on Google and Meta — strategy, creatives, targeting, and continuous optimisation for maximum ROI. 📈",
  },
  {
    keywords: ['seo', 'search engine', 'ranking', 'organic'],
    reply:
      "Our SEO service covers technical audits, content strategy, on-page optimisation, and link building — to get you ranking where your customers are searching. 🔍",
  },
  {
    keywords: ['contact', 'reach', 'phone', 'call', 'number', 'whatsapp'],
    reply:
      "You can reach us directly:\n📞 +91 90133 42230\n📞 +91 77805 11564\n📧 trenddigitallyy@gmail.com\n\nOr just fill the inquiry form on this page and we'll get back within 24 hours!",
  },
  {
    keywords: ['email', 'mail', 'gmail'],
    reply:
      "You can email us at:\n📧 trenddigitallyy@gmail.com\n\nWe respond within 24 hours!",
  },
  {
    keywords: ['location', 'address', 'where', 'hyderabad', 'based', 'city'],
    reply:
      "We're based in Hyderabad, India — but we work with brands across the country and beyond. 🇮🇳",
  },
  {
    keywords: ['about', 'who are you', 'team', 'founder', 'aayush', 'shraddha'],
    reply:
      "Trend Digitally is a Hyderabad-based creative growth agency founded by Aayush and Shraddha in 2024. In just over a year, we've helped 50+ brands build authority, grow their audience, and scale revenue through strategic digital marketing.",
  },
  {
    keywords: ['experience', 'portfolio', 'clients', 'brands', 'work'],
    reply:
      "We've partnered with 50+ brands across jewellery, fashion, healthcare, hospitality, lighting, textiles, and more. Check out the 'Our Work' section on this page to see some of our creatives!",
  },
  {
    keywords: ['onboard', 'start', 'begin', 'how to', 'process', 'next step'],
    reply:
      "Getting started is simple:\n1️⃣ Book a free strategy call\n2️⃣ We audit your brand & goals\n3️⃣ We present a custom plan\n4️⃣ Onboarding takes 7–10 days\n\nReady? Click 'Book Strategy Call' or reach us at +91 90133 42230!",
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'good', 'nice', 'perfect', 'okay', 'ok'],
    reply:
      "You're welcome! 😊 Is there anything else I can help you with? We're always here to answer your questions.",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    reply:
      "Thanks for stopping by! Feel free to reach out anytime. Looking forward to growing your brand with you! 🚀",
  },
];

const DEFAULT_REPLY =
  "That's a great question! For detailed information, I'd recommend speaking directly with our team.\n\n📞 +91 90133 42230\n📧 trenddigitallyy@gmail.com\n\nOr fill the inquiry form below and we'll get back within 24 hours!";

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const item of BOT_RESPONSES) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.reply;
    }
  }
  return DEFAULT_REPLY;
}

let msgId = 0;
const newMsg = (from: 'bot' | 'user', text: string): Message => ({
  id: ++msgId,
  from,
  text,
  time: getTime(),
});

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    newMsg('bot', "Hey there! 👋 I'm the Trend Digitally assistant. How may I help you today?\n\nYou can ask me about our services, pricing, how to get started, or anything about your brand!"),
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
      }, 5000);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimised]);

  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimised]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, newMsg('user', text)]);
    setTyping(true);
    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, newMsg('bot', getBotReply(text))]);
    }, delay);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickReplies = ['Our Services', 'Pricing', 'Book a Call', 'About Us'];

  const handleQuick = (q: string) => {
    setMessages((prev) => [...prev, newMsg('user', q)]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, newMsg('bot', getBotReply(q))]);
    }, 800);
  };

  return (
    <>
      {/* Floating bubble hint */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed top-20 right-5 z-[9999] bg-[#1a1210] border border-[#C79D7D]/40 text-[#EDE9E5] text-xs font-sans px-4 py-2.5 rounded shadow-xl max-w-[200px] cursor-pointer"
            onClick={() => { setOpen(true); setShowBubble(false); sessionStorage.setItem('td_chat_seen', '1'); }}
          >
            <span className="block font-semibold text-[#C79D7D] mb-0.5">Trend Digitally</span>
            Hey! How may I help you? 👋
            <div className="absolute -bottom-2 right-6 w-3 h-3 bg-[#1a1210] border-r border-b border-[#C79D7D]/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => { setOpen(true); setShowBubble(false); sessionStorage.setItem('td_chat_seen', '1'); }}
            className="fixed top-[4.5rem] right-5 z-[9998] w-12 h-12 bg-[#C79D7D] hover:bg-[#D8C2B2] flex items-center justify-center shadow-2xl transition-colors duration-300 rounded-sm"
            aria-label="Open chat"
          >
            <MessageCircle className="w-5 h-5 text-[#1a1210]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed top-16 right-4 z-[9999] w-[340px] sm:w-[380px] bg-[#0f0c0b] border border-[#C79D7D]/20 shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: minimised ? 'auto' : '520px', borderRadius: '2px' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-[#1a1210] border-b border-[#C79D7D]/15 flex-shrink-0">
              <div className="relative">
                <img src={logoSrc} alt="Trend Digitally" className="w-9 h-9 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#1a1210] rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#EDE9E5] text-sm font-semibold font-sans leading-none">Trend Digitally</p>
                <p className="text-green-400 text-[10px] font-sans mt-0.5 tracking-wide">Online · Typically replies instantly</p>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href="tel:+919013342230"
                  className="w-7 h-7 flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] transition-colors"
                  title="Call us"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href="mailto:trenddigitallyy@gmail.com"
                  className="w-7 h-7 flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] transition-colors"
                  title="Email us"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={() => setMinimised(!minimised)}
                  className="w-7 h-7 flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] transition-colors"
                  title="Minimise"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-[#9A8F88] hover:text-[#C79D7D] transition-colors"
                  title="Close"
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
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 min-h-0"
                >
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin" style={{ maxHeight: '320px' }}>
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={`flex gap-2.5 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        {msg.from === 'bot' && (
                          <img src={logoSrc} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mt-0.5" />
                        )}
                        <div className={`max-w-[78%] ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                          <div
                            className={`px-3.5 py-2.5 text-xs font-sans leading-relaxed whitespace-pre-line ${
                              msg.from === 'bot'
                                ? 'bg-[#1a1210] text-[#EDE9E5] border border-[#C79D7D]/10'
                                : 'bg-[#C79D7D] text-[#1a1210] font-medium'
                            }`}
                          >
                            {msg.text}
                          </div>
                          <span className="text-[#9A8F88]/40 text-[9px] font-sans px-1">{msg.time}</span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    <AnimatePresence>
                      {typing && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex gap-2.5"
                        >
                          <img src={logoSrc} alt="bot" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                          <div className="bg-[#1a1210] border border-[#C79D7D]/10 px-4 py-3 flex items-center gap-1">
                            {[0, 0.2, 0.4].map((d, i) => (
                              <motion.span
                                key={i}
                                className="w-1.5 h-1.5 bg-[#C79D7D]/60 rounded-full block"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <div ref={bottomRef} />
                  </div>

                  {/* Quick replies */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-3 flex flex-wrap gap-2">
                      {quickReplies.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleQuick(q)}
                          className="text-[10px] font-sans border border-[#C79D7D]/30 text-[#C79D7D] px-3 py-1.5 hover:bg-[#C79D7D]/10 transition-colors tracking-wide"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 pb-4 pt-2 border-t border-[#C79D7D]/10 flex items-center gap-2 flex-shrink-0">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKey}
                      placeholder="Type your message…"
                      className="flex-1 bg-[#1a1210] border border-white/10 focus:border-[#C79D7D]/40 text-[#EDE9E5] text-xs font-sans px-3 py-2.5 outline-none placeholder:text-[#9A8F88]/40 transition-colors"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim()}
                      className="w-9 h-9 bg-[#C79D7D] hover:bg-[#D8C2B2] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send className="w-3.5 h-3.5 text-[#1a1210]" />
                    </button>
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
