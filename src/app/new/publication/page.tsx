'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from "@/components/ui/checkbox"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useReadContract, useContract, useAccount, useSendTransaction} from "@starknet-react/core";
import { type Abi } from "starknet";
import { abi } from '@/abi/abi';

// Mock data for collections
const mockCollections = [
  { value: '1', label: 'Web Development' },
  { value: '2', label: 'Machine Learning' },
  { value: '3', label: 'Blockchain' },
  { value: '4', label: 'Data Science' },
  { value: '5', label: 'Artificial Intelligence' },
]

// Mock data for categories
const categories = [
  "Technology", "Healthcare", "Energy", "Finance", "Entertainment",
  "Education", "Environment", "Sports", "Food", "Travel"
]

export interface Publication {
  title: string;
  content: string;
  excerpt: string;
  collection: string;
  categories: string[];
  tags: string[];
}

export default function NewPublicationPage() {
  const { address } = useAccount();
  const contractAddress = '0x015f1fda6449a17b42edfcf2cc2c7600562fc739c9c7c0007939f517197569c2';
  const { contract } = useContract({ 
    abi: abi as Abi, 
    address: contractAddress as `0x${string}`, 
  }); 

  const [publication, setPublication] = useState<Publication>({
    title: '',
    content: '',
    excerpt: '',
    collection: '',
    categories: [],
    tags: [],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [ipfsHash, setIpfsHash] = useState("")
  const baseUrl = "https://ipfs.io/ipfs/"
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

  const { send, error: mintError} = useSendTransaction({ 
    calls: 
      contract && address   
        ? [contract.populate("publish", [address, ipfsHash])] 
        : undefined, 
  }); 

  const handleMintItem = async () => {
    try {
      send();
      console.log("publish sent")
    }
    catch(error){
      console.error("publish error: ", mintError); 
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
      submitData.append('excerpt', publication.excerpt);
      submitData.append('collection', publication.collection);

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
          throw new Error('Failed to submit IP')
        }
        console.log('IP submitted successfully');
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
        message: "Your new publication has been successfully created.",
      })
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionResult({
        success: false,
        message: "Failed to create publication. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setIsDrawerOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Publish New Publication</h1>
      <Card>
        <CardHeader>
          <CardTitle>Publication Details</CardTitle>
          <CardDescription>Enter the details of your new publication</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={publication.title}
                onChange={handleInputChange}
                required
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
              <Select value={publication.collection} onValueChange={handleCollectionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a collection" />
                </SelectTrigger>
                <SelectContent>
                  {mockCollections.map((collection) => (
                    <SelectItem key={collection.value} value={collection.value}>
                      {collection.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categories</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={publication.categories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Publication'}
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

