"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, Bell, User, LogOut, Settings, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";

function UserMenu({ user, logout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-muted/80 transition-colors"
        aria-label="User menu"
      >
        {user?.avatar_url ? (
          <img
            src={user.avatar_url.startsWith("http") ? user.avatar_url : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}${user.avatar_url}`}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover ring-2 ring-primary/20"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold ring-2 ring-primary/20">
            {initials}
          </div>
        )}
        <span className="hidden md:block text-sm font-medium max-w-[100px] truncate">
          {user?.name?.split(" ")[0]}
        </span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden md:block" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border bg-popover shadow-lg ring-1 ring-black/5 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              My Profile
            </Link>
            <Link
              href="/profile/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/60 transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              Settings
            </Link>
          </div>
          <div className="border-t py-1">
            <button
              onClick={() => { setOpen(false); logout(true); }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();

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

        {/* Search Bar */}
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
          <Link href="/messages" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors" title="Messages">
            <MessageCircle className="h-[20px] w-[20px]" strokeWidth={2} />
            <span className="sr-only">Messages</span>
          </Link>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors" title="Notifications">
            <Bell className="h-[20px] w-[20px]" strokeWidth={2} />
            <span className="sr-only">Notifications</span>
          </Button>

          {user ? (
            <>
              <Link
                href="/create"
                className="hidden md:flex items-center justify-center h-[34px] rounded-full px-5 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white shadow-sm transition-colors font-bold text-[14.5px]"
              >
                Post
              </Link>
              <UserMenu user={user} logout={logout} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="hidden md:flex items-center justify-center h-[34px] rounded-full px-5 hover:bg-muted text-foreground transition-colors font-bold text-[14.5px]"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hidden md:flex items-center justify-center h-[34px] rounded-full px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-colors font-bold text-[14.5px]"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
