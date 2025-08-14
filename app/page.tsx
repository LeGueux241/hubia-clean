import { ToolCard } from "@/components/ToolCard";
import { AgentCard } from "@/components/AgentCard";
import { Images, NotebookPen, ChevronDown } from "lucide-react";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <p className="text-gray-600 leading-relaxed">
          Bonjour Jean Michel, bienvenue dans votre hub IA Lefebvre Dalloz. Retrouvez tous vos outils pour gagner du temps
        </p>
      </div>

      {/* Outils IA */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Outils IA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolCard title="Générateur de visuel Lefebvre Dalloz" subtitle="Créez des visuels à la charte" href="/images" Icon={Images} />
          <ToolCard title="Comptes-rendus de réunions" subtitle="Synthèses COMEX prêtes à partager" href="/reunions" Icon={NotebookPen} />
        </div>
      </section>

      {/* Populaires */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Populaires chez Lefebvre Dalloz</h2>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AgentCard 
            title="Agent commercial Lefebvre Dalloz" 
            desc="C'est agent est spécialisé sur les question concernant Lefebvre Dalloz"
            agentType="Agent Lefebvre"
          />
          <AgentCard 
            title="On boarding chez Lefebvre" 
            desc="vous venez de rentrer chez Lefbvre ? Découvrez comment fonctionne l'entreprise"
            agentType="Agent On Boarding"
          />
        </div>
      </section>

      {/* Communication */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Communication</h2>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AgentCard 
            title="Agent de rédaction Newsletter" 
            desc="Rédacteur de la NL - Bimensuel par Eléonore"
            agentType="Agent Newsletter"
          />
          <AgentCard 
            title="Rédacteur post LinkedIn" 
            desc="Rédacteur post hebdomadaire par Charlotte"
            agentType="Agent LinkedIn"
          />
        </div>
      </section>
    </div>
  );
}