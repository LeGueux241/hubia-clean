import { askOpenAI } from "@/lib/ai";
import { getAgent } from "@/lib/agents";

export async function POST(req: Request) {
  const { input, agent } = await req.json();
  const found = getAgent(agent);

  if (!found) {
    return Response.json(
      { ok: false, error: `Agent "${agent}" introuvable` },
      { status: 400 }
    );
  }

  try {
    const answer = await askOpenAI({
      system: found.system,
      user: String(input || ""),          // <- ICI : 'user' attendu par AskArgs
      temperature: found.temperature ?? 0.7,
    });

    return Response.json({ ok: true, answer });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: e.message },
      { status: 500 }
    );
  }
}
