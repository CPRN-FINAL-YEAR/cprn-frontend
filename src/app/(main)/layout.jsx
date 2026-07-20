import { Navbar } from "@/components/layout/navbar";
import { LeftSidebar } from "@/components/layout/left-sidebar";
import { RightSidebar } from "@/components/layout/right-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <SidebarProvider>
        <LeftSidebar />
        <SidebarInset className="bg-background flex-1 flex flex-col min-w-0">
          <div className="container max-w-screen-2xl flex-1 items-start md:grid lg:grid-cols-[minmax(0,1fr)_300px] md:gap-6 lg:gap-10">
            <main className="relative py-6 lg:py-8 w-full min-w-0 flex justify-center">
              <div className="w-full max-w-2xl">
                {children}
              </div>
            </main>
            <RightSidebar />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
