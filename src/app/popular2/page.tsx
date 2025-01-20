'use client'

import { useEffect, useState,} from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { exploreMockData, ExploreItem } from '@/lib/explore-mock-data'
import Link from 'next/link'
import { ThumbsUp, Eye, Clock, Tag, FileText, Video, Book, ImageIcon, Heart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useReadContract, useContract, useAccount, useSendTransaction} from "@starknet-react/core";
import { type Abi } from "starknet";
import { abi } from '@/abi/abi';

export default function PopularPostsPage() {
  const { address } = useAccount();
  //const { address: connectedAddress, isConnected, isConnecting } = useAccount();
  const contractAddress = '0x06141dc992e50fd6b0eba2c475058076c0c305b7cc689b53da6542af02982366';

  const [tokenIds, setTokenIds] = useState<BigInt[]>([]);
  const [tokenHashes, setTokenHashes] = useState<string[]>([]); // State for storing IPFS hashes
  const [metadata, setMetadata] = useState<Record<string, any>>({}); // Initial empty JSON object
  const { contract } = useContract({ 
    abi: abi as Abi, 
    address: contractAddress as `0x${string}`, 
  }); 

  async function getContractBalance(){
    try{
      const counter: BigInt = await contract.count();
      return counter; //acho que eh isso mas tem que testar
    }
    catch(e) {
      console.log(e);
    }
  }

  async function getPublication(tokenIndex: number){
    try {
      const ipfsHash = await contract.get_publication(tokenIndex);
      return ipfsHash;
    }
    catch(e){
      console.log(e);
    }
  }


  const { data: ipfs, error: ipfsError } = useReadContract({
    abi: abi as Abi,
    functionName: 'get_publication',
    address: contractAddress as `0x${string}`,
    args: [2],
    watch: false,   
  });
  console.log("teste do ipfs ", ipfs);  

  async function fetchMetadata() {
    try {
      const response = await fetch(ipfs);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json(); // Parse the response as JSON
      return json;
    } catch (e) {
      console.error("Error fetching metadata:", e);
    }
  }
  
  useEffect(() => {
    const loadMetadata = async () => {
      const metadata = await fetchMetadata();
      if (metadata) {
        console.log("Metadata JSON:", metadata); // Successfully fetched and parsed JSON
        setMetadata(metadata);
      } else {
        console.warn("No metadata fetched.");
      }
    };
  
    loadMetadata(); // Call the async function
  }, [ipfs]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const totalBalance = await getContractBalance();
        if (totalBalance === undefined) {
          console.error("Failed to fetch total balance.");
          return;
        }
        
        const teste = await getPublication(1);
        console.log("ESSE E O TESTE", teste);
        
        console.log("Total Tokens Minted (BigInt):", totalBalance);
        const totalTokens = Number(totalBalance);
        console.log("Total Tokens Minted (Number):", totalTokens);
        // Create an array of promises to fetch IPFS hashes for all token indices
        const ipfsHashPromises = Array.from(
          { length: totalTokens }, 
          (_, tokenIndex) => getPublication(tokenIndex)
        );
        // Resolve all promises and filter out any undefined results
        const resolvedHashes = await Promise.all(ipfsHashPromises);
        console.log(resolvedHashes)
      } catch (error) {
        console.error("Error fetching IPFS hashes:", error);
      }
    };
  
    fetchPublications(); // Execute the async function
  }, [address]);

  //const menosUm = totalBalance - 1;
  //const TotalBalance = myTotalBalance ? BigInt(menosUm.toString()) : 0n;
  //console.log(TotalBalance);

  const [sortBy, setSortBy] = useState('hearts')
  const [timeFrame, setTimeFrame] = useState('all')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article':
        return <FileText className="h-4 w-4" />;
      case 'Media':
        return <Video className="h-4 w-4" />;
      case 'Topic':
        return <Book className="h-4 w-4" />;
      case 'NFT':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filterByTimeFrame = (items: ExploreItem[]) => {
    const now = new Date();
    switch (timeFrame) {
      case 'day':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24) <= 1;
        });
      case 'week':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 7) <= 1;
        });
      case 'month':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 30) <= 1;
        });
      default:
        return items;
    }
  };

  const sortedListings = filterByTimeFrame([...exploreMockData]).sort((a, b) => {
    if (sortBy === 'hearts') return b.hearts - a.hearts;
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0;
  }).slice(0, 10); // Get top 10

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Popular Posts</h1>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hearts">Most Viewed</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedListings.map((listing) => (
          
          <Card key={listing.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
            
            <CardHeader>
              <CardTitle className="line-clamp-1 flex items-center gap-2">
                {getTypeIcon(listing.type)}
                <span className='text-xl'>{listing.title}</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-grow">
              <img src={listing.imageUrl} alt={listing.title} className="w-full h-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                
                <Badge>{listing.category}</Badge>
                
                <div className="flex justify-between items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(listing.publishedAt), { addSuffix: true })}
                </span>
                </div>

              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{listing.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/publications/${listing.id}`}>View Publication</Link>
              </Button>
            </CardFooter>

            <CardFooter className="flex justify-between items-center">
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>{listing.likes}</span>
                <Heart className="h-4 w-4 ml-2" />
                <span>{listing.hearts}</span>
              </div>
              
              <div className="flex items-center space-x-2">
              
              <span className="text-sm">{listing.price} STRKZ</span>
              </div>

            </CardFooter>

          </Card>
        ))}
      </div>
    </div>
  )
}

