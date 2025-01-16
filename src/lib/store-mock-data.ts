export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceInStarks: number;
  image: string;
  author: string;
  type: 'NFT' | 'Gift' | 'Heart' | 'Starkz' | 'ZK';
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Salmon Heart',
    description: 'Salmon Heart description.',
    price: 5,
    priceInStarks: 20,
    image: '/background.jpg',
    author: 'Starkz',
    type: 'Heart',
  },
  {
    id: '2',
    name: 'Alan Turing Shield',
    description: 'Dr. Alan Turing Shield.',
    price: 10,
    priceInStarks: 10,
    image: '/background.jpg',
    author: 'Starkz',
    type: 'Gift',
  },
  {
    id: '3',
    name: 'Satoshi Stamp',
    description: 'Satoshi Nakamoto aproval.',
    price: 3,
    priceInStarks: 30,
    image: '/background.jpg',
    author: 'Starkz',
    type: 'NFT',
  },
  {
    id: '4',
    name: 'ZK Quantum Proof',
    description: 'Dr. Eli Ben-Sasson ZK Quantum Proof seal.',
    price: 7,
    priceInStarks: 20,
    image: '/background.jpg',
    author: 'Starkz',
    type: 'ZK',
  },
  {
    id: '5',
    name: 'Starkz',
    description: 'Starks tokens for tipping and purchasing items in the store.',
    price: 1,
    priceInStarks: 11,
    image: '/background.jpg',
    author: 'Starkz',
    type: 'Starks'
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

