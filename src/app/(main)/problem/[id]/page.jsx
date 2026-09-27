"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { MessageSquare, Heart, Bookmark, Eye, Clock, Folder, Users, Share2, CornerDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { SendProposalModal } from "@/components/feed/send-proposal-modal";
import { cn } from "@/lib/utils";
import { mapProblem } from "@/lib/mappers";

export default function ProblemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user: me } = useAuth();
  const id = parseInt(params.id);
  
  const [problem, setProblem] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [problemData, commentsData] = await Promise.all([
          fetchApi(`/api/problems/${id}`),
          fetchApi(`/api/problems/${id}/comments`),
        ]);
        setProblem(mapProblem(problemData));
        setComments(commentsData);
      } catch (error) {
        console.error("Failed to fetch problem data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetchApi(`/api/problems/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ content: newComment }),
      });
      setComments([res, ...comments]);
      setNewComment("");
      setProblem(p => ({ ...p, stats: { ...p.stats, comments: p.stats.comments + 1 } }));
    } catch (err) {
      console.error("Failed to post comment:", err);
      // If unauthorized, they should be redirected to login.
      if (err.message.includes("401")) {
        router.push("/auth/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  if (!problem) {
    return <div className="p-8 text-center text-muted-foreground">Problem not found.</div>;
  }

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
            <Link href={`/profile/${problem.author.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base shrink-0 overflow-hidden">
                {problem.author.avatar_url ? (
                  <img src={problem.author.avatar_url} alt={problem.author.name} className="w-full h-full object-cover" />
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
                <span className="text-[14px] text-muted-foreground">{problem.author.poster_type}</span>
              </div>
            </Link>
          </div>

          {/* Title & Body */}
          <div className="mt-1">
            <h1 className="text-[20px] font-bold text-foreground leading-snug mb-2">
              {problem.title}
            </h1>
            <div className="whitespace-pre-wrap leading-relaxed text-[16px] text-foreground/90">
              {problem.details || problem.description}
            </div>
            {problem.document && (
              <div className="mt-4">
                <a href={problem.document} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }), "flex items-center gap-2")}>
                  <Folder className="h-4 w-4" /> View Detailed Document
                </a>
              </div>
            )}
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
              <p className="font-semibold text-foreground/90 text-[15px]">{problem.timeline || "Not specified"}</p>
            </div>
          </div>

          {/* Stats & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-1 border-b border-border/40 pb-4">
            <div className="flex items-center gap-4 text-muted-foreground font-medium text-[14px]">
              <div className="flex items-center gap-2">
                <Eye className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{problem.stats.views} Views</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SendProposalModal
                problemId={problem.id}
                authorId={problem.author.id}
                authorName={problem.author.name}
                problemTitle={problem.title}
                isOwnPost={me?.id === problem.author.id}
              />
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="space-y-6 mt-4 w-full pb-12">
        <h3 className="text-[18px] font-bold tracking-tight">Comments ({problem.stats.comments})</h3>
        
        {/* Reply Box */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-2">
            <textarea 
              className="w-full rounded-xl border bg-card px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground focus:border-foreground/30 transition-colors resize-none"
              placeholder="Post a comment..."
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handlePostComment}
                disabled={isSubmitting || !newComment.trim()}
                className="rounded-full font-bold px-5 h-8 text-[13px] bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white shadow-sm border-0 transition-colors"
              >
                {isSubmitting ? "Posting..." : "Comment"}
              </Button>
            </div>
          </div>
        </div>

        {/* Comment Thread */}
        <div className="flex flex-col gap-8 pt-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Link href={`/profile/${comment.author.id}`} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0 overflow-hidden">
                {comment.author.avatar_url ? (
                  <img 
                    src={comment.author.avatar_url.startsWith("http") ? comment.author.avatar_url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${comment.author.avatar_url}`} 
                    alt={comment.author.name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  comment.author.name.charAt(0).toUpperCase()
                )}
              </Link>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2">
                  <Link href={`/profile/${comment.author.id}`} className="font-bold text-[15px] hover:underline">{comment.author.name}</Link>
                  <span className="text-[13px] text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/90 mt-0.5">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to comment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
