export function AgentCard({
  title,
  desc,
  agentType = "Agent Lefebvre",
}: {
  title: string;
  desc: string;
  agentType?: string;
}) {
  return (
    <div className="dashboard-card group cursor-pointer">
      {/* Bandeau bleu */}
      <div className="card-gradient text-white px-6 py-4">
        <div className="text-lg font-bold">Lefebvre Dalloz</div>
        <div className="text-sm opacity-90">{agentType}</div>
      </div>

      {/* Corps de la carte */}
      <div className="p-6">
        <div className="text-lg font-semibold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
          {title}
        </div>
        <div className="text-sm text-gray-600 mb-4 leading-relaxed">
          {desc}
        </div>
        <div className="space-y-1 text-xs text-gray-500">
          <div><span className="font-medium text-blue-600">Équipe:</span> Com Digitale</div>
          <div><span className="font-medium text-blue-600">Format de sortie:</span> Texte</div>
          <div><span className="font-medium text-blue-600">Dernière exécution:</span> 24 juillet 2025</div>
        </div>
      </div>
    </div>
  );
}
