import Link from "next/link";
import { Search, User, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function MessagesPage({ searchParams }) {
  const params = await searchParams;
  const userName = params?.user || "Alex Developer";
  const problemTitle = params?.problem || "";
  const solution = params?.solution || "";
  return (
    <div className="flex flex-col h-screen bg-background font-sans overflow-hidden">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[350px] border-r bg-muted/10 flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b bg-background flex items-center gap-3">
            <Link href="/" className="inline-flex items-center justify-center h-9 w-9 rounded-full shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold truncate">Messages</h1>
          </div>
          {/* Search */}
          <div className="p-3 border-b bg-background">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9 bg-muted/50 border-transparent rounded-full"
              />
            </div>
          </div>
          {/* Thread List */}
          <div className="flex-1 overflow-y-auto">
            {/* Active Thread Item */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 border-l-4 border-primary cursor-pointer transition-colors">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-background border flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-[15px] truncate">{userName}</h3>
                  <span className="text-xs text-muted-foreground">10:42 AM</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {problemTitle ? `Regarding: ${problemTitle}` : "It's looking great! Just tweaking the chat popover right now."}
                </p>
              </div>
            </div>

            {/* Other Dummy Threads */}
            {[
              { name: "Sarah UI/UX", msg: "Can we review the latest mockups?", time: "Yesterday" },
              { name: "Design Team", msg: "New assets have been uploaded to Figma.", time: "Tuesday" },
              { name: "Code Bros", msg: "Anyone free for a quick code review?", time: "Monday" }
            ].map((thread, i) => (
              <div key={i} className="flex items-center gap-3 p-4 hover:bg-muted/30 cursor-pointer transition-colors border-l-4 border-transparent">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-[15px] truncate">{thread.name}</h3>
                    <span className="text-xs text-muted-foreground">{thread.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{thread.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between bg-background shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-[16px]">{userName}</h2>
                <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-muted/5 custom-scrollbar">
            <div className="flex justify-center">
              <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium shadow-sm border border-border/50">Today</span>
            </div>
            
            <div className="flex justify-start max-w-[70%]">
              <div className="flex items-end gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="bg-muted text-foreground px-5 py-3 rounded-2xl rounded-bl-sm text-[15px] shadow-sm">
                  {problemTitle ? (
                    <span>Hi, I'm interested in discussing your project: <strong>{problemTitle}</strong>. Are you available?</span>
                  ) : (
                    "Hey! How is the new UI coming along?"
                  )}
                  <div className="text-[10px] text-muted-foreground mt-1 text-right">10:40 AM</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end ml-auto max-w-[70%]">
              <div className="bg-blue-500 text-white px-5 py-3 rounded-2xl rounded-br-sm text-[15px] shadow-sm whitespace-pre-wrap">
                {solution ? solution : "It's looking great! Just tweaking the chat popover right now."}
                <div className="text-[10px] text-blue-100 mt-1 text-right flex items-center justify-end gap-1">
                  10:42 AM
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <div className="relative flex-1">
                <Input 
                  placeholder="Type a message..." 
                  className="pl-5 pr-12 py-6 rounded-full bg-muted/40 border-border focus-visible:ring-1 focus-visible:ring-primary shadow-sm text-[15px]"
                />
                <Button size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
