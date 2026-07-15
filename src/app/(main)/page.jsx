import { ProblemCard } from "@/components/feed/problem-card";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Mock Data for the Feed
const problems = [
  {
    id: 1,
    title: "Need Hospital Queue Management System",
    description: "We currently handle 500 patients manually daily. The wait times are increasing and the patient experience is suffering. We need a robust queue management system that integrates with our existing HMS. It should support SMS notifications and real-time dashboard for doctors.",
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
  },
  {
    id: 2,
    title: "AI-Powered Crop Disease Detection App",
    description: "Looking for an AI engineer to help build a mobile application that can detect diseases in tomato plants from a simple photo. Need the ML model to run on-device if possible to support offline farmers in rural areas.",
    date: "5 hours ago",
    datetime: "2026-07-15T18:00",
    category: "Agriculture",
    skills: ["Python", "TensorFlow Lite", "Flutter", "Computer Vision"],
    budget: "₹50,000",
    author: {
      name: "Agritech Solutions",
      role: "Startup Founder",
      href: "/profile/2",
    },
    stats: {
      likes: 124,
      comments: 32,
      views: 1200,
    }
  },
  {
    id: 3,
    title: "Open Source Learning Management System (LMS)",
    description: "I'm starting an open-source project to build a lightweight, highly accessible LMS for underfunded schools. We are looking for contributors who are passionate about education and accessibility (a11y).",
    date: "1 day ago",
    datetime: "2026-07-14T12:00",
    category: "Education",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    budget: "Open Source",
    author: {
      name: "Sarah Jenkins",
      role: "Lead Educator",
      href: "/profile/3",
    },
    stats: {
      likes: 312,
      comments: 89,
      views: 2400,
    }
  }
];

export default function FeedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Main Feed</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {problems.map((problem) => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
}
