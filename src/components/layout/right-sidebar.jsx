import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const trendingCategories = [
  "Healthcare", "Education", "AI", "Agriculture", "Fintech", "E-commerce"
];

const topContributors = [
  { name: "Alice Smith", role: "Frontend Developer" },
  { name: "Bob Johnson", role: "Fullstack Engineer" },
  { name: "Charlie Davis", role: "UI/UX Designer" },
];

export function RightSidebar() {
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-l border-border bg-sidebar lg:sticky lg:block lg:self-start py-6 pl-4 pr-4 space-y-6 text-sm">
      
      {/* Community Info Box */}
      <div className="space-y-3">
        <h2 className="font-semibold text-foreground text-[15px]">Community Guidelines</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          CommUnity focuses on creating clear, accessible, and high-quality solutions for real-world problems. This community connects creators, developers, and founders.
        </p>
        <div className="flex gap-4 pt-2 pb-4 text-xs">
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-[15px]">20K</span>
            <span className="text-muted-foreground text-sm">Solvers</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-[15px]">488</span>
            <span className="text-muted-foreground text-sm">Weekly posts</span>
          </div>
        </div>
        <hr className="border-border/60" />
      </div>
      
      {/* Trending Categories */}
      <div className="space-y-4 pt-2">
        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
          TRENDING CATEGORIES
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingCategories.map(cat => (
            <Badge key={cat} variant="secondary" className="hover:bg-primary/20 cursor-pointer transition-colors px-2.5 py-0.5 rounded-full font-normal">
              {cat}
            </Badge>
          ))}
        </div>
        <hr className="border-border/60 mt-6" />
      </div>

      {/* Top Contributors */}
      <div className="space-y-4 pt-2">
        <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
          TOP CONTRIBUTORS
        </h3>
        <div className="space-y-4">
          {topContributors.map(user => (
            <div key={user.name} className="flex items-center gap-3 group cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-foreground text-xs font-semibold shrink-0 group-hover:bg-muted/80 transition-colors">
                {user.name.charAt(0)}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium leading-none truncate group-hover:underline underline-offset-2">{user.name}</span>
                <span className="text-xs text-muted-foreground mt-1 truncate">{user.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </aside>
  );
}
