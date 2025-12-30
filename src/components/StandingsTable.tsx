import { motion } from "framer-motion";
import { Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TeamStanding {
  position: number;
  team: string;
  player: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

interface TopScorer {
  position: number;
  player: string;
  team: string;
  goals: number;
}

interface StandingsTableProps {
  standings: TeamStanding[];
  topScorers: TopScorer[];
}

export const StandingsTable = ({ standings, topScorers }: StandingsTableProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main Standings */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="lg:col-span-2"
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              Classificação
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="text-center">J</TableHead>
                  <TableHead className="text-center">V</TableHead>
                  <TableHead className="text-center">E</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">SG</TableHead>
                  <TableHead className="text-center font-bold">PTS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((team, index) => (
                  <TableRow
                    key={team.team}
                    className={`border-border transition-colors ${
                      index < 2
                        ? "bg-primary/10 hover:bg-primary/20"
                        : index < 4
                        ? "bg-accent/5 hover:bg-accent/10"
                        : "hover:bg-secondary/50"
                    }`}
                  >
                    <TableCell className="text-center font-display font-bold">
                      {index < 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs">
                          {team.position}
                        </span>
                      ) : (
                        team.position
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-foreground">{team.team}</p>
                        <p className="text-xs text-muted-foreground">{team.player}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{team.played}</TableCell>
                    <TableCell className="text-center text-green-400">{team.won}</TableCell>
                    <TableCell className="text-center text-muted-foreground">{team.drawn}</TableCell>
                    <TableCell className="text-center text-destructive">{team.lost}</TableCell>
                    <TableCell className="text-center">
                      <span className={team.goalDiff > 0 ? "text-green-400" : team.goalDiff < 0 ? "text-destructive" : ""}>
                        {team.goalDiff > 0 ? `+${team.goalDiff}` : team.goalDiff}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-display font-bold text-lg text-primary">
                      {team.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Scorers */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Artilharia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topScorers.map((scorer, index) => (
                <div
                  key={scorer.player}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    index === 0
                      ? "bg-accent/20 border border-accent/30"
                      : "bg-secondary/30 hover:bg-secondary/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-display font-bold ${
                        index === 0 ? "text-accent text-xl" : "text-muted-foreground"
                      }`}
                    >
                      {scorer.position}º
                    </span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{scorer.player}</p>
                      <p className="text-xs text-muted-foreground">{scorer.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-display font-bold text-xl text-primary">
                      {scorer.goals}
                    </span>
                    <span className="text-xs text-muted-foreground">gols</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
