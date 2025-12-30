import { useState } from "react";
import { motion } from "framer-motion";
import { User, Gamepad2, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PlayerFormProps {
  tournamentId?: string;
  tournamentName?: string;
  onSuccess?: () => void;
}

export const PlayerRegistrationForm = ({ tournamentId, tournamentName, onSuccess }: PlayerFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gameId: "",
    whatsapp: "",
    teamName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Inscrição Enviada! ⚽",
      description: "Aguarde a confirmação do pagamento para validar sua vaga.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", gameId: "", whatsapp: "", teamName: "" });
    onSuccess?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="neon" className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl gradient-text">
            {tournamentName ? `Inscrição: ${tournamentName}` : "Cadastro de Jogador"}
          </CardTitle>
          <CardDescription>
            Preencha seus dados para participar dos torneios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Nome Completo
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-primary" />
                Game ID (eFootball)
              </label>
              <Input
                name="gameId"
                value={formData.gameId}
                onChange={handleChange}
                placeholder="Ex: 123456789"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                WhatsApp
              </label>
              <Input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Nome do Time
              </label>
              <Input
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Ex: FC Champions"
                required
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚽</span>
                  Enviando...
                </span>
              ) : (
                "Confirmar Inscrição"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
