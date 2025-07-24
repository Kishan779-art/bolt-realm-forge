import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-20">
      <div className="text-center animate-cyber-slide">
        <div className="text-8xl mb-6 animate-glow-pulse">🌌</div>
        <h1 className="font-orbitron font-black text-6xl mb-4 bg-gradient-cyber bg-clip-text text-transparent">
          404
        </h1>
        <p className="font-exo text-xl text-muted-foreground mb-8">
          This zone does not exist in the BOLT Realm
        </p>
        <a 
          href="/" 
          className="inline-flex items-center gap-2 bg-gradient-cyber text-foreground font-orbitron font-bold px-6 py-3 rounded-lg shadow-glow-blue hover:shadow-glow-intense hover:scale-105 transition-all duration-300"
        >
          Return to Realm Map
        </a>
      </div>
    </div>
  );
};

export default NotFound;
