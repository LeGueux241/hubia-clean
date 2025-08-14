import { chatOpenAI } from "@/lib/ai";
import { getAgent } from "@/lib/agents";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ agent: string }> }
) {
  const { messages } = await req.json();
  const { agent } = await params;
  
  const found = getAgent(agent);
  if (!found) {
    return Response.json({ ok: false, error: `Agent "${agent}" introuvable` }, { status: 400 });
  }

  try {
    const answer = await chatOpenAI({
      system: found.system,
      messages,
      temperature: found.temperature ?? 0.5,
    });
    return Response.json({ ok: true, answer });
  } catch (e: any) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}