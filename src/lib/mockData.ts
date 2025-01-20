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
    title: 'Zero Knowledge Proofs: The Future of Privacy and Security in Finance, Healthcare, and Intellectual Property',
    content: 'Content here.',
    author: authors[0],
    publishedAt: '2025-01-13T10:00:00Z',
    readTime: '12 min read',
    likes: 65,
    views: 120,
    tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
    category: 'Cryptography',
    description: 'Zero Knowledge Proofs: The Future of Privacy and Security in Finance, Healthcare, and Intellectual Property.',
  },
  {
    id: '2',
    title: 'Implementing Zero-Knowledge Proofs in Rust',
    content: 'Implementing Zero-Knowledge Proofs in Rust',
    author: authors[1],
    publishedAt: '2025-01-11T14:30:00Z',
    readTime: '8 min read',
    likes: 95,
    views: 120,
    tags: ['Rust', 'Zero-Knowledge Proofs', 'Cryptography'],
    category: 'Programming',
    description: 'A practical guide to implementing ZKPs using the Rust programming language.',
  },
  {
    id: '3',
    title: 'Quantum Resistance: zk-STARKs',
    content: 'zk-STARKs are considered to be quantum-resistant, meaning they are secure against attacks from quantum computers.',
    author: authors[2],
    publishedAt: '2025-01-10T09:15:00Z',
    readTime: '12 min read',
    likes: 150,
    views: 2000,
    tags: ['Blockchain', 'Privacy', 'zk-STARKs', 'Cryptography'],
    category: 'Blockchain',
    description: 'zk-STARKs are considered to be quantum-resistant, meaning they are secure against attacks from quantum computers.',
  },
  {
    id: '4',
    title: 'The Future of Privacy in Blockchain: zk-STARKs and Beyond',
    content: 'The Future of Privacy in Blockchain: zk-STARKs and Beyond',
    author: authors[2],
    publishedAt: '2025-01-10T09:15:00Z',
    readTime: '12 min read',
    likes: 150,
    views: 2000,
    tags: ['Blockchain', 'Privacy', 'zk-STARKs', 'Cryptography'],
    category: 'Blockchain',
    description: 'Exploring the role of zk-STARKs and other advanced cryptographic techniques in shaping the future of privacy in blockchain systems.',
  },
  {
    id: '5',
    title: 'Understanding zk-STARKs: A Comprehensive Guide',
    content: 'Understanding zk-STARKs: A Comprehensive Guide',
    author: authors[0],
    publishedAt: '2025-01-11T10:00:00Z',
    readTime: '10 min read',
    likes: 120,
    views: 1500,
    tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
    category: 'Cryptography',
    description: 'An in-depth look at zk-STARKs and their applications in blockchain technology.',
  },
];

export interface IPListing {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  type: string;
  price: number;
  tags: string[];
  category: string;
  views: number;
  likes: number;
}

export const ipListings: IPListing[] = [
  {
    id: '1',
    title: 'Advanced Machine Learning Algorithm',
    description: 'A cutting-edge machine learning algorithm for image recognition.',
    author: 'Dr. Jane Smith',
    date: '2023-06-15',
    type: 'Algorithm',
    price: 500,
    tags: ['Machine Learning', 'AI', 'Image Recognition'],
    category: 'Artificial Intelligence',
    views: 1500,
    likes: 120
  },
  {
    id: '2',
    title: 'Innovative Blockchain Protocol',
    description: 'A new blockchain protocol designed for high-speed transactions.',
    author: 'John Doe',
    date: '2023-06-14',
    type: 'Protocol',
    price: 750,
    tags: ['Blockchain', 'Cryptocurrency', 'FinTech'],
    category: 'Blockchain',
    views: 2000,
    likes: 180
  },
  {
    id: '3',
    title: 'Quantum Computing Algorithm',
    description: 'An algorithm optimized for quantum computers, solving complex problems.',
    author: 'Dr. Alex Johnson',
    date: '2023-06-13',
    type: 'Algorithm',
    price: 1000,
    tags: ['Quantum Computing', 'Algorithm', 'Optimization'],
    category: 'Quantum Technology',
    views: 1800,
    likes: 150
  }
];

