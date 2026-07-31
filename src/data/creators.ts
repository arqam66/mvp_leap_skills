import { Creator, Service, Testimonial } from '../types';

export const CREATORS: Creator[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    title: 'Senior Product Designer',
    org: 'Leap Skills Mentor',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 382,
    startingPrice: 1000,
    bio: 'Helping designers build high-impact careers through Leap Skills. 10+ years shaping experiences at top tech companies. I specialize in UX strategy, portfolio narrative, and career growth for senior ICs. My mission is to bridge the gap between craft and business impact.',
    category: 'design',
    menteesCount: '500+',
    reachCount: '12k',
    verified: true,
    fastResponder: true
  },
  {
    id: 'elena-vance',
    name: 'Dr. Elena Vance',
    title: 'Principal AI Product Manager',
    org: 'Nexus Labs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 124,
    startingPrice: 1000,
    bio: 'Pioneering generative AI workflows and building robust LLM products. Dr. Vance has successfully launched 4 generative AI products and specializes in transitioning senior PMs into specialized high-value AI roles.',
    category: 'tech',
    menteesCount: '800+',
    reachCount: '35k',
    verified: true,
    fastResponder: true,
    customMatchReason: 'Matches your interest in LLMs and Product Strategy. Dr. Vance has successfully launched 4 generative AI products and specializes in transitioning senior PMs into specialized AI roles.'
  },
  {
    id: 'priyanka',
    name: 'Priyanka',
    title: 'Travel Expert & Influencer',
    org: 'Indie Travel Group',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 1000,
    bio: 'Professional travel content creator and GTM consultant for tourism brands. Helping creators monetize niche audiences and establish direct sponsorships.',
    category: 'other',
    menteesCount: '120+',
    reachCount: '450k',
    verified: true
  },
  {
    id: 'josh-burns',
    name: 'Josh Burns',
    title: 'Career Strategy Mentor',
    org: 'Ex-Google Careers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 154,
    startingPrice: 1000,
    bio: 'Demystifying the tech recruitment cycle. I specialize in backend interview formats, negotiation tactics, and leadership transitions.',
    category: 'business',
    menteesCount: '340+',
    reachCount: '18k',
    verified: true
  },
  {
    id: 'ayush-singh',
    name: 'Ayush Singh',
    title: 'Data Science Architect',
    org: 'AI Labs International',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviewCount: 210,
    startingPrice: 1000,
    bio: 'MLOps architect and tech tutorial author. Specializing in highly optimized deep learning pipelines, GPU utilization, and scalable clean-code database design.',
    category: 'tech',
    menteesCount: '600+',
    reachCount: '95k',
    verified: true
  },
  {
    id: 'ganesh-balakrishnan',
    name: 'Ganesh Balakrishnan',
    title: 'Startup & GTM Advisor',
    org: 'Growth Catalyst Inc.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 88,
    startingPrice: 1200,
    bio: 'Helping tech startups cross the chasm. Specializing in seed valuations, business deck architecture, and Enterprise pipeline generation.',
    category: 'business',
    menteesCount: '200+',
    reachCount: '15k',
    verified: true
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    title: 'Senior PM | Ex-Google AI & Meta',
    org: 'Product Leaders',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviewCount: 112,
    startingPrice: 1000,
    bio: 'Product Management leadership veteran. I focus on execution models, PM interviews, metrics, and moving metrics in highly competitive product environments.',
    category: 'tech',
    menteesCount: '450+',
    reachCount: '25k',
    verified: true,
    fastResponder: true
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    title: 'Tech Lead & AI Ethics Consultant',
    org: 'EthicalMinds',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
    reviewCount: 78,
    startingPrice: 1000,
    bio: 'AI implementation strategist and safety auditor. Helping corporations align algorithmic pipelines with standards while ensuring rapid technical delivery.',
    category: 'tech',
    menteesCount: '150+',
    reachCount: '8k',
    verified: true
  },
  {
    id: 'julian-thorne',
    name: 'Julian Thorne',
    title: 'Data Scientist & Startup Mentor',
    org: 'Summit Ventures',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
    reviewCount: 165,
    startingPrice: 1500,
    bio: 'Executive coach and predictive analytics expert. Specializing in financial modeling, tech pipelines, and building cohesive data science teams from scratch.',
    category: 'business',
    menteesCount: '900+',
    reachCount: '24k',
    verified: true
  },
  {
    id: 'maya-rodriguez',
    name: 'Maya Rodriguez',
    title: 'UX Lead | AI Interaction Specialist',
    org: 'Synthesized Design',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    rating: 5.0,
    reviewCount: 94,
    startingPrice: 1000,
    bio: 'Specialist in human-centered design for AI-driven applications. Mapping interactions, conversational UX loops, and dashboard designs that keep users engaged.',
    category: 'design',
    menteesCount: '210+',
    reachCount: '19k',
    verified: true
  },
  {
    id: 'david-kim',
    name: 'David Kim',
    title: 'ML Ops & Cloud Infrastructure Expert',
    org: 'CloudScale AI',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
    reviewCount: 142,
    startingPrice: 1000,
    bio: 'Kubernetes wizard and high-performance ML compiler engineer. I consult for leading AI systems on reducing GPU cold-start times and automation.',
    category: 'tech',
    menteesCount: '310+',
    reachCount: '14k',
    verified: true
  }
];

export const CREATOR_SERVICES: Record<string, Service[]> = {
  'alex-rivera': [
    {
      id: 'ar-1',
      title: '1:1 Career Consultation',
      description: "A deep dive into your current challenges. We'll cover portfolio strategy, interview prep, or overcoming specific design hurdles in your current role.",
      price: 1000,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    },
    {
      id: 'ar-2',
      title: 'Async Portfolio Review',
      description: "Send me your portfolio link or PDF. I'll record a detailed Loom video reviewing your case studies and UI execution.",
      price: 1000,
      delivery: '3-day delivery',
      type: 'digital'
    },
    {
      id: 'ar-3',
      title: 'Digital UX Template Pack',
      description: 'FigJam and Figma templates for user research, journey mapping, and wireframing. Stop starting from scratch.',
      price: 1000,
      isDownloadable: true,
      type: 'digital'
    },
    {
      id: 'ar-4',
      title: 'Figma to Code Masterclass Webinar',
      description: 'Exclusive 2-hour livestream training on building production-ready layouts that perfectly match your Figma mocks.',
      price: 1000,
      duration: '2 hours',
      platform: 'Leap Live Stream',
      type: 'webinar'
    },
    {
      id: 'ar-5',
      title: 'UX Leadership Cohort (4-Week Intensive)',
      description: 'Join a group of 15 designers for high-impact weekly workshops, live feedback sessions, and exclusive networking.',
      price: 5000,
      duration: '4 weeks',
      platform: 'Zoom Live',
      type: 'cohort'
    }
  ],
  'elena-vance': [
    {
      id: 'ev-1',
      title: '1:1 AI Product Strategy Intensive',
      description: 'Refining your product monetization loops with LLMs, exploring prompting vs fine-tuning, and setting high-value PM roadmaps.',
      price: 1500,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    },
    {
      id: 'ev-2',
      title: 'AI Startup Pitch Audit',
      description: 'Reviewing your AI startup deck, mock testing validation strategies, and optimizing your market entry strategy.',
      price: 3000,
      delivery: '2-day review',
      type: 'digital'
    },
    {
      id: 'ev-3',
      title: 'Build & Deploy LLMs in Production Private Webinar',
      description: 'An advanced 90-minute technical session covering cost optimization, caching strategies, and semantic searches.',
      price: 1000,
      duration: '90 mins',
      platform: 'YouTube Private',
      type: 'webinar'
    }
  ],
  'priyanka': [
    {
      id: 'p-1',
      title: 'Influencer Sponsorship Growth Hack',
      description: 'Learn my system to transition from basic free-gift exchange to PKR 100k+ long-term hotel and hospitality contracts.',
      price: 1000,
      duration: '45 mins',
      platform: 'Zoom Video',
      type: 'mentorship'
    },
    {
      id: 'p-2',
      title: 'Niche Audience Monetization Bootcamp',
      description: 'A 2-week group cohort to help creators launch specialized services and digitize their travel workflows.',
      price: 2500,
      duration: '2 weeks',
      platform: 'Zoom Live',
      type: 'cohort'
    }
  ],
  'josh-burns': [
    {
      id: 'jb-1',
      title: 'Google & Meta Mock PM / Eng Interview',
      description: 'Run through an algorithmic design or product sense query with actionable rubric assessment and compensation guides.',
      price: 1000,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    }
  ],
  'marcus-chen': [
    {
      id: 'mc-1',
      title: '1:1 Product Management Executive Coaching',
      description: 'Personalized mentoring focusing on product roadmapping, metric structures, and organizational growth templates.',
      price: 1200,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    }
  ],
  'sarah-jenkins': [
    {
      id: 'sj-1',
      title: 'AI Ethics and Security Safety Audit',
      description: 'A deep audit of model fine-tuning ethics, regulatory standards, validation templates, and corporate reporting files.',
      price: 2500,
      delivery: '5-day delivery',
      type: 'digital'
    }
  ],
  'julian-thorne': [
    {
      id: 'jt-1',
      title: 'Predictive Analytics Business Coaching',
      description: 'Establishing scalable metrics models, cohort statistics structures, and custom Python integration architectures.',
      price: 2000,
      duration: '60 mins',
      platform: 'Zoom',
      type: 'mentorship'
    }
  ],
  'maya-rodriguez': [
    {
      id: 'mr-1',
      title: 'AI Conversational UX Walkthrough',
      description: 'Detailed analysis of your agentic flows, speech feedback loops, chat layout, and accessibility rules.',
      price: 1000,
      duration: '65 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    }
  ],
  'david-kim': [
    {
      id: 'dk-1',
      title: 'Kubernetes Model Server Architecture Setup',
      description: 'Comprehensive code and architecture configuration review to speed up LLM cold boots and maximize server bandwidth.',
      price: 2000,
      duration: '90 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    }
  ]
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: '"The professional storefront UI changed everything. My conversion rates for digital products jumped by 40% after switching from a generic link-in-bio tool."',
    userName: 'Aishwarya Srinivasan',
    userRole: 'Data Scientist @ Google',
    userImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200',
    stars: 5
  },
  {
    id: 't-2',
    quote: '"As a tech leader, I needed a platform that felt premium. Leap Skills handles the payments and scheduling seamlessly, letting me focus on mentorship."',
    userName: 'Joerg Storm',
    userRole: 'Tech Thought Leader',
    userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    stars: 5
  },
  {
    id: 't-3',
    quote: '"The easiest platform I\'ve ever used. It took me less than 5 minutes to set everything up and start accepting bookings from my LinkedIn audience."',
    userName: 'Xinran Waibel',
    userRole: 'Data Engineering Lead',
    userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    stars: 5
  }
];
