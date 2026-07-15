import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  Home, 
  TrendingUp, 
  Compass, 
  ChevronUp,
  ChevronDown,
  Stethoscope,
  GraduationCap,
  Landmark,
  Briefcase,
  Info,
  Megaphone,
  HelpCircle,
  BookOpen
} from "lucide-react";

export function LeftSidebar() {
  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r border-border/40 md:sticky md:block py-4 pr-4">
      <div className="flex flex-col pl-2">
        
        {/* Core Feeds Section */}
        <div className="flex flex-col space-y-1 mb-2">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
            <Home className="h-6 w-6 text-foreground" strokeWidth={1.5} /> Home
          </Link>
          <Link href="/trending" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors bg-muted text-foreground">
            <TrendingUp className="h-6 w-6 text-foreground" strokeWidth={2} /> Popular
          </Link>
          <Link href="/explore" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
            <Compass className="h-6 w-6 text-foreground" strokeWidth={1.5} /> Explore
          </Link>
        </div>

        <hr className="border-border/60 mx-4 my-4" />

        {/* Topics Section */}
        <div className="mb-2">
          <div className="flex items-center justify-between px-4 mb-2 group cursor-pointer hover:bg-muted/40 rounded-md py-1">
            <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest">
              Topics
            </h3>
            <ChevronUp className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col space-y-1">
            <Link href="/category/healthcare" className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span>Healthcare</span>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </Link>
            <Link href="/category/education" className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span>Education</span>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </Link>
            <Link href="/category/fintech" className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <div className="flex items-center gap-3">
                <Landmark className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span>Fintech</span>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </Link>
            <Link href="/category/b2b" className="flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <div className="flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                <span>B2B Services</span>
              </div>
              <ChevronDown className="h-4 w-4 text-foreground" strokeWidth={1.5} />
            </Link>
            <button className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] transition-colors text-foreground hover:bg-muted/60 mt-1">
              See more
            </button>
          </div>
        </div>

        <hr className="border-border/60 mx-4 my-4" />

        {/* Resources Section */}
        <div className="mb-2">
          <div className="flex items-center justify-between px-4 mb-2 group cursor-pointer hover:bg-muted/40 rounded-md py-1">
            <h3 className="text-[12px] font-medium text-muted-foreground uppercase tracking-widest">
              Resources
            </h3>
            <ChevronUp className="h-4 w-4 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col space-y-1">
            <Link href="/about" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <Info className="h-6 w-6 text-foreground" strokeWidth={1.5} /> About SolveHub
            </Link>
            <Link href="/advertise" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <Megaphone className="h-6 w-6 text-foreground" strokeWidth={1.5} /> Advertise
            </Link>
            <Link href="/help" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <HelpCircle className="h-6 w-6 text-foreground" strokeWidth={1.5} /> Help
            </Link>
            <Link href="/blog" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors text-foreground hover:bg-muted/60">
              <BookOpen className="h-6 w-6 text-foreground" strokeWidth={1.5} /> Blog
            </Link>
          </div>
        </div>

      </div>
    </aside>
  );
}
