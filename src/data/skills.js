// Kategori skill ditampilkan sebagai card. Level dipakai untuk progress bar.
export const skillCategories = [
  {
    title: 'Frontend',
    description: 'React, Next.js, UI modern & responsif',
    icon: 'layout',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Redux / Zustand', level: 82 },
    ],
  },
  {
    title: 'Backend',
    description: 'Node.js, API, arsitektur server',
    icon: 'server',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express.js', level: 86 },
      { name: 'REST & GraphQL API', level: 84 },
      { name: 'PHP / CodeIgniter', level: 85 },
      { name: 'Authentication & JWT', level: 84 },
    ],
  },
  {
    title: 'Database',
    description: 'SQL & NoSQL, ORM, data modeling',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 88 },
      { name: 'MongoDB', level: 82 },
      { name: 'Prisma ORM', level: 84 },
    ],
  },
  {
    title: 'DevOps & Tools',
    description: 'Deployment, CI/CD, version control',
    icon: 'tools',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'CI/CD Pipeline', level: 78 },
    ],
  },
  {
    title: 'Soft Skill',
    description: 'Leadership, communication, problem solving',
    icon: 'users',
    skills: [
      { name: 'Communication', level: 88 },
      { name: 'Teamwork', level: 90 },
      { name: 'Problem Solving', level: 88 },
      { name: 'Time Management', level: 85 },
    ],
  },
]

// Badge teknologi yang ditampilkan di hero / about.
export const techBadges = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'Tailwind CSS',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Prisma',
  'GraphQL',
  'Docker',
  'Git',
  'PHP',
]
