import { ServiceCategory } from '../types';

export interface ServiceItemInfo {
  title: string;
  tagline: string;
  whatItIs: string;
  whoItIsFor: string;
  keyFeatures: string[];
  deliverables: string[];
}

export interface ServiceCategoryGroup {
  id: ServiceCategory;
  name: string;
  pillar: string;
  tagline: string;
  shortDescription: string;
  pillarDescription: string;
  services: ServiceItemInfo[];
}

export const SERVICES_DATA: ServiceCategoryGroup[] = [
  {
    id: 'website',
    name: 'Website Solutions',
    pillar: 'WEB',
    tagline: 'Build your digital presence.',
    shortDescription: 'Professional websites designed to establish credibility, showcase your business and generate enquiries.',
    pillarDescription: 'A clean, fast, and modern website is your business’s 24/7 digital storefront. We build responsive, accessible, and conversion-focused websites that look credible and work seamlessly across all screen sizes.',
    services: [
      {
        title: 'Business Websites',
        tagline: 'Credible, multi-page web presence for established or growing businesses',
        whatItIs: 'A structured, high-performance company website that explains who you are, outlines your services or products, showcases previous work, and enables prospects to get in touch easily.',
        whoItIsFor: 'Local businesses, B2B services, consulting firms, clinics, logistics providers, and professional practices.',
        keyFeatures: [
          'Mobile-first responsive architecture',
          'Fast loading speed optimized for low-bandwidth connections',
          'Clear service navigation and lead generation touchpoints',
          'Search Engine Optimization (SEO) & Google Business profile integration'
        ],
        deliverables: [
          'Complete custom-designed responsive website',
          'About, Services, Portfolio, Contact, and Legal pages',
          'WhatsApp & phone click-to-contact buttons',
          'Basic analytics and contact form lead forwarding'
        ]
      },
      {
        title: 'Landing Pages',
        tagline: 'High-conversion single pages built for specific marketing campaigns',
        whatItIs: 'A laser-focused, distraction-free destination page designed specifically to convert ad clicks into phone calls, WhatsApp messages, or lead submissions.',
        whoItIsFor: 'Businesses running Meta/Google ads, launching a new product, or offering a seasonal promotional service.',
        keyFeatures: [
          'Compelling above-the-fold headline hierarchy',
          'Direct call-to-action placement without conflicting links',
          'Speed-optimized code with sub-1.5s load times',
          'Trust markers, FAQs, and transparent feature breakdowns'
        ],
        deliverables: [
          'High-converting single-page landing structure',
          'Lead capture form with validation and instant feedback',
          'Pre-formatted WhatsApp inquiry button',
          'Meta pixel & Google Ads tracking readiness'
        ]
      },
      {
        title: 'Portfolio Websites',
        tagline: 'Elegant digital showcases for creators, architects, photographers, and studios',
        whatItIs: 'A minimalist, media-rich portfolio website tailored to highlight high-resolution imagery, case studies, and creative credentials.',
        whoItIsFor: 'Architects, interior designers, photographers, videographers, independent consultants, and design studios.',
        keyFeatures: [
          'Category-based project filtering and high-res image lightboxes',
          'Client case-study pages detailing problem and solution',
          'Distraction-free typography with generous negative space',
          'Direct consultation booking interface'
        ],
        deliverables: [
          'Interactive portfolio gallery with responsive grid layouts',
          'Dedicated project detail templates with gallery support',
          'Easy-to-update structure for adding new work',
          'Mobile-optimized touch carousels'
        ]
      },
      {
        title: 'Website Redesign',
        tagline: 'Modernize outdated websites with contemporary design and speed',
        whatItIs: 'A comprehensive visual and technical overhaul of an existing website that is slow, looks outdated, or fails to generate leads on mobile devices.',
        whoItIsFor: 'Established businesses with websites built years ago that no longer represent their current quality and standards.',
        keyFeatures: [
          'Preservation of existing domain reputation and SEO rankings',
          'Fresh, premium typographic layout matching modern aesthetic benchmarks',
          'Mobile optimization and code cleanup',
          'Improved clarity in messaging and service descriptions'
        ],
        deliverables: [
          'Complete UI/UX refresh and contemporary color system',
          'Clean migration of existing valuable content',
          'Speed optimization & image compression',
          'Cross-browser and mobile device verification'
        ]
      },
      {
        title: 'Website Maintenance',
        tagline: 'Ongoing technical upkeep, security updates, and content revisions',
        whatItIs: 'Reliable monthly or quarterly support to keep your digital storefront updated, secure, backed up, and running at peak performance.',
        whoItIsFor: 'Busy business owners who want reliable peace of mind without worrying about technical glitches or outdated notices.',
        keyFeatures: [
          'Regular uptime monitoring and error checks',
          'Prompt content updates, price changes, and new project uploads',
          'Speed checks and image optimizations',
          'Direct phone and WhatsApp support channel'
        ],
        deliverables: [
          'Scheduled content and photo updates',
          'Monthly performance and health check report',
          'Priority turnaround for urgent business announcements',
          'Domain and hosting guidance'
        ]
      }
    ]
  },
  {
    id: 'social-media',
    name: 'Social Media Solutions',
    pillar: 'SOCIAL',
    tagline: 'Grow your online presence.',
    shortDescription: 'Consistent, engaging and AI-assisted content to help businesses maintain a professional social presence.',
    pillarDescription: 'Maintaining an active, dignified social presence builds familiarity and trust before a client ever reaches out. We provide structured content systems that combine strategic planning with AI-assisted creative production.',
    services: [
      {
        title: 'AI-Assisted Content Creation',
        tagline: 'High-speed, human-directed creative production for modern feeds',
        whatItIs: 'A strategic blend of AI generative tools and seasoned human editorial direction to produce rich visual assets, carousel concepts, and engaging copy at an accessible cost.',
        whoItIsFor: 'Brands that need high-volume, visually compelling content without hiring a full in-house creative agency.',
        keyFeatures: [
          'AI-assisted visual generation matching brand color guidelines',
          'Human-verified copy and culturally appropriate messaging',
          'Multi-format assets sized for Instagram, LinkedIn, and Facebook',
          'Fast turnaround times with consistent quality control'
        ],
        deliverables: [
          'Curated graphic assets and carousel slides',
          'Ready-to-post captions with targeted hashtags',
          'Story and highlight cover designs',
          'Content themes aligned with commercial objectives'
        ]
      },
      {
        title: 'Social Media Management',
        tagline: 'End-to-end account consistency and scheduled publishing',
        whatItIs: 'A structured management workflow where we handle calendar planning, graphic production, captions, and publishing so your brand stays consistently active.',
        whoItIsFor: 'Business owners who want a consistent, active profile but lack the daily time to design graphics and draft posts.',
        keyFeatures: [
          'Monthly content calendar mapped to business goals',
          'Pre-approved posts with zero surprises or unvetted content',
          'Optimized posting schedules for regional audience activity',
          'Bio, highlights, and link-in-bio optimization'
        ],
        deliverables: [
          'Monthly 12 to 20 post schedule across selected platforms',
          'Profile aesthetic harmonization and branding refresh',
          'End-of-month review of audience engagement and top posts',
          'Direct communication via WhatsApp for timely updates'
        ]
      },
      {
        title: 'Social Media Creatives',
        tagline: 'Custom graphic cards, promotional banners, and carousel graphics',
        whatItIs: 'Individually crafted, eye-catching visual creatives designed to communicate announcements, testimonials, offers, and tips in seconds.',
        whoItIsFor: 'Businesses that already have someone posting but need professional, agency-quality graphics.',
        keyFeatures: [
          'Strong visual hierarchy tailored to small mobile screens',
          'Legible typography with strict contrast compliance',
          'Cohesive brand color scheme and iconography',
          'Delivered in high-resolution ready-to-upload formats'
        ],
        deliverables: [
          'Batches of high-impact promotional banners',
          'Multi-slide educational or step-by-step carousels',
          'Branded festival and announcement graphics',
          'Source files or reusable Canva templates on request'
        ]
      },
      {
        title: 'Content Planning',
        tagline: 'Strategic content pillars and 30-day topic roadmaps',
        whatItIs: 'A comprehensive roadmap that defines what to talk about, when to publish, and how to position your business as a recognized expert in your market.',
        whoItIsFor: 'Companies that feel lost about what to post and want an organized, logical roadmap before spending money on design.',
        keyFeatures: [
          'Identification of 3–4 core content pillars (Authority, Proof, Education, Conversion)',
          'Competitor analysis and local market positioning',
          '30-day organized topic spreadsheet with headlines and hooks',
          'Clear call-to-action suggestions for each post'
        ],
        deliverables: [
          'Comprehensive 30-day content calendar document',
          'Hook and caption prompt library',
          'Visual direction mood board',
          'Actionable implementation guide'
        ]
      },
      {
        title: 'Reels Content',
        tagline: 'Short-form vertical video concepts, hooks, and editing',
        whatItIs: 'High-retention 9:16 vertical video assets crafted specifically for Instagram Reels, YouTube Shorts, and Facebook Reels to capture attention in the first 3 seconds.',
        whoItIsFor: 'Brands looking to capitalize on algorithmic short-form video reach without investing tens of thousands in camera crews.',
        keyFeatures: [
          'Attention-grabbing visual hooks and captions',
          'Dynamic typography animations and rhythmic audio sync',
          'Trending audio identification suitable for business accounts',
          'Clear call-to-action directing viewers to message or visit website'
        ],
        deliverables: [
          'Edited 9:16 vertical video files ready for posting',
          'Engaging on-screen captions and subtitles',
          'Suggested reel caption and cover frame thumbnail',
          'Audio track suggestions and timing guides'
        ]
      }
    ]
  },
  {
    id: 'ai-video',
    name: 'AI Video Production',
    pillar: 'AI VIDEO',
    tagline: 'Create content that gets attention.',
    shortDescription: 'Marketing videos created with AI-assisted production for brands, products and social media.',
    pillarDescription: 'Video is the most powerful medium to capture attention. We use advanced generative video workflows, automated voice synthesis, and kinetic motion graphics — guided by human creative directors — to deliver broadcast-quality video at accessible pricing.',
    services: [
      {
        title: 'Product Videos',
        tagline: 'Cinematic showcases highlighting physical products and features',
        whatItIs: 'High-impact product commercials where physical items are placed in stunning AI-generated studio or environmental scenes with seamless camera motion.',
        whoItIsFor: 'D2C brands, retail stores, cosmetics, food & beverage, luxury goods, and hardware manufacturers.',
        keyFeatures: [
          'Photorealistic simulated studio lighting and camera movement',
          'Micro-detail highlights of textures, packaging, and ingredients',
          'Available in both landscape (16:9) and vertical (9:16) formats',
          'Integrated sound design and atmospheric audio tracks'
        ],
        deliverables: [
          '15s–30s high-definition master product commercial',
          'Vertical cutdowns formatted for Instagram/Facebook ads',
          'Static high-resolution banner captures for web heroes',
          'Commercial usage rights for digital channels'
        ]
      },
      {
        title: 'AI Advertisements',
        tagline: 'Conversion-oriented commercial clips engineered for paid social ads',
        whatItIs: 'Bite-sized, hook-heavy video ads designed to stop thumb scrolling on Meta, YouTube, and LinkedIn feeds and drive visitors to your landing page.',
        whoItIsFor: 'Businesses spending money on digital ads that want higher click-through rates (CTR) and lower cost-per-acquisition.',
        keyFeatures: [
          'Rapid testing variants with different opening 3-second hooks',
          'Clear benefit-led kinetic text overlays for muted mobile feeds',
          'AI-assisted scene generation keeping production overhead low',
          'Strong closing bumper with clear offer and call to action'
        ],
        deliverables: [
          'Multiple hook variations for A/B testing',
          'Platform-specific aspect ratios (1:1, 4:5, 9:16)',
          'Subtitled versions for silent viewing',
          'Speedy 48–72 hour delivery cycle'
        ]
      },
      {
        title: 'Instagram Reels & YouTube Shorts',
        tagline: 'Snappy, high-retention vertical clips for continuous engagement',
        whatItIs: 'Regular batches of punchy vertical videos combining kinetic captions, generative backgrounds, and voiceover to maintain organic viral potential.',
        whoItIsFor: 'Brands that want to publish 3–5 short videos every week without booking studio time.',
        keyFeatures: [
          'Captivating narrative rhythm under 45 seconds',
          'Bold visual aesthetics matching modern social standards',
          'High-fidelity synthesized narration or human voice integration',
          'Sound design with subtle impacts, whooshes, and transitions'
        ],
        deliverables: [
          'Batches of 4 to 12 edited vertical shorts',
          'Exported in high-bitrate MP4 with burned-in subtitles',
          'Custom thumbnail title cards for the profile grid',
          'Posting copy and relevant keyword tags'
        ]
      },
      {
        title: 'Explainer Videos',
        tagline: 'Clear, engaging visual explanations of software or services',
        whatItIs: 'Animated 60–90 second videos that explain complex business concepts, apps, SaaS products, or workflows in plain, engaging terms.',
        whoItIsFor: 'Tech startups, software platforms, financial services, healthcare providers, and consulting companies.',
        keyFeatures: [
          'Custom storyboard aligned with business value proposition',
          'Clean interface motion and modern vector animations',
          'Clear, neutral, professional voiceover narration',
          'Emphasis on problems solved rather than technical jargon'
        ],
        deliverables: [
          'Complete 60s or 90s full explainer master',
          '15s cutdown highlight for social distribution',
          'Full audio mix and separated voice track',
          'Embed code guidance for homepage integration'
        ]
      },
      {
        title: 'Founder & Personal Brand Videos',
        tagline: 'Polished video storytelling for entrepreneurs and leadership',
        whatItIs: 'Turning raw selfie videos, audio voice notes, or interview footage into polished, authority-building LinkedIn and Instagram videos.',
        whoItIsFor: 'Founders, doctors, lawyers, consultants, and creators building personal brand authority.',
        keyFeatures: [
          'Pacing enhancement (cutting pauses, filler words, and stumbles)',
          'Animated b-roll overlays, kinetic text, and illustration popups',
          'Audio cleaning and noise reduction',
          'Brand logo watermark and clean signature outro'
        ],
        deliverables: [
          'Professionally edited talking-head clips with dynamic b-roll',
          'Optimized for LinkedIn feed algorithms and mobile viewing',
          'Custom square and vertical formats',
          'Ready-to-use headline hooks for the post text'
        ]
      },
      {
        title: 'Before & After Videos',
        tagline: 'Visual transformation showcases that prove business results',
        whatItIs: 'Compelling split-screen or sliding transition videos demonstrating dramatic transformations (interiors, dental, fitness, renovations, web redesigns).',
        whoItIsFor: 'Interior designers, aesthetic clinics, renovation contractors, car detailing, and fitness coaches.',
        keyFeatures: [
          'Precision alignment between before and after frames',
          'Eye-catching motion wipes and magnifying zooms',
          'Customer quote or case metric integration',
          'High credibility presentation with authentic source assets'
        ],
        deliverables: [
          'Short, dramatic transformation showcase clips',
          'Formatted for Instagram Stories and Reels',
          'Still comparison graphic for website and social post'
        ]
      },
      {
        title: 'Festival & Seasonal Creatives',
        tagline: 'Branded holiday greetings and promotional celebratory clips',
        whatItIs: 'Warm, aesthetically rich video greetings celebrating Diwali, New Year, Eid, Christmas, Independence Day, and seasonal retail moments.',
        whoItIsFor: 'Any business wanting to build goodwill and announce seasonal promotions to existing and prospective clients.',
        keyFeatures: [
          'Vibrant cultural aesthetics with warm lighting and celebratory music',
          'Custom integration of company logo and personalized message',
          'Lightweight file sizes designed for rapid WhatsApp forwarding',
          'Special offer callouts or holiday hours announcements'
        ],
        deliverables: [
          'Pack of customized festive video clips',
          'Square format for feed + vertical format for WhatsApp status',
          'High-res static poster companion graphic'
        ]
      }
    ]
  }
];
