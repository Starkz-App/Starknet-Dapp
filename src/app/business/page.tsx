'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Shield, Lock, Search, FileCheck, Scale, Zap, Coins, Link, Code } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const services = [
  {
    icon: Shield,
    title: 'ZK-Powered IP Verification',
    description: 'Verify the authenticity and ownership of intellectual property without revealing sensitive details.',
  },
  {
    icon: Lock,
    title: 'Blockchain Content Protection',
    description: 'Secure your content with immutable blockchain records and cryptographic protection.',
  },
  {
    icon: Search,
    title: 'Decentralized Content Discovery',
    description: 'Leverage our blockchain-based discovery system for increased visibility and fair content distribution.',
  },
  {
    icon: FileCheck,
    title: 'Smart Contract Licensing',
    description: 'Automate licensing agreements and royalty payments with customizable smart contracts.',
  },
  {
    icon: Scale,
    title: 'Tokenized IP Valuation',
    description: 'Get accurate IP valuations using our blockchain-based market dynamics and token economics.',
  },
  {
    icon: Zap,
    title: 'NFT Minting and Management',
    description: 'Create, manage, and trade NFTs representing your intellectual property with ease.',
  },
  {
    icon: Coins,
    title: 'Crypto Payment Integration',
    description: 'Accept cryptocurrency payments for your content and services across multiple blockchains.',
  },
  {
    icon: Link,
    title: 'Cross-Chain Interoperability',
    description: 'Ensure your content and NFTs can be accessed and traded across different blockchain networks.',
  },
  {
    icon: Code,
    title: 'Custom Blockchain Development',
    description: 'Tailor-made blockchain solutions for your specific content management and distribution needs.',
  },
]

export default function BusinessServicesPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    toast({
      title: "Request Sent",
      description: "We've received your inquiry and will get back to you soon.",
    })
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blockchain Business Services</h1>
      <p className="text-lg text-muted-foreground">
        Leverage the power of blockchain technology to protect, manage, and monetize your intellectual property.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <Card key={index} className="glass-card">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <service.icon className="h-6 w-6 text-primary" />
                <CardTitle>{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card mt-8">
        <CardHeader>
          <CardTitle>Request More Information</CardTitle>
          <CardDescription>
            Interested in our blockchain-powered services? Fill out the form below and we'll get back to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium">Company</label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                required
              />
            </div>
            <Button type="submit">Send Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

