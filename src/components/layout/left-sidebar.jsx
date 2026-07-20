"use client"

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { problems } from "@/data/mock-problems";
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

export function LeftSidebar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const sort = searchParams.get("sort");
  const category = searchParams.get("category");
  
  const isHome = pathname === "/" && !sort && !category;
  const isPopular = sort === "popular";

  const countCategory = (cat) => problems.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

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
                <SidebarMenuButton render={<Link href="/?sort=popular" />}>
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
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=healthcare" className="justify-between" />} isActive={category === "healthcare"}>
                  <div className="flex items-center gap-2">
                    <Stethoscope />
                    <span>Healthcare</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('healthcare')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=education" className="justify-between" />} isActive={category === "education"}>
                  <div className="flex items-center gap-2">
                    <GraduationCap />
                    <span>Education</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('education')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=fintech" className="justify-between" />} isActive={category === "fintech"}>
                  <div className="flex items-center gap-2">
                    <Landmark />
                    <span>Fintech</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('fintech')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=b2b services" className="justify-between" />} isActive={category === "b2b services"}>
                  <div className="flex items-center gap-2">
                    <Briefcase />
                    <span>B2B Services</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('b2b services')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dummy Topics */}
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=technology" className="justify-between" />} isActive={category === "technology"}>
                  <div className="flex items-center gap-2">
                    <Laptop className="h-4 w-4" />
                    <span>Technology</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('technology')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=design" className="justify-between" />} isActive={category === "design"}>
                  <div className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Design</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('design')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=science" className="justify-between" />} isActive={category === "science"}>
                  <div className="flex items-center gap-2">
                    <Atom className="h-4 w-4" />
                    <span>Science</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('science')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=marketing" className="justify-between" />} isActive={category === "marketing"}>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    <span>Marketing</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('marketing')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<Link href="/?category=lifestyle" className="justify-between" />} isActive={category === "lifestyle"}>
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4" />
                    <span>Lifestyle</span>
                  </div>
                  <span className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">{countCategory('lifestyle')}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
