export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  verified: boolean;
}

export interface Publication {
  id: string;
  title: string;
  content: string;
  author: Author;
  date: string;
  format: string;
  likes: number;
  hearts: number;
  starkz: number;
  crowns: number;
  comments: number;
  tags: string[];
  categories: string[];
  excerpt: string;
  media: string;
  slug: string;
  collection: string;
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Pedro',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Cryptography expert',
    verified: true,
  },
  {
    id: '2',
    name: 'Alice',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Blockchain researcher',
    verified: true,
  },
  {
    id: '3',
    name: 'Rodrigo',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Full-stack developer',
    verified: true,
  },
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'IP Tokenization: Empowering the New Economy at the Intersection of AI',
    content: 'IP Tokenization: Empowering the New Economy at the Intersection of AI',
    author: authors[0],
    date: '2025-01-15T10:00:00Z',
    format: '10 min read',
    likes: 120,
    hearts: 50,
    starkz: 30,
    crowns: 5,
    comments: 2,
    tags: ['Blockchain', 'IP', 'Tokenization', 'AI'],
    categories: ['Blockchain'],
    excerpt: 'IP Tokenization: Empowering the New Economy at the Intersection of AI.',
    media: '/post-AI-IP.png',
    slug: 'ip-tokenization-empowering-the-new-economy-at-the-intersection-of-ai',
    collection: '1',
  },
  {
    id: '2',
    title: 'IP Tokenization: Empowering the New Economy at the Intersection of AI',
    content: 'IP Tokenization: Empowering the New Economy at the Intersection of AI',
    author: authors[1],
    date: '2025-01-20T14:30:00Z',
    format: 'Article',
    likes: 95,
    hearts: 40,
    starkz: 20,
    crowns: 3,
    comments: 18,
    tags: ['Blockchain', 'IP', 'Tokenization', 'AI'],
    categories: ['Tokenization'],
    excerpt: 'IP Tokenization: Empowering the New Economy at the Intersection of AI',
    slug: 'ip-tokenization-empowering-the-new-economy-at-the-intersection-of-ai',
    media: '/post-new-economy.png',
    collection: '1',
  },
  {
    id: '3',
    title: 'Programmable IP: Tokenizing Intelligence on the Integrity Web',
    content: 'Programmable IP: Tokenizing Intelligence on the Integrity Web',
    author: authors[2],
    date: '2025-01-25T09:15:00Z',
    format: '12 min read',
    likes: 150,
    hearts: 70,
    starkz: 40,
    crowns: 8,
    comments: 30,
    tags: ['Blockchain', 'IP', 'Tokenization', 'Integrity Web'],
    categories: ['Blockchain'],
    excerpt: 'Programmable IP: Tokenizing Intelligence on the Integrity Web.',
    media: '/post-Programmable-IP.png',
    slug: 'programmable-ip-tokenizing-intelligence-on-the-integrity-web',
    collection: '1',
  },
];

//export const categories = Array.from(new Set(publications.map(pub => pub.categories)));
export const allTags = Array.from(new Set(publications.flatMap(pub => pub.tags)));

export const collections = [
  "Cryptography",
  "Blockchain",
  "Rust Programming",
  "Zero-Knowledge",
  "Development",
  "Decentralized Finance",
  "Smart Contract",
  "Starknet",
]

export function getPublicationById(id: string): Publication | undefined {
  return publications.find(pub => pub.id === id);
}

export function getCommentsByPublicationId(publicationId: string): Comment[] {
  // This is a mock function. In a real application, you would fetch comments from a database.
  return [
    { id: '1', author: 'Robert', content: 'Great article!', createdAt: '2025-01-12T10:00:00Z' },
    { id: '2', author: 'David', content: 'Very informative, thanks!', createdAt: '2025-01-16T11:30:00Z' },
  ];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}




export interface Category {
  id: string
  name: string
}

export const categories: Category[] = [
  { id: "1", name: "Blockchain" },
  { id: "2", name: "Artificial Intelligence" },
  { id: "3", name: "Cryptography" },
  { id: "4", name: "Data Science" },
  { id: "5", name: "Web Development" },
  { id: "6", name: "Machine Learning" },
  { id: "7", name: "Cybersecurity" },
  { id: "8", name: "Quantum Computing" },
]

