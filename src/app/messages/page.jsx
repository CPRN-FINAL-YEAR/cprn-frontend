"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchApi, API_URL } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { Send, MessageSquare, ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function formatTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  if (diffMs < 60000) return "Just now";
  if (diffMs < 3600000) return `${Math.floor(diffMs / 60000)}m ago`;
  if (d.toDateString() === now.toDateString()) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function Avatar({ user, size = "md" }) {
  const sz = size === "lg" ? "h-12 w-12 text-lg" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  const avatarUrl = user?.avatar_url
    ? user.avatar_url.startsWith("http") ? user.avatar_url : `${API_URL}${user.avatar_url}`
    : null;

  return (
    <div className={`${sz} rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shrink-0`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={user?.name} className="w-full h-full object-cover" />
      ) : (
        (user?.name || "?").charAt(0).toUpperCase()
      )}
    </div>
  );
}

function MessagesPageInner() {
  const { user: me } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const targetUserId = searchParams.get("with"); // ?with=userId

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msgLoading, setMsgLoading] = useState(false);
  const [search, setSearch] = useState("");
  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  // Load conversations on mount
  const loadConversations = useCallback(async () => {
    try {
      const data = await fetchApi("/api/messages/conversations");
      setConversations(data);
      return data;
    } catch {
      return [];
    }
  }, []);

  // If ?with= param, create/get the conversation
  useEffect(() => {
    if (!me) return;

    async function init() {
      setLoading(true);
      try {
        let convs = await loadConversations();

        if (targetUserId) {
          const conv = await fetchApi(`/api/messages/conversations/with/${targetUserId}`, { method: "POST" });
          // Update conversations list
          convs = await loadConversations();
          setActiveConvId(conv.id);
        } else if (convs.length > 0) {
          setActiveConvId(convs[0].id);
        }
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [me, targetUserId]);

  // Load messages when activeConvId changes
  useEffect(() => {
    if (!activeConvId) return;
    setMsgLoading(true);
    fetchApi(`/api/messages/conversations/${activeConvId}/messages`)
      .then((data) => {
        setMessages(data);
        setMsgLoading(false);
      })
      .catch(() => setMsgLoading(false));

    // Poll for new messages every 3 seconds
    clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      try {
        const data = await fetchApi(`/api/messages/conversations/${activeConvId}/messages`);
        setMessages(data);
      } catch {}
    }, 3000);

    return () => clearInterval(pollRef.current);
  }, [activeConvId]);

  // Auto-scroll to latest
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim() || !activeConvId || sending) return;
    setSending(true);
    const optimistic = { id: Date.now(), sender_id: me.id, content: newMsg, created_at: new Date().toISOString(), is_read: false, sender: me };
    setMessages((prev) => [...prev, optimistic]);
    const draft = newMsg;
    setNewMsg("");
    try {
      const res = await fetchApi(`/api/messages/conversations/${activeConvId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: draft }),
      });
      setMessages((prev) => prev.map((m) => (m.id === optimistic.id ? res : m)));
      // Update conversation's last message timestamp in list
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId ? { ...c, last_message: res, last_message_at: res.created_at } : c
        )
      );
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setNewMsg(draft);
    } finally {
      setSending(false);
    }
  };

  const activeConv = conversations.find((c) => c.id === activeConvId);
  const otherUser = activeConv
    ? activeConv.user_a_id === me?.id ? activeConv.user_b : activeConv.user_a
    : null;

  const filteredConvs = conversations.filter((c) => {
    const other = c.user_a_id === me?.id ? c.user_b : c.user_a;
    return other?.name?.toLowerCase().includes(search.toLowerCase());
  });

  if (!me) {
    return (
      <div className="flex items-center justify-center h-[70vh] text-muted-foreground">
        <div className="text-center space-y-3">
          <MessageSquare className="h-12 w-12 mx-auto opacity-30" />
          <p>Please <Link href="/auth/login" className="text-primary underline">log in</Link> to view messages.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 h-screen w-full overflow-hidden bg-background">
      {/* Mobile: show list OR chat. Desktop: side-by-side */}
      <div className="flex h-full min-h-0">

        {/* Left: Conversations sidebar */}
        <aside className={`${activeConvId ? "hidden md:flex" : "flex"} flex-col w-full md:w-80 border-r border-border shrink-0 bg-card`}>
          <div className="p-4 border-b border-border flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Link href="/" className="p-2 -ml-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <h2 className="font-bold text-lg">Messages</h2>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                className="w-full rounded-xl border bg-muted/40 pl-9 pr-3 py-2 text-sm outline-none focus:border-primary/40"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 animate-pulse">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-24 bg-muted rounded" />
                      <div className="h-3 w-40 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredConvs.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                No conversations yet.
              </div>
            ) : (
              filteredConvs.map((conv) => {
                const other = conv.user_a_id === me.id ? conv.user_b : conv.user_a;
                const isActive = conv.id === activeConvId;
                const lastMsg = conv.last_message;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50 border-b border-border/40 ${isActive ? "bg-primary/5 border-l-2 border-l-primary" : ""}`}
                  >
                    <Avatar user={other} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm truncate">{other?.name}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0">{formatTime(conv.last_message_at)}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {lastMsg ? (lastMsg.sender_id === me.id ? "You: " : "") + lastMsg.content : "Start a conversation"}
                      </p>
                    </div>
                    {conv.unread_count > 0 && (
                      <span className="h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center px-1 shrink-0">
                        {conv.unread_count}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </aside>

        {/* Right: Chat window */}
        <div className={`${!activeConvId ? "hidden md:flex" : "flex"} flex-1 flex-col min-w-0 min-h-0`}>
          {!activeConvId ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <MessageSquare className="h-12 w-12 mx-auto opacity-20" />
                <p className="text-sm">Select a conversation</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-card/80 shrink-0">
                <button onClick={() => setActiveConvId(null)} className="md:hidden p-1 hover:bg-muted rounded-lg">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {otherUser && (
                  <>
                    <Avatar user={otherUser} />
                    <div>
                      <Link href={`/profile/${otherUser.id}`} className="font-semibold text-sm hover:underline">{otherUser.name}</Link>
                      <p className="text-xs text-muted-foreground capitalize">{otherUser.poster_type}</p>
                    </div>
                  </>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                {msgLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                    Send a message to start the conversation
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isMine = msg.sender_id === me.id;
                    const isDocument = msg.content.startsWith("📎 **Document:** ");
                    
                    return (
                      <div key={msg.id} className={`flex gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                        {!isMine && <Avatar user={msg.sender} size="sm" />}
                        <div className={`max-w-[70%] group`}>
                          {isDocument ? (
                            <a
                              href={msg.content.replace("📎 **Document:** ", "").trim()}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity ${
                                isMine
                                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                                  : "bg-muted text-foreground rounded-tl-sm border border-border"
                              }`}
                            >
                              <span className="text-xl">📎</span> View Attached Document
                            </a>
                          ) : (
                            <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                              isMine
                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                : "bg-muted text-foreground rounded-tl-sm border border-border"
                            }`}>
                              {msg.content}
                            </div>
                          )}
                          <p className={`text-[11px] text-muted-foreground mt-1 ${isMine ? "text-right" : "text-left"}`}>
                            {formatTime(msg.created_at)}
                            {isMine && msg.is_read && <span className="ml-1 text-primary">✓✓</span>}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="flex gap-2 p-4 border-t border-border bg-card/80 shrink-0">
                <input
                  className="flex-1 rounded-full border bg-muted/40 px-4 py-2.5 text-sm outline-none focus:border-primary/50 transition-colors"
                  placeholder="Type a message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!newMsg.trim() || sending}
                  className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:bg-primary/90 transition-colors shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <MessagesPageInner />
    </Suspense>
  );
}
