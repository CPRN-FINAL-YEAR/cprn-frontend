import { ProblemCard } from "@/components/feed/problem-card";
import { FeedFilter } from "@/components/feed/feed-filter";
import { mapProblem } from "@/lib/mappers";
import { Suspense } from "react";

export default async function FeedPage({ searchParams }) {
  const params = await searchParams;
  const sort = params?.sort;
  const category = params?.category;

  const queryParams = new URLSearchParams();
  if (category) queryParams.append('category', category);
  if (sort) queryParams.append('sort', sort);

  let displayProblems = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/problems?${queryParams.toString()}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const data = await res.json();
      displayProblems = data.map(mapProblem);
    }
  } catch (error) {
    console.error("Failed to fetch problems:", error);
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
