"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Paperclip, Send } from "lucide-react"

export function SendProposalModal({ authorName = "Alex Developer", problemTitle = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [solutionText, setSolutionText] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="rounded-full font-bold px-6 h-9 flex-1 sm:flex-none bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white shadow-sm border-0 transition-colors"
      >
        Send Proposal
      </Button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-lg rounded-[24px] shadow-2xl border border-border flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b flex items-center justify-between bg-muted/20">
              <div>
                <h2 className="text-[20px] font-bold">Send Proposal</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Submit your solution approach and bid.</p>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Body */}
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold">Guide</label>
                <p className="text-xs text-muted-foreground mb-1">Briefly explain a simple solution or approach here.</p>
                <textarea 
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                  className="w-full min-h-[140px] rounded-[16px] border border-border/60 bg-muted/20 px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-foreground/50 focus:bg-background focus:ring-4 focus:ring-foreground/10 transition-all resize-none shadow-sm"
                  placeholder="Provide a guide or approach for this problem..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold">Attach Document <span className="text-destructive">*</span></label>
                <p className="text-xs text-muted-foreground mb-1">Upload your detailed proposal document here.</p>
                <div className="border-2 border-dashed border-border/60 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 hover:bg-muted/40 transition-colors cursor-pointer group bg-muted/10">
                  <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Paperclip className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-[14px] font-semibold mt-1">Click to upload detailed proposal</div>
                  <div className="text-[12px] text-muted-foreground">PDF, DOCX, presentation up to 10MB</div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[15px] font-bold">Proposed Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-[16px]">₹</span>
                  <Input 
                    type="number" 
                    placeholder="e.g. 40000" 
                    className="pl-8 bg-muted/20 border-border/60 h-12 rounded-[16px] text-[15px] shadow-sm focus:border-blue-500/50 focus:bg-background focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t bg-muted/10 flex items-center justify-end gap-3">
              <Button variant="ghost" className="rounded-full px-5 h-10 font-bold" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button 
                className="rounded-full px-6 h-10 gap-2 bg-foreground hover:bg-foreground/90 text-background font-bold shadow-sm" 
                onClick={() => {
                  setIsOpen(false);
                  router.push(`/messages?user=${encodeURIComponent(authorName)}&problem=${encodeURIComponent(problemTitle)}&solution=${encodeURIComponent(solutionText)}`);
                }}
              >
                Submit Proposal <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
