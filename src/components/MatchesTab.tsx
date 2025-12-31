import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords, Clock, CheckCircle } from "lucide-react";

interface Match {
  id: string;
  round: string;
  homePlayer: string;
  homeTeam: string;
  homeScore?: number;
  awayPlayer: string;
  awayTeam: string;
  awayScore?: number;
  status: "pending" | "live" | "finished";
  date?: string;
}

interface MatchesTabProps {
  matches: Match[];
}

export const MatchesTab = ({ matches }: MatchesTabProps) => {
  const getStatusBadge = (status: Match["status"]) => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
            AO VIVO
          </Badge>
        );
      case "finished":
        return (
          <Badge variant="outline" className="bg-muted/30 text-muted-foreground border-muted">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finalizado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        );
    }
  };

  const groupedMatches = matches.reduce((acc, match) => {
    if (!acc[match.round]) {
      acc[match.round] = [];
    }
    acc[match.round].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedMatches).map(([round, roundMatches]) => (
        <Card key={round} variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Swords className="w-5 h-5 text-primary" />
              {round}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {roundMatches.map((match) => (
              <div
                key={match.id}
                className="relative p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-all"
              >
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {getStatusBadge(match.status)}
                </div>

                {/* Match Content */}
                <div className="flex items-center justify-between gap-4">
                  {/* Home Player */}
                  <div className="flex-1 text-right">
                    <p className="font-display font-bold text-foreground truncate">
                      {match.homePlayer}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {match.homeTeam}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="flex items-center gap-2 px-4">
                    <span className={`font-display text-2xl font-bold ${
                      match.status === "finished" && match.homeScore !== undefined && match.awayScore !== undefined
                        ? match.homeScore > match.awayScore
                          ? "text-accent"
                          : match.homeScore < match.awayScore
                          ? "text-muted-foreground"
                          : "text-foreground"
                        : "text-foreground"
                    }`}>
                      {match.homeScore ?? "-"}
                    </span>
                    <span className="text-muted-foreground font-bold">x</span>
                    <span className={`font-display text-2xl font-bold ${
                      match.status === "finished" && match.homeScore !== undefined && match.awayScore !== undefined
                        ? match.awayScore > match.homeScore
                          ? "text-accent"
                          : match.awayScore < match.homeScore
                          ? "text-muted-foreground"
                          : "text-foreground"
                        : "text-foreground"
                    }`}>
                      {match.awayScore ?? "-"}
                    </span>
                  </div>

                  {/* Away Player */}
                  <div className="flex-1 text-left">
                    <p className="font-display font-bold text-foreground truncate">
                      {match.awayPlayer}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {match.awayTeam}
                    </p>
                  </div>
                </div>

                {/* Date */}
                {match.date && (
                  <p className="text-center text-xs text-muted-foreground mt-2">
                    {match.date}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
