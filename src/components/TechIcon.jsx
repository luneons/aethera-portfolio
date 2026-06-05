import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiGraphql,
  SiDocker,
  SiGit,
  SiGithub,
  SiPhp,
  SiBootstrap,
  SiVercel,
  SiNetlify,
  SiFramer,
  SiRedux,
  SiCodeigniter,
  SiHtml5,
  SiCss,
  SiVuedotjs,
  SiNuxt,
  SiSass,
  SiGreensock,
  SiMui,
  SiRadixui,
  SiStorybook,
  SiNestjs,
  SiPython,
  SiFastapi,
  SiFlask,
  SiSocketdotio,
  SiRedis,
  SiVite,
  SiOpenai,
  SiJsonwebtokens,
  SiAuth0,
} from 'react-icons/si'
import { FiCpu, FiZap, FiMessageSquare, FiUsers, FiClock, FiSearch } from 'react-icons/fi'

// Peta nama tech → icon component. Key harus lowercase.
const iconMap = {
  // Languages
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: SiPython,
  php: SiPhp,

  // Frontend frameworks
  react: SiReact,
  'next.js': SiNextdotjs,
  nextjs: SiNextdotjs,
  'vue.js': SiVuedotjs,
  vuejs: SiVuedotjs,
  'nuxt.js': SiNuxt,
  nuxtjs: SiNuxt,
  vite: SiVite,

  // CSS & UI
  tailwind: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  css: SiCss,
  css3: SiCss,
  html: SiHtml5,
  html5: SiHtml5,
  'sass / scss': SiSass,
  sass: SiSass,
  scss: SiSass,
  bootstrap: SiBootstrap,
  'material ui': SiMui,
  'radix ui': SiRadixui,
  storybook: SiStorybook,

  // Animation
  'framer motion': SiFramer,
  framer: SiFramer,
  gsap: SiGreensock,

  // State management
  redux: SiRedux,
  'redux / zustand': SiRedux,
  zustand: SiRedux,

  // Backend frameworks
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  'express.js': SiExpress,
  expressjs: SiExpress,
  nestjs: SiNestjs,
  codeigniter: SiCodeigniter,
  'php / codeigniter': SiCodeigniter,
  'fastapi / flask': SiFastapi,
  fastapi: SiFastapi,
  flask: SiFlask,

  // API & Communication
  graphql: SiGraphql,
  'rest & graphql api': SiGraphql,
  'socket.io / websocket': SiSocketdotio,
  'socket.io': SiSocketdotio,
  websocket: SiSocketdotio,
  'webhook & queue': FiZap,
  microservices: FiCpu,

  // Auth
  'authentication & jwt': SiJsonwebtokens,
  'oauth2 / sso': SiAuth0,

  // Database
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mongodb: SiMongodb,
  prisma: SiPrisma,
  'prisma orm': SiPrisma,
  'redis / caching': SiRedis,
  redis: SiRedis,

  // DevOps
  docker: SiDocker,
  git: SiGit,
  'git & github': SiGithub,
  github: SiGithub,
  vercel: SiVercel,
  'vercel / netlify': SiVercel,
  netlify: SiNetlify,
  'ci/cd pipeline': FiZap,

  // AI
  'ai / llm': SiOpenai,
  'ai integration (llm api)': SiOpenai,
  'openai / gemini / claude': SiOpenai,
  'prompt engineering': FiCpu,
  'rag & ai workflows': FiCpu,

  // Soft skills (ikon generik)
  communication: FiMessageSquare,
  teamwork: FiUsers,
  'time management': FiClock,
  'problem solving': FiSearch,
}

// Komponen icon tech stack. Menerima nama (case-insensitive).
export default function TechIcon({ name, size = 14, className = '' }) {
  const Icon = iconMap[name.toLowerCase()]
  if (!Icon) return null
  return <Icon size={size} className={className} />
}
