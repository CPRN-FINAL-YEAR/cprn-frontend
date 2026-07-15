import Link from "next/link";
import { Search, Bell, Plus, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              SolveHub
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">Home</Link>
            <Link href="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">Explore</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative flex items-center justify-center md:mr-10">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-10 w-full rounded-full border-none bg-accent/50 hover:bg-accent/80 pl-10 md:w-[400px] lg:w-[500px] transition-colors"
              />
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            
            <Button variant="ghost" size="icon" className="text-muted-foreground" title="Notifications">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Link href="/create" className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden md:flex gap-2 h-9")}>
              <Plus className="h-4 w-4" />
              Create Problem
            </Link>
            
            <Button variant="ghost" size="icon" className="rounded-full" title="Profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
