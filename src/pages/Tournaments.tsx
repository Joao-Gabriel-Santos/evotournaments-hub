import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { TournamentCard, Tournament } from "@/components/TournamentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const allTournaments: Tournament[] = [
  {
    id: "1",
    name: "Copa dos Campeões",
    prize: "R$ 500",
    entryFee: "R$ 20",
    players: 28,
    maxPlayers: 32,
    startDate: "05 Jan 2026",
    status: "open",
    format: "Mata-Mata",
  },
  {
    id: "2",
    name: "Liga dos 10 Reais",
    prize: "R$ 200",
    entryFee: "R$ 10",
    players: 16,
    maxPlayers: 16,
    startDate: "01 Jan 2026",
    status: "inProgress",
    format: "Pontos Corridos",
  },
  {
    id: "3",
    name: "Torneio Iniciante",
    prize: "R$ 100",
    entryFee: "R$ 5",
    players: 10,
    maxPlayers: 16,
    startDate: "10 Jan 2026",
    status: "open",
    format: "Grupos + Mata-Mata",
  },
  {
    id: "4",
    name: "Super Copa Premium",
    prize: "R$ 1.000",
    entryFee: "R$ 50",
    players: 32,
    maxPlayers: 32,
    startDate: "28 Dez 2025",
    status: "completed",
    format: "Mata-Mata",
  },
  {
    id: "5",
    name: "Liga Semanal #12",
    prize: "R$ 150",
    entryFee: "R$ 8",
    players: 12,
    maxPlayers: 20,
    startDate: "08 Jan 2026",
    status: "open",
    format: "Pontos Corridos",
  },
  {
    id: "6",
    name: "Torneio Relâmpago",
    prize: "R$ 80",
    entryFee: "R$ 5",
    players: 8,
    maxPlayers: 8,
    startDate: "02 Jan 2026",
    status: "inProgress",
    format: "Mata-Mata",
  },
];

type FilterType = "all" | "open" | "inProgress" | "completed";

const Tournaments = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTournaments = allTournaments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || t.status === filter;
    return matchesSearch && matchesFilter;
  });

  const filterButtons: { value: FilterType; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "open", label: "Abertos" },
    { value: "inProgress", label: "Em Andamento" },
    { value: "completed", label: "Finalizados" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Lobby de </span>
              <span className="text-primary text-glow">Torneios</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Encontre o campeonato ideal para seu nível e conquiste prêmios.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar torneios..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {filterButtons.map((btn) => (
                <Button
                  key={btn.value}
                  variant={filter === btn.value ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setFilter(btn.value)}
                  className="whitespace-nowrap"
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Tournament Grid */}
          {filteredTournaments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament, index) => (
                <TournamentCard
                  key={tournament.id}
                  tournament={tournament}
                  onSelect={(id) => navigate(`/tournament/${id}`)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum torneio encontrado.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Tournaments;
