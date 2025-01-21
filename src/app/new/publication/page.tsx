'use client'

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { authors, categories, collections } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import { TagInput } from "@/components/TagInput"
import { CheckboxMultiSelect } from "@/components/CheckboxMultiSelect"
import { useReadContract, useContract, useAccount, useSendTransaction} from "@starknet-react/core";
import { type Abi } from "starknet";
import { abi } from '@/abi/abi';
import { sub } from 'date-fns'
import { cn } from "@/lib/utils"


const fallbackAuthors = authors || []
const fallbackCategories = categories || []
const fallbackCollections = collections || []


export interface Publication {
  title: string;
  content: string;
  author: string;
  date: string;
  format: string;
  tags: string[];
  categories: string[];
  excerpt: string;
  media: string;
  slug: string;
  collection: string;
}

export default function NewPublicationPage() {

  const { address } = useAccount();
  const contractAddress = '0x06141dc992e50fd6b0eba2c475058076c0c305b7cc689b53da6542af02982366';
  const { contract } = useContract({ 
    abi: abi as Abi, 
    address: contractAddress as `0x${string}`, 
  }); 
  console.log(address);

  const [publication, setPublication] = useState<Publication>({
    title: '',
    content: '',
    author: '',
    date: '',
    format: '',
    slug: '',
    collection: '',
    categories: [],
    excerpt: '',
    tags: [],
    media: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [ipfsHash, setIpfsHash] = useState("")
  const baseUrl = "https://ipfs.io/ipfs/"

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPublication({ ...publication, [e.target.name]: e.target.value })
  }

  const handleCollectionChange = (value: string) => {
    setPublication({ ...publication, collection: value })
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setPublication({ ...publication, categories: [...publication.categories, category] })
    } else {
      setPublication({ ...publication, categories: publication.categories.filter(c => c !== category) })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setPublication((prev) => ({ ...prev, [name]: value }))
  }
  
  const { send, error: mintError} = useSendTransaction({ 
    calls: 
      contract && address   
        ? [contract.populate("publish", [address, publication.slug, ipfsHash])] 
        : undefined, 
  }); 

  const handleMintItem = async () => {
    try {
      send();
      console.log("Publication sent")
    }
    catch(error){
      console.error("Publication error: ", mintError); 
    }    
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(publication);
      console.log(publication.categories);

      const submitData = new FormData();

      submitData.append('title', publication.title);
      submitData.append('content', publication.content);
      submitData.append('author', publication.author);
      submitData.append('date', publication.date);
      submitData.append('format', publication.format);
      submitData.append('slug', publication.slug);
      submitData.append('collection', publication.collection);
      submitData.append('media', publication.media);
      submitData.append('excerpt', publication.excerpt);

      publication.categories.forEach((category: string) => {
        submitData.append('categories', category);
      });

      for (let pair of submitData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      try {
        const response = await fetch('/api/forms-ipfs', {
          method: 'POST',
          body: submitData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit Publication')
        }
        console.log('Publication submitted successfully');
        console.log(response.body);
        console.log("POST done, waiting for response");
        const data = await response.json();
        
        
        setIpfsHash(baseUrl + data.ipfsHash);
        console.log(baseUrl + data.ipfsHash);
        handleMintItem();

      } catch (err) {
        console.error('An error occurred', err);
      }



      // Simulating a successful submission
      setSubmissionResult({
        success: true,
        message: "Your new publication has been successfully created. Please Sign transaction to complete!",
      })
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({
        success: false,
        message: "Failed to create publication. Please try again our contact our support channel.",
      })
    } finally {
      setIsSubmitting(false)
      setIsDrawerOpen(true)
    }
  }




  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">New Publication</h1>
      <Card>
        <CardHeader>
          <CardTitle>Create immutable publication</CardTitle>
          <CardDescription>Enter the details of your new Starkz content</CardDescription>
        </CardHeader>
        <CardContent>
          
          
          
<form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={publication.title} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Select value={publication.author} onValueChange={(value) => handleSelectChange("author", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an author" />
                </SelectTrigger>
                <SelectContent>
                  {fallbackAuthors.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input id="slug" name="slug" value={publication.slug} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categories">Categories</Label>
              <Card className="p-4">
                <CheckboxMultiSelect
                  options={fallbackCategories}
                  selected={publication.categories}
                  onChange={(selected) => setPublication((prev) => ({ ...prev, categories: selected }))}
                />
              </Card>
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <TagInput
                tags={publication.tags}
                setTags={(newTags) => setPublication((prev) => ({ ...prev, tags: newTags }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={publication.content}
                onChange={handleInputChange}
                rows={10}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={publication.excerpt}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collection">Collection</Label>
              <Select value={publication.collection} onValueChange={(value) => handleSelectChange("collection", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {fallbackCollections.map((collection) => (
                    <SelectItem key={collection} value={collection}>
                      {collection}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="media">Featured Media URL</Label>
              <Input
                id="media"
                name="media"
                value={publication.media}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Mint Publication"}
            </Button>
          </form>




        </CardContent>
      </Card>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{submissionResult?.success ? 'Success!' : 'Error'}</DrawerTitle>
            <DrawerDescription>{submissionResult?.message}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

