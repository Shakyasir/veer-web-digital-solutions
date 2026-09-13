import { PortfolioItem } from '../types';

export const INITIAL_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'aura-bakery',
    title: 'Aura Artisan Bakery & Cafe',
    slug: 'aura-artisan-bakery',
    category: 'website',
    subcategory: 'Business Website',
    projectType: 'Business Website & Online Menu',
    description: 'A responsive, high-converting digital storefront and interactive menu for an upscale artisanal bakery and specialty coffee bar.',
    coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80'
    ],
    clientName: 'Aura Cafe (Concept)',
    projectUrl: 'https://example.com/demo/aura-bakery',
    tools: ['React', 'Tailwind CSS', 'Vite', 'Figma', 'Lucide'],
    services: ['UI/UX Design', 'Web Development', 'Mobile Optimization', 'Local SEO Setup'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-01-15',
    challenge: 'Local food businesses often struggle with slow PDF menus, confusing navigation, and poor mobile readability that discourage walk-ins and phone orders.',
    approach: 'We architected a clean, mobile-first single-page experience emphasizing enticing food photography, category-based instant search, tap-to-call ordering, and live Google Maps directions.',
    whatWeCreated: 'A lightning-fast web experience with sub-second page loads, accessible contrast, an interactive dietary filter (Vegan, Gluten-Free), and a WhatsApp enquiry modal.',
    deliverables: [
      'Custom Responsive Website (Desktop, Tablet, Mobile)',
      'Digital Interactive Menu with Filter System',
      'Direct WhatsApp Ordering & Table Inquiry Integration',
      'Google My Business & Local SEO Semantic Tagging'
    ],
    outcome: 'Structured layout optimized for speed, intuitive tap targets on mobile devices, and zero unnecessary script bloat.'
  },
  {
    id: 'apex-logistics',
    title: 'Apex Logistics & Freight Hub',
    slug: 'apex-logistics-portal',
    category: 'website',
    subcategory: 'Website Redesign',
    projectType: 'Corporate Website & Quote Generator',
    description: 'Complete brand overhaul and clean corporate web architecture for a regional B2B freight and logistics provider.',
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=80'
    ],
    clientName: 'Apex Transport Group',
    projectUrl: 'https://example.com/demo/apex-logistics',
    tools: ['TypeScript', 'Tailwind CSS', 'Figma', 'Node.js'],
    services: ['Website Redesign', 'Quote Estimation Calculator', 'Service Architecture'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-02-04',
    challenge: 'The existing legacy portal had cluttered tables, was unusable on mobile phones, and failed to guide potential business clients to request freight quotes.',
    approach: 'Restructured the service hierarchy into 3 clear logistics tiers (Air, Ocean, Road Freight) paired with a streamlined 3-step freight rate request form.',
    whatWeCreated: 'A high-trust corporate portal featuring an instant quote estimator, real-time tracking interface mockup, and clean PDF capability documentation.',
    deliverables: [
      'Multi-page B2B Corporate Website Architecture',
      'Interactive Freight Quote Calculator',
      'Fleet & Network Coverage Interactive Maps',
      'Compliance & Certifications Trust Badges'
    ],
    outcome: 'Clear visual hierarchy and transparent quoting flow designed to convert commercial inquiries into sales calls.'
  },
  {
    id: 'zenith-wellness',
    title: 'Zenith Pilates & Conditioning',
    slug: 'zenith-pilates-landing-page',
    category: 'website',
    subcategory: 'Landing Page',
    projectType: 'High-Converting Campaign Landing Page',
    description: 'Conversion-focused landing page created for a boutique fitness studio launching seasonal member enrollment passes.',
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1000&q=80'
    ],
    clientName: 'Zenith Studio',
    projectUrl: 'https://example.com/demo/zenith-wellness',
    tools: ['Next.js', 'Tailwind CSS', 'Figma'],
    services: ['Conversion Rate Optimization', 'Landing Page Design', 'Form Integration'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-02-20',
    challenge: 'Paid social ads had low conversion rates because the previous destination page was generic and had too many distracting navigation options.',
    approach: 'Created a hyper-focused, distraction-free landing page with a single compelling action: Booking a Complimentary Trial Assessment.',
    whatWeCreated: 'High-contrast typography, clear trainer bios, schedule timetable, transparent pricing tiers, and an embedded WhatsApp booking trigger.',
    deliverables: [
      'High-Impact Hero with Video Loop Support',
      'Timetable & Studio Amenities Showcase',
      'FAQ Accordion with Friction-Reducing Answers',
      '1-Click Mobile Booking Widget'
    ],
    outcome: 'Engineered for fast load speed under 1.2s on mobile 4G networks to minimize ad drop-off.'
  },
  {
    id: 'urban-roastery',
    title: 'Urban Roastery Specialty Coffee',
    slug: 'urban-roastery-social',
    category: 'social-media',
    subcategory: 'AI-Assisted Content Creation',
    projectType: 'Social Media Management & Reels Package',
    description: 'A 30-day curated social media system featuring AI-assisted aesthetic coffee photography, brewing guides, and engaging reels for Instagram.',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coffee-maker-dripping-fresh-coffee-into-a-cup-42861-large.mp4',
    clientName: 'Urban Roastery Co.',
    tools: ['CapCut Pro', 'Canva', 'Midjourney', 'Photoshop', 'Notion'],
    services: ['Content Calendar Planning', 'Reels Editing & Audio Sync', 'Brand Color Palette Consistency'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-01-28',
    challenge: 'Local cafes often post sporadic, inconsistent photos without a clear visual identity or engaging video hooks.',
    approach: 'Crafted an organized 4-pillar content strategy: Origin Stories, Brewing Education, Aesthetic Ambience, and Weekly Barista Specials.',
    whatWeCreated: '12 high-retention 9:16 Instagram Reels, 15 carousel posts with educational coffee tips, and a cohesive warm earth-tone grid template.',
    deliverables: [
      'Full 30-Day Structured Content Calendar',
      '12 Short-Form Video Reels with Hook Captions',
      '15 Multi-Slide Educational Carousels',
      'Canva Brand Kit & Story Highlights Covers'
    ],
    outcome: 'Professional visual presence establishing the brand as a premium authority rather than an average neighborhood shop.'
  },
  {
    id: 'kavya-dermatology',
    title: 'Dr. Kavya Skin & Aesthetic Clinic',
    slug: 'kavya-aesthetics-social',
    category: 'social-media',
    subcategory: 'Social Media Creatives',
    projectType: 'Clinical Educational Content & Brand System',
    description: 'Dignified, medical-grade social media branding and myth-busting educational graphics for a premier dermatology practice.',
    coverImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f0233329998?auto=format&fit=crop&w=1000&q=80'
    ],
    clientName: 'Dr. Kavya Aesthetics (Demo)',
    tools: ['Figma', 'Illustrator', 'Lightroom', 'Copywriting Frameworks'],
    services: ['Medical Social Creatives', 'Educational Carousels', 'Doctor Branding'],
    featured: false,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-02-12',
    challenge: 'Medical professionals need to maintain clinical authority while communicating skincare science in simple, approachable language without medical jargon.',
    approach: 'Designed clean pastel teal and warm ivory clinical templates with clean typography and evidence-based skincare pointers.',
    whatWeCreated: 'Infographic carousel templates highlighting ingredients (Niacinamide, Retinol, Hyaluronic acid), myth-vs-fact cards, and consultation booking CTAs.',
    deliverables: [
      'Brand Style Guide for Medical Social Media',
      '16 Reusable Social Media Graphic Templates',
      'Copywriting Prompts & Medical Disclaimer Systems',
      'WhatsApp Consultation Lead Magnet Setup'
    ],
    outcome: 'Positions the doctor as a trusted advisor, encouraging patient consultations while strictly respecting medical ethics.'
  },
  {
    id: 'verdant-organics',
    title: 'Verdant Botanical Skincare Ad',
    slug: 'verdant-botanical-video',
    category: 'ai-video',
    subcategory: 'Product Videos & AI Ads',
    projectType: 'AI-Assisted Commercial & Social Video',
    description: 'Cinematic, nature-infused product commercial for a botanical serum, produced using AI generative environments and human video editing.',
    coverImage: 'https://images.unsplash.com/photo-1608248597359-56135314777d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-bottle-of-perfume-41662-large.mp4',
    clientName: 'Verdant Organics',
    tools: ['Runway Gen-3', 'Midjourney v6', 'Premiere Pro', 'Topaz Video AI', 'ElevenLabs'],
    services: ['AI Concept Art', 'Generative Motion Backgrounds', 'Sound Design & Voiceover'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-02-18',
    challenge: 'Shooting physical product videos in exotic tropical rainforest settings requires prohibitive production budgets ($5,000+) beyond the reach of emerging brands.',
    approach: 'Photographed the client bottle against clean green screen/neutral backgrounds, then generated photorealistic mossy stone and morning mist environments using controlled AI prompts.',
    whatWeCreated: 'A 30-second broadcast-quality commercial with seamless camera motion, water droplet macro details, professional human-directed audio sync, and studio lighting simulation.',
    deliverables: [
      '30s 16:9 Landscape Brand Video for Website & YouTube',
      '15s 9:16 Vertical Video formatted for Instagram & Facebook Ads',
      'High-Resolution AI-Generated Product Hero Still Banners',
      'Complete Audio Mix (Ambient Forest FX + Studio Voice)'
    ],
    outcome: 'High-budget studio look achieved at a fraction of standard location shooting costs with a 72-hour turnaround.'
  },
  {
    id: 'flowscale-saas',
    title: 'FlowScale AI Automation Explainer',
    slug: 'flowscale-explainer-video',
    category: 'ai-video',
    subcategory: 'Explainer Videos',
    projectType: 'B2B Software Demo & Motion Explainer',
    description: 'Dynamic 60-second software explainer video breaking down complex workflow automation into easy-to-digest kinetic visuals.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hand-holding-a-smartphone-with-a-green-screen-41721-large.mp4',
    clientName: 'FlowScale Automation',
    tools: ['After Effects', 'Figma', 'ElevenLabs Studio', 'Luma Dream Machine'],
    services: ['Scriptwriting', 'Storyboard & Kinetic Typography', 'AI Voice Synthesis', 'UI Motion Graphics'],
    featured: true,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-02-25',
    challenge: 'Complex enterprise software features often overwhelm prospects when presented through boring slides or static bullet lists.',
    approach: 'Wrote an engaging problem-first script highlighting repetitive manual data entry, then built smooth vector UI mockups transitioning through AI-assisted scenes.',
    whatWeCreated: 'A crisp 60-second animated explainer video that articulates value proposition in the first 5 seconds, engineered for homepage hero embedding.',
    deliverables: [
      '60s Full Explainer Video with Subtitles',
      '3x 15s High-Energy Cutdowns for LinkedIn Ads',
      'Web-Optimized Lightweight MP4 and WebM Assets',
      'Interactive Video Embed Code with Playback Controls'
    ],
    outcome: 'Succinct messaging that explains the software clearly to non-technical business decision-makers.'
  },
  {
    id: 'festive-spark',
    title: 'Diwali & New Year Festival Creatives',
    slug: 'festive-spark-campaign',
    category: 'ai-video',
    subcategory: 'Festival Creatives & Shorts',
    projectType: 'Festive Animated Greetings & Promotional Reels',
    description: 'Culturally vibrant, festive greetings and promotional video cards for retail brands to connect with customers during peak festival shopping seasons.',
    coverImage: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-lights-and-sparks-of-a-celebration-42999-large.mp4',
    clientName: 'Retail Brand Network',
    tools: ['Midjourney', 'After Effects', 'Photoshop', 'CapCut'],
    services: ['Festive Motion Cards', 'Seasonal Offer Graphics', 'WhatsApp Greeting Clips'],
    featured: false,
    status: 'published',
    isDemoProject: true,
    createdAt: '2026-01-05',
    challenge: 'Businesses usually send generic WhatsApp forward images that get lost in the noise during holidays and festivals.',
    approach: 'Created custom branded animated cards incorporating the business logo, festive golden lighting, and tailored discount announcements.',
    whatWeCreated: 'High-resolution vertical video reels and square WhatsApp status clips with celebratory music and animated brand reveals.',
    deliverables: [
      'Pack of 5 Festive Video Greetings for Major Holidays',
      'Custom Brand Logo Animation Overlay',
      'WhatsApp Status & Story Ready Files (<5MB for instant delivery)',
      'Matching High-Resolution Static Banner Creatives'
    ],
    outcome: 'Memorable brand touchpoint that delights clients and drives festive footfall.'
  }
];

export const getStoredPortfolio = (): PortfolioItem[] => {
  return INITIAL_PORTFOLIO_ITEMS;
};
