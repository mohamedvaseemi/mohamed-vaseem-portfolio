// ============================================================
//  PORTFOLIO STATIC DATA — Edit this file to update your info
// ============================================================

export const heroData = {
  name: "Mohamed Vaseem",
  title: "Full-Stack Web Engineer",
  subtitle: "Building scalable, high-performance web applications — React, Next.js, Node.js, FastAPI & cloud-native backends.",
  availableTagline: "Open to Full-Time Opportunities · Mumbai / Pune",
  location: "Mumbai, Maharashtra, India",
  phone: "+91 9XXXXXXXXX",
  githubUrl: "https://github.com/vaseem-ismail-mohamed",
  linkedinUrl: "https://www.linkedin.com/in/mohamed-vaseem-ismail/",
  indeedUrl: "https://profile.indeed.com/?hl=en_IN&co=IN&from=gnav-homepage",
  resumeUrl: "/resume.pdf",
  email: "vaseem.ismail.mohamed@gmail.com",
};

export const aboutData = {
  heading: "About Me",
  bio: `Full-Stack Web Engineer based in Mumbai with 3+ years of experience building production-grade, scalable web applications. My core stack spans React, Next.js, TypeScript on the frontend and Node.js, FastAPI, PostgreSQL, and Redis on the backend.

I have shipped 30+ projects across SaaS, e-commerce, and enterprise domains — consistently delivering clean architecture, measurable performance gains, and seamless user experiences. I thrive at the intersection of product thinking and engineering execution.

Currently open to full-time engineering roles in Mumbai / Pune (immediate joiner, hybrid or remote).`,
  professionalSummary:
    "Full-Stack Web Engineer · 3+ yrs · React, Next.js, TypeScript, Node.js, FastAPI, PostgreSQL, Redis · 30+ shipped projects · 100% delivery success · Immediate joiner, Mumbai/Pune.",
  availabilityNote:
    "Actively seeking full-time engineering roles in Mumbai or Pune. Immediate joiner. Open to hybrid and remote positions.",
  stats: [
    { label: "Projects Delivered", value: "30+" },
    { label: "Client Rating", value: "5.0/5" },
    { label: "Success Rate", value: "100%" },
    { label: "Years Experience", value: "3+" },
  ],
};

export const skills = [
  // Frontend
  { name: "React.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "Redux / Zustand", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg", category: "Frontend" },
  { name: "Framer Motion", logo: "https://www.framer.com/favicon.ico", category: "Frontend" },
  // Backend
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Backend" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Backend" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Backend" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Backend" },
  { name: "REST / GraphQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", category: "Backend" },
  // Tools
  { name: "Git / GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "Tools" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "Tools" },
  { name: "AWS / Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Tools" },
  { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", category: "Tools" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", category: "Tools" },
];

export const experiences = [
  {
    role: "Full-Stack Web Engineer (Contract)",
    company: "Independent Contractor",
    duration: "2022 – Present",
    description:
      "Engineered 30+ production web applications for global clients across SaaS, e-commerce, and enterprise verticals. Led full project lifecycle — architecture, development, deployment, and post-launch optimization.",
    highlights: [
      "Built CRM SaaS platform serving 10,000+ users (Next.js, MongoDB, Redis caching)",
      "Developed real-time booking engine with WebSocket notifications, reducing booking conflicts by 90%",
      "Integrated Stripe, PayPal & Razorpay payment flows processing $50K+ monthly",
      "Optimized critical API endpoints achieving 60% reduction in P95 latency",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Tech Startup (Contract)",
    duration: "2021 – 2022",
    description:
      "Designed and developed the company's core product UI in React and TypeScript, serving 5,000+ daily active users. Drove a 40% improvement in page load speed through systematic performance engineering.",
    highlights: [
      "Built responsive analytics dashboards with React and Recharts (10+ chart types)",
      "Implemented JWT-based auth flow with refresh token rotation",
      "Reduced bundle size by 40% via code splitting, tree-shaking, and lazy loading",
    ],
  },
];

export const projects = [
  {
    title: "Continuous Progress Review (CPR/CSR)",
    desc: "Enterprise-grade full-stack management platform for real-time corporate progress and CSR tracking. Handles 500+ concurrent users with sub-200ms API response times. Features role-based access control, PDF report generation, and Cloudinary-backed media management.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Cloudinary", "JWT", "REST API"],
    projectUrl: "https://cpr-csr-managements.vercel.app/",
    image: "https://res.cloudinary.com/dl5ngr2vz/image/upload/f_auto,q_auto/v1769449723/sepjpokc",
    category: "Full-Stack",
  },
];

export const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    school: "Anna University",
    year: "2018 – 2022",
    desc: "Graduated with distinction. Core coursework in Data Structures, Algorithms, Database Systems, and Web Technologies.",
  },
  {
    degree: "Full-Stack Web Development",
    school: "Online (Udemy / Coursera)",
    year: "2021 – 2022",
    desc: "Completed professional certifications in React, Node.js, MongoDB, and TypeScript development.",
  },
];

export const contactData = {
  email: "vaseem.ismail.mohamed@gmail.com",
  phone: "+91 7871915040",
  location: "Tamil Nadu, India.",
  githubUrl: "https://github.com/mohamedvaseemi",
  linkedinUrl: "https://www.linkedin.com/in/mohamed-vaseem-ismail/",
  indeedUrl: "https://profile.indeed.com/",
  resumeUrl: "https://drive.google.com/file/d/1M97jpYOdpio-BzyS9TYk59nqIQtCuroV/view?usp=sharing",
};
