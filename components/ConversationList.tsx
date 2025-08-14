"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

type Conversation = {
  id: string;
  agentId: string;
  title: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  createdAt: string;
  updatedAt: string;
};

export function ConversationList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConversations() {
      try {
        const res = await fetch("/api/conversations");
        const data = await res.json();
        if (data.ok) {
          setConversations(data.conversations);
        }
      } catch (e) {
        console.error("Erreur chargement conversations:", e);
      } finally {
        setLoading(false);
      }
    }
    
    loadConversations();
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-2 text-xs text-gray-400">
        Chargement...
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="px-4 py-2 text-xs text-gray-400">
        Aucune conversation
      </div>
    );
  }

  return (
    <div className="max-h-72 overflow-y-auto space-y-1">
      {conversations.slice(0, 5).map((conv) => (
        <Link
          key={conv.id}
          href={`/agents/${conv.agentId}?c=${conv.id}`}
          className="flex items-center gap-2 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors block"
          title={conv.title || "Conversation sans titre"}
        >
          <MessageSquare className="h-4 w-4 shrink-0" />
          <span className="text-sm truncate">
            {conv.title || "Conversation sans titre"}
          </span>
        </Link>
      ))}
    </div>
  );
}