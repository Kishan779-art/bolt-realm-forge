import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RealmZone } from '@/types/realm';
import { useNavigate } from 'react-router-dom';
import { useRealm } from '@/contexts/RealmContext';
import { ParticleField } from './MotionComponents';

interface EnhancedZoneCardProps {
  zone: RealmZone;
  delay?: number;
}

export function EnhancedZoneCard({ zone, delay = 0 }: EnhancedZoneCardProps) {
  const navigate = useNavigate();
  const { setCurrentZone } = useRealm();

  const handleEnterZone = () => {
    setCurrentZone(zone.id);
    navigate(zone.route);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        delay: delay / 1000
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      rotateY: [0, 2, 0],
      transition: {
        duration: 4 + (delay / 1000),
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  const glowVariants = {
    hover: {
      boxShadow: [
        '0 0 20px hsl(var(--cyber-blue) / 0.3)',
        '0 0 40px hsl(var(--cyber-violet) / 0.6), 0 0 80px hsl(var(--cyber-blue) / 0.4)',
        '0 0 20px hsl(var(--cyber-blue) / 0.3)'
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="relative group perspective-1000"
    >
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="relative"
      >
        <Button
          variant="zone"
          size="zone"
          onClick={handleEnterZone}
          className="relative overflow-hidden transform-gpu hover:scale-105 transition-transform duration-500"
        >
          {/* Particle field background */}
          <ParticleField count={8} />
          
          {/* Animated gradient background */}
          <motion.div 
            className={`absolute inset-0 bg-${zone.gradient} opacity-10 group-hover:opacity-30`}
            whileHover={{
              background: [
                'var(--gradient-hologram)',
                'var(--gradient-cyber)',
                'var(--gradient-neon)',
                'var(--gradient-hologram)'
              ],
              transition: { duration: 2, repeat: Infinity }
            }}
          />
          
          {/* Zone content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
            <motion.div 
              className="text-4xl mb-2"
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.6 }
              }}
            >
              {zone.icon}
            </motion.div>
            
            <motion.h3 
              className="font-orbitron font-bold text-lg mb-1 group-hover:text-primary transition-colors"
              whileHover={{ 
                textShadow: '0 0 10px hsl(var(--cyber-blue) / 0.8)' 
              }}
            >
              {zone.name}
            </motion.h3>
            
            <motion.p 
              className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              {zone.description}
            </motion.p>
          </div>

          {/* Holographic border effect */}
          <motion.div 
            className="absolute inset-0 rounded-xl border border-transparent group-hover:border-primary/50"
            variants={glowVariants}
          />
          
          {/* Corner accent lights */}
          <div className="absolute top-2 left-2 w-2 h-2 bg-cyber-blue rounded-full opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-300" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-cyber-violet rounded-full opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-300" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyber-pink rounded-full opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-300" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-cyber-green rounded-full opacity-0 group-hover:opacity-100 animate-glow-pulse transition-opacity duration-300" style={{ animationDelay: '1.5s' }} />
        </Button>
      </motion.div>
    </motion.div>
  );
}