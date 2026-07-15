import { Navbar } from "@/components/layout/navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <div className="container max-w-screen-2xl flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)_300px] md:gap-6 lg:gap-10">
        <LeftSidebar />
        <main className="relative py-6 lg:py-8 w-full min-w-0">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
