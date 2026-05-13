import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Play, X, ExternalLink } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';
import logoSrc from '@assets/TD_1778579526586.png';

const easeExpo = [0.16, 1, 0.3, 1] as const;

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.9, delay, ease: easeExpo }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const posts = [
  { id: 1, category: 'Jewellery', client: 'Solitaire Gallery', label: 'Social Creative', bg: 'bg-[#C79D7D]/20', aspect: 'aspect-square' },
  { id: 2, category: 'Fashion', client: 'Rangutsav Events', label: 'Campaign Post', bg: 'bg-[#9A8F88]/20', aspect: 'aspect-[4/5]' },
  { id: 3, category: 'Healthcare', client: 'Tooth Fairy Clinic', label: 'Brand Design', bg: 'bg-[#D8C2B2]/30', aspect: 'aspect-square' },
  { id: 4, category: 'Hospitality', client: 'Festival Walaa', label: 'Event Creatives', bg: 'bg-[#5E4E45]/20', aspect: 'aspect-[4/5]' },
  { id: 5, category: 'Lighting', client: 'Mahadev Lighting', label: 'Product Visual', bg: 'bg-[#C79D7D]/15', aspect: 'aspect-square' },
  { id: 6, category: 'Branding', client: 'Inspire Brand', label: 'Identity Design', bg: 'bg-[#9A8F88]/15', aspect: 'aspect-[4/5]' },
  { id: 7, category: 'Jewellery', client: 'Mohini Jewels', label: 'Social Story', bg: 'bg-[#D8C2B2]/25', aspect: 'aspect-square' },
  { id: 8, category: 'Marble & Stone', client: 'Om Marmo World', label: 'Brand Campaign', bg: 'bg-[#5E4E45]/15', aspect: 'aspect-[4/5]' },
  { id: 9, category: 'Textiles', client: 'Kamal Textiles', label: 'Product Post', bg: 'bg-[#C79D7D]/20', aspect: 'aspect-square' },
];

const videos = [
  {
    id: 1,
    title: 'Jewellery Brand Film',
    client: 'Solitaire Gallery',
    category: 'Brand Video',
    duration: '0:45',
    desc: 'Cinematic brand film showcasing the legacy and craftsmanship of a heritage jewellery house.',
    embedUrl: null,
    thumb: 'bg-[#C79D7D]/20',
  },
  {
    id: 2,
    title: 'Fashion Reel Campaign',
    client: 'Rangutsav Events',
    category: 'Campaign Reel',
    duration: '0:30',
    desc: 'High-energy festival fashion reel that drove 1.2M organic reach across Instagram.',
    embedUrl: null,
    thumb: 'bg-[#9A8F88]/20',
  },
  {
    id: 3,
    title: 'Product Showcase',
    client: 'Mahadev Lighting',
    category: 'Product Video',
    duration: '1:00',
    desc: 'Elegant product showcase video for premium lighting solutions — crafted for digital and showroom display.',
    embedUrl: null,
    thumb: 'bg-[#D8C2B2]/30',
  },
  {
    id: 4,
    title: 'Clinic Growth Ad',
    client: 'Tooth Fairy Clinic',
    category: 'Paid Ad Creative',
    duration: '0:15',
    desc: 'Performance-optimised 15-second ad that drove 3× appointment bookings through Google Ads.',
    embedUrl: null,
    thumb: 'bg-[#5E4E45]/20',
  },
  {
    id: 5,
    title: 'Brand Story Reel',
    client: 'Inspire Brand',
    category: 'Brand Reel',
    duration: '0:60',
    desc: 'Founder story reel that humanised the brand and increased story engagement by 4×.',
    embedUrl: null,
    thumb: 'bg-[#C79D7D]/15',
  },
  {
    id: 6,
    title: 'Event Highlights',
    client: 'Festival Walaa',
    category: 'Event Film',
    duration: '2:00',
    desc: 'Vibrant event highlights reel turned into a full campaign asset across all channels.',
    embedUrl: null,
    thumb: 'bg-[#9A8F88]/15',
  },
];

const categories = ['All', 'Jewellery', 'Fashion', 'Healthcare', 'Branding', 'Hospitality', 'Lighting', 'Marble & Stone', 'Textiles'];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeTab, setActiveTab] = useState<'posts' | 'videos'>('posts');

  const filteredPosts = activeFilter === 'All' ? posts : posts.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#1a1210] text-[#EDE9E5] selection:bg-[#C79D7D]/30">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1a1210]/90 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-4 h-4 text-[#9A8F88] group-hover:text-[#C79D7D] group-hover:-translate-x-1 transition-all duration-300" />
            <img src={logoSrc} alt="Trend Digitally" className="h-8 w-8 rounded-full object-cover" />
            <span className="font-serif text-base font-bold text-[#EDE9E5]/80 group-hover:text-[#EDE9E5] transition-colors">Trend Digitally</span>
          </Link>
          <div className="flex items-center gap-2 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 ${activeTab === 'posts' ? 'bg-[#C79D7D] text-[#1a1210]' : 'text-[#9A8F88] hover:text-[#EDE9E5]'}`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-5 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase transition-all duration-300 ${activeTab === 'videos' ? 'bg-[#C79D7D] text-[#1a1210]' : 'text-[#9A8F88] hover:text-[#EDE9E5]'}`}
            >
              Videos
            </button>
          </div>
          <a
            href="https://instagram.com/trenddigitally"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-[#9A8F88] hover:text-[#C79D7D] transition-colors text-xs tracking-widest"
          >
            <SiInstagram className="w-4 h-4" />
            @trenddigitally
          </a>
        </div>
      </header>

      {/* ── Hero Banner ── */}
      <section className="pt-32 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(94,78,69,0.3)_0%,transparent_70%)]" />
        <div className="container mx-auto relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeExpo }}
            className="text-xs uppercase tracking-[0.4em] text-[#C79D7D] mb-5 font-sans"
          >
            Our Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: easeExpo }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#EDE9E5] leading-[1.05] tracking-tight max-w-4xl"
          >
            Work That <span className="italic text-[#C79D7D]">Speaks.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: easeExpo }}
            className="mt-6 text-[#9A8F88] max-w-xl text-lg font-sans leading-relaxed"
          >
            A curated showcase of posts, campaigns, brand films, and creatives crafted for ambitious brands across India.
          </motion.p>
        </div>
      </section>

      {/* ── Posts Section ── */}
      {activeTab === 'posts' && (
        <section className="pb-32 px-6 md:px-12">
          <div className="container mx-auto">

            {/* Category Filter */}
            <FadeIn className="mb-12 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 text-xs uppercase tracking-widest font-sans border transition-all duration-300 ${
                    activeFilter === cat
                      ? 'border-[#C79D7D] text-[#C79D7D] bg-[#C79D7D]/10'
                      : 'border-white/10 text-[#9A8F88] hover:border-[#C79D7D]/40 hover:text-[#D8C2B2]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </FadeIn>

            {/* Masonry-style Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {filteredPosts.map((post, i) => (
                <FadeIn key={post.id} delay={i * 0.06} className="break-inside-avoid">
                  <div className={`group relative ${post.bg} ${post.aspect} w-full overflow-hidden cursor-pointer`}>
                    {/* Decorative grid pattern */}
                    <div className="absolute inset-0 opacity-5"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(199,157,125,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(199,157,125,0.4) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                      }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#1a1210]/0 group-hover:bg-[#1a1210]/60 transition-all duration-500" />

                    {/* Content revealed on hover */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 z-10">
                      <div className="flex justify-between items-start">
                        <span className="bg-[#C79D7D] text-[#1a1210] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold font-sans">
                          {post.label}
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#EDE9E5]/60" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#C79D7D] font-sans mb-1">{post.category}</p>
                        <h3 className="font-serif text-[#EDE9E5] text-xl leading-snug">{post.client}</h3>
                      </div>
                    </div>

                    {/* Static bottom label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      <span className="text-[10px] uppercase tracking-widest text-[#9A8F88]/60 font-sans">{post.category} · {post.client}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Upload CTA */}
            <FadeIn className="mt-20 text-center">
              <div className="border border-white/[0.08] p-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">More Coming</p>
                <h3 className="font-serif text-3xl text-[#EDE9E5] mb-4">See the full portfolio</h3>
                <p className="text-[#9A8F88] text-sm font-sans mb-8 leading-relaxed">Follow us on Instagram to see our latest work, behind-the-scenes, and brand campaigns in real time.</p>
                <a
                  href="https://instagram.com/trenddigitally"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-[#C79D7D] text-[#1a1210] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300"
                >
                  <SiInstagram className="w-4 h-4" />
                  @trenddigitally
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Videos Section ── */}
      {activeTab === 'videos' && (
        <section className="pb-32 px-6 md:px-12">
          <div className="container mx-auto">

            <FadeIn className="mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9A8F88] font-sans">
                Brand Films · Reels · Ad Creatives · Event Films
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <FadeIn key={video.id} delay={i * 0.08}>
                  <div className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className={`relative ${video.thumb} aspect-video overflow-hidden mb-4`}>
                      {/* Grid pattern */}
                      <div className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: 'linear-gradient(rgba(199,157,125,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(199,157,125,0.4) 1px, transparent 1px)',
                          backgroundSize: '32px 32px'
                        }}
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-[#1a1210]/20 group-hover:bg-[#1a1210]/50 transition-all duration-400" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full border border-[#EDE9E5]/30 flex items-center justify-center group-hover:border-[#C79D7D] group-hover:bg-[#C79D7D]/20 transition-all duration-400 group-hover:scale-110">
                          <Play className="w-5 h-5 text-[#EDE9E5] fill-[#EDE9E5] ml-0.5" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 bg-[#1a1210]/80 text-[#D8C2B2] text-[10px] font-mono px-2 py-0.5">
                        {video.duration}
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-3 left-3 bg-[#C79D7D]/90 text-[#1a1210] text-[10px] uppercase tracking-widest px-2 py-0.5 font-semibold font-sans">
                        {video.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-1 px-1">
                      <p className="text-[10px] uppercase tracking-widest text-[#9A8F88] font-sans">{video.client}</p>
                      <h3 className="font-serif text-xl text-[#EDE9E5] group-hover:text-[#C79D7D] transition-colors duration-300 leading-snug">{video.title}</h3>
                      <p className="text-[#9A8F88]/70 text-sm font-sans leading-relaxed pt-1">{video.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Video CTA */}
            <FadeIn className="mt-20 text-center">
              <div className="border border-white/[0.08] p-12 max-w-2xl mx-auto">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C79D7D] mb-4 font-sans">More Projects</p>
                <h3 className="font-serif text-3xl text-[#EDE9E5] mb-4">Want to see more?</h3>
                <p className="text-[#9A8F88] text-sm font-sans mb-8 leading-relaxed">
                  Our latest brand films and campaign reels are live on Instagram. Drop us a message to discuss your next video project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://instagram.com/trenddigitally"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#C79D7D] text-[#1a1210] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-[#D8C2B2] transition-all duration-300"
                  >
                    <SiInstagram className="w-4 h-4" />
                    View on Instagram
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 border border-white/20 text-[#EDE9E5] px-8 py-3.5 text-xs font-semibold tracking-widest uppercase hover:border-[#C79D7D]/60 hover:text-[#C79D7D] transition-all duration-300"
                  >
                    Book a Strategy Call
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Footer strip ── */}
      <div className="border-t border-white/5 py-8 px-6 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#9A8F88]/40 font-sans">
          <p>&copy; 2024 Trend Digitally. All rights reserved.</p>
          <Link href="/" className="hover:text-[#C79D7D] transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
