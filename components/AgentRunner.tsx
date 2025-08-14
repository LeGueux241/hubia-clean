"use client";
import { useState } from "react";

export default function AgentRunner({ agentId }: { agentId: string }) {
  const [text, setText] = useState("");
  const [out, setOut] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOut(null);
    setErr(null);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, agent: agentId }),
      });
      const json = await res.json();
      if (json.ok) setOut(json.answer);
      else setErr(json.error || "Erreur inconnue");
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      <textarea
        className="w-full border rounded-lg p-3 bg-white"
        rows={6}
        placeholder="Décris ta demande…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={run}
        disabled={loading}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
      >
        {loading ? "Génération…" : "GÉNÉRER"}
      </button>
      {err && <div className="text-red-600">{err}</div>}
      {out && (
        <div className="whitespace-pre-wrap rounded-lg border p-3 bg-white">
          {out}
        </div>
      )}
    </div>
  );
}