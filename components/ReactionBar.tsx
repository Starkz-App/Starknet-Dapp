import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ThumbsUp, Heart, Zap, Crown } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface ReactionBarProps {
  publicationId: string;
  initialReactions: {
    likes: number;
    hearts: number;
    starkz: number;
    crowns: number;
  };
}

export function ReactionBar({ publicationId, initialReactions }: ReactionBarProps) {
  const [reactions, setReactions] = useState(initialReactions)
  const { toast } = useToast()

  const handleReaction = (type: keyof typeof reactions) => {
    setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }))
    toast({
      title: "Reaction Added",
      description: `You've added a ${type} reaction to this publication.`,
    })
  }

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 py-6">
      <Button
        variant="outline"
        size="lg"
        className="flex flex-col items-center px-3 sm:px-4"
        onClick={() => handleReaction('likes')}
      >
        <ThumbsUp className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
        <span className="text-xs sm:text-sm">{reactions.likes}</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex flex-col items-center px-3 sm:px-4"
        onClick={() => handleReaction('hearts')}
      >
        <Heart className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
        <span className="text-xs sm:text-sm">{reactions.hearts}</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex flex-col items-center px-3 sm:px-4"
        onClick={() => handleReaction('starkz')}
      >
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
        <span className="text-xs sm:text-sm">{reactions.starkz}</span>
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex flex-col items-center px-3 sm:px-4"
        onClick={() => handleReaction('crowns')}
      >
        <Crown className="h-5 w-5 sm:h-6 sm:w-6 mb-1" />
        <span className="text-xs sm:text-sm">{reactions.crowns}</span>
      </Button>
    </div>
  )
}
