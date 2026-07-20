"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { MessageCircle, X, ExternalLink, Send, User, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function ChatPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const popupContent = (isOpen && mounted) ? (
    <Card className="fixed bottom-0 right-4 md:right-10 z-50 flex flex-col bg-background shadow-2xl border border-border rounded-t-xl overflow-hidden transition-all duration-200 w-[650px] h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="text-primary rounded-full">
            <MessageCircle className="h-5 w-5 fill-primary" />
          </div>
          <span className="font-bold text-sm">Chats</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              setIsOpen(false);
              router.push("/messages");
            }}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[240px] border-r flex flex-col bg-muted/10">
          <div className="p-2 border-b border-transparent">
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-background border flex items-center justify-center">
                  <User className="h-3 w-3 text-muted-foreground" />
                </div>
                <span className="text-sm font-semibold">Alex Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 flex flex-col bg-background">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-2 rounded-2xl rounded-tl-none max-w-[85%] text-[14px]">
                Hey! How is the new UI coming along?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-none max-w-[85%] text-[14px]">
                It's looking great! Just tweaking the chat popover right now.
              </div>
            </div>
          </div>
          <div className="p-3 border-t bg-background">
            <div className="relative">
              <Input
                placeholder="Type a message..."
                className="pr-10 rounded-full bg-muted/50 border-transparent focus-visible:ring-1 h-10 text-[14px]"
              />
              <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full text-primary hover:text-primary hover:bg-primary/10">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  ) : null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
        title="Messages"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-[20px] w-[20px]" strokeWidth={2} />
        <span className="sr-only">Messages</span>
      </Button>

      {mounted && popupContent && createPortal(popupContent, document.body)}
    </>
  )
}
