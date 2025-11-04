"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { MessageSquare, X, Send, Loader2, Sparkles } from "lucide-react"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { cn } from "@/src/lib/utils"

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all hover:scale-110"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open AI Assistant</span>
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[600px] shadow-2xl z-50 flex flex-col glass-card border-0 animate-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Welcome to Starkz AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask me anything about the platform, articles, or products!
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("flex gap-3 text-sm", message.role === "user" ? "justify-end" : "justify-start")}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                      : "glass-card border-0",
                  )}
                >
                  <p className="whitespace-pre-wrap text-pretty">{message.content}</p>
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 border-2 border-purple-500/20">
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 text-sm">
                <Avatar className="h-8 w-8 border-2 border-blue-500/20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="glass-card border-0 rounded-2xl px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </CardContent>

          <CardContent className="p-4 border-t border-border/50">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask me anything..."
                className="flex-1 glass-input"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input?.trim()}
                className="bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
