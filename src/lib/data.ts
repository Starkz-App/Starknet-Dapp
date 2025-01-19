export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
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
  views: number;
  comments: number;
  tags: string[];
  category: string;
  description: string;
  price: number;
  media: string;
  readTime: string;
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Eli',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Cryptography expert',
  },
  {
    id: '2',
    name: 'Alice',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Blockchain researcher',
  },
  {
    id: '3',
    name: 'Pedro',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Full-stack developer',
  },
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Understanding zk-STARKs: A Comprehensive Guide',
    content: 'Content for zk-STARKs article...',
    author: authors[0],
    date: '2025-01-15T10:00:00Z',
    format: '10 min read',
    likes: 120,
    hearts: 50,
    starkz: 30,
    crowns: 5,
    views: 150,
    comments: 25,
    tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
    category: 'Cryptography',
    description: 'An in-depth look at zk-STARKs and their applications in blockchain technology.',
    price: 0.1,
    media: '/post-AI-IP.png',
    readTime: '2 min read',
  },
  {
    id: '2',
    title: 'Implementing Zero-Knowledge Proofs in Rust',
    content: 'Content for ZKP in Rust article...',
    author: authors[1],
    date: '2025-01-20T14:30:00Z',
    format: '8 min read',
    likes: 95,
    hearts: 40,
    starkz: 20,
    crowns: 3,
    views: 120,
    comments: 18,
    tags: ['Rust', 'Zero-Knowledge Proofs', 'Cryptography'],
    category: 'Programming',
    description: 'A practical guide to implementing ZKPs using the Rust programming language.',
    price: 0.05,
    media: '/background.jpg',
    readTime: '2 min read',
  },
  {
    id: '3',
    title: 'The Future of Privacy in Blockchain: zk-STARKs and Beyond',
    content: 'Content for future of privacy article...',
    author: authors[2],
    date: '2025-01-25T09:15:00Z',
    format: '12 min read',
    likes: 150,
    hearts: 70,
    starkz: 40,
    crowns: 8,
    views: 20,
    comments: 30,
    tags: ['Blockchain', 'Privacy', 'zk-STARKs', 'Cryptography'],
    category: 'Blockchain',
    description: 'Exploring the role of zk-STARKs and other advanced cryptographic techniques in shaping the future of privacy in blockchain systems.',
    price: 0.15,
    media: '/background.jpg',
    readTime: '2 min read',
  },
];

export const categories = Array.from(new Set(publications.map(pub => pub.category)));
export const allTags = Array.from(new Set(publications.flatMap(pub => pub.tags)));

export function getPublicationById(id: string): Publication | undefined {
  return publications.find(pub => pub.id === id);
}

export function getCommentsByPublicationId(publicationId: string): Comment[] {
  // This is a mock function. In a real application, you would fetch comments from a database.
  return [
    { id: '1', author: 'Robert', content: 'Great article!', createdAt: '2025-01-26T10:00:00Z' },
    { id: '2', author: 'David', content: 'Very informative, thanks!', createdAt: '2025-01-26T11:30:00Z' },
  ];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

