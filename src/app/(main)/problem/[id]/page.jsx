import Link from "next/link";
import { MessageSquare, Heart, Bookmark, Eye, Clock, Folder, Users, Share2, CornerDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageGroup, Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter } from "@/components/ui/message";
import { SendProposalModal } from "@/components/feed/send-proposal-modal";
import { cn } from "@/lib/utils";

import { problems } from "@/data/mock-problems";

const solutions = [
  {
    id: 1,
    author: { name: "Alice Developer", avatar: "A" },
    date: "1 hour ago",
    content: "I have built a similar system for a clinic in Bangalore. We used React Native for the patient app and Next.js for the doctor dashboard. I can share an architecture proposal. Would you prefer SMS via Twilio or a local gateway?",
    likes: 12,
  },
  {
    id: 2,
    author: { name: "Bob Engineer", avatar: "B" },
    date: "30 mins ago",
    content: "I'd love to collaborate on this! I'm an AWS certified architect and can handle the backend and database scaling.",
    likes: 5,
  }
];

export default function ProblemDetailsPage({ params }) {
  const id = parseInt(params.id);
  const problem = problems.find(p => p.id === id) || problems[0];
  
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Back Button */}
      <div>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "-ml-4 text-muted-foreground")}>
          ← Back to Feed
        </Link>
      </div>

      {/* Main Problem Details */}
      <article className="pt-0 pb-4">
        <div className="flex flex-col gap-3">
          
          {/* Author Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base shrink-0 overflow-hidden">
                {problem.image ? (
                  <img src={problem.image} alt={problem.author.name} className="w-full h-full object-cover" />
                ) : (
                  problem.author.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[16px] text-foreground">
                    {problem.author.name}
                  </span>
                </div>
                <span className="text-[14px] text-muted-foreground">{problem.author.role}</span>
              </div>
            </div>
            <Button className="rounded-full font-bold px-5 h-8 text-[13px]" variant="outline">Follow</Button>
          </div>

          {/* Title & Body */}
          <div className="mt-1">
            <h1 className="text-[20px] font-bold text-foreground leading-snug mb-2">
              {problem.title}
            </h1>
            <div className="whitespace-pre-wrap leading-relaxed text-[16px] text-foreground/90">
              {problem.details || problem.description}
            </div>
          </div>

          {/* Clean Meta Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-[14px] text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-[15px] w-[15px]"/> {problem.date}</span>
            <span>•</span>
            <span className="text-teal-600 font-semibold">{problem.category}</span>
            <span>•</span>
            <span>{problem.type}</span>
          </div>
          
          {/* Info Grid (Clean Document Style) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 py-4 mt-1 border-y border-border/40">
            <div className="flex flex-col gap-1">
              <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Project Type</h4>
              <p className="text-[16px] font-bold text-teal-600">{problem.type}</p>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="text-[12px] font-semibold text-muted-foreground uppercase tracking-wider">Timeline</h4>
              <p className="font-semibold text-foreground/90 text-[15px]">{problem.timeline}</p>
            </div>
          </div>

          {/* Stats & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-4 text-muted-foreground font-medium text-[14px]">
              <div className="flex items-center gap-2">
                <Eye className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{problem.stats.views} Views</span>
              </div>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors ml-2">
                <Share2 className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
              <button className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Bookmark className="h-[18px] w-[18px]" strokeWidth={2} />
              </button>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link 
                href={`/messages?user=${encodeURIComponent(problem.author.name)}&problem=${encodeURIComponent(problem.title)}`}
                className={cn(buttonVariants({ variant: "outline" }), "rounded-full font-bold px-5 h-9 flex-1 sm:flex-none border-border")}
              >
                Contact Provider
              </Link>
              <SendProposalModal authorName={problem.author.name} problemTitle={problem.title} />
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="space-y-6 mt-4 w-full pb-12">
        <h3 className="text-[18px] font-bold tracking-tight">Comments ({problem.stats.comments})</h3>
        
        {/* Reply Box */}
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
            ME
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <textarea 
              className="w-full rounded-xl border bg-card px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground focus:border-foreground/30 transition-colors resize-none"
              placeholder="Post a comment..."
              rows={2}
            />
            <div className="flex justify-end">
              <Button className="rounded-full font-bold px-5 h-8 text-[13px] bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white shadow-sm border-0 transition-colors">
                Comment
              </Button>
            </div>
          </div>
        </div>

        {/* Comment Thread */}
        <div className="flex flex-col gap-8 pt-4">
          {solutions.map((solution) => (
            <div key={solution.id} className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {solution.author.avatar}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px]">{solution.author.name}</span>
                  <span className="text-[13px] text-muted-foreground">{solution.date}</span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/90 mt-0.5">
                  {solution.content}
                </p>
                <div className="flex items-center gap-4 mt-1.5 text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors text-[13px] font-medium group">
                    <Heart className="h-4 w-4 group-active:fill-red-500/30" /> {solution.likes}
                  </button>
                  <button className="text-[13px] font-medium hover:text-foreground transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
