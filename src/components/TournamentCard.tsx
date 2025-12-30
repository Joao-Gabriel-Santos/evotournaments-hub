import { Trophy, Users, Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Tournament {
  id: string;
  name: string;
  prize: string;
  entryFee: string;
  players: number;
  maxPlayers: number;
  startDate: string;
  status: "open" | "inProgress" | "completed";
  format: string;
}

interface TournamentCardProps {
  tournament: Tournament;
  onSelect: (id: string) => void;
  delay?: number;
}

const statusConfig = {
  open: { label: "Inscrições Abertas", className: "bg-primary/20 text-primary border-primary/30" },
  inProgress: { label: "Em Andamento", className: "bg-accent/20 text-accent border-accent/30" },
  completed: { label: "Finalizado", className: "bg-muted text-muted-foreground border-muted" },
};

export const TournamentCard = ({ tournament, onSelect, delay = 0 }: TournamentCardProps) => {
  const status = statusConfig[tournament.status];
  const spotsLeft = tournament.maxPlayers - tournament.players;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card variant="tournament" className="overflow-hidden group cursor-pointer" onClick={() => onSelect(tournament.id)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
              {tournament.name}
            </CardTitle>
            <Badge variant="outline" className={status.className}>
              {status.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="font-display font-bold text-accent text-lg">{tournament.prize}</span>
            </div>
            <span className="text-sm text-muted-foreground">{tournament.format}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{tournament.players}/{tournament.maxPlayers} jogadores</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{tournament.startDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div>
              <span className="text-xs text-muted-foreground">Taxa de Inscrição</span>
              <p className="font-display font-semibold text-primary">{tournament.entryFee}</p>
            </div>
            <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
              {tournament.status === "open" ? (
                <>
                  Inscrever-se
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                "Ver Detalhes"
              )}
            </Button>
          </div>

          {tournament.status === "open" && spotsLeft <= 5 && (
            <div className="text-center">
              <span className="text-xs text-destructive font-semibold animate-pulse">
                ⚡ Apenas {spotsLeft} vagas restantes!
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
