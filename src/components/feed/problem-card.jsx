"use client";

import Link from "next/link";
import { MessageSquare, MoreVertical, BadgeCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { fetchApi } from "@/lib/api";

export function ProblemCard({ problem }) {
  const [likes, setLikes] = useState(problem.stats?.likes ?? 0);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (liking) return;
    setLiking(true);
    try {
      const res = await fetchApi(`/api/problems/${problem.id}/like`, { method: "POST" });
      setLikes(res.likes);
      setLiked((prev) => !prev);
    } catch {
      // silently fail (e.g. not logged in)
    } finally {
      setLiking(false);
    }
  };

  return (
    <article className="group relative flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4 sm:p-5 border border-slate-200/60 dark:border-slate-800 rounded-[28px] shadow-sm cursor-pointer bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">

      {/* Header */}
      <div className="flex w-full items-center justify-between mb-3.5">
        <Link href={`/profile/${problem.author.id}`} className="flex items-center gap-3 z-10">
          <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0">
            {problem.author.avatar_url ? (
              <img src={problem.author.avatar_url} alt={problem.author.name} className="w-full h-full object-cover" />
            ) : (
              problem.author.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[16px] text-foreground hover:underline">
                {problem.author.name}
              </span>
              <BadgeCheck className="h-4 w-4 text-teal-500" />
              <span className="text-[11px] bg-muted/60 px-1.5 py-0.5 rounded text-muted-foreground ml-1 font-medium border border-border/40">
                {problem.author.poster_type === "organization" ? "Organization" : "Individual"}
              </span>
            </div>
            <span className="text-[13px] text-muted-foreground/80 font-medium">
              Posted {problem.date}
            </span>
          </div>
        </Link>
      </div>

      {/* Title + Description */}
      <div className="w-full mb-3.5">
        <h3 className="text-base sm:text-[17px] font-bold leading-snug text-foreground mb-1 group-hover:text-primary transition-colors">
          <Link href={`/problem/${problem.id}`}>
            <span className="absolute inset-0 z-0" />
            {problem.title}
          </Link>
        </h3>
        <p className="text-[14.5px] leading-relaxed text-foreground/90">
          {problem.description}
        </p>
      </div>

      {/* Cover Image */}
      {problem.image && (
        <div className="w-full mb-4 rounded-[20px] overflow-hidden aspect-[16/10] bg-muted border border-border/50 shadow-sm">
          <img src={problem.image} alt="Cover" className="w-full h-full object-cover" />
        </div>
      )}


      {/* Footer — like + comments */}
      <div className="w-full flex items-center gap-5 relative z-10 text-[14px] mt-0.5">
        <button
          onClick={handleLike}
          disabled={liking}
          className={`flex items-center gap-2 transition-colors ${liked ? "text-red-500" : "text-muted-foreground/70 hover:text-red-500"}`}
        >
          <Heart className={`h-[18px] w-[18px] ${liked ? "fill-red-500" : ""}`} strokeWidth={2} />
          <span className="font-medium">{likes.toLocaleString()}</span>
        </button>
        <Link href={`/problem/${problem.id}`} className="flex items-center gap-2 text-muted-foreground/70 hover:text-blue-500 transition-colors z-10" onClick={(e) => e.stopPropagation()}>
          <MessageSquare className="h-[18px] w-[18px]" strokeWidth={2} />
          <span className="font-medium">{problem.stats?.comments?.toLocaleString() ?? "0"}</span>
        </Link>
      </div>

    </article>
  );
}
