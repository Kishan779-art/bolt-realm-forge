import { Button } from '@/components/ui/button';
import { RealmZone } from '@/types/realm';
import { useNavigate } from 'react-router-dom';
import { useRealm } from '@/contexts/RealmContext';

interface ZoneCardProps {
  zone: RealmZone;
  delay?: number;
}

export function ZoneCard({ zone, delay = 0 }: ZoneCardProps) {
  const navigate = useNavigate();
  const { setCurrentZone } = useRealm();

  const handleEnterZone = () => {
    setCurrentZone(zone.id);
    navigate(zone.route);
  };

  return (
    <div 
      className="animate-float group"
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '4s'
      }}
    >
      <Button
        variant="zone"
        size="zone"
        onClick={handleEnterZone}
        className="relative overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-${zone.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`} />
        
        {/* Zone content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
            {zone.icon}
          </div>
          <h3 className="font-orbitron font-bold text-lg mb-1 group-hover:text-primary transition-colors">
            {zone.name}
          </h3>
          <p className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors">
            {zone.description}
          </p>
        </div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/50 group-hover:shadow-glow-blue transition-all duration-500" />
      </Button>
    </div>
  );
}