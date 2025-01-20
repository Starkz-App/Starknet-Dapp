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
    format: string;
    likes: number;
    hearts: number;
    tags: string[];
    category: string;
    media: string;
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
      content: 'Zero Knowledge Proofs: The Future of Privacy and Security in Finance, Healthcare, and Intellectual Property.',
      author: authors[0],
      publishedAt: '2025-01-13T10:00:00Z',
      format: 'Article',
      likes: 65,
      hearts: 120,
      tags: ['zk-STARKs', 'Zero-Knowledge Proofs', 'Blockchain'],
      category: 'Cryptography',
      media: '/post-mediolano-protocol.png',
      description: 'Zero Knowledge Proofs: The Future of Privacy and Security in Finance, Healthcare, and IP.',
    },
    {
      id: '2',
      title: 'The Crucial Role of Blockchain and Zero-Knowledge Proofs for Protecting Intellectual Property in the AI Era',
      content: 'In today’s rapidly evolving technological landscape, the advent of artificial intelligence (AI) has revolutionized numerous industries, fostering unprecedented growth and innovation. However, this era of rapid advancement brings with it a host of challenges, particularly in the realm of intellectual property (IP) protection. Traditional methods of safeguarding IP are increasingly proving inadequate, necessitating innovative solutions. Enter blockchain technology and zero-knowledge proofs (ZKPs), two powerful tools that hold the potential to transform IP protection in the AI era.',
      author: authors[1],
      publishedAt: '2025-01-11T14:30:00Z',
      format: 'Article',
      likes: 9,
      hearts: 10,
      tags: ['AI', 'Blockchain', 'Intellectual Property'],
      category: 'Programming',
      media: '/post-AI-IP.png',
      description: 'The Crucial Role of Blockchain and Zero-Knowledge Proofs for Protecting Intellectual Property in the AI Era.',
    },
    {
      id: '3',
      title: 'IP Tokenization: Empowering the New Economy at the Intersection of AI', 
      content: 'In the burgeoning era of artificial intelligence (AI), the concept of value is undergoing a profound transformation. Intellectual property (IP) has emerged as the cornerstone of the intelligence economy, representing a scarce and invaluable asset.',
      author: authors[1],
      publishedAt: '2025-01-10T09:15:00Z',
      format: 'Article',
      likes: 15,
      hearts: 20,
      tags: ['Blockchain', 'IP', 'Tokenization', 'AI'],
      category: 'AI',
      media: 'post-new-economy.png',
      description: 'IP Tokenization: Empowering the New Economy at the Intersection of AI.',
    },
    {
      id: '4',
      title: 'Programmable IP: Tokenizing Intelligence on the Integrity Web',
      content: 'The rapid evolution of the digital landscape has given birth to new paradigms and technologies that are reshaping the way we interact with information and assets. Among these, the concepts of programmable intellectual property (IP) and the Integrity Web stand out as transformative forces that promise to revolutionize the management, distribution, and utilization of intelligence. This publication explores how programmable IP will tokenize intelligence on the Integrity Web, ushering in a new era of transparency, security, and innovation.',
      author: authors[1],
      publishedAt: '2025-01-10T09:15:00Z',
      format: 'Article',
      likes: 10,
      hearts: 28,
      tags: ['Blockchain', 'IP', 'Tokenization', 'Integrity Web'],
      category: 'Blockchain',
      media: '/post-AI-IP.png',
      description: 'Programmable IP: Tokenizing Intelligence on the Integrity Web',
    },
  ];
  
  