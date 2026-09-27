"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { MapPin } from "lucide-react";
import { ProblemCard } from "@/components/feed/problem-card";
import { mapProblem } from "@/lib/mappers";

export default function ProfilePage() {
  const params = useParams();
  const { user: me } = useAuth();
  const [user, setUser] = useState(null);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [userData, problemsData] = await Promise.all([
          fetchApi(`/api/users/${params.id}`),
          fetchApi(`/api/problems?author_id=${params.id}`),
        ]);
        setUser(userData);
        setProblems(problemsData.map(mapProblem));
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <h2 className="text-2xl font-semibold">User not found</h2>
      </div>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="rounded-2xl border bg-card overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 w-full" />
        
        <div className="px-6 md:px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 relative z-10">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
              {/* Avatar */}
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-4xl border-4 border-card shadow-sm shrink-0">
                {user.avatar_url ? (
                  <img 
                    src={user.avatar_url.startsWith("http") ? user.avatar_url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${user.avatar_url}`} 
                    alt={user.name} 
                    className="h-full w-full object-cover rounded-full" 
                  />
                ) : (
                  initials
                )}
              </div>
              <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                <p className="text-muted-foreground text-lg capitalize">{user.poster_type}</p>
              </div>
            </div>
            
            <div className="flex gap-3 shrink-0 sm:mb-2">
              {me?.id !== parseInt(params.id) && (
                <a
                  href={`/messages?with=${params.id}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-6 py-2 text-sm font-medium transition-colors"
                >
                  Message
                </a>
              )}
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Earth</span>
            </div>
            
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/90">
              {user.bio || "No bio available."}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs / Problems Posted */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-6 border-b pb-4">
          <h3 className="text-xl font-bold text-primary border-b-2 border-primary pb-4 -mb-[18px]">Problems Posted</h3>
        </div>
        
        <div className="flex flex-col gap-6">
          {problems.length > 0 ? (
            problems.map((problem) => (
              <ProblemCard key={problem.id} problem={problem} />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No problems posted yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
