"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Paperclip, Send } from "lucide-react"
import { fetchApi } from "@/lib/api"

export function SendProposalModal({ problemId, authorId, authorName = "the poster", problemTitle = "", isOwnPost = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [solutionText, setSolutionText] = useState("")
  const [budget, setBudget] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (isOwnPost) return null

  const handleSubmit = async () => {
    if (!solutionText.trim()) {
      setError("Please describe your approach before submitting.")
      return
    }
    setLoading(true)
    setError("")

    try {
      // 1. Upload document if attached
      let documentUrl = null
      if (file) {
        const fd = new FormData()
        fd.append("file", file)
        const uploadRes = await fetchApi("/api/upload", { method: "POST", body: fd })
        documentUrl = uploadRes.url
      }

      // 2. Get or create DM conversation with the post author
      const conv = await fetchApi(`/api/messages/conversations/with/${authorId}`, { method: "POST" })

      // 3. Send separate messages for each part
      const sendMessage = async (content) => {
        await fetchApi(`/api/messages/conversations/${conv.id}/messages`, {
          method: "POST",
          body: JSON.stringify({ content }),
        })
      }

      await sendMessage(`📋 **Proposal for:** ${problemTitle || "your post"}`)
      await sendMessage(solutionText)
      
      if (budget) {
        await sendMessage(`💰 **Proposed Budget:** ₹${budget}`)
      }
      
      if (documentUrl) {
        const fullUrl = documentUrl.startsWith("http")
          ? documentUrl
          : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${documentUrl}`
        await sendMessage(`📎 **Document:** ${fullUrl}`)
      }

      // 5. Redirect to messages inbox with that conversation open
      setIsOpen(false)
      router.push(`/messages?with=${authorId}`)
    } catch (err) {
      setError(err.message || "Failed to send proposal. Are you logged in?")
    } finally {
      setLoading(false)
    }
  }

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
                <p className="text-sm text-muted-foreground mt-0.5">
                  Your proposal will be sent to <span className="font-semibold text-foreground">{authorName}</span>'s inbox.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold">Your Approach <span className="text-destructive">*</span></label>
                <p className="text-xs text-muted-foreground mb-1">Describe your solution or approach for this problem.</p>
                <textarea
                  value={solutionText}
                  onChange={(e) => setSolutionText(e.target.value)}
                  className="w-full min-h-[140px] rounded-[16px] border border-border/60 bg-muted/20 px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground/70 focus:border-foreground/50 focus:bg-background focus:ring-4 focus:ring-foreground/10 transition-all resize-none shadow-sm"
                  placeholder="Describe your approach, timeline, and relevant experience..."
                  disabled={loading}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold">Attach Document</label>
                <p className="text-xs text-muted-foreground mb-1">Optionally upload a detailed proposal document (PDF, DOCX, PPTX).</p>
                <div className="border-2 border-dashed border-border/60 rounded-[16px] p-5 flex flex-col items-center justify-center gap-2 hover:bg-muted/40 transition-colors cursor-pointer group bg-muted/10">
                  <label className="cursor-pointer flex flex-col items-center w-full">
                    <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Paperclip className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="text-[14px] font-semibold mt-1">
                      {file ? file.name : "Click to upload"}
                    </div>
                    <div className="text-[12px] text-muted-foreground">PDF, DOCX, PPTX up to 10MB</div>
                    <input type="file" className="hidden" accept=".pdf,.docx,.pptx,application/pdf" onChange={(e) => setFile(e.target.files[0])} disabled={loading} />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="text-[15px] font-bold">Proposed Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-[16px]">₹</span>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. 40000"
                    className="pl-8 bg-muted/20 border-border/60 h-12 rounded-[16px] text-[15px] shadow-sm focus:border-blue-500/50 focus:bg-background transition-all font-medium"
                    disabled={loading}
                  />
                </div>
              </div>

              {error && <div className="text-destructive font-medium text-center text-sm bg-destructive/10 rounded-xl px-4 py-3">{error}</div>}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t bg-muted/10 flex items-center justify-end gap-3">
              <Button variant="ghost" className="rounded-full px-5 h-10 font-bold" onClick={() => setIsOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button
                className="rounded-full px-6 h-10 gap-2 bg-foreground hover:bg-foreground/90 text-background font-bold shadow-sm"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Sending..." : "Send Proposal"} <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
