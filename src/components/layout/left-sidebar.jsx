"use client"

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  TrendingUp,
  Compass,
  ChevronUp,
  Stethoscope,
  GraduationCap,
  Landmark,
  Briefcase,
  Info,
  Megaphone,
  HelpCircle,
  Laptop,
  Palette,
  Atom,
  BarChart,
  Coffee
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const CATEGORIES = [
  { key: "healthcare",   label: "Healthcare",   icon: Stethoscope },
  { key: "education",    label: "Education",    icon: GraduationCap },
  { key: "fintech",      label: "Fintech",      icon: Landmark },
  { key: "b2b services", label: "B2B Services", icon: Briefcase },
  { key: "technology",   label: "Technology",   icon: Laptop },
  { key: "design",       label: "Design",       icon: Palette },
  { key: "science",      label: "Science",      icon: Atom },
  { key: "marketing",    label: "Marketing",    icon: BarChart },
  { key: "lifestyle",    label: "Lifestyle",    icon: Coffee },
];

export function LeftSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [counts, setCounts] = useState({});

  const sort = searchParams.get("sort");
  const category = searchParams.get("category");

  const isHome = pathname === "/" && !sort && !category;
  const isPopular = sort === "popular";
  const isExplore = pathname.startsWith("/explore");

  useEffect(() => {
    fetch(`${API_URL}/api/problems/category-counts`)
      .then((r) => r.ok ? r.json() : {})
      .then(setCounts)
      .catch(() => {});
  }, []);

  return (
    <Sidebar className="!top-14 !h-[calc(100vh-3.5rem)] border-r border-border custom-scrollbar">
      <SidebarContent className="custom-scrollbar pt-4">

        {/* Core Feeds Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/" />} isActive={isHome}>
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?sort=popular" />} isActive={isPopular}>
                  <TrendingUp />
                  <span>Popular</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?sort=newest" />} isActive={sort === "newest" && !category}>
                  <Compass />
                  <span>Explore</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        {/* Domains Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center text-xs tracking-wider text-muted-foreground uppercase">
            Domains <ChevronUp className="h-4 w-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {CATEGORIES.map(({ key, label, icon: Icon }) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton
                    render={<Link href={`/?category=${encodeURIComponent(key)}`} className="justify-between" />}
                    isActive={category?.toLowerCase() === key}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </div>
                    {counts[key] !== undefined && (
                      <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                        {counts[key]}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        {/* Resources Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center text-xs tracking-wider text-muted-foreground uppercase">
            Resources <ChevronUp className="h-4 w-4" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/about" />}>
                  <Info />
                  <span>About CommUnity</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/advertise" />}>
                  <Megaphone />
                  <span>Advertise</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/help" />}>
                  <HelpCircle />
                  <span>Help</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
