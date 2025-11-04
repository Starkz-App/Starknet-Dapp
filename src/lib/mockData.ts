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
