export interface ExploreItem {
  id: string;
  title: string;
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
    author: 'Alice Johnson',
    description: 'A comprehensive guide to understanding the basics of blockchain technology and its applications.',
    category: 'Technology',
    tags: ['Blockchain', 'Cryptocurrency', 'Decentralization'],
    likes: 1250,
    hearts: 15000,
    publishedAt: '2023-06-15T10:00:00Z',
    price: 15,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '2',
    title: 'Advanced Machine Learning Techniques',
    author: 'Bob Smith',
    description: 'Explore cutting-edge machine learning algorithms and their practical implementations.',
    category: 'Data Science',
    tags: ['Machine Learning', 'AI', 'Data Analysis'],
    likes: 980,
    hearts: 12000,
    publishedAt: '2023-06-18T14:30:00Z',
    price: 1,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '3',
    title: 'The Future of Decentralized Finance',
    author: 'Carol Williams',
    description: 'An in-depth look at the evolving landscape of DeFi and its potential impact on traditional finance.',
    category: 'Finance',
    tags: ['DeFi', 'Blockchain', 'Cryptocurrency'],
    likes: 1500,
    hearts: 18000,
    publishedAt: '2023-06-20T09:15:00Z',
    price: 8,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '4',
    title: 'Quantum Computing Explained',
    author: 'David Brown',
    description: 'Demystifying quantum computing and its potential applications in various industries.',
    category: 'Technology',
    tags: ['Quantum Computing', 'Physics', 'Technology'],
    likes: 750,
    hearts: 9000,
    publishedAt: '2023-06-22T11:45:00Z',
    price: 17,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '5',
    title: 'Sustainable Energy Solutions',
    author: 'Emma Davis',
    description: 'Exploring innovative approaches to renewable energy and sustainable development.',
    category: 'Environment',
    tags: ['Renewable Energy', 'Sustainability', 'Climate Change'],
    likes: 1100,
    hearts: 13500,
    publishedAt: '2023-06-25T16:20:00Z',
    price: 6,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '6',
    title: 'Cybersecurity in the Digital Age',
    author: 'Frank Miller',
    description: 'Understanding modern cybersecurity threats and effective protection strategies.',
    category: 'Technology',
    tags: ['Cybersecurity', 'Digital Privacy', 'Hacking'],
    likes: 890,
    hearts: 11000,
    publishedAt: '2023-06-28T13:10:00Z',
    price: 90,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '7',
    title: 'The Art of Data Visualization',
    author: 'Grace Lee',
    description: 'Learn how to create compelling and informative data visualizations using modern tools.',
    category: 'Data Science',
    tags: ['Data Visualization', 'Analytics', 'Design'],
    likes: 1300,
    hearts: 16000,
    publishedAt: '2023-07-01T10:30:00Z',
    price: 27,
    type: 'Media',
    imageUrl: '/background.jpg'
  },
  {
    id: '8',
    title: 'Exploring the Metaverse',
    author: 'Henry Wilson',
    description: 'A journey into the concept of the metaverse and its potential impact on society.',
    category: 'Technology',
    tags: ['Metaverse', 'Virtual Reality', 'Augmented Reality'],
    likes: 950,
    hearts: 11500,
    publishedAt: '2023-07-03T15:45:00Z',
    price: 12,
    type: 'Article',
    imageUrl: '/background.jpg'
  },
  {
    id: '9',
    title: 'Genetic Engineering and Ethics',
    author: 'Isabel Rodriguez',
    description: 'Examining the ethical implications of advances in genetic engineering and biotechnology.',
    category: 'Science',
    tags: ['Genetics', 'Bioethics', 'Biotechnology'],
    likes: 800,
    hearts: 9500,
    publishedAt: '2023-07-06T12:20:00Z',
    price: 36,
    type: 'Topic',
    imageUrl: '/background.jpg'
  },
  {
    id: '10',
    title: 'The Psychology of Decision Making',
    author: 'Jack Thompson',
    description: 'Understanding the cognitive processes behind human decision making and their applications.',
    category: 'Psychology',
    tags: ['Decision Making', 'Cognitive Psychology', 'Behavioral Economics'],
    likes: 1050,
    hearts: 13000,
    publishedAt: '2023-07-09T14:00:00Z',
    price: 7,
    type: 'Media',
    imageUrl: '/background.jpg'
  }
];

export const categories = Array.from(new Set(exploreMockData.map(item => item.category)));
export const tags = Array.from(new Set(exploreMockData.flatMap(item => item.tags)));
export const types = Array.from(new Set(exploreMockData.map(item => item.type)));

