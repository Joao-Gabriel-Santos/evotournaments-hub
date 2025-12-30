import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Upload, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PaymentSectionProps {
  tournamentName: string;
  entryFee: string;
  pixKey: string;
}

export const PaymentSection = ({ tournamentName, entryFee, pixKey }: PaymentSectionProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [proofUploaded, setProofUploaded] = useState(false);

  const handleCopyPix = async () => {
    await navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Chave Pix copiada!",
      description: "Cole no seu aplicativo de banco para realizar o pagamento.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleUploadProof = () => {
    setProofUploaded(true);
    toast({
      title: "Comprovante enviado!",
      description: "Aguarde a confirmação do organizador.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card variant="neon" className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-xl flex items-center justify-center gap-2">
            <QrCode className="w-6 h-6 text-primary" />
            Pagamento via Pix
          </CardTitle>
          <CardDescription>
            {tournamentName} - {entryFee}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Pix Key Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Chave Pix</label>
            <div className="flex gap-2">
              <Input
                value={pixKey}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant={copied ? "accent" : "outline"}
                size="icon"
                onClick={handleCopyPix}
                className="shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
            <h4 className="font-display font-semibold text-sm text-foreground">Como pagar:</h4>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copie a chave Pix acima</li>
              <li>Abra seu app do banco</li>
              <li>Faça o Pix de <span className="text-accent font-semibold">{entryFee}</span></li>
              <li>Envie o comprovante abaixo</li>
            </ol>
          </div>

          {/* Upload Proof */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Enviar Comprovante</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleUploadProof}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                variant={proofUploaded ? "accent" : "secondary"}
                className="w-full"
              >
                {proofUploaded ? (
                  <>
                    <Check className="w-4 h-4" />
                    Comprovante Enviado
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Anexar Comprovante
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Sua inscrição será confirmada em até 24h após verificação do pagamento.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
