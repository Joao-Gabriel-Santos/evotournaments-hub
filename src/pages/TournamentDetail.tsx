import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Users, Calendar, DollarSign, FileText, Swords } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StandingsTable } from "@/components/StandingsTable";
import { PaymentSection } from "@/components/PaymentSection";
import { PlayerRegistrationForm } from "@/components/PlayerRegistrationForm";
import { MatchesTab } from "@/components/MatchesTab";
import { KnockoutBracket } from "@/components/KnockoutBracket";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tournament data based on ID - simulating different formats
const getTournamentData = (id: string) => {
  const tournaments: Record<string, typeof baseTournament> = {
    "1": {
      id: "1",
      name: "Copa dos Campeões",
      prize: "R$ 500",
      entryFee: "R$ 20",
      players: 28,
      maxPlayers: 32,
      startDate: "05 Jan 2026",
      status: "open" as const,
      format: "Mata-Mata" as const,
      description: "O maior torneio da temporada! Prove suas habilidades no eFootball Mobile e conquiste o título de campeão.",
      rules: [
        "Partidas de ida e volta nas quartas de final",
        "Tempo de 6 minutos por partida",
        "Empate leva para pênaltis",
        "Time base máximo de 3000 de força",
        "Proibido uso de jogadores icônicos",
      ],
      pixKey: "efootballcup@pix.com",
    },
    "2": {
      id: "2",
      name: "Liga dos 10 Reais",
      prize: "R$ 150",
      entryFee: "R$ 10",
      players: 16,
      maxPlayers: 16,
      startDate: "15 Jan 2026",
      status: "active" as const,
      format: "Pontos Corridos" as const,
      description: "Liga competitiva com partidas todos contra todos. Consistência é a chave para a vitória!",
      rules: [
        "Todos jogam contra todos",
        "Tempo de 6 minutos por partida",
        "Vitória: 3 pontos, Empate: 1 ponto",
        "Critérios de desempate: Saldo de gols, Gols marcados",
        "Time base máximo de 2800 de força",
      ],
      pixKey: "ligados10@pix.com",
    },
    "3": {
      id: "3",
      name: "Torneio Relâmpago",
      prize: "R$ 100",
      entryFee: "R$ 5",
      players: 8,
      maxPlayers: 8,
      startDate: "20 Jan 2026",
      status: "active" as const,
      format: "Mata-Mata" as const,
      description: "Torneio rápido e eliminatório. Quem perder, está fora!",
      rules: [
        "Eliminação direta",
        "Tempo de 4 minutos por partida",
        "Empate vai direto para pênaltis",
        "Sem restrição de força do time",
      ],
      pixKey: "relampago@pix.com",
    },
  };
  
  return tournaments[id] || tournaments["1"];
};

const baseTournament = {
  id: "1",
  name: "Copa dos Campeões",
  prize: "R$ 500",
  entryFee: "R$ 20",
  players: 28,
  maxPlayers: 32,
  startDate: "05 Jan 2026",
  status: "open" as "open" | "active" | "finished",
  format: "Mata-Mata" as "Mata-Mata" | "Pontos Corridos",
  description: "",
  rules: [] as string[],
  pixKey: "",
};

const standings = [
  { position: 1, team: "FC Champions", player: "ProPlayer123", played: 6, won: 5, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 5, goalDiff: 13, points: 16 },
  { position: 2, team: "United Gaming", player: "GamerKing", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 14, goalsAgainst: 6, goalDiff: 8, points: 14 },
  { position: 3, team: "Esports Elite", player: "EliteX", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 12, goalsAgainst: 7, goalDiff: 5, points: 13 },
  { position: 4, team: "Victory FC", player: "VictoryBR", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 11, goalsAgainst: 8, goalDiff: 3, points: 11 },
  { position: 5, team: "Thunder Team", player: "ThunderX", played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 9, goalsAgainst: 9, goalDiff: 0, points: 8 },
  { position: 6, team: "Alpha Squad", player: "AlphaMaster", played: 6, won: 2, drawn: 1, lost: 3, goalsFor: 8, goalsAgainst: 10, goalDiff: -2, points: 7 },
];

const topScorers = [
  { position: 1, player: "ProPlayer123", team: "FC Champions", goals: 8 },
  { position: 2, player: "GamerKing", team: "United Gaming", goals: 6 },
  { position: 3, player: "EliteX", team: "Esports Elite", goals: 5 },
  { position: 4, player: "VictoryBR", team: "Victory FC", goals: 4 },
  { position: 5, player: "ThunderX", team: "Thunder Team", goals: 3 },
];

const registeredPlayers = [
  { name: "ProPlayer123", team: "FC Champions", gameId: "123456789" },
  { name: "GamerKing", team: "United Gaming", gameId: "987654321" },
  { name: "EliteX", team: "Esports Elite", gameId: "456789123" },
  { name: "VictoryBR", team: "Victory FC", gameId: "321654987" },
  { name: "ThunderX", team: "Thunder Team", gameId: "789123456" },
  { name: "NinjaGamer", team: "Ninja FC", gameId: "159753468" },
  { name: "ShadowX", team: "Shadow Team", gameId: "357159852" },
  { name: "PhoenixBR", team: "Phoenix Gaming", gameId: "258369147" },
];

// Matches for Pontos Corridos (League)
const leagueMatches = [
  { id: "1", round: "Rodada 1", homePlayer: "ProPlayer123", homeTeam: "FC Champions", homeScore: 3, awayPlayer: "GamerKing", awayTeam: "United Gaming", awayScore: 1, status: "finished" as const, date: "05 Jan 2026" },
  { id: "2", round: "Rodada 1", homePlayer: "EliteX", homeTeam: "Esports Elite", homeScore: 2, awayPlayer: "VictoryBR", awayTeam: "Victory FC", awayScore: 2, status: "finished" as const, date: "05 Jan 2026" },
  { id: "3", round: "Rodada 1", homePlayer: "ThunderX", homeTeam: "Thunder Team", homeScore: 1, awayPlayer: "NinjaGamer", awayTeam: "Ninja FC", awayScore: 0, status: "finished" as const, date: "05 Jan 2026" },
  { id: "4", round: "Rodada 2", homePlayer: "GamerKing", homeTeam: "United Gaming", homeScore: undefined, awayPlayer: "EliteX", awayTeam: "Esports Elite", awayScore: undefined, status: "live" as const, date: "06 Jan 2026" },
  { id: "5", round: "Rodada 2", homePlayer: "VictoryBR", homeTeam: "Victory FC", homeScore: undefined, awayPlayer: "ThunderX", awayTeam: "Thunder Team", awayScore: undefined, status: "pending" as const, date: "06 Jan 2026" },
  { id: "6", round: "Rodada 2", homePlayer: "NinjaGamer", homeTeam: "Ninja FC", homeScore: undefined, awayPlayer: "ProPlayer123", awayTeam: "FC Champions", awayScore: undefined, status: "pending" as const, date: "06 Jan 2026" },
  { id: "7", round: "Rodada 3", homePlayer: "ProPlayer123", homeTeam: "FC Champions", homeScore: undefined, awayPlayer: "EliteX", awayTeam: "Esports Elite", awayScore: undefined, status: "pending" as const, date: "07 Jan 2026" },
  { id: "8", round: "Rodada 3", homePlayer: "GamerKing", homeTeam: "United Gaming", homeScore: undefined, awayPlayer: "ThunderX", awayTeam: "Thunder Team", awayScore: undefined, status: "pending" as const, date: "07 Jan 2026" },
];

// Bracket for Mata-Mata (Knockout)
const knockoutRounds = [
  {
    name: "Quartas de Final",
    matches: [
      {
        id: "qf1",
        player1: { name: "ProPlayer123", team: "FC Champions", score: 3 },
        player2: { name: "ShadowX", team: "Shadow Team", score: 1 },
        winner: 1 as const,
        status: "finished" as const,
      },
      {
        id: "qf2",
        player1: { name: "GamerKing", team: "United Gaming", score: 2 },
        player2: { name: "PhoenixBR", team: "Phoenix Gaming", score: 2 },
        winner: 1 as const,
        status: "finished" as const,
      },
      {
        id: "qf3",
        player1: { name: "EliteX", team: "Esports Elite", score: 4 },
        player2: { name: "NinjaGamer", team: "Ninja FC", score: 0 },
        winner: 1 as const,
        status: "finished" as const,
      },
      {
        id: "qf4",
        player1: { name: "VictoryBR", team: "Victory FC", score: 1 },
        player2: { name: "ThunderX", team: "Thunder Team", score: 2 },
        winner: 2 as const,
        status: "finished" as const,
      },
    ],
  },
  {
    name: "Semifinal",
    matches: [
      {
        id: "sf1",
        player1: { name: "ProPlayer123", team: "FC Champions", score: 2 },
        player2: { name: "GamerKing", team: "United Gaming", score: 1 },
        winner: 1 as const,
        status: "finished" as const,
      },
      {
        id: "sf2",
        player1: { name: "EliteX", team: "Esports Elite" },
        player2: { name: "ThunderX", team: "Thunder Team" },
        status: "live" as const,
      },
    ],
  },
  {
    name: "Final",
    matches: [
      {
        id: "f1",
        player1: { name: "ProPlayer123", team: "FC Champions" },
        status: "pending" as const,
      },
    ],
  },
];

const TournamentDetail = () => {
  const { id } = useParams();
  const [showRegistration, setShowRegistration] = useState(false);
  
  const tournamentData = getTournamentData(id || "1");
  const isKnockout = tournamentData.format === "Mata-Mata";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/tournaments">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Torneios
            </Button>
          </Link>

          {/* Tournament Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 mb-2">
                  Inscrições Abertas
                </Badge>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {tournamentData.name}
                </h1>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={() => setShowRegistration(true)}
              >
                Inscrever-se Agora
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Prêmio</p>
                    <p className="font-display font-bold text-lg text-accent">{tournamentData.prize}</p>
                  </div>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Inscrição</p>
                    <p className="font-display font-bold text-lg text-foreground">{tournamentData.entryFee}</p>
                  </div>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Jogadores</p>
                    <p className="font-display font-bold text-lg text-foreground">{tournamentData.players}/{tournamentData.maxPlayers}</p>
                  </div>
                </CardContent>
              </Card>
              <Card variant="glass">
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Início</p>
                    <p className="font-display font-bold text-lg text-foreground">{tournamentData.startDate}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Tabs Content */}
          <Tabs defaultValue="standings" className="space-y-6">
            <TabsList className="bg-secondary/50 p-1 flex-wrap h-auto">
              <TabsTrigger value="standings">
                {isKnockout ? "Chaveamento" : "Classificação"}
              </TabsTrigger>
              <TabsTrigger value="matches">
                <Swords className="w-4 h-4 mr-1" />
                Partidas
              </TabsTrigger>
              <TabsTrigger value="rules">Regras</TabsTrigger>
              <TabsTrigger value="players">Inscritos</TabsTrigger>
              <TabsTrigger value="register">Inscrição</TabsTrigger>
            </TabsList>

            <TabsContent value="standings">
              {isKnockout ? (
                <Card variant="glass" className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-accent" />
                      Chaveamento {tournamentData.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <KnockoutBracket rounds={knockoutRounds} />
                  </CardContent>
                </Card>
              ) : (
                <StandingsTable standings={standings} topScorers={topScorers} />
              )}
            </TabsContent>

            <TabsContent value="matches">
              <MatchesTab matches={leagueMatches} />
            </TabsContent>

            <TabsContent value="rules">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Regulamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{tournamentData.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-display font-semibold text-foreground">Regras:</h4>
                    <ul className="space-y-2">
                      {tournamentData.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-primary">•</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="players">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Jogadores Inscritos ({registeredPlayers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {registeredPlayers.map((player, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-display font-bold text-primary text-sm">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.team}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">
                          ID: {player.gameId}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <PlayerRegistrationForm 
                  tournamentId={id} 
                  tournamentName={tournamentData.name}
                  onSuccess={() => setShowRegistration(false)}
                />
                <PaymentSection
                  tournamentName={tournamentData.name}
                  entryFee={tournamentData.entryFee}
                  pixKey={tournamentData.pixKey}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TournamentDetail;
