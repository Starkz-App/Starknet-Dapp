export interface Author {
  id: string
  name: string
  slug: string
  username: string
  avatar: string
  bio: string
  coverImage?: string
  location?: string
  website?: string
  twitter?: string
  github?: string
  joinedAt: string
  totalPublications: number
  totalStarkz: number
  followers: number
}

export interface Publication {
  id: string
  title: string
  author: Author
  urlSlug: string
  categories: string[]
  tags: string[]
  content: string
  excerpt: string
  collection: string
  publishedAt: string
  starkz: number
  comments: number
  readTime: string
  featuredMediaUrl: string
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Dr. Eli Ben-Sasson",
    slug: "eli-ben-sasson",
    username: "elibs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eli",
    bio: "Cryptography expert and co-founder of StarkWare. Pioneering zero-knowledge proof systems and blockchain scalability solutions.",
    coverImage: "/cryptography-blockchain-technology.jpg",
    location: "Tel Aviv, Israel",
    website: "https://starkware.co",
    twitter: "@EliBenSasson",
    github: "elibs",
    joinedAt: "2023-01-15T00:00:00Z",
    totalPublications: 12,
    totalStarkz: 1856,
    followers: 3420,
  },
  {
    id: "2",
    name: "Alice Johnson",
    slug: "alice-johnson",
    username: "alicej",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    bio: "Blockchain researcher and enthusiast. Passionate about decentralized systems and cryptographic protocols.",
    coverImage: "/blockchain-network-digital-cryptocurrency.jpg",
    location: "San Francisco, CA",
    website: "https://alicejohnson.dev",
    twitter: "@AliceBlockchain",
    github: "alicej",
    joinedAt: "2023-03-20T00:00:00Z",
    totalPublications: 8,
    totalStarkz: 892,
    followers: 1250,
  },
  {
    id: "3",
    name: "Bob Smith",
    slug: "bob-smith",
    username: "bobsmith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    bio: "Senior software engineer specializing in zero-knowledge proofs and cryptographic systems. Building the future of privacy.",
    coverImage: "/rust-code.png",
    location: "London, UK",
    website: "https://bobsmith.io",
    twitter: "@BobSmithDev",
    github: "bobsmith",
    joinedAt: "2023-02-10T00:00:00Z",
    totalPublications: 15,
    totalStarkz: 2103,
    followers: 2890,
  },
  {
    id: "4",
    name: "Sarah Chen",
    slug: "sarah-chen",
    username: "sarahc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Web3 developer and smart contract auditor. Ensuring security and reliability in decentralized applications.",
    coverImage: "/smart-contract-security-code.png",
    location: "Singapore",
    website: "https://sarahchen.tech",
    twitter: "@SarahChenWeb3",
    github: "sarahc",
    joinedAt: "2023-04-05T00:00:00Z",
    totalPublications: 10,
    totalStarkz: 1245,
    followers: 1780,
  },
  {
    id: "5",
    name: "Marcus Rodriguez",
    slug: "marcus-rodriguez",
    username: "marcusr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    bio: "DeFi protocol architect and researcher. Designing the next generation of decentralized financial systems.",
    coverImage: "/defi-finance-cryptocurrency.jpg",
    location: "Miami, FL",
    website: "https://marcusrodriguez.com",
    twitter: "@MarcusDeFi",
    github: "marcusr",
    joinedAt: "2023-05-12T00:00:00Z",
    totalPublications: 11,
    totalStarkz: 1567,
    followers: 2340,
  },
]

export const publications: Publication[] = [
  {
    id: "1",
    title: "Understanding zk-STARKs: A Comprehensive Guide",
    author: authors[0],
    urlSlug: "understanding-zk-starks-comprehensive-guide",
    categories: ["Cryptography", "Blockchain"],
    tags: ["zk-STARKs", "Zero-Knowledge Proofs", "Blockchain", "Privacy"],
    content:
      "Zero-Knowledge Scalable Transparent Arguments of Knowledge (zk-STARKs) represent a revolutionary advancement in cryptographic proof systems. Unlike their predecessor zk-SNARKs, STARKs offer transparency without requiring a trusted setup, making them more secure and practical for large-scale blockchain applications. This comprehensive guide explores the mathematical foundations, practical implementations, and real-world applications of zk-STARKs in modern blockchain systems. We'll dive deep into how these proofs enable privacy-preserving computations while maintaining verifiability and scalability.",
    excerpt:
      "An in-depth exploration of zk-STARKs technology and its transformative impact on blockchain scalability and privacy.",
    collection: "Cryptography Essentials",
    publishedAt: "2024-01-15T10:00:00Z",
    starkz: 156,
    comments: 42,
    readTime: "12 min read",
    featuredMediaUrl: "/cryptography-blockchain-technology.jpg",
  },
  {
    id: "2",
    title: "Implementing Zero-Knowledge Proofs in Rust",
    author: authors[1],
    urlSlug: "implementing-zero-knowledge-proofs-rust",
    categories: ["Programming", "Cryptography"],
    tags: ["Rust", "Zero-Knowledge Proofs", "Cryptography", "Development"],
    content:
      "Rust has emerged as the language of choice for implementing cryptographic systems due to its memory safety guarantees and performance characteristics. In this practical guide, we walk through building a complete zero-knowledge proof system from scratch using Rust. You'll learn about the arkworks library ecosystem, circuit design patterns, and optimization techniques for production-ready ZKP applications. We cover everything from basic proof generation to advanced topics like recursive proofs and proof aggregation.",
    excerpt:
      "A hands-on tutorial for building production-ready zero-knowledge proof systems using Rust and modern cryptographic libraries.",
    collection: "Rust Programming",
    publishedAt: "2024-01-20T14:30:00Z",
    starkz: 89,
    comments: 28,
    readTime: "15 min read",
    featuredMediaUrl: "/rust-code.png",
  },
  {
    id: "3",
    title: "The Future of Privacy in Blockchain: zk-STARKs and Beyond",
    author: authors[2],
    urlSlug: "future-privacy-blockchain-zk-starks-beyond",
    categories: ["Blockchain", "Privacy"],
    tags: ["Blockchain", "Privacy", "zk-STARKs", "Cryptography", "Future Tech"],
    content:
      "As blockchain technology matures, privacy has become a critical concern for both users and enterprises. This article examines the cutting edge of privacy-preserving technologies, with a focus on zk-STARKs and emerging cryptographic techniques. We explore how these technologies are being integrated into major blockchain platforms, their implications for regulatory compliance, and the future landscape of private, yet verifiable, decentralized systems. From confidential transactions to private smart contracts, discover how the next generation of blockchain privacy is being built.",
    excerpt:
      "Exploring the evolution of privacy technologies in blockchain and the role of advanced cryptographic techniques in shaping the future.",
    collection: "Blockchain Innovations",
    publishedAt: "2024-01-25T09:15:00Z",
    starkz: 203,
    comments: 67,
    readTime: "18 min read",
    featuredMediaUrl: "/blockchain-privacy-security.jpg",
  },
  {
    id: "4",
    title: "Smart Contract Security Best Practices",
    author: authors[3],
    urlSlug: "smart-contract-security-best-practices",
    categories: ["Blockchain", "Security"],
    tags: ["Smart Contracts", "Security", "Auditing", "Best Practices"],
    content:
      "Smart contract vulnerabilities have led to billions of dollars in losses. This comprehensive security guide covers essential practices every developer must follow to build secure smart contracts. Learn about common attack vectors like reentrancy, front-running, and integer overflow, along with defensive programming patterns and formal verification techniques. We provide real-world examples from major security incidents and demonstrate how to use modern security tools and frameworks to protect your contracts before deployment.",
    excerpt:
      "Essential security practices and defensive programming patterns for building bulletproof smart contracts.",
    collection: "Smart Contract Security",
    publishedAt: "2024-02-01T11:00:00Z",
    starkz: 134,
    comments: 51,
    readTime: "20 min read",
    featuredMediaUrl: "/smart-contract-security-code.png",
  },
  {
    id: "5",
    title: "DeFi Protocols: A Deep Dive",
    author: authors[4],
    urlSlug: "defi-protocols-deep-dive",
    categories: ["DeFi", "Blockchain"],
    tags: ["DeFi", "Protocols", "Finance", "Smart Contracts"],
    content:
      "Decentralized Finance has revolutionized traditional financial services by removing intermediaries and enabling permissionless access to financial products. This deep dive examines the architecture of major DeFi protocols including automated market makers, lending platforms, and yield aggregators. We analyze the economic mechanisms, smart contract designs, and risk management strategies that power these protocols. Understanding these fundamentals is crucial for anyone building or investing in the DeFi ecosystem.",
    excerpt:
      "A comprehensive analysis of DeFi protocol architecture, economic mechanisms, and the technology powering decentralized finance.",
    collection: "Decentralized Finance",
    publishedAt: "2024-02-05T16:20:00Z",
    starkz: 178,
    comments: 59,
    readTime: "22 min read",
    featuredMediaUrl: "/defi-finance-cryptocurrency.jpg",
  },
]

export interface Category {
  id: string
  name: string
}

export const categories: Category[] = [
  { id: "1", name: "Blockchain" },
  { id: "2", name: "Artificial Intelligence" },
  { id: "3", name: "Cryptography" },
  { id: "4", name: "Data Science" },
  { id: "5", name: "Web Development" },
  { id: "6", name: "Machine Learning" },
  { id: "7", name: "Cybersecurity" },
  { id: "8", name: "Quantum Computing" },
]

export const categoryNames = categories.map((c) => c.name)

export const allTags = Array.from(new Set(publications.flatMap((pub) => pub.tags)))

export const collections = [
  "Cryptography Essentials",
  "Blockchain Innovations",
  "Rust Programming",
  "Zero-Knowledge Proofs",
  "Web3 Development",
  "Decentralized Finance",
  "Smart Contract Security",
]

export function getPublicationById(id: string): Publication | undefined {
  return publications.find((pub) => pub.id === id)
}

export function getCommentsByPublicationId(publicationId: string): Comment[] {
  const mockComments: Record<string, Comment[]> = {
    "1": [
      {
        id: "1",
        author: "Alex Thompson",
        content:
          "Excellent breakdown of zk-STARKs! The comparison with zk-SNARKs really helped clarify the advantages. Looking forward to seeing more real-world implementations.",
        createdAt: "2024-01-16T10:30:00Z",
      },
      {
        id: "2",
        author: "Maria Garcia",
        content:
          "This is exactly what I needed to understand the mathematical foundations. The explanations are clear without oversimplifying the concepts. Thank you!",
        createdAt: "2024-01-16T14:45:00Z",
      },
      {
        id: "3",
        author: "James Chen",
        content:
          "Great article! Could you elaborate more on the performance implications when implementing STARKs at scale? Particularly interested in proof generation times.",
        createdAt: "2024-01-17T09:20:00Z",
      },
    ],
    "2": [
      {
        id: "1",
        author: "Sarah Williams",
        content:
          "The code examples are incredibly helpful. I've been struggling with arkworks documentation, and this tutorial filled in all the gaps. Bookmarked for future reference!",
        createdAt: "2024-01-21T11:15:00Z",
      },
      {
        id: "2",
        author: "David Kumar",
        content:
          "As a Rust developer new to cryptography, this was the perfect introduction. The step-by-step approach made complex concepts accessible.",
        createdAt: "2024-01-22T16:30:00Z",
      },
    ],
  }

  return mockComments[publicationId] || []
}

export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug)
}

export function getPublicationsByAuthor(authorId: string): Publication[] {
  return publications.filter((pub) => pub.author.id === authorId)
}
