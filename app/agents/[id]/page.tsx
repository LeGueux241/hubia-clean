"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { ChatMessage as Bubble } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { getAgent } from "@/lib/agents";

type Msg = { role: "user" | "assistant"; content: string };

export default function AgentChatPage() {
  const params = useParams<{ id: string }>();
  const agent = params.id;

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre agent. Posez votre question ou décrivez votre besoin 🙂",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const storageKey = useMemo(() => `chat:${agent}`, [agent]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsedMsgs = JSON.parse(saved);
        if (Array.isArray(parsedMsgs) && parsedMsgs.length > 0) {
          setMsgs(parsedMsgs);
        }
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(msgs));
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, storageKey]);

  async function send(text: string) {
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setLoading(true);

    try {
      const res = await fetch(`/api/chat/${agent}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter(m => m.role !== "assistant" || m.content !== "Bonjour ! Je suis votre agent. Posez votre question ou décrivez votre besoin 🙂"),
        }),
      });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Erreur API");
      setMsgs((curr) => [...curr, { role: "assistant", content: json.answer }]);
    } catch (e: any) {
      setMsgs((curr) => [
        ...curr,
        {
          role: "assistant",
          content: "Désolé, une erreur est survenue. Réessayez dans un instant.\n\n" + (e?.message || ""),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const agentData = getAgent(agent);
  const title = agentData?.name || `Agent ${agent}`;

  return (
    <div className="flex flex-col h-full">
      {/* Titre */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
        <div className="space-y-3">
          {msgs.map((m, i) => (
            <Bubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="w-full flex justify-start">
              <div className="max-w-[80%] bg-white text-gray-900 border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400" />
                </div>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white shrink-0 md:static sticky bottom-0 z-10">
        <ChatInput onSend={send} disabled={loading} />
      </div>
    </div>
  );
}
