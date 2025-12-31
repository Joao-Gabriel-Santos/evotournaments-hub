import { motion } from "framer-motion";
import { Trophy, Crown } from "lucide-react";

interface BracketMatch {
  id: string;
  player1?: { name: string; team: string; score?: number };
  player2?: { name: string; team: string; score?: number };
  winner?: 1 | 2;
  status: "pending" | "live" | "finished";
}

interface BracketRound {
  name: string;
  matches: BracketMatch[];
}

interface KnockoutBracketProps {
  rounds: BracketRound[];
  champion?: { name: string; team: string };
}

const MatchCard = ({ match, isLast }: { match: BracketMatch; isLast?: boolean }) => {
  const getPlayerStyle = (playerNum: 1 | 2) => {
    if (match.status !== "finished") return "text-foreground";
    return match.winner === playerNum ? "text-accent font-bold" : "text-muted-foreground";
  };

  const getScoreStyle = (playerNum: 1 | 2) => {
    if (match.status !== "finished") return "text-foreground bg-secondary/50";
    return match.winner === playerNum 
      ? "text-background bg-accent font-bold" 
      : "text-muted-foreground bg-secondary/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative bg-card border ${
        match.status === "live" 
          ? "border-red-500 shadow-lg shadow-red-500/20" 
          : "border-border/50"
      } rounded-lg overflow-hidden min-w-[180px] md:min-w-[220px]`}
    >
      {/* Live Indicator */}
      {match.status === "live" && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-orange-500 animate-pulse" />
      )}

      {/* Player 1 */}
      <div className={`flex items-center justify-between p-2 md:p-3 border-b border-border/30 ${
        match.winner === 1 ? "bg-accent/10" : ""
      }`}>
        <div className="flex-1 min-w-0">
          <p className={`text-sm truncate ${getPlayerStyle(1)}`}>
            {match.player1?.name || "A definir"}
          </p>
          {match.player1?.team && (
            <p className="text-[10px] text-muted-foreground truncate">
              {match.player1.team}
            </p>
          )}
        </div>
        <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded text-sm ${getScoreStyle(1)}`}>
          {match.player1?.score ?? "-"}
        </div>
      </div>

      {/* Player 2 */}
      <div className={`flex items-center justify-between p-2 md:p-3 ${
        match.winner === 2 ? "bg-accent/10" : ""
      }`}>
        <div className="flex-1 min-w-0">
          <p className={`text-sm truncate ${getPlayerStyle(2)}`}>
            {match.player2?.name || "A definir"}
          </p>
          {match.player2?.team && (
            <p className="text-[10px] text-muted-foreground truncate">
              {match.player2.team}
            </p>
          )}
        </div>
        <div className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded text-sm ${getScoreStyle(2)}`}>
          {match.player2?.score ?? "-"}
        </div>
      </div>
    </motion.div>
  );
};

export const KnockoutBracket = ({ rounds, champion }: KnockoutBracketProps) => {
  return (
    <div className="space-y-8">
      {/* Mobile View - Vertical Stack */}
      <div className="block lg:hidden space-y-8">
        {rounds.map((round, roundIndex) => (
          <div key={round.name} className="space-y-4">
            <h3 className="font-display font-bold text-primary text-center py-2 px-4 bg-primary/10 rounded-lg">
              {round.name}
            </h3>
            <div className="space-y-3">
              {round.matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}

        {/* Champion */}
        {champion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 p-6 bg-gradient-to-b from-accent/20 to-transparent rounded-xl border border-accent/30"
          >
            <Trophy className="w-12 h-12 text-accent" />
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Campeão</p>
              <p className="font-display text-xl font-bold text-accent">{champion.name}</p>
              <p className="text-sm text-muted-foreground">{champion.team}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Desktop View - Horizontal Bracket */}
      <div className="hidden lg:block overflow-x-auto pb-4">
        <div className="flex items-center gap-8 min-w-max px-4">
          {rounds.map((round, roundIndex) => {
            const matchHeight = 120;
            const gap = roundIndex === 0 ? 16 : 16 + (matchHeight + 16) * (Math.pow(2, roundIndex) - 1);
            
            return (
              <div key={round.name} className="flex flex-col items-center">
                <h3 className="font-display font-bold text-primary mb-4 text-center whitespace-nowrap py-2 px-4 bg-primary/10 rounded-lg">
                  {round.name}
                </h3>
                <div 
                  className="flex flex-col justify-around"
                  style={{ gap: `${gap}px` }}
                >
                  {round.matches.map((match, matchIndex) => (
                    <div key={match.id} className="relative">
                      <MatchCard match={match} isLast={roundIndex === rounds.length - 1} />
                      
                      {/* Connector Lines */}
                      {roundIndex < rounds.length - 1 && (
                        <div className="absolute top-1/2 -right-8 w-8 h-px bg-border" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Champion Trophy */}
          {champion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-3 p-6 bg-gradient-to-b from-accent/20 to-transparent rounded-xl border border-accent/30"
            >
              <div className="relative">
                <Trophy className="w-16 h-16 text-accent" />
                <Crown className="w-6 h-6 text-accent absolute -top-2 left-1/2 -translate-x-1/2" />
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Campeão</p>
                <p className="font-display text-xl font-bold text-accent">{champion.name}</p>
                <p className="text-sm text-muted-foreground">{champion.team}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
