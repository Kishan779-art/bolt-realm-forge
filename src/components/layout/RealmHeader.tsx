import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRealm } from '@/contexts/RealmContext';
import { ArrowLeft, Home, Zap } from 'lucide-react';

export function RealmHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setCurrentZone } = useRealm();
  
  const isHome = location.pathname === '/';
  const currentZoneName = state.currentZone ? 
    state.currentZone.charAt(0).toUpperCase() + state.currentZone.slice(1) + ' Zone' : '';

  const handleBackToRealm = () => {
    setCurrentZone(null);
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-cyber-blue/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="text-2xl animate-glow-pulse">⚡</div>
          <h1 className="font-orbitron font-bold text-xl bg-gradient-cyber bg-clip-text text-transparent">
            BOLT REALM
          </h1>
          {!isHome && (
            <div className="text-sm text-muted-foreground ml-2">
              / {currentZoneName}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* XP Display */}
          <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-3 py-1 rounded-lg border border-cyber-violet/30">
            <Zap className="w-4 h-4 text-cyber-violet" />
            <span className="font-orbitron text-sm font-bold">{state.xp} XP</span>
          </div>

          {/* Back Button */}
          {!isHome && (
            <Button
              variant="portal"
              size="sm"
              onClick={handleBackToRealm}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Realm Map
            </Button>
          )}

          {/* Home Button (when in zone) */}
          {!isHome && (
            <Button
              variant="cyber"
              size="sm"
              onClick={handleBackToRealm}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}