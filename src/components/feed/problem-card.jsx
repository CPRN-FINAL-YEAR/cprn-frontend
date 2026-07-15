import Link from "next/link";
import { MessageSquare, ArrowBigUp, ArrowBigDown, Share2, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProblemCard({ problem }) {
  return (
    <article className="group relative flex flex-col items-start justify-between bg-card hover:bg-muted/30 transition-colors p-4 rounded-none border-b border-border/40 sm:rounded-md sm:border sm:border-border/60">
      
      {/* Header: Exact Reddit Style (Compact) */}
      <div className="flex w-full items-center justify-between gap-x-2 mb-2">
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[9px] font-bold shrink-0">
            {problem.category.charAt(0)}
          </div>
          <span className="font-bold text-foreground hover:underline cursor-pointer">
            c/{problem.category}
          </span>
          <span className="px-0.5">•</span>
          <span className="hover:underline cursor-pointer">Posted by u/{problem.author.name.replace(/\s+/g, '')}</span>
          <span className="px-0.5">•</span>
          <time dateTime={problem.datetime}>{problem.date}</time>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground rounded-full hover:bg-muted shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Body: Title and Description */}
      <div className="w-full pl-1">
        <h3 className="text-[18px] font-bold leading-snug text-foreground mb-1.5">
          <Link href={`/problem/${problem.id}`}>
            <span className="absolute inset-0" />
            {problem.title}
          </Link>
        </h3>
        
        {/* Tags: Skills and Budget */}
        <div className="flex flex-wrap items-center gap-1.5 w-full relative z-10 mb-2.5">
          <Badge variant="secondary" className="font-semibold bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20 border-transparent rounded-full px-2 py-0 h-5 text-[10px]">
            {problem.budget}
          </Badge>
          {problem.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="font-medium bg-muted/60 text-muted-foreground hover:text-foreground rounded-full px-2 py-0 h-5 text-[10px]">
              {skill}
            </Badge>
          ))}
        </div>

        <p className="line-clamp-4 text-[14px] leading-relaxed text-foreground/90">
          {problem.description}
        </p>
      </div>
      
      {/* Footer: Interaction Bar (Reddit Style) */}
      <div className="mt-3 w-full flex items-center gap-2 pl-1 relative z-10">
        
        {/* Upvote/Downvote Pill */}
        <div className="flex items-center rounded-full bg-muted/50 hover:bg-muted/80 transition-colors border border-transparent">
          <button className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-accent hover:text-[#ff4500] transition-colors">
            <ArrowBigUp className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <span className="text-xs font-bold px-1 text-foreground">{problem.stats.likes}</span>
          <button className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-accent hover:text-[#7193ff] transition-colors">
            <ArrowBigDown className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Comment Pill */}
        <button className="flex items-center gap-2 h-8 px-3 rounded-full bg-muted/50 hover:bg-muted/80 text-xs font-bold text-foreground transition-colors">
          <MessageSquare className="h-4 w-4" strokeWidth={1.5} />
          {problem.stats.comments}
        </button>

        {/* Share Pill */}
        <button className="flex items-center gap-2 h-8 px-3 rounded-full bg-muted/50 hover:bg-muted/80 text-xs font-bold text-foreground transition-colors">
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
          Share
        </button>
        
      </div>
    </article>
  );
}
