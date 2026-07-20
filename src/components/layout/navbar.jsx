import Link from "next/link";
import { Search, Bell, Plus, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatPopover } from "@/components/layout/chat-popover";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center px-4 md:px-5">
        <div className="mr-4 hidden md:flex shrink-0">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-2xl tracking-tight font-serif">
              Comm<span className="text-primary">Unity</span>
            </span>
          </Link>

        </div>
        
        {/* Search Bar - Takes up remaining space gracefully */}
        <div className="flex flex-1 items-center justify-center px-2 md:px-6 lg:px-12">
          <div className="relative w-full max-w-[650px]">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
            <Input
              type="search"
              placeholder="Search CommUnity..."
              className="h-10 w-full rounded-full border border-transparent bg-muted/60 pl-10 pr-4 text-[15px] font-medium transition-all hover:bg-muted/80 focus-visible:border-border focus-visible:bg-background focus-visible:ring-0 focus-visible:ring-offset-0 shadow-sm"
            />
          </div>
        </div>
        
        {/* Right Actions */}
        <div className="flex shrink-0 items-center justify-end space-x-1.5 md:space-x-2.5">
          <ThemeToggle />
          
          <ChatPopover />
          
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors" title="Notifications">
            <Bell className="h-[20px] w-[20px]" strokeWidth={2} />
            <span className="sr-only">Notifications</span>
          </Button>
          
          {/* Enhanced "Impressive" Post Button */}
          <Link 
            href="/create" 
            className="hidden md:flex items-center justify-center h-[34px] rounded-full px-5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white shadow-sm transition-colors font-bold text-[14.5px]"
          >
            Post
          </Link>
          
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors" title="Profile">
            <User className="h-[20px] w-[20px]" strokeWidth={2} />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
