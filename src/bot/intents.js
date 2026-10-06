// FAQ knowledge base — data only, no logic.
//
// patterns : phrases matched against the whole normalised question (exact = 1.0, contains = 0.92)
// keywords : single tokens, fuzzy-matched so typos still land
// question : canonical phrasing, used when the bot asks "did you mean?"
// replies  : rotated so repeated answers don't sound robotic
// chips    : quick-reply suggestions rendered under the answer
// links    : optional anchors rendered under the answer
//
// Keep answers in sync with the page content in src/App.js — this file is
// deliberately plain data so updating it never risks breaking the matcher.

export const intents = [
  {
    id: 'greeting',
    question: 'Hello!',
    patterns: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'yo', 'whats up', 'how are you'],
    keywords: [],
    replies: [
      "Hey! Ask me about John's skills, projects, experience, or how to get in touch.",
      "Hi there! What would you like to know about John?"
    ],
    chips: ['What are his skills?', 'What projects has he built?', 'How can I contact him?']
  },
  {
    id: 'help',
    question: 'What can you do?',
    patterns: ['what can you do', 'help', 'what should i ask', 'menu', 'how does this work', 'what do you know', 'commands'],
    keywords: [],
    replies: [
      "I can answer questions about John's skills, projects, experience, education, availability, and contact details. What would you like to know?",
      'Ask me about his tech stack, a specific project, his work experience, or how to reach him.'
    ],
    chips: ['What are his skills?', 'What projects has he built?', 'Is he available for work?']
  },
  {
    id: 'bot',
    question: 'Who are you?',
    patterns: ['who are you', 'what are you', 'are you a bot', 'are you ai', 'are you human', 'are you a real person', 'are you chatgpt'],
    keywords: [],
    replies: [
      "I'm a small scripted FAQ helper for this portfolio — no AI model behind me, just a keyword matcher built to answer questions about John fast, offline, and for free.",
      'A simple rule-based bot. I match your question against John\'s FAQ — no API calls, no waiting.'
    ],
    chips: ['What are his skills?', 'What projects has he built?']
  },
  {
    id: 'about',
    question: 'Who is John?',
    patterns: ['who is john', 'who is he', 'what does he do', 'tell me about john', 'tell me about him', 'about him', 'about john', 'his background', 'background', 'bio'],
    keywords: ['background', 'bio', 'developer', 'bsit', 'degree', 'intro', 'student'],
    replies: [
      'John Carlo Aganan is a Full-Stack Developer from Naic, Cavite, finishing his BSIT at Cavite State University. He ships production platforms — POS, booking, and loan systems — and cares about backend stability, clean rendering, and efficient databases.',
      'A Filipino full-stack developer focused on React, Node.js, and databases. Currently a student, a freelancer, and a Service Level Technician at CXI Services.'
    ],
    chips: ['What is his experience?', 'Where does he study?', 'Is he available for work?']
  },
  {
    id: 'skills',
    question: 'What are his skills?',
    patterns: ['what are his skills', 'his skills', 'skill set', 'skills', 'tech stack', 'technology stack', 'stack', 'technologies', 'what tech does he use', 'what stack does he use', 'what languages does he know', 'toolbox'],
    keywords: ['skill', 'stack', 'tech', 'technology', 'technologies', 'framework', 'frameworks', 'language', 'languages', 'tool', 'tools', 'frontend', 'backend', 'database', 'databases'],
    replies: [
      'Frontend: React, Vue.js, Next.js, Tailwind. Backend & AI: Node.js, Express, Laravel, FastAPI, PHP, plus OpenAI/Claude/Groq integrations. Databases: MySQL, PostgreSQL, Supabase. Tools: Git, Vercel, Render, Cursor.',
      'A MERN-style stack with range: React/Next.js on the front, Node/Express/Laravel behind, MySQL/PostgreSQL/Supabase underneath — and AI APIs wired in where they earn their place.'
    ],
    chips: ['What projects has he built?', 'What is his experience?', 'What does he build?']
  },
  {
    id: 'dormpulse',
    question: 'Tell me about DormPulse',
    patterns: ['dormpulse', 'dorm pulse', 'student housing', 'housing locator'],
    keywords: ['dormpulse', 'dorm', 'housing', 'locator'],
    replies: [
      'DormPulse Student Housing — a premium student housing locator with real-time tracking, interactive mapping, and an AI recommendation chatbot. Built with React, FastAPI, Supabase Vector, and OpenAI.',
      'DormPulse: students find and book dorms with live availability, maps, and vector-powered recommendations. Stack: React, FastAPI, Supabase Vector, OpenAI.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'laundrosaas',
    question: 'Tell me about LaundroSaaS',
    patterns: ['laundrosaas', 'laundry saas', 'laundry'],
    keywords: ['laundrosaas', 'laundro', 'laundry'],
    replies: [
      'LaundroSaaS — a laundry management SaaS with real-time order tracking and revenue reporting. Built with React and Vite.',
      'LaundroSaaS runs the whole laundry workflow: orders, tracking, and revenue reporting in one dashboard. React + Vite.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'medflow',
    question: 'Tell me about MedFlow',
    patterns: ['medflow', 'med flow', 'healthcare system', 'healthcare dashboard'],
    keywords: ['medflow', 'medical', 'healthcare', 'clinical', 'patient'],
    replies: [
      'MedFlow Healthcare — a management system with real-time analytics, patient tracking, and AI-assisted clinical note generation. Built with React, Vite, and the OpenAI API.',
      'MedFlow: patient tracking, live analytics, and AI-drafted clinical notes. Stack: React, Vite, OpenAI API.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'nagco',
    question: 'Tell me about NAgCO',
    patterns: ['nagco', 'loan system', 'loan management', 'cooperative loan'],
    keywords: ['nagco', 'loan', 'loans', 'cooperative', 'lending'],
    replies: [
      'NAgCO Loan System — a cooperative loan platform with automated workflows, real-time tracking, and AI-assisted eligibility pre-screening. Built with Next.js, Supabase, and the Claude API.',
      'NAgCO handles cooperative lending end to end: applications, workflows, and AI pre-screening. Next.js + Supabase + Claude.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'bigbrew',
    question: 'Tell me about BigBrew POS',
    patterns: ['bigbrew', 'big brew', 'coffee shop pos', 'pos system'],
    keywords: ['bigbrew', 'brew', 'coffee', 'cafe', 'pos'],
    replies: [
      'BigBrew POS — a coffee shop point-of-sale with a real-time analytics dashboard. Built with React and Node.js.',
      'BigBrew: a POS that tracks sales live and surfaces the numbers that matter. React + Node.js.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'artisano',
    question: 'Tell me about Artisano Pizzeria',
    patterns: ['artisano', 'pizzeria', 'pizza website'],
    keywords: ['artisano', 'pizza', 'pizzeria'],
    replies: [
      'Artisano Pizzeria — a cinematic digital presence for an artisanal pizzeria. Built with Next.js and Framer Motion.',
      'Artisano: a motion-heavy, cinematic site for a pizzeria. Next.js + Framer Motion.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'babybliss',
    question: 'Tell me about Baby Bliss',
    patterns: ['baby bliss', 'babybliss', 'wellness booking', 'spa booking'],
    keywords: ['baby', 'bliss', 'spa', 'wellness', 'booking'],
    replies: [
      'Baby Bliss Booking — an appointment system for wellness and spa centers. Built with React, Tailwind, and Vercel.',
      'Baby Bliss: booking, schedules, and appointments for spas. React + Tailwind on Vercel.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'bbek',
    question: 'Tell me about the BBEK system',
    patterns: ['bbek', 'church admin', 'church system'],
    keywords: ['bbek', 'church', 'bible', 'baptist'],
    replies: [
      'BBEK Administration System — a church operations platform covering member management, event scheduling, and financial reporting. Built with Vue.js, Node.js, and MySQL.',
      'BBEK: members, events, and finances for a church in one admin platform. Vue.js + Node.js + MySQL.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'startuplab_ticketing',
    question: 'Tell me about StartupLab Ticketing',
    patterns: ['startuplab ticketing', 'ticketing', 'event ticketing'],
    keywords: ['startuplab', 'ticketing', 'ticket', 'tickets'],
    replies: [
      'StartupLab Ticketing — an end-to-end event ticketing and management platform. Built with React, Node.js, and PostgreSQL.',
      'StartupLab Ticketing sells and manages event tickets from checkout to check-in. React + Node.js + PostgreSQL.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'event_registration',
    question: 'Tell me about the Event Registration System',
    patterns: ['event registration', 'registration system'],
    keywords: ['registration', 'academic', 'university', 'seminar', 'event'],
    replies: [
      'Event Registration System — streamlined registration for university and academic events. Built with Laravel and MySQL.',
      'A registration flow for academic events: signups, records, no spreadsheet chaos. Laravel + MySQL.'
    ],
    chips: ['What projects has he built?', 'What tech does he use?']
  },
  {
    id: 'projects',
    question: 'What projects has he built?',
    patterns: ['what projects', 'his projects', 'project', 'portfolio', 'show me his work', 'his work', 'all projects', 'list of projects', 'what has he built', 'what did he build', 'case studies'],
    keywords: ['project', 'projects', 'portfolio', 'built', 'build', 'app', 'apps', 'application', 'applications', 'work'],
    replies: [
      'Ten shipped projects: DormPulse (student housing), LaundroSaaS, MedFlow, NAgCO loan system, BigBrew POS, Artisano Pizzeria, Baby Bliss booking, BBEK admin, plus StartupLab ticketing and event registration. Ask about any of them by name.',
      'Highlights from the portfolio: DormPulse, MedFlow, LaundroSaaS, NAgCO, BigBrew POS, Artisano — all live in production. Which one should I tell you about?'
    ],
    chips: ['Tell me about DormPulse', 'Tell me about MedFlow', 'What tech does he use?']
  },
  {
    id: 'experience',
    question: 'What is his work experience?',
    patterns: ['work experience', 'his experience', 'experience', 'job history', 'where has he worked', 'career', 'employment'],
    keywords: ['experience', 'career', 'job', 'worked', 'internship', 'intern', 'company', 'employment', 'freelance', 'cxi', 'startuplab'],
    replies: [
      'Currently a Service Level Technician at CXI Services (Sep 2026 – present), where he also builds internal tools, and a freelance developer since Jun 2026. Before that: Full-Stack Developer Intern at StartupLab (Feb – May 2026), on loan reminder systems, email queues, and server config.',
      'Three roles so far: CXI Services (current), freelance full-stack work since mid-2026, and a StartupLab internship covering loan workflows and production servers.'
    ],
    chips: ['Where does he study?', 'Is he available for work?']
  },
  {
    id: 'education',
    question: 'Where does he study?',
    patterns: ['where does he study', 'education', 'school', 'university', 'college', 'degree course', 'bsit'],
    keywords: ['education', 'school', 'university', 'college', 'degree', 'bsit', 'student', 'study', 'studies', 'course'],
    replies: [
      'John is in his 4th year of BSIT at Cavite State University, and holds a CompTIA AI Essentials certificate.',
      'Studying BSIT at Cavite State University (4th year), with a CompTIA AI Essentials certificate on the side.'
    ],
    chips: ['What is his experience?', 'What are his skills?']
  },
  {
    id: 'availability',
    question: 'Is John available for work?',
    patterns: ['available for work', 'is he available', 'hire him', 'can i hire him', 'open to work', 'work with him'],
    keywords: ['available', 'availability', 'hire', 'hiring', 'freelance', 'offer', 'open', 'contract'],
    replies: [
      'Yes — John is available for freelance work and open to full-time positions. He replies within 24 hours; the contact form at the bottom of the page is the fastest way in.',
      'Open to both freelance projects and full-time roles. Reach him via the contact form or email and he will get back within a day.'
    ],
    chips: ['How can I contact him?', 'How much does he charge?']
  },
  {
    id: 'contact',
    question: 'How can I contact him?',
    patterns: ['how can i contact him', 'how do i contact him', 'how can i reach him', 'how to reach him', 'contact', 'his email', 'email', 'get in touch', 'contact details', 'phone number'],
    keywords: ['contact', 'email', 'reach', 'message', 'phone', 'touch', 'gmail'],
    replies: [
      'Email johncarloaganan.startuplab@gmail.com, or use the contact form at the bottom of this page — he replies within 24 hours.',
      'Fastest route: the contact form below. Or email johncarloaganan.startuplab@gmail.com directly.'
    ],
    links: [{ label: 'Email John', href: 'mailto:johncarloaganan.startuplab@gmail.com' }],
    chips: ['Is he available for work?', 'Where is he based?']
  },
  {
    id: 'location',
    question: 'Where is he based?',
    patterns: ['where does he live', 'where is he from', 'where is he based', 'location', 'where does he stay', 'address'],
    keywords: ['location', 'live', 'lives', 'address', 'city', 'cavite', 'naic', 'philippines', 'based'],
    replies: [
      'John is based in Naic, Cavite, Philippines — and works remotely with clients anywhere.',
      'Naic, Cavite, PH. Remote-friendly, so distance is not a problem.'
    ],
    chips: ['How can I contact him?', 'Is he available for work?']
  },
  {
    id: 'resume',
    question: 'Where can I see his resume?',
    patterns: ['resume', 'his cv', 'curriculum vitae'],
    keywords: ['resume', 'cv', 'curriculum', 'vitae', 'download'],
    replies: [
      "John's resume covers his stack, experience, and certificates — it prints cleanly too.",
      'The full resume is one click away, including experience and certifications.'],
    links: [{ label: 'Open resume', href: '/resume.html' }],
    chips: ['What is his experience?', 'What are his skills?']
  },
  {
    id: 'services',
    question: 'What does he build?',
    patterns: ['what does he build', 'what can he build', 'services', 'what do you offer', 'what services', 'expertise', 'what he offers'],
    keywords: ['service', 'services', 'expertise', 'engagement'],
    replies: [
      'Full-stack systems (POS, dashboards, admin panels), custom web apps, database architecture, e-commerce, responsive UI/UX, and REST APIs.',
      'Six things he ships often: full-stack systems, custom web apps, database schemas, e-commerce, mobile-first UI, and documented REST APIs.'
    ],
    chips: ['What projects has he built?', 'How much does he charge?']
  },
  {
    id: 'pricing',
    question: 'How much does he charge?',
    patterns: ['how much does he charge', 'pricing', 'rates', 'rate', 'cost', 'how much is it', 'budget'],
    keywords: ['rate', 'rates', 'pricing', 'price', 'cost', 'budget', 'charge', 'charges'],
    replies: [
      "Rates depend on scope — a small site, a monthly retainer, or a full system all price differently. Email him your requirements and he'll quote within 24 hours.",
      'No one-size number: he quotes per project after scoping. Send the details to his email and you will get a figure back within a day.'
    ],
    links: [{ label: 'Email John', href: 'mailto:johncarloaganan.startuplab@gmail.com' }],
    chips: ['Is he available for work?', 'How can I contact him?']
  },
  {
    id: 'thanks',
    question: 'Thank you!',
    patterns: ['thank you', 'thanks', 'thx', 'appreciate it', 'cheers'],
    keywords: [],
    replies: ['Anytime! Ask me anything else about John.', 'Happy to help — anything else you want to know?'],
    chips: ['What projects has he built?', 'How can I contact him?']
  },
  {
    id: 'bye',
    question: 'Goodbye!',
    patterns: ['bye', 'goodbye', 'see you', 'good night', 'later'],
    keywords: [],
    replies: ['Bye! Come back anytime — and the contact form is at the bottom of the page.', 'See you! Feel free to ask if anything else comes up.'],
    chips: ['How can I contact him?']
  },
  {
    id: 'joke',
    question: 'Tell me a joke',
    patterns: ['tell me a joke', 'joke', 'make me laugh', 'something funny'],
    keywords: ['joke', 'funny', 'laugh'],
    replies: [
      'Why do programmers prefer dark mode? Because light attracts bugs.',
      'There are only 10 types of people in the world: those who understand binary, and those who do not.'
    ],
    chips: ['What are his skills?', 'What projects has he built?']
  },
  {
    id: 'offtopic',
    question: 'Tell me about politics',
    patterns: ['politics', 'weather tomorrow', 'girlfriend', 'dating advice'],
    keywords: ['politics', 'religion', 'weather', 'crypto', 'bitcoin', 'girlfriend', 'dating'],
    replies: [
      "I'm just John's little FAQ bot — I stick to his skills, projects, and how to reach him. Try asking about those!",
      "That's outside my lane. I only know John's work — ask me about his projects or experience instead."
    ],
    chips: ['What are his skills?', 'What projects has he built?', 'How can I contact him?']
  }
];

// Last resort: never dead air, always a route forward.
export const FALLBACK = {
  id: 'fallback',
  replies: [
    "I don't have that one in my FAQ yet — I've noted your question so John can add it. Try one of these instead:"
  ],
  chips: ['What are his skills?', 'What projects has he built?', 'What is his experience?', 'How can I contact him?']
};
