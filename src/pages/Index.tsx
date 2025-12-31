import { motion } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StatsBar } from "@/components/StatsBar";
import { TournamentCard, Tournament } from "@/components/TournamentCard";
import { Navbar } from "@/components/Navbar";

const featuredTournaments: Tournament[] = [
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
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Video Background */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://www.konami.com/efootball/s/img/mv/mv.mp4"
              type="video/mp4"
            />
          </video>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-background/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>
        
        {/* Glow Effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] z-[1]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-primary font-medium">eFootball Mobile 2026</span>
            </motion.div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-foreground">Domine os </span>
              <span className="gradient-text">Gramados</span>
              <br />
              <span className="text-foreground">Conquiste </span>
              <span className="text-accent text-glow-accent">Prêmios</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A maior plataforma de torneios de eFootball Mobile do Brasil. 
              Inscreva-se, jogue e ganhe prêmios em dinheiro real.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tournaments">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Ver Torneios
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  Inscreva-se Agora
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <StatsBar />
          </motion.div>
        </div>
      </section>
      
      {/* Featured Tournaments */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Torneios em </span>
              <span className="text-primary text-glow">Destaque</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Escolha seu campeonato e mostre suas habilidades nos gramados virtuais.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTournaments.map((tournament, index) => (
              <TournamentCard
                key={tournament.id}
                tournament={tournament}
                onSelect={(id) => console.log("Selected:", id)}
                delay={index * 0.1}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/tournaments">
              <Button variant="outline" size="lg">
                Ver Todos os Torneios
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Pronto para Competir?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Cadastre-se agora e entre no próximo torneio. Milhares de jogadores já estão competindo.
            </p>
            <Link to="/register">
              <Button variant="accent" size="xl">
                Criar Minha Conta
                <Zap className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 eFootball Cup. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Termos</a>
              <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
              <a href="#" className="hover:text-primary transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
