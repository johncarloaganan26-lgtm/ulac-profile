/**
 * Initial mock blogs dataset for Ulacdev MIS.
 * Contains 6 realistic developer blog posts with full content and metadata.
 */

export const INITIAL_BLOGS = [
  {
    id: 'blog-1',
    title: 'Building My Developer Portfolio',
    slug: 'building-my-developer-portfolio',
    excerpt: 'A deep dive into designing and architecting a modern, high-performance developer portfolio with React, responsive design, and bespoke interactions.',
    content: `Building a portfolio website as a software engineer is often harder than developing enterprise software. When designing for clients or companies, requirements and branding are pre-defined. When designing for yourself, the canvas is wide open.

### The Vision and Aesthetic

For my developer portfolio at **Ulacdev**, the primary goal was to convey technical precision, visual refinement, and engineering depth. I opted for a modern obsidian dark theme paired with clean typography and subtle micro-animations that emphasize content without creating visual noise.

Key architectural considerations included:
- **Zero layout shifts:** Optimizing media dimensions, font loading, and layout structure to guarantee smooth initial render.
- **Accessible keyboard navigation:** Ensuring every interactive card, modal, and button has visible focus indicators and accessible ARIA attributes.
- **Responsive design across devices:** Delivering an optimal experience across ultrawide monitors, laptops, tablets, and mobile smartphones.

### Technical Stack & Key Takeaways

I decided to power the portfolio using React and modern CSS. Creating custom components rather than relying solely on generic component libraries allowed complete creative control over every corner radius, border contrast, and animation timing.

The feedback from clients and peers has been overwhelmingly positive. A developer portfolio is never truly "finished"—it evolves alongside every new system, framework, and architecture you master.`,
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['React', 'Portfolio', 'UI/UX', 'Frontend'],
    author: 'John Carlo Aganan',
    status: 'Published',
    createdAt: '2025-10-24T08:30:00.000Z',
    updatedAt: '2025-10-25T14:15:00.000Z',
    views: 482
  },
  {
    id: 'blog-2',
    title: 'What I Learned From My First Web Development Project',
    slug: 'what-i-learned-from-my-first-web-development-project',
    excerpt: 'Key lessons on state management, database schema design, and asynchronous operations learned while delivering my first production client project.',
    content: `Every developer remembers the moment their first real project went live to actual users. The thrill of deploying code to production is immediately matched by the humbling realization of edge cases you never anticipated.

### 1. State Management is Harder Than Syntax
Early in my development journey, I believed knowing JavaScript syntax and React hooks was sufficient. However, managing asynchronous state—such as handling network retries, race conditions, and optimistic UI updates—is where true engineering discipline begins.

### 2. Schema Design Matters from Day One
Normalizing database tables, establishing foreign key constraints, and indexing frequently queried columns save countless hours later on. Whenever possible, invest time upfront planning data models before writing a single API endpoint.

### 3. Clear Communication Beats Clever Code
Writing maintainable, self-documenting code with comprehensive error handling is infinitely more valuable than creating clever one-liners that confound your teammates three months later.`,
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
    category: 'Personal Learning',
    tags: ['Full Stack', 'Career', 'Database', 'Best Practices'],
    author: 'John Carlo Aganan',
    status: 'Published',
    createdAt: '2025-10-18T11:20:00.000Z',
    updatedAt: '2025-10-19T09:40:00.000Z',
    views: 318
  },
  {
    id: 'blog-3',
    title: 'Getting Started With React',
    slug: 'getting-started-with-react',
    excerpt: 'An accessible, component-first guide to mastering React fundamentals including hooks, one-way data flow, and modern project structuring.',
    content: `React remains one of the most dominant and versatile libraries in modern frontend engineering. Its component-driven architecture allows developers to break complex user interfaces into predictable, modular building blocks.

### The Core React Mental Model

To master React, you need to understand three fundamental concepts:
1. **Components as Pure Functions of State:** UI is rendered in response to state changes. When state changes, React recalculates the virtual DOM and efficiently updates the real DOM.
2. **One-Way Data Flow:** Data travels down through props; events travel up through callbacks. This makes tracing bugs significantly easier compared to two-way data binding.
3. **The Hook Ecosystem:** Hooks like \`useState\`, \`useEffect\`, \`useMemo\`, and \`useCallback\` allow functional components to encapsulate state and lifecycle logic cleanly.

### Structuring Scalable React Applications

As applications scale, avoid placing all logic into monolithic components. Separate presentation from data fetching, keep custom hooks focused on single responsibilities, and maintain consistent file directory conventions.`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    category: 'Tutorials',
    tags: ['React', 'JavaScript', 'Frontend', 'Tutorial'],
    author: 'John Carlo Aganan',
    status: 'Published',
    createdAt: '2025-10-12T15:00:00.000Z',
    updatedAt: '2025-10-14T10:00:00.000Z',
    views: 524
  },
  {
    id: 'blog-4',
    title: 'My Approach to Building Responsive Websites',
    slug: 'my-approach-to-building-responsive-websites',
    excerpt: 'A practical framework for mobile-first CSS layout, fluid typography, flexible grids, and touch-friendly interface patterns.',
    content: `Responsive web design is no longer just about viewport breakpoints; it is about building interfaces that gracefully adapt to varying device contexts, input modalities, and display densities.

### The Mobile-First Paradigm

Designing and writing CSS mobile-first forces you to prioritize content hierarchy and core functionality before introducing multi-column desktop layouts. 

\`\`\`css
/* Base styles: Mobile default */
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Tablet & Desktop enhancement */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
    gap: 2.5rem;
  }
}
\`\`\`

### Fluid Typography & Spacing

Using modern CSS functions like \`clamp()\` allows typography and padding to scale smoothly between minimum and maximum screen sizes without sudden jumps across arbitrary breakpoints.

Always test your interfaces with real touch devices, simulated throttled networks, and differing system font sizes to ensure accessibility for every visitor.`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    category: 'Web Development',
    tags: ['CSS', 'Responsive', 'Mobile First', 'Design System'],
    author: 'John Carlo Aganan',
    status: 'Published',
    createdAt: '2025-10-08T09:15:00.000Z',
    updatedAt: '2025-10-09T16:30:00.000Z',
    views: 290
  },
  {
    id: 'blog-5',
    title: 'Exploring AI Tools for Developers',
    slug: 'exploring-ai-tools-for-developers',
    excerpt: 'How modern generative AI agents, code intelligence, and automated testing tools can accelerate engineering workflows when used effectively.',
    content: `The development landscape is undergoing rapid transformation with the rise of autonomous coding agents and LLM-assisted workflows. Far from replacing software engineers, these tools are elevating engineers into architects.

### Where AI Provides the Greatest Leverage

1. **Scaffolding and Boilerplate:** Generating initial test suites, repetitive mock datasets, and schema migrations in seconds.
2. **Refactoring and Modernization:** Converting legacy syntax into modern idiomatic code while preserving existing semantics.
3. **Exploratory Debugging:** Providing rapid hypotheses and root cause analyses for obscure compiler errors or edge case exceptions.

### The Critical Role of Human Oversight

While AI tools generate code quickly, the engineer remains responsible for system architecture, security considerations, performance characteristics, and correctness. Code reviews and thorough integration testing are more vital than ever.`,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    category: 'AI and Technology',
    tags: ['AI', 'Productivity', 'Tools', 'Architecture'],
    author: 'John Carlo Aganan',
    status: 'Draft',
    createdAt: '2025-10-03T14:45:00.000Z',
    updatedAt: '2025-10-12T18:20:00.000Z',
    views: 86
  },
  {
    id: 'blog-6',
    title: 'Lessons From Developing a Management System',
    slug: 'lessons-from-developing-a-management-system',
    excerpt: 'Practical insights from building multi-tenant management systems, role-based access control, and real-time administrative dashboards.',
    content: `Management Information Systems (MIS) demand a different engineering discipline than consumer-facing landing pages. In an admin dashboard, density, responsiveness, operational speed, and reliable data mutations are paramount.

### Key Pillars of a Robust MIS

- **Data Density Without Clutter:** Displaying actionable information efficiently while maintaining clear visual hierarchy.
- **Immediate Operational Feedback:** Providing clear feedback, optimistic state updates, and accessible confirmation modals for destructive operations like deletions.
- **Audit Trails & Activity Logs:** Capturing timestamped events for inquiries, moderation decisions, and content publication.

Building **Ulacdev MIS** provided valuable lessons in organizing dashboard analytics, inquiries tracking, testimonial approval, and full content management into a cohesive, monochrome administration console.`,
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
    category: 'Projects',
    tags: ['Admin', 'MIS', 'Dashboard', 'Architecture'],
    author: 'John Carlo Aganan',
    status: 'Draft',
    createdAt: '2025-09-28T10:00:00.000Z',
    updatedAt: '2025-10-11T12:00:00.000Z',
    views: 45
  }
];

export const BLOG_CATEGORIES = [
  'All Categories',
  'Web Development',
  'Projects',
  'AI and Technology',
  'Tutorials',
  'Personal Learning'
];
