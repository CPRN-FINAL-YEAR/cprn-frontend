"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeedFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "recent";
  const currentCategory = searchParams.get("category");

  const handleChange = (e) => {
    const sort = e.target.value;
    const params = new URLSearchParams();
    if (currentCategory) {
      params.set("category", currentCategory);
    }
    if (sort !== "recent") {
      params.set("sort", sort);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="relative inline-block">
      <Button variant="outline" size="sm" className="h-8 gap-2 w-[85px] pointer-events-none">
        <Filter className="h-4 w-4" />
        Filter
      </Button>
      <select
        value={currentSort}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        title="Sort Feed"
      >
        <option value="recent">Most Recent</option>
        <option value="popular">Most Viewed</option>
        <option value="comments">Most Discussed</option>
      </select>
    </div>
  );
}
