import { ZoneCard } from '@/components/ui/ZoneCard';
import { realmZones } from '@/data/zones';
import realmBackground from '@/assets/realm-background.jpg';

export default function RealmMap() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cyberpunk Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${realmBackground})` }}
      />
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      
      {/* Animated particle overlay */}
      <div className="absolute inset-0 bg-gradient-hologram opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16 animate-cyber-slide">
          <h1 className="font-orbitron font-black text-6xl md:text-8xl mb-6 bg-gradient-cyber bg-clip-text text-transparent drop-shadow-lg">
            BOLT REALM
          </h1>
          <p className="font-exo text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enter the <span className="text-primary font-semibold">digital productivity universe</span> where 
            each zone unlocks new dimensions of efficiency
          </p>
          
          {/* Subtitle with glow effect */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
            <span className="font-orbitron text-cyber-blue font-bold tracking-wider text-sm animate-glow-pulse">
              SELECT YOUR DESTINATION
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"></div>
          </div>
        </div>

        {/* Zone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {realmZones.map((zone, index) => (
            <ZoneCard 
              key={zone.id} 
              zone={zone} 
              delay={index * 200}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <p className="font-exo text-muted-foreground text-sm">
            ⚡ Powered by <span className="text-cyber-violet font-semibold">BOLT Technology</span> ⚡
          </p>
        </div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-cyber-blue/30 rotate-45 animate-portal-spin"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 border border-cyber-violet/30 rotate-12 animate-float"></div>
      <div className="absolute top-1/2 right-8 w-12 h-12 border border-cyber-green/30 rotate-45 animate-portal-spin" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}