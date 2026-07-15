import Link from "next/link";
import { MessageSquare, Heart, Bookmark, Eye, Clock, Folder, Users, Share2, CornerDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Problem Data
const problem = {
  id: 1,
  title: "Need Hospital Queue Management System",
  description: "We currently handle 500 patients manually daily. The wait times are increasing and the patient experience is suffering. \n\nOur doctors are overwhelmed with paper files and the reception desk is constantly crowded. We need a robust queue management system that integrates with our existing HMS. \n\nIt should support:\n- SMS notifications for patients when their turn is near\n- Real-time dashboard for doctors to see pending patients\n- Easy to use tablet interface for the reception desk\n- Daily analytics on average wait times\n\nThe system needs to be highly reliable as it will be used 24/7.",
  date: "2 hours ago",
  datetime: "2026-07-15T21:00",
  category: "Healthcare",
  skills: ["React", "Node.js", "AWS", "PostgreSQL"],
  budget: "₹35,000",
  timeline: "1-3 months",
  type: "Paid Project",
  author: {
    name: "John From Chennai",
    role: "Hospital Administrator",
    href: "/profile/1",
    avatar: "J",
  },
  stats: {
    likes: 45,
    comments: 18,
    views: 420,
  }
};

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

export default function ProblemDetailsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Back Button */}
      <div>
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "-ml-4 text-muted-foreground")}>
          ← Back to Feed
        </Link>
      </div>

      {/* Main Problem Details */}
      <article className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">
        <div className="flex flex-col gap-6">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{problem.category}</Badge>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> {problem.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Folder className="h-4 w-4"/> {problem.type}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>
          
          {/* Title & Author */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
              {problem.title}
            </h1>
            
            <div className="mt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {problem.author.avatar}
              </div>
              <div className="flex flex-col">
                <Link href={problem.author.href} className="font-semibold hover:underline">
                  {problem.author.name}
                </Link>
                <span className="text-sm text-muted-foreground">{problem.author.role}</span>
              </div>
              <Button className="ml-auto">Message</Button>
            </div>
          </div>
          
          <hr className="border-border" />
          
          {/* Description */}
          <div className="whitespace-pre-wrap leading-relaxed text-foreground/90">
            {problem.description}
          </div>
          
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/50 rounded-xl p-6 border border-border/50">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Budget</h4>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{problem.budget}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Timeline</h4>
                <p className="font-medium">{problem.timeline}</p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills Needed</h4>
              <div className="flex flex-wrap gap-2">
                {problem.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-background">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 text-muted-foreground pt-4 border-t">
            <button className="flex items-center gap-2 hover:text-rose-500 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="font-medium">{problem.stats.likes}</span>
            </button>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <span className="font-medium">{problem.stats.views} Views</span>
            </div>
          </div>
        </div>
      </article>

      {/* Solutions & Discussions */}
      <div className="space-y-6 mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">Solutions & Discussion</h3>
          <span className="text-muted-foreground">{problem.stats.comments} replies</span>
        </div>
        
        {/* Reply Box */}
        <div className="flex gap-4">
          <div className="h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-sm font-bold">
            ME
          </div>
          <div className="flex-1 space-y-3">
            <textarea 
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Write a solution or ask a question..."
              rows={3}
            />
            <div className="flex justify-end">
              <Button>Post Reply</Button>
            </div>
          </div>
        </div>

        {/* Discussion Thread */}
        <div className="space-y-6 pt-6">
          {solutions.map((solution) => (
            <div key={solution.id} className="flex gap-4">
              <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                {solution.author.avatar}
              </div>
              <div className="flex-1 space-y-2">
                <div className="rounded-2xl rounded-tl-none bg-card border p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{solution.author.name}</span>
                    <span className="text-xs text-muted-foreground">{solution.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    {solution.content}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground px-2">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="h-3 w-3" /> {solution.likes}
                  </button>
                  <button className="hover:text-primary transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
