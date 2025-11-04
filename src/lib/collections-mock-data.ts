export interface Collection {
  id: string
  title: string
  description: string
  coverImage: string
  visibility: "public" | "private"
  collaborative: boolean
  articlesCount: number
  curator: {
    name: string
    avatar: string
    username: string
  }
  starkz: number
  followers: number
  tags: string[]
  createdAt: string
  updatedAt: string
  articles?: CollectionArticle[]
}

export interface CollectionArticle {
  id: string
  title: string
  author: {
    name: string
    avatar: string
    username: string
    slug: string // Added slug field to author object for linking to author pages
  }
  starkz: number
  comments: number
  readTime: number
  excerpt: string
  tags: string[]
  createdAt: string
  image: string
}

export const mockCollections: Collection[] = [
  {
    id: "1",
    title: "Web Development Mastery",
    description: "A comprehensive collection covering modern web development from fundamentals to advanced concepts",
    coverImage: "/modern-web-development-coding-workspace.jpg",
    visibility: "public",
    collaborative: true,
    articlesCount: 24,
    curator: {
      name: "Sarah Chen",
      avatar: "https://avatar.vercel.sh/sarah.png",
      username: "sarahchen",
    },
    starkz: 1250,
    followers: 342,
    tags: ["Web Development", "JavaScript", "React", "CSS"],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-03-20T14:30:00Z",
  },
  {
    id: "2",
    title: "Blockchain & Smart Contracts",
    description: "Deep dive into blockchain technology, smart contracts, and decentralized applications",
    coverImage: "/blockchain-network-digital-cryptocurrency.jpg",
    visibility: "public",
    collaborative: false,
    articlesCount: 18,
    curator: {
      name: "Marcus Johnson",
      avatar: "https://avatar.vercel.sh/marcus.png",
      username: "marcusj",
    },
    starkz: 2100,
    followers: 567,
    tags: ["Blockchain", "Smart Contracts", "Web3", "Solidity"],
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-03-18T16:45:00Z",
  },
  {
    id: "3",
    title: "Machine Learning Fundamentals",
    description: "Essential machine learning concepts, algorithms, and practical implementations",
    coverImage: "/ml-neural-network-visualization.png",
    visibility: "public",
    collaborative: true,
    articlesCount: 31,
    curator: {
      name: "Dr. Emily Rodriguez",
      avatar: "https://avatar.vercel.sh/emily.png",
      username: "emilyrodriguez",
    },
    starkz: 3450,
    followers: 892,
    tags: ["Machine Learning", "AI", "Python", "Data Science"],
    createdAt: "2023-11-10T08:30:00Z",
    updatedAt: "2024-03-22T11:20:00Z",
  },
  {
    id: "4",
    title: "UI/UX Design Excellence",
    description: "Best practices, principles, and modern approaches to creating exceptional user experiences",
    coverImage: "/ui-ux-design-interface-mockups.jpg",
    visibility: "public",
    collaborative: false,
    articlesCount: 27,
    curator: {
      name: "Alex Kim",
      avatar: "https://avatar.vercel.sh/alex.png",
      username: "alexkim",
    },
    starkz: 1890,
    followers: 445,
    tags: ["UI/UX", "Design", "Figma", "User Research"],
    createdAt: "2024-01-05T12:00:00Z",
    updatedAt: "2024-03-19T09:15:00Z",
  },
  {
    id: "5",
    title: "Cybersecurity Essentials",
    description: "Critical security concepts, best practices, and defense strategies for modern applications",
    coverImage: "/cybersecurity-digital-lock-network-security.jpg",
    visibility: "private",
    collaborative: true,
    articlesCount: 15,
    curator: {
      name: "James Wilson",
      avatar: "https://avatar.vercel.sh/james.png",
      username: "jameswilson",
    },
    starkz: 980,
    followers: 234,
    tags: ["Security", "Cryptography", "Privacy", "Penetration Testing"],
    createdAt: "2024-02-20T15:30:00Z",
    updatedAt: "2024-03-21T13:45:00Z",
  },
  {
    id: "6",
    title: "Cloud Architecture Patterns",
    description: "Scalable cloud solutions, microservices, and distributed systems architecture",
    coverImage: "/cloud-computing-infrastructure-network.jpg",
    visibility: "public",
    collaborative: false,
    articlesCount: 22,
    curator: {
      name: "Priya Patel",
      avatar: "https://avatar.vercel.sh/priya.png",
      username: "priyapatel",
    },
    starkz: 1670,
    followers: 398,
    tags: ["Cloud", "AWS", "Microservices", "DevOps"],
    createdAt: "2023-12-15T10:45:00Z",
    updatedAt: "2024-03-20T17:00:00Z",
  },
]

export const getCollectionById = (id: string): Collection | undefined => {
  const collection = mockCollections.find((c) => c.id === id)

  if (collection && id === "1") {
    // Add articles for the first collection as an example
    return {
      ...collection,
      articles: [
        {
          id: "1",
          title: "Modern JavaScript ES2024 Features",
          author: {
            name: "John Doe",
            avatar: "https://avatar.vercel.sh/john.png",
            username: "johndoe",
            slug: "john-doe", // Added slug
          },
          starkz: 245,
          comments: 18,
          readTime: 8,
          excerpt: "Explore the latest JavaScript features including decorators, pipeline operator, and more.",
          tags: ["JavaScript", "ES2024", "Web Development"],
          createdAt: "2024-03-15T10:00:00Z",
          image: "/javascript-code-editor.png",
        },
        {
          id: "2",
          title: "Building Scalable React Applications",
          author: {
            name: "Jane Smith",
            avatar: "https://avatar.vercel.sh/jane.png",
            username: "janesmith",
            slug: "jane-smith", // Added slug
          },
          starkz: 312,
          comments: 24,
          readTime: 12,
          excerpt: "Learn architectural patterns and best practices for building large-scale React applications.",
          tags: ["React", "Architecture", "Performance"],
          createdAt: "2024-03-14T14:30:00Z",
          image: "/react-component-architecture.jpg",
        },
        {
          id: "3",
          title: "CSS Grid vs Flexbox: When to Use Each",
          author: {
            name: "Bob Johnson",
            avatar: "https://avatar.vercel.sh/bob.png",
            username: "bobjohnson",
            slug: "bob-johnson", // Added slug
          },
          starkz: 189,
          comments: 15,
          readTime: 6,
          excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.",
          tags: ["CSS", "Layout", "Web Design"],
          createdAt: "2024-03-13T09:15:00Z",
          image: "/css-grid-flexbox-layout.jpg",
        },
        {
          id: "4",
          title: "TypeScript Advanced Types Deep Dive",
          author: {
            name: "Alice Brown",
            avatar: "https://avatar.vercel.sh/alice.png",
            username: "alicebrown",
            slug: "alice-brown", // Added slug
          },
          starkz: 278,
          comments: 21,
          readTime: 10,
          excerpt: "Master advanced TypeScript types including conditional types, mapped types, and template literals.",
          tags: ["TypeScript", "Programming", "Type Safety"],
          createdAt: "2024-03-12T16:45:00Z",
          image: "/typescript-code-types.jpg",
        },
        {
          id: "5",
          title: "Web Performance Optimization Techniques",
          author: {
            name: "Charlie Davis",
            avatar: "https://avatar.vercel.sh/charlie.png",
            username: "charliedavis",
            slug: "charlie-davis", // Added slug
          },
          starkz: 421,
          comments: 32,
          readTime: 15,
          excerpt:
            "Comprehensive strategies for optimizing web performance including lazy loading, code splitting, and caching.",
          tags: ["Performance", "Optimization", "Web Development"],
          createdAt: "2024-03-11T11:20:00Z",
          image: "/web-performance-dashboard.png",
        },
        {
          id: "6",
          title: "Next.js 15 App Router Guide",
          author: {
            name: "Diana Martinez",
            avatar: "https://avatar.vercel.sh/diana.png",
            username: "dianamartinez",
            slug: "diana-martinez", // Added slug
          },
          starkz: 356,
          comments: 28,
          readTime: 11,
          excerpt: "Complete guide to the Next.js App Router with server components, streaming, and data fetching.",
          tags: ["Next.js", "React", "Server Components"],
          createdAt: "2024-03-10T13:00:00Z",
          image: "/nextjs-app-router-code.jpg",
        },
      ],
    }
  }

  return collection
}
