import { ProblemCard } from "@/components/feed/problem-card";
import { Button } from "@/components/ui/button";
import { problems } from "@/data/mock-problems";
import { FeedFilter } from "@/components/feed/feed-filter";
import { Suspense } from "react";

export default async function FeedPage({ searchParams }) {
  const params = await searchParams;
  const sort = params?.sort;
  const category = params?.category;

  let displayProblems = [...problems];

  if (category) {
    displayProblems = displayProblems.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (sort === "popular") {
    displayProblems.sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
  } else if (sort === "likes") {
    displayProblems.sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0));
  } else if (sort === "comments") {
    displayProblems.sort((a, b) => (b.stats?.comments || 0) - (a.stats?.comments || 0));
  }

  let heading = "Main Feed";
  if (category) {
    heading = category.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  } else if (sort === "popular") {
    heading = "Popular";
  } else if (sort === "likes") {
    heading = "Most Liked";
  } else if (sort === "comments") {
    heading = "Most Discussed";
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-[24px] sm:text-[28px] font-semibold text-foreground/90">{heading}</h1>
        <div className="flex items-center gap-2">
          <Suspense fallback={<div className="h-9 w-[150px] bg-muted animate-pulse rounded-md" />}>
            <FeedFilter />
          </Suspense>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        {displayProblems.length > 0 ? (
          displayProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl border border-dashed">
            No problems found in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
