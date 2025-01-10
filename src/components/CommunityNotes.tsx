import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/components/ui/use-toast"
import { ThumbsUp, ThumbsDown } from 'lucide-react'

interface CommunityNote {
  id: string;
  content: string;
  author: string;
  upvotes: number;
  downvotes: number;
}

interface CommunityNotesProps {
  publicationId: string;
}

const mockNotes: CommunityNote[] = [
  { id: '1', content: 'This article provides a great introduction to zk-STARKs.', author: 'Alice', upvotes: 5, downvotes: 1 },
  { id: '2', content: 'The comparison with zk-SNARKs could be more detailed.', author: 'Bob', upvotes: 3, downvotes: 2 },
]

export function CommunityNotes({ publicationId }: CommunityNotesProps) {
  const [notes, setNotes] = useState<CommunityNote[]>(mockNotes)
  const [newNote, setNewNote] = useState('')
  const { toast } = useToast()

  const handleAddNote = () => {
    if (newNote.trim() === '') return

    const note: CommunityNote = {
      id: Date.now().toString(),
      content: newNote,
      author: 'Current User', // In a real app, this would be the logged-in user
      upvotes: 0,
      downvotes: 0,
    }

    setNotes([...notes, note])
    setNewNote('')

    toast({
      title: "Note Added",
      description: "Your community note has been added successfully.",
    })
  }

  const handleVote = (id: string, isUpvote: boolean) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        if (isUpvote) {
          return { ...note, upvotes: note.upvotes + 1 }
        } else {
          return { ...note, downvotes: note.downvotes + 1 }
        }
      }
      return note
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Notes</CardTitle>
        <CardDescription>Add context and insights to this publication</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notes.map(note => (
            <Card key={note.id}>
              <CardContent className="pt-4">
                <p>{note.content}</p>
                <p className="text-sm text-muted-foreground mt-2">By {note.author}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleVote(note.id, true)}>
                    <ThumbsUp className="mr-1 h-4 w-4" />
                    {note.upvotes}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleVote(note.id, false)}>
                    <ThumbsDown className="mr-1 h-4 w-4" />
                    {note.downvotes}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Textarea
            placeholder="Add a community note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleAddNote}>Add Note</Button>
        </div>
      </CardContent>
    </Card>
  )
}

