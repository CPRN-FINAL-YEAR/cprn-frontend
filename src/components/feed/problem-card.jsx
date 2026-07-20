import Link from "next/link";
import { MessageSquare, Eye, Bookmark, MoreVertical, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProblemCard({ problem }) {

  return (
    <article className="group relative flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 border border-slate-200/60 dark:border-slate-800 rounded-[28px] shadow-sm cursor-pointer bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">

      {/* Header */}
      <div className="flex w-full items-center justify-between mb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full object-cover bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0">
            {problem.image ? (
              <img src={problem.image} alt={problem.author.name} className="w-full h-full object-cover" />
            ) : (
              problem.author.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[16px] text-foreground hover:underline cursor-pointer">
                {problem.author.name}
              </span>
              <BadgeCheck className="h-4 w-4 text-teal-500" />
              <span className="text-[11px] bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground ml-1 font-medium border border-border/40">
                {problem.author.name === "Agritech Solutions" ? "Organization" : "Individual"}
              </span>
            </div>
            <span className="text-[13px] text-muted-foreground/80 font-medium">
              Posted {problem.date}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/60 rounded-full hover:bg-muted shrink-0 -mr-2">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Body: Title and Description */}
      <div className="w-full mb-3.5">
        <h3 className="text-base sm:text-[17px] font-bold leading-snug text-foreground mb-1 group-hover:text-primary transition-colors">
          <Link href={`/problem/${problem.id}`}>
            <span className="absolute inset-0 z-0" />
            {problem.title}
          </Link>
        </h3>

        <p className="text-[14.5px] leading-relaxed text-foreground/90 mb-2.5">
          {problem.description}
        </p>

      </div>

      {/* Media Placeholder */}
      {problem.image && (
        <div className="w-full relative mb-4 rounded-[20px] overflow-hidden aspect-[16/10] bg-muted border border-border/50 shadow-sm group/media">
          <img src={problem.image} alt="Post media" className="w-full h-full object-cover" />

          {/* Full View Icon - Top Right with sleek dark background */}
          <div className="absolute top-3 right-3 p-1.5 bg-black/40 hover:bg-black/60 rounded-lg backdrop-blur-md transition-colors cursor-pointer opacity-0 group-hover/media:opacity-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
        </div>
      )}

      {/* Footer: Interaction Bar */}
      <div className="w-full flex items-center gap-6 relative z-10 text-[14px] mt-0.5">

        {/* Views */}
        <button className="flex items-center gap-2 text-muted-foreground/70 hover:text-foreground transition-colors group">
          <Eye className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="font-medium transition-colors">{problem.stats.views?.toLocaleString() || "5,874"}</span>
        </button>

        {/* Comments */}
        <button className="flex items-center gap-2 text-muted-foreground/70 hover:text-blue-500 transition-colors group">
          <MessageSquare className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="font-medium transition-colors">{problem.stats.comments?.toLocaleString() || "11"}</span>
        </button>

        {/* Save Icon Only */}
        <button className="ml-auto flex items-center justify-center p-1.5 -mr-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group text-muted-foreground/70 hover:text-foreground">
          <Bookmark className="h-[19px] w-[19px] group-active:fill-muted-foreground/30 transition-colors" strokeWidth={2} />
        </button>

      </div>
    </article>
  );
}
