export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceInStarks: number;
  image: string;
  author: string;
  type: 'NFT' | 'eBook' | 'Course' | 'Software' | 'Starks';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'zk-SNARKs and zk-STARKs',
    description: 'Advanced forms of zero-knowledge proofs.',
    price: 0.5,
    priceInStarks: 500,
    image: '/background.jpg',
    author: 'David',
    type: 'NFT',
  },
  {
    id: '2',
    name: 'Advanced Machine Learning Techniques',
    description: 'Comprehensive eBook on cutting-edge ML algorithms.',
    price: 0.1,
    priceInStarks: 100,
    image: '/background.jpg',
    author: 'Dr. Alan Turing',
    type: 'eBook',
  },
  {
    id: '3',
    name: 'Blockchain Fundamentals Course',
    description: 'In-depth video course on blockchain technology and its applications.',
    price: 0.3,
    priceInStarks: 300,
    image: '/background.jpg',
    author: 'Satoshi Nakamoto',
    type: 'Course',
  },
  {
    id: '4',
    name: 'Quantum Computing Simulator',
    description: 'Software tool for simulating quantum circuits and algorithms.',
    price: 0.2,
    priceInStarks: 200,
    image: '/background.jpg',
    author: 'Quantum Labs Inc.',
    type: 'Software',
  },
  {
    id: '5',
    name: 'Cyberpunk City NFT',
    description: 'A futuristic cityscape captured in a unique digital token.',
    price: 0.4,
    priceInStarks: 400,
    image: '/background.jpg',
    author: 'Neo Tokyo',
    type: 'NFT',
  },
  {
    id: '6',
    name: 'AI Ethics and Governance',
    description: 'eBook discussing the ethical implications of artificial intelligence.',
    price: 0.15,
    priceInStarks: 150,
    image: '/background.jpg',
    author: 'Dr. Eliza Moreau',
    type: 'eBook',
  },
  {
    id: '7',
    name: 'Starks Tokens',
    description: 'Starks tokens for tipping and purchasing items in the store.',
    price: 0.001,
    priceInStarks: 1,
    image: '/background.jpg',
    author: 'Starkz Platform',
    type: 'Starks',
  },
];

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  starksBalance: number;
}

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  walletAddress: '0x1234...5678',
  starksBalance: 1000,
};

