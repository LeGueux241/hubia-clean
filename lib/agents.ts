import data from "@/data/agents.json";

export type Agent = {
  id: string;
  name: string;
  sidebarLabel?: string;
  icon?: string;            // nom d'icône lucide-react, ex: UserCircle2
  temperature?: number;
  system: string;           // prompt système
};

export function listAgents(): Agent[] {
  return data as Agent[];
}

export function getAgent(id: string): Agent | null {
  return listAgents().find(a => a.id === id) ?? null;
}