export interface ExploreItem {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  category: string;
  tags: string[];
  likes: number;
  hearts: number;
  publishedAt: string;
  price: number;
  type: 'Article' | 'Media' | 'Topic' | 'NFT';
  imageUrl: string;
}

export const exploreMockData: ExploreItem[] = [
  {
    id: '1',
    title: 'Introduction to Blockchain Technology',
    slug: 'test-slug',
    author: 'Alice Johnson',
    description: 'A comprehensive guide to understanding the basics of blockchain technology and its applications.',
    category: 'Technology',
    tags: ['Blockchain', 'Cryptocurrency', 'Decentralization'],
    likes: 125,
    hearts: 150,
    publishedAt: '2025-01-15T10:00:00Z',
    price: 15,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning Techniques',
    author: 'Bob Smith',
    slug: 'test-slug',
    description: 'Explore cutting-edge machine learning algorithms and their practical implementations.',
    category: 'Data Science',
    tags: ['Machine Learning', 'AI', 'Data Analysis'],
    likes: 80,
    hearts: 120,
    publishedAt: '2025-01-18T14:30:00Z',
    price: 1,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '3',
    title: 'The Future of Decentralized Finance',
    author: 'Carol Williams',
    slug: 'test-slug',
    description: 'An in-depth look at the evolving landscape of DeFi and its potential impact on traditional finance.',
    category: 'Finance',
    tags: ['DeFi', 'Blockchain', 'Cryptocurrency'],
    likes: 50,
    hearts: 180,
    publishedAt: '2025-01-20T09:15:00Z',
    price: 8,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '4',
    title: 'Quantum Computing Explained',
    author: 'David Brown',
    slug: 'test-slug',
    description: 'Demystifying quantum computing and its potential applications in various industries.',
    category: 'Technology',
    tags: ['Quantum Computing', 'Physics', 'Technology'],
    likes: 70,
    hearts: 90,
    publishedAt: '2025-01-22T11:45:00Z',
    price: 17,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '5',
    title: 'Sustainable Energy Solutions',
    author: 'Emma Davis',
    slug: 'test-slug',
    description: 'Exploring innovative approaches to renewable energy and sustainable development.',
    category: 'Environment',
    tags: ['Renewable Energy', 'Sustainability', 'Climate Change'],
    likes: 110,
    hearts: 135,
    publishedAt: '2025-01-25T16:20:00Z',
    price: 6,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '6',
    title: 'Cybersecurity in the Digital Age',
    author: 'Frank Miller',
    slug: 'test-slug',
    description: 'Understanding modern cybersecurity threats and effective protection strategies.',
    category: 'Technology',
    tags: ['Cybersecurity', 'Digital Privacy', 'Hacking'],
    likes: 89,
    hearts: 110,
    publishedAt: '2025-01-28T13:10:00Z',
    price: 90,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '7',
    title: 'The Art of Data Visualization',
    author: 'Grace Lee',
    slug: 'test-slug',
    description: 'Learn how to create compelling and informative data visualizations using modern tools.',
    category: 'Data Science',
    tags: ['Data Visualization', 'Analytics', 'Design'],
    likes: 13,
    hearts: 16,
    publishedAt: '2025-01-01T10:30:00Z',
    price: 27,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '8',
    title: 'Exploring the Metaverse',
    author: 'Henry Wilson',
    slug: 'test-slug',
    description: 'A journey into the concept of the metaverse and its potential impact on society.',
    category: 'Technology',
    tags: ['Metaverse', 'Virtual Reality', 'Augmented Reality'],
    likes: 95,
    hearts: 115,
    publishedAt: '2025-01-03T15:45:00Z',
    price: 12,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '9',
    title: 'Genetic Engineering and Ethics',
    author: 'Isabel Rodriguez',
    slug: 'test-slug',
    description: 'Examining the ethical implications of advances in genetic engineering and biotechnology.',
    category: 'Science',
    tags: ['Genetics', 'Bioethics', 'Biotechnology'],
    likes: 80,
    hearts: 95,
    publishedAt: '2025-01-06T12:20:00Z',
    price: 36,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '10',
    title: 'The Psychology of Decision Making',
    author: 'Jack Thompson',
    slug: 'test-slug',
    description: 'Understanding the cognitive processes behind human decision making and their applications.',
    category: 'Psychology',
    tags: ['Decision Making', 'Cognitive Psychology', 'Behavioral Economics'],
    likes: 10,
    hearts: 13,
    publishedAt: '2025-01-09T14:00:00Z',
    price: 7,
    type: 'Media',
    imageUrl: '/background.jpg'
  }
];

export const categories = Array.from(new Set(exploreMockData.map(item => item.category)));
export const tags = Array.from(new Set(exploreMockData.flatMap(item => item.tags)));
export const types = Array.from(new Set(exploreMockData.map(item => item.type)));

