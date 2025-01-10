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
  hearts: number;
  starkz: number;
  crowns: number;
  views: number;
  comments: number;
  tags: string[];
  category: string;
  description: string;
  price: number;
}

export const authors: Author[] = [
  {
    id: '1',
    name: 'Dr. Eli Ben-Sasson',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Cryptography expert and co-founder of StarkWare',
  },
  {
    id: '2',
    name: 'Alice Johnson',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Blockchain researcher and enthusiast',
  },
  {
    id: '3',
    name: 'Bob Smith',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Senior software engineer specializing in zero-knowledge proofs',
  },
];

export const publications: Publication[] = [
  {
    id: '1',
    title: 'Understanding zk-STARKs: A Comprehensive Guide',
    content: 'Content for zk-STARKs article...',
    author: authors[0],
    publishedAt: '2023-06-15T10:00:00Z',
    readTime: '10 min read',
    likes: 120,
    hearts: 50,
    starkz: 30,
    crowns: 5,
    views: 1500,
    comments: 25,
    tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
    category: 'Cryptography',
    description: 'An in-depth look at zk-STARKs and their applications in blockchain technology.',
    price: 0.1,
  },
  {
    id: '2',
    title: 'Implementing Zero-Knowledge Proofs in Rust',
    content: 'Content for ZKP in Rust article...',
    author: authors[1],
    publishedAt: '2023-06-20T14:30:00Z',
    readTime: '8 min read',
    likes: 95,
    hearts: 40,
    starkz: 20,
    crowns: 3,
    views: 1200,
    comments: 18,
    tags: ['Rust', 'Zero-Knowledge Proofs', 'Cryptography'],
    category: 'Programming',
    description: 'A practical guide to implementing ZKPs using the Rust programming language.',
    price: 0.05,
  },
  {
    id: '3',
    title: 'The Future of Privacy in Blockchain: zk-STARKs and Beyond',
    content: 'Content for future of privacy article...',
    author: authors[2],
    publishedAt: '2023-06-25T09:15:00Z',
    readTime: '12 min read',
    likes: 150,
    hearts: 70,
    starkz: 40,
    crowns: 8,
    views: 2000,
    comments: 30,
    tags: ['Blockchain', 'Privacy', 'zk-STARKs', 'Cryptography'],
    category: 'Blockchain',
    description: 'Exploring the role of zk-STARKs and other advanced cryptographic techniques in shaping the future of privacy in blockchain systems.',
    price: 0.15,
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
    { id: '1', author: 'Alice', content: 'Great article!', createdAt: '2023-06-26T10:00:00Z' },
    { id: '2', author: 'Bob', content: 'Very informative, thanks!', createdAt: '2023-06-26T11:30:00Z' },
  ];
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

