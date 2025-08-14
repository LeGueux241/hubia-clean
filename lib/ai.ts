// lib/ai.ts
const OPENAI_API = "https://api.openai.com/v1/chat/completions";

export type ChatMessage = { 
  role: "system" | "user" | "assistant"; 
  content: string 
};

export type AskArgs = {
  system: string;
  user: string;
  temperature?: number;
};

export type ChatArgs = {
  system: string;
  messages: ChatMessage[];
  temperature?: number;
};

export async function askOpenAI({ system, user, temperature = 0.5 }: AskArgs) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY manquante");
  }

  const res = await fetch(OPENAI_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content ?? "";
}

export async function chatOpenAI({ system, messages, temperature = 0.6 }: ChatArgs) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error("OPENAI_API_KEY manquante");
  }

  const res = await fetch(OPENAI_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature,
      messages: [{ role: "system", content: system }, ...messages],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI ${res.status}: ${txt}`);
  }

  const json = await res.json();
  return (json.choices?.[0]?.message?.content as string) ?? "";
}