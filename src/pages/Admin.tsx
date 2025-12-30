import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Users, CheckCircle, XCircle, Trophy, Plus, Save } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface PendingRegistration {
  id: string;
  playerName: string;
  teamName: string;
  gameId: string;
  tournament: string;
  paymentProof: boolean;
}

interface MatchResult {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
}

const pendingRegistrations: PendingRegistration[] = [
  { id: "1", playerName: "João Silva", teamName: "Mega FC", gameId: "111222333", tournament: "Copa dos Campeões", paymentProof: true },
  { id: "2", playerName: "Pedro Santos", teamName: "Ultra Team", gameId: "444555666", tournament: "Copa dos Campeões", paymentProof: true },
  { id: "3", playerName: "Carlos Lima", teamName: "Super Squad", gameId: "777888999", tournament: "Liga dos 10 Reais", paymentProof: false },
];

const matchesToUpdate: MatchResult[] = [
  { id: "1", homeTeam: "FC Champions", awayTeam: "United Gaming", homeScore: null, awayScore: null },
  { id: "2", homeTeam: "Esports Elite", awayTeam: "Victory FC", homeScore: null, awayScore: null },
  { id: "3", homeTeam: "Thunder Team", awayTeam: "Alpha Squad", homeScore: null, awayScore: null },
];

const Admin = () => {
  const { toast } = useToast();
  const [registrations, setRegistrations] = useState(pendingRegistrations);
  const [matches, setMatches] = useState(matchesToUpdate);

  const handleApprove = (id: string) => {
    setRegistrations(registrations.filter((r) => r.id !== id));
    toast({
      title: "Inscrição Aprovada ✅",
      description: "O jogador foi notificado via WhatsApp.",
    });
  };

  const handleReject = (id: string) => {
    setRegistrations(registrations.filter((r) => r.id !== id));
    toast({
      title: "Inscrição Recusada",
      description: "O jogador será notificado.",
      variant: "destructive",
    });
  };

  const handleScoreUpdate = (matchId: string, field: "homeScore" | "awayScore", value: string) => {
    setMatches(matches.map((m) =>
      m.id === matchId ? { ...m, [field]: value === "" ? null : parseInt(value) } : m
    ));
  };

  const handleSaveResult = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    if (match?.homeScore !== null && match?.awayScore !== null) {
      toast({
        title: "Resultado Salvo ⚽",
        description: `${match.homeTeam} ${match.homeScore} x ${match.awayScore} ${match.awayTeam}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Painel do Organizador
              </h1>
            </div>
            <p className="text-muted-foreground">
              Gerencie inscrições e resultados dos torneios.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-display font-bold text-primary">{registrations.length}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-display font-bold text-accent">25</p>
                <p className="text-xs text-muted-foreground">Aprovados Hoje</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-display font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground">Torneios Ativos</p>
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-display font-bold text-foreground">{matches.length}</p>
                <p className="text-xs text-muted-foreground">Partidas Hoje</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="registrations" className="space-y-6">
            <TabsList className="bg-secondary/50 p-1">
              <TabsTrigger value="registrations" className="gap-2">
                <Users className="w-4 h-4" />
                Inscrições
              </TabsTrigger>
              <TabsTrigger value="results" className="gap-2">
                <Trophy className="w-4 h-4" />
                Resultados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="registrations">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Inscrições Pendentes</CardTitle>
                  <CardDescription>
                    Aprove ou recuse inscrições após verificar o comprovante de pagamento.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {registrations.length > 0 ? (
                    <div className="space-y-4">
                      {registrations.map((reg) => (
                        <motion.div
                          key={reg.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-foreground">{reg.playerName}</p>
                              <Badge variant="outline" className="text-xs">
                                {reg.tournament}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {reg.teamName} • ID: {reg.gameId}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              {reg.paymentProof ? (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  ✓ Comprovante Enviado
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-destructive border-destructive/30">
                                  Sem Comprovante
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReject(reg.id)}
                              className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Recusar
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(reg.id)}
                              disabled={!reg.paymentProof}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Aprovar
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">Todas as inscrições foram processadas!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card variant="glass">
                <CardHeader>
                  <CardTitle>Inserir Resultados</CardTitle>
                  <CardDescription>
                    Atualize os placares das partidas do dia.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div
                        key={match.id}
                        className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-secondary/30 border border-border"
                      >
                        <div className="flex-1 text-right">
                          <p className="font-display font-semibold text-foreground">{match.homeTeam}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="99"
                            value={match.homeScore ?? ""}
                            onChange={(e) => handleScoreUpdate(match.id, "homeScore", e.target.value)}
                            className="w-16 text-center font-display font-bold text-lg"
                            placeholder="0"
                          />
                          <span className="text-muted-foreground font-bold">x</span>
                          <Input
                            type="number"
                            min="0"
                            max="99"
                            value={match.awayScore ?? ""}
                            onChange={(e) => handleScoreUpdate(match.id, "awayScore", e.target.value)}
                            className="w-16 text-center font-display font-bold text-lg"
                            placeholder="0"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-display font-semibold text-foreground">{match.awayTeam}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSaveResult(match.id)}
                          disabled={match.homeScore === null || match.awayScore === null}
                        >
                          <Save className="w-4 h-4 mr-1" />
                          Salvar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
