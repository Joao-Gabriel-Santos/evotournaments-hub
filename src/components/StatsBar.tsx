import { Trophy, Users, Gamepad2, Star } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

const StatCard = ({ icon, value, label, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border"
  >
    <div className="text-primary">{icon}</div>
    <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
      {value}
    </span>
    <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
  </motion.div>
);

export const StatsBar = () => {
  const stats = [
    { icon: <Trophy className="w-6 h-6" />, value: "R$ 5.000+", label: "Em Prêmios" },
    { icon: <Users className="w-6 h-6" />, value: "500+", label: "Jogadores" },
    { icon: <Gamepad2 className="w-6 h-6" />, value: "25", label: "Torneios" },
    { icon: <Star className="w-6 h-6" />, value: "4.9", label: "Avaliação" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 0.1} />
      ))}
    </div>
  );
};
