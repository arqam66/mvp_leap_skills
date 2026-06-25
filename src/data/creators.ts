import { Creator, Service, Testimonial } from '../types';

export const CREATORS: Creator[] = [
  {
    id: 'alex-rivera',
    name: 'Alex Rivera',
    title: 'Senior Product Designer',
    org: 'Leap Skills Mentor',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhtJar3ZIxH8bR7lcXdko3C29LvA3oO2Dv4POytR8As8IszddUdv5bpR8ChZUR1QCuOjfWLVfWvXflbFP3sO1xX5CvGCRt4HbZdcnmhaT27JJtXzORe3zktMf4owTEjigr51A4KJbJqg3-wuLq9ZfvD0GgKHWEt9LH_Z-VE-888oWn23AmYX957dJN6MMC4s4EqC_2t4lkdxpDEYBNhvQyM8Bjl2LLdfk9jU1FJb7e9M1Kb8btkh7tpgs-hPuQSYdyWzglc2cBJPJk',
    rating: 4.9,
    reviewCount: 382,
    startingPrice: 150,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUFKcvEArvejZvTLD6_8sGfWuLhgJ_BBU6N5FpQLJGgpD6Y4mHHQ6Dtlc53iSgriBxEdLyDFo5gByBm8gl5X6khNWJCNYT8w47hFbTKgRa28yeY2QRLhDgI49Edm7xt03ZOcXPIHG-JvwuMBrgMYqZG-Oy7uZolYWGSCx-5FgqeNLKZ6GRmAbO9JaYbv-1cGM9FO-70ZN2C3uQG2vB-Isq3nsi29uX4H9gXQpNEaOAPB_MN_5aeyD2bJtayhALrmgcLP8O5XILaNMy',
    rating: 4.9,
    reviewCount: 124,
    startingPrice: 150,
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
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLu848ljIOYOulBS3lF1eg3TzO_9kDbILR55Qom3j2bvJfNy8Zvq-h2O4afjq2cG9owS4Nt9R2ErIWhwyReImIkWvOraJt975jJncFPNw0LxB5ljZI1hjxAOJJrFPuaj4PQsRe39IZH6O8oX2fD35nVoCvmyXPlQgVuGBS-ZlMH4jVl_I02IyDPQAS_df3MJYDdzapWqBHTbLr276sZI9uypQx6prYmbZmvFdLwBlAiJ5e1VVuju-dJW-P4',
    rating: 4.8,
    reviewCount: 96,
    startingPrice: 80,
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
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtxJuW4qOmvenfKaIC5H4ri7kxKGHWdo4QY5-VFg3bay8coyrNCR8VIV03xraFNF0xBUxbM7v9qvV0tkbsIAPJ7EzptId99IPMxixZsHL7dqG6zBdomifkuxEpPpQ8gOFoMB06HC_FTmi4b-yZk1MikC0QJNjjmLpUYC-2Sz-kRzhcWbuKbj0iCkcYKVRbC4-7mE5ziEal_chmiuNfS1lvFQMsLvorVe4T6tDWSHyhDU2j7ALg99HkuSBbv',
    rating: 4.9,
    reviewCount: 154,
    startingPrice: 110,
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
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLs99BJHZXPtL9evXHI1nR3zMR5PU9YrYJA2N_l_LTcjH2g-LsqS0dR6K46T22xBvzYHyI78i_CpAxErv2IwFSvw4xW4MZLvl2S5j-UQGrlIvszRikafttfUqOi0DDsGwg655mhe9c__VxM8QWFThWlF1k3aLGvON7kBKuqLlyorkG8vSf7_0keHhiP6WSWHUjdhcRP6UesvbLrUGjv7SVqngZabkJNTH1BlDOUi4PKR83xszNYiC6JDhLM',
    rating: 5.0,
    reviewCount: 210,
    startingPrice: 140,
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
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuVzhI4T3esgqrtZ-bmlW1n1lF5S95AuFvmOvO6OrpkDH6BW5TX2aYjf6RvlxD-qxx2-dOID2hth-QnTJcX8vQYvA-pAHIL2tozMdtrcoeG_c6vGwvvyEcQailcr17prRLgdoNER3fXGSGMnKvjH_2ipwR-t1sWqI5Flp52mR25VCIjHZDOp6sceWFWQ27MlRCPqAOJABQHzGZB2gh1G3QFhKM5s52de_nbGV-pErIEcLLzl8JTH_O7Lgd9',
    rating: 4.9,
    reviewCount: 88,
    startingPrice: 160,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxJEOqpUfSAo-zfLjGh9XAD6ewBFJFohDy6h3F03YA7CM9QZa_NTo8IixjXN7e0JRcqJ_pxzNJwPmzoMfaDsn8-XQGFd_YHUdlghHYVSOjKphct3RDX91kf4TB5EuOqhLDPc1t6Uc8d076rNmQxRRkQcIdH4OFp_GLztgzZlJeU1fHV2v9zlExAk920bmdCM1NJfPhM_YWOwHfkHV02OSbfRPChK2I8dT1BcQ0nHRjSOMUSUs-rLff7AzWxZ_g7tEPx2FMV1B96ALu',
    rating: 5.0,
    reviewCount: 112,
    startingPrice: 95,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuRldRWu32O3Dco36QlUSUm4vvS67c-3DtdqixEqHLIzHvluf_wiVpass_u7J4dL6zT1hcl4j8-cbuvpyOwsnzA5aInl0oUR4AJKNW5qOEeePNQsRt460IJlxguFBmQz5eURZUaMYixpWBvJIEGhxF6-3dNDIRFtzmYgdbHuhRRMAAVPhiWB1H_i0mJ5DPDpsdZWKERJCvGMLS_CWvgdx0teyHvy1iuwuRpiQbDoGJnzMZ8xODm5qFZTBNOdBXXM2SEo_xDrCIEO6U',
    rating: 4.8,
    reviewCount: 78,
    startingPrice: 120,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuQooCUV0aDjbY-CedTpgKfVpLVdlWTxfbPeoUSoyMVZaoyGxdsAL1P_5YeuczxLGd9cob7iBw9Ii-RxhPtuQBkeVc_O-TQEemff27pVD-JVyQVU6e7XZ8JDIrJGrtPDe2U6NRHgvIzJt2ibOA-9qwR7StjSm3W0peBFIJZbhsiwhbfG-k30-N_hchxo1sfI_UINi_a4rUl8uK9AlMyMnOdsaQFExzNN_OGBoo4AHUyyoMF9SVfQD-nZVC8apStc4_5Yt66UQUkz09',
    rating: 4.9,
    reviewCount: 165,
    startingPrice: 180,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwkVk4UEkiRn1Qj5oJ3Iij7v69s-2cqYQWYIlE5h1Ulp-1q_fgiI1uNKNeexvJxKh3pxgUf-wh0s35Ybfjq5ho9bcSptZ70rCbugBmOljcjDFpSN6SjFyETXKKpD3TZyIf7dLgkrE-Ajx32S_TUGqaSV6nneHm_8jxW7_M16ZxZ_MVf7SkyAIormdMV3_G-8XdSOgvI2A7r6jmTwiYJGi-wWIImLfam65Lwg-9F5m_APCucXBkCwhS1ZGZE0VHn_0bkFNa8krYLE51',
    rating: 5.0,
    reviewCount: 94,
    startingPrice: 110,
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6i7HMgrZeYmNpzk18sPL4uo7_f9gjLBU05Ym2HjK7fMyyWm3S72LsQLJQrwejEWK8Usp27LoTtqi2l6BBv6PktYkGORchXcGY46TdcNuk6bkctov8e-7My2eXlUWMP2zDAfLFudgMFKLh3QIcvxXE36ynxgX4Lb5Kqzzkn2ZyYYRllIhLtVn-duiPLRVBxiTpCue29anQNi2b7t7LaQrlbtnfOejS8wbMEuvPvhms9LjJSExls7bLSf8_x5uZ6WvkbEI2_nfOTcQ',
    rating: 4.7,
    reviewCount: 142,
    startingPrice: 135,
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
      price: 150,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    },
    {
      id: 'ar-2',
      title: 'Async Portfolio Review',
      description: "Send me your portfolio link or PDF. I'll record a detailed Loom video reviewing your case studies and UI execution.",
      price: 100,
      delivery: '3-day delivery',
      type: 'digital'
    },
    {
      id: 'ar-3',
      title: 'Digital UX Template Pack',
      description: 'FigJam and Figma templates for user research, journey mapping, and wireframing. Stop starting from scratch.',
      price: 49,
      isDownloadable: true,
      type: 'digital'
    },
    {
      id: 'ar-4',
      title: 'Figma to Code Masterclass Webinar',
      description: 'Exclusive 2-hour livestream training on building production-ready layouts that perfectly match your Figma mocks.',
      price: 29,
      duration: '2 hours',
      platform: 'Leap Live Stream',
      type: 'webinar'
    },
    {
      id: 'ar-5',
      title: 'UX Leadership Cohort (4-Week Intensive)',
      description: 'Join a group of 15 designers for high-impact weekly workshops, live feedback sessions, and exclusive networking.',
      price: 499,
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
      price: 180,
      duration: '60 mins',
      platform: 'Google Meet',
      type: 'mentorship'
    },
    {
      id: 'ev-2',
      title: 'AI Startup Pitch Audit',
      description: 'Reviewing your AI startup deck, mock testing validation strategies, and optimizing your market entry strategy.',
      price: 300,
      delivery: '2-day review',
      type: 'digital'
    },
    {
      id: 'ev-3',
      title: 'Build & Deploy LLMs in Production Private Webinar',
      description: 'An advanced 90-minute technical session covering cost optimization, caching strategies, and semantic searches.',
      price: 39,
      duration: '90 mins',
      platform: 'YouTube Private',
      type: 'webinar'
    }
  ],
  'priyanka': [
    {
      id: 'p-1',
      title: 'Influencer Sponsorship Growth Hack',
      description: 'Learn my system to transition from basic free-gift exchange to $5k+ long-term hotel and hospitality contracts.',
      price: 80,
      duration: '45 mins',
      platform: 'Zoom Video',
      type: 'mentorship'
    },
    {
      id: 'p-2',
      title: 'Niche Audience Monetization Bootcamp',
      description: 'A 2-week group cohort to help creators launch specialized services and digitize their travel workflows.',
      price: 249,
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
      price: 110,
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
      price: 130,
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
      price: 250,
      delivery: '5-day delivery',
      type: 'digital'
    }
  ],
  'julian-thorne': [
    {
      id: 'jt-1',
      title: 'Predictive Analytics Business Coaching',
      description: 'Establishing scalable metrics models, cohort statistics structures, and custom Python integration architectures.',
      price: 220,
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
      price: 110,
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
      price: 240,
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
    userImage: 'https://lh3.googleusercontent.com/aida/AP1WRLsOSAaSeF9JrPZk4brw4hYbJM1KfBUT_sqY3YSZJfbPkwhcbJUNYDyxBYF6AGjfdC1gCmzm0lwmgOrm8ZH9uBpIkRWcFxpK5iwS8irjFRF13jg4_dkg7BnHL_PV6-RKbpbXDAAE1nxm0Uefcj7nZUGx3aRYMQo6su-sAR1aAv4f-EccOc9bIUyDWN2XX5f04oUa0ITF1XThHbkckR-Csf815eXG4f87aPTKPf0d1H9Xnwc18eJkeLsEkyNg',
    stars: 5
  },
  {
    id: 't-2',
    quote: '"As a tech leader, I needed a platform that felt premium. Leap Skills handles the payments and scheduling seamlessly, letting me focus on mentorship."',
    userName: 'Joerg Storm',
    userRole: 'Tech Thought Leader',
    userImage: 'https://lh3.googleusercontent.com/aida/AP1WRLsAIx7yRw7696XLe-UjCJExSBGbg6xqzEIi8AuJSt3aEqTy1ica7tliWfu7eNX-BlXdSyGTYzthSi5qtnP67k6jINqYURCP7GA2ts8w4uNGZhbyYOgiZ0bW2cFvujtK_UxfSvmmjOR4kgaQmA86NRmO-gAAgQ0rBBbMCpuMpuwBCgG2PVxqBbNZgCgibdS2I-_3yIsS06XBGu0nHsjPNpqgOqyNMe9OzBAW2_-1gIbFWhVgXcBycPMDVipL',
    stars: 5
  },
  {
    id: 't-3',
    quote: '"The easiest platform I\'ve ever used. It took me less than 5 minutes to set everything up and start accepting bookings from my LinkedIn audience."',
    userName: 'Xinran Waibel',
    userRole: 'Data Engineering Lead',
    userImage: 'https://lh3.googleusercontent.com/aida/AP1WRLsNJS04ETvH4YXUC8lCn3HXBGk4-eYB_53Dried5yIU7qe0_Zr4mcl2APFKY5eRlcqZ7fKW_ArYZO53HktKWlbB715Yc_WjVSzBRb3r_gWx5mNwIafyfzAXEwQScTsTe_STdWDF8NINKa4u4iUqVNaCC7DM0hgV0nC1ZkGmBqTb-rTalTnejYWBkYZ2S831LAfn1HhkdYF8Bu8JzJ19yqEiSzX0jJ--_oBt9-x_nVlGU6ZsrV1gG-ay3iUD',
    stars: 5
  }
];
