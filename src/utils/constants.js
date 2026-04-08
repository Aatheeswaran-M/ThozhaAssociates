export const DEFAULT_COMPANY = {
  name: 'Thozha Associates',
  tagline: 'Building Your Dreams with Trusted Engineering',
  blurb:
    'Trusted civil engineers since 2014 for residential and commercial construction, structural design, and project handover with virtual planning and on-site execution support.',
  phone: import.meta.env.VITE_COMPANY_PHONE || '+919000000000',
  whatsapp: import.meta.env.VITE_COMPANY_WHATSAPP || '919000000000',
  email:
    import.meta.env.VITE_COMPANY_EMAIL || 'hello@thozhaassociates.com',
  location:
    import.meta.env.VITE_COMPANY_LOCATION || 'Tamil Nadu, India',
  logo_url: 'https://images.unsplash.com/photo-1541888086225-ee5b5d848197?q=80&w=200&auto=format&fit=crop',
  hero_blueprint_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  hero_final_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
  featured_before_after_title: 'Before and after transformation',
  featured_before_image_url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
  featured_after_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
}

export const COMPANY = DEFAULT_COMPANY

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact', href: '#quote' },
]

export const HERO_FEATURES = [
  'Trusted civil engineering support from design to handover',
  'Residential homes, commercial buildings, and renovation works',
  'Plan approvals, structural drawings, and site supervision',
]

export const HERO_STATS = [
  { label: 'Established', valueText: 'Since 2014' },
  { label: 'Core services', value: 8, suffix: '+' },
  { label: 'Primary market', valueText: 'Residential + Commercial' },
  { label: 'Service model', valueText: 'Virtual + On-Site' },
]

export const LEAD_PROJECT_TYPES = [
  'Residential',
  'Commercial',
  'Renovation',
  'Interior Fit-Out',
]

export const PROJECT_CATEGORIES = [
  'All',
  'Residential',
  'Commercial',
  'Renovation',
]

export const PROJECT_STATUS_OPTIONS = [
  'Planning',
  'In Progress',
  'Delivered',
]

export const IMAGE_COLLECTIONS = [
  {
    key: 'heroExterior',
    query: 'modern house exterior',
    queries: [
      'modern luxury house exterior',
      'contemporary villa exterior',
      'modern house exterior',
    ],
    preferredTerms: ['house', 'villa', 'residence', 'exterior', 'modern'],
    count: 4,
  },
  {
    key: 'blueprints',
    query: 'architectural blueprint',
    queries: [
      'architectural blueprint',
      'house floor plan drawing',
      'architectural floor plan',
    ],
    preferredTerms: ['blueprint', 'plan', 'floor', 'architectural', 'drawing'],
    count: 4,
  },
  {
    key: 'construction',
    query: 'construction site house',
    queries: [
      'residential construction site',
      'house construction workers',
      'building foundation construction',
    ],
    preferredTerms: ['construction', 'site', 'building', 'worker', 'foundation'],
    count: 4,
  },
  {
    key: 'structure',
    query: 'building frame construction house',
    queries: [
      'building frame construction',
      'house structural frame',
      'concrete frame building construction',
    ],
    preferredTerms: ['frame', 'structure', 'column', 'beam', 'construction'],
    count: 4,
  },
  {
    key: 'walls',
    query: 'house under construction exterior',
    queries: [
      'house under construction exterior',
      'masonry house construction',
      'unfinished house exterior',
    ],
    preferredTerms: ['house', 'construction', 'exterior', 'wall', 'unfinished'],
    count: 4,
  },
  {
    key: 'finale',
    query: 'house elevation front view',
    queries: [
      'modern home front elevation',
      'house elevation front view',
      'modern villa facade',
    ],
    preferredTerms: ['front', 'elevation', 'house', 'facade', 'modern'],
    count: 4,
  },
  {
    key: 'renders',
    query: '3d house render',
    queries: [
      'modern house design exterior',
      'luxury house exterior design',
      'architectural visualization house',
    ],
    preferredTerms: ['design', 'modern', 'house', 'architectural', 'exterior'],
    count: 4,
  },
  {
    key: 'interiors',
    query: 'interior construction work',
    queries: [
      'interior construction work',
      'home renovation interior',
      'interior finishing construction',
    ],
    preferredTerms: ['interior', 'construction', 'renovation', 'worker', 'home'],
    count: 4,
  },
  {
    key: 'commercial',
    query: 'commercial building exterior modern',
    queries: [
      'modern commercial building exterior',
      'office building facade',
      'commercial architecture exterior',
    ],
    preferredTerms: ['commercial', 'building', 'office', 'facade', 'modern'],
    count: 4,
  },
]

export const BUILD_STAGE_BLUEPRINTS = [
  {
    key: 'consultation',
    collectionKey: 'blueprints',
    percent: 0,
    title: 'Consultation & Project Brief',
    description:
      'Every project starts with requirements, site understanding, budget clarity, and a practical civil-engineering roadmap.',
  },
  {
    key: 'design',
    collectionKey: 'construction',
    percent: 25,
    title: 'Structural Design & Approvals',
    description:
      'Structural drawings, plan inputs, and approval support shape the technical direction before site execution begins.',
  },
  {
    key: 'planning',
    collectionKey: 'structure',
    percent: 50,
    title: 'Soil Testing & Foundation Planning',
    description:
      'Ground conditions, footing logic, and foundation decisions are aligned early to protect the build from the base up.',
  },
  {
    key: 'execution',
    collectionKey: 'walls',
    percent: 75,
    title: 'Construction & Site Supervision',
    description:
      'Daily site management, workmanship checks, and project coordination keep construction disciplined and transparent.',
  },
  {
    key: 'handover',
    collectionKey: 'finale',
    percent: 100,
    title: 'Finishing & Handover',
    description:
      'Finishing works, final quality reviews, and client handover complete the journey from concept to built reality.',
  },
]

export const REMOTE_PROJECT_BLUEPRINTS = [
  {
    title: 'Palm Courtyard Residence',
    category: 'Residential',
    location: 'Tamil Nadu',
    status: 'Delivered',
    summary:
      'A climate-conscious family home composed around natural light, clean elevations, and textured materials.',
    imageKey: 'heroExterior',
    beforeKey: 'blueprints',
    afterKey: 'finale',
  },
  {
    title: 'Monolith Villa',
    category: 'Residential',
    location: 'Erode',
    status: 'In Progress',
    summary:
      'A contemporary villa balancing long-span living spaces with layered outdoor decks and facade depth.',
    imageKey: 'renders',
    beforeKey: 'structure',
    afterKey: 'heroExterior',
  },
  {
    title: 'Axis Business Hub',
    category: 'Commercial',
    location: 'Chennai',
    status: 'Delivered',
    summary:
      'A modern commercial envelope tuned for visual identity, circulation clarity, and flexible occupancy.',
    imageKey: 'commercial',
    beforeKey: 'construction',
    afterKey: 'commercial',
  },
  {
    title: 'Cornerstone Retail Block',
    category: 'Commercial',
    location: 'Salem',
    status: 'Planning',
    summary:
      'Street-facing retail architecture with high-visibility frontage, modular services, and efficient back-of-house planning.',
    imageKey: 'finale',
    beforeKey: 'blueprints',
    afterKey: 'renders',
  },
  {
    title: 'Renewed Courtyard Home',
    category: 'Renovation',
    location: 'Tiruppur',
    status: 'Delivered',
    summary:
      'An aging home refreshed through facade cleanup, layout optimization, and warm interior rebuilding.',
    imageKey: 'interiors',
    beforeKey: 'construction',
    afterKey: 'interiors',
  },
  {
    title: 'Urban Refresh Studio',
    category: 'Renovation',
    location: 'Madurai',
    status: 'In Progress',
    summary:
      'A compact renovation that upgrades circulation, natural light, and material expression without expanding the footprint.',
    imageKey: 'heroExterior',
    beforeKey: 'walls',
    afterKey: 'heroExterior',
  },
]

export const DEFAULT_TESTIMONIALS = [
  {
    id: 'default-1',
    name: 'Aarthi Narayanan',
    message:
      'Their team translated our floor plan ideas into a home that feels intentional in every corner. The construction journey was transparent and calm from start to finish.',
    rating: 5,
    project_type: 'Residential client',
    image_url: '',
  },
  {
    id: 'default-2',
    name: 'Rahul Karthik',
    message:
      'We came in with a renovation problem and left with a completely refreshed space. Execution discipline and design sensitivity were both excellent.',
    rating: 5,
    project_type: 'Renovation client',
    image_url: '',
  },
  {
    id: 'default-3',
    name: 'Sanjana Builders',
    message:
      'For our commercial site, Thozha Associates handled planning, progress tracking, and visual detailing with real confidence. The final facade stands out.',
    rating: 4,
    project_type: 'Commercial client',
    image_url: '',
  },
]

export const PROJECT_FORM_INITIAL = {
  id: '',
  title: '',
  category: 'Residential',
  location: '',
  area_label: '',
  year: '',
  status: 'Planning',
  summary: '',
  cover_image_url: '',
  before_image_url: '',
  after_image_url: '',
  remote_cover_url: '',
  remote_before_url: '',
  remote_after_url: '',
  storage_paths: [],
  featured: false,
}

export const TESTIMONIAL_FORM_INITIAL = {
  id: '',
  name: '',
  project_type: '',
  message: '',
  rating: 5,
  image_url: '',
  remote_image_url: '',
  storage_path: '',
}

export const SITE_SETTINGS_INITIAL = {
  id: 1,
  name: DEFAULT_COMPANY.name,
  tagline: DEFAULT_COMPANY.tagline,
  blurb: DEFAULT_COMPANY.blurb,
  phone: DEFAULT_COMPANY.phone,
  whatsapp: DEFAULT_COMPANY.whatsapp,
  email: DEFAULT_COMPANY.email,
  location: DEFAULT_COMPANY.location,
  logo_url: DEFAULT_COMPANY.logo_url,
  hero_blueprint_url: DEFAULT_COMPANY.hero_blueprint_url,
  hero_final_url: DEFAULT_COMPANY.hero_final_url,
  featured_before_after_title: DEFAULT_COMPANY.featured_before_after_title,
  featured_before_image_url: DEFAULT_COMPANY.featured_before_image_url,
  featured_after_image_url: DEFAULT_COMPANY.featured_after_image_url,
  remote_logo_url: '',
  remote_hero_blueprint_url: '',
  remote_hero_final_url: '',
  remote_featured_before_image_url: '',
  remote_featured_after_image_url: '',
}

export const SITE_CONTENT_INITIAL = {
  id: 1,
  about: {
    headline: 'Trusted civil engineering and construction partners',
    story:
      'We are your dependable civil engineering partner. We deliver end-to-end support—from structural design to final handover.',
    brand_meaning:
      '"Thozha" means trusted companion in Tamil, reflecting our transparent and supportive approach.',
    founder_name: 'Er. Taran D V',
    founder_role: 'Founder | Civil Engineer',
    founder_summary:
      'Er. Taran leads the firm’s design and quality benchmarks, focusing on long-term safety and practical outcomes.',
    partner_lead_name: 'Er. Sampath Kumar A',
    partner_lead_role: 'Partner | Project Management Lead',
    partner_lead_summary:
      'Er. Sampath oversees technical execution, design development, and site coordination. He ensures designs are executed efficiently to meet real-world requirements.',
    // Legacy fields retained for backward compatibility with previously saved content.
    lead_engineer_name: 'Er. Sampath Kumar A',
    lead_engineer_role: 'Partner | Technical Execution and Project Management',
    lead_engineer_summary:
      'Er. Sampath Kumar A acts as a key partner in the firm, playing a major role in both technical execution and project management. He oversees design development, prepares and reviews AutoCAD drawings, and coordinates closely with clients, contractors, and site teams. He also supervises construction quality and contributes to decision-making across projects. His involvement ensures that every design is executed efficiently and meets real-world requirements.',
    mission:
      'Be a trusted friend to every client through quality construction, clear communication, and dependable delivery.',
    service_area:
      'Serving residential and commercial clients through virtual planning and on-site project execution.',
    values: ['Transparency', 'Quality', 'Timely Delivery', 'Client Satisfaction'],
  },
  hero_features: HERO_FEATURES,
  hero_stats: HERO_STATS,
  services: [
    {
      title: 'Residential Construction',
      description: 'End-to-end homes, from planning to finishing.',
    },
    {
      title: 'Commercial Construction',
      description: 'Warehouses, offices, and commercial facilities.',
    },
    {
      title: 'Structural Design',
      description: 'Safe, buildable drawings and coordination.',
    },
    {
      title: 'Building Plan Approvals',
      description: 'Hassle-free approval workflows.',
    },
    {
      title: 'Site Supervision',
      description: 'On-site progress tracking and quality control.',
    },
    {
      title: 'Renovation',
      description: 'Optimizing existing spaces for modern functionality.',
    },
    {
      title: 'Interior Civil Works',
      description: 'Professional finishing, tiling, and plastering.',
    },
    {
      title: 'Soil Testing & Foundation',
      description: 'Ground assessment for long-term safety.',
    },
  ],
  careers: [
    {
      title: 'Site Engineer',
      type: 'Full Time',
      location: 'Tamil Nadu',
    },
    {
      title: 'Junior Structural Designer',
      type: 'Full Time',
      location: 'Tamil Nadu',
    },
    {
      title: 'Project Coordinator',
      type: 'Full Time',
      location: 'Tamil Nadu',
    },
  ],
  social_links: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com',
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com',
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com',
    },
  ],
  why_choose_us: [
    {
      title: 'Expert Led',
      description:
        'Guided by expert civil engineers with deep design and site management knowledge.',
    },
    {
      title: 'End-to-End Delivery',
      description:
        'Planning to handover. We manage everything seamlessly.',
    },
    {
      title: 'Local Knowledge',
      description:
        'Practical execution built around regional systems and material quality.',
    },
    {
      title: 'Transparency First',
      description:
        'Clear tracking, quality oversights, and scheduling honesty.',
    },
  ],
  process_steps: BUILD_STAGE_BLUEPRINTS.map((stage) => ({
    title: stage.title,
    description: stage.description,
    percent: stage.percent,
  })),
  faq: [
    {
      question: 'Do you handle both residential and commercial projects?',
      answer:
        'Yes. Thozha Associates serves residential homeowners, aspiring homeowners, business owners, and commercial clients through virtual and on-site support.',
    },
    {
      question: 'Can you help with building plan approvals?',
      answer:
        'Yes. The team provides plan approval assistance as part of the wider construction support process.',
    },
    {
      question: 'Do you provide structural drawings and site supervision?',
      answer:
        'Yes. Structural design support, drawing coordination, project management, and site supervision are part of the service offering.',
    },
    {
      question: 'Do you take renovation and remodelling work?',
      answer:
        'Yes. Renovation, remodelling, extension works, and interior civil works are part of the core services list.',
    },
    {
      question: 'How do I get a quote for my project?',
      answer:
        'You can use the quote form on the website, call directly, or contact the team on WhatsApp to share your project requirement and location.',
    },
  ],
}
