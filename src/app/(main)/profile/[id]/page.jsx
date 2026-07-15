import { Award, Briefcase, Code, MapPin, Link as LinkIcon, Github, Twitter, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProblemCard } from "@/components/feed/problem-card";

// Mock User Data
const user = {
  name: "John From Chennai",
  role: "Hospital Administrator",
  location: "Chennai, India",
  bio: "Managing healthcare operations for over 10 years. Passionate about using technology to improve patient care and hospital efficiency. Currently leading digital transformation at City Hospital.",
  avatar: "J",
  website: "https://cityhospital.example.com",
  github: "john-chennai",
  skills: ["Healthcare Operations", "Project Management", "Agile", "Digital Health"],
  stats: {
    problemsPosted: 5,
    projectsBuilt: 2,
    contributions: 14,
    rating: 4.8,
  },
  badges: ["Top Contributor", "Healthcare Pioneer"],
};

const userProblems = [
  {
    id: 1,
    title: "Need Hospital Queue Management System",
    description: "We currently handle 500 patients manually daily. The wait times are increasing and the patient experience is suffering...",
    date: "2 hours ago",
    datetime: "2026-07-15T21:00",
    category: "Healthcare",
    skills: ["React", "Node.js", "AWS", "PostgreSQL"],
    budget: "₹35,000",
    author: {
      name: "John From Chennai",
      role: "Hospital Administrator",
      href: "/profile/1",
    },
    stats: {
      likes: 45,
      comments: 18,
      views: 420,
    }
  }
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 w-full" />
        
        <div className="px-6 md:px-8 pb-8 relative">
          {/* Avatar */}
          <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-4xl border-4 border-card absolute -top-12 shadow-sm">
            {user.avatar}
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-muted-foreground text-lg">{user.role}</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {user.location}</span>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors"><LinkIcon className="h-4 w-4" /> Website</a>
                <a href="#" className="flex items-center gap-1.5 hover:text-primary transition-colors"><Github className="h-4 w-4" /> GitHub</a>
              </div>
              
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/90">
                {user.bio}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <Button>Message</Button>
              <Button variant="outline">Follow</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Badges */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-3xl font-bold text-primary">{user.stats.problemsPosted}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Problems</span>
        </div>
        <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-3xl font-bold text-primary">{user.stats.projectsBuilt}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Projects</span>
        </div>
        <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <span className="text-3xl font-bold text-primary">{user.stats.contributions}</span>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Contributions</span>
        </div>
        <div className="rounded-xl border bg-card p-6 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="flex items-center gap-1 text-amber-500">
            <span className="text-3xl font-bold">{user.stats.rating}</span>
            <StarIcon className="h-5 w-5 fill-current" />
          </div>
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider mt-1">Rating</span>
        </div>
      </div>

      <div className="flex gap-4">
        {user.badges.map(badge => (
          <div key={badge} className="flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
            <Award className="h-4 w-4 text-primary" />
            {badge}
          </div>
        ))}
      </div>

      {/* Tabs / Problems Posted */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-6 border-b pb-4">
          <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-4 -mb-[18px]">Problems Posted</h3>
          <h3 className="text-xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Projects Built</h3>
          <h3 className="text-xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Contributions</h3>
        </div>
        
        <div className="flex flex-col gap-6">
          {userProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
