import { Navbar } from "@/components/Navbar";
import { PlayerRegistrationForm } from "@/components/PlayerRegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Cadastro de </span>
              <span className="text-primary text-glow">Jogador</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Preencha seus dados para participar dos torneios de eFootball Mobile.
            </p>
          </div>

          <PlayerRegistrationForm />
        </div>
      </main>
    </div>
  );
};

export default Register;
