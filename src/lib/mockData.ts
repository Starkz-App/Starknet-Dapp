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
  publishedAt: string;
  readTime: string;
  likes: number;
  views: number;
  tags: string[];
  category: string;
  description: string;
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Author Name',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Author bio',
  },
  {
    id: '2',
    name: 'Author Name',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Author bio',
  },
  {
    id: '3',
    name: 'Author Name',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Author bio',
  },
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Understanding zk-STARKs: A Comprehensive Guide',
    content: '...',
    author: authors[0],
    publishedAt: '2023-06-15T10:00:00Z',
    readTime: '10 min read',
    likes: 120,
    views: 1500,
    tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
    category: 'Cryptography',
    description: 'An in-depth look at zk-STARKs and their applications in blockchain technology.',
  },
  {
    id: '2',
    title: 'Implementing Zero-Knowledge Proofs in Rust',
    content: '...',
    author: authors[1],
    publishedAt: '2023-06-20T14:30:00Z',
    readTime: '8 min read',
    likes: 95,
    views: 1200,
    tags: ['Rust', 'Zero-Knowledge Proofs', 'Cryptography'],
    category: 'Programming',
    description: 'A practical guide to implementing ZKPs using the Rust programming language.',
  },
  {
    id: '3',
    title: 'The Future of Privacy in Blockchain: zk-STARKs and Beyond',
    content: '...',
    author: authors[2],
    publishedAt: '2023-06-25T09:15:00Z',
    readTime: '12 min read',
    likes: 150,
    views: 2000,
    tags: ['Blockchain', 'Privacy', 'zk-STARKs', 'Cryptography'],
    category: 'Blockchain',
    description: 'Exploring the role of zk-STARKs and other advanced cryptographic techniques in shaping the future of privacy in blockchain systems.',
  },
];

