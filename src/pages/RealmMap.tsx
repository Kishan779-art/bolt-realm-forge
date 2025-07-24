import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { EnhancedZoneCard } from '@/components/ui/EnhancedZoneCard';
import { ParticleField, PageTransition } from '@/components/ui/MotionComponents';
import { realmZones } from '@/data/zones';
import realmBackground from '@/assets/realm-background.jpg';

export default function RealmMap() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        {/* Cyberpunk Background with Parallax */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${realmBackground})` }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
        
        {/* Enhanced particle overlay */}
        <ParticleField count={30} />
        
        {/* Floating data streams */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyber-blue to-transparent opacity-30"
              style={{
                left: `${10 + i * 20}%`,
              }}
              animate={{
                y: ['-100vh', '100vh'],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 2,
              }}
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 pt-24 pb-12">
          {/* Enhanced Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1 
              className="font-orbitron font-black text-6xl md:text-8xl mb-6 bg-gradient-cyber bg-clip-text text-transparent drop-shadow-lg"
              animate={{
                textShadow: [
                  '0 0 20px hsl(var(--cyber-blue) / 0.5)',
                  '0 0 40px hsl(var(--cyber-violet) / 0.8)',
                  '0 0 20px hsl(var(--cyber-blue) / 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              BOLT REALM
            </motion.h1>
            
            <motion.p 
              className="font-exo text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Enter the <span className="text-primary font-semibold">digital productivity universe</span> where 
              each zone unlocks new dimensions of efficiency
            </motion.p>
            
            {/* Enhanced subtitle with holographic effect */}
            <motion.div 
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div 
                className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.span 
                className="font-orbitron text-cyber-blue font-bold tracking-wider text-sm"
                animate={{
                  textShadow: [
                    '0 0 10px hsl(var(--cyber-blue) / 0.8)',
                    '0 0 20px hsl(var(--cyber-blue) / 1)',
                    '0 0 10px hsl(var(--cyber-blue) / 0.8)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                SELECT YOUR DESTINATION
              </motion.span>
              <motion.div 
                className="h-px flex-1 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Enhanced Zone Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            {realmZones.map((zone, index) => (
              <EnhancedZoneCard 
                key={zone.id} 
                zone={zone} 
                delay={index * 200}
              />
            ))}
          </motion.div>

          {/* Enhanced Footer */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
            data-aos="fade-up"
            data-aos-delay="2000"
          >
            <div className="max-w-md mx-auto bg-card/40 backdrop-blur-sm rounded-xl border border-cyber-purple/30 p-6 hover:border-cyber-purple hover:shadow-glow-purple transition-all duration-500">
              <motion.p 
                className="font-exo text-muted-foreground text-sm"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ⚡ <span className="text-cyber-violet font-semibold">Bolt Universe by Kishan Patel</span> ⚡
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Enhanced floating geometric elements */}
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 border border-cyber-blue/30 rotate-45"
          animate={{
            rotate: [45, 405, 45],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-32 right-16 w-16 h-16 border border-cyber-violet/30"
          animate={{
            rotate: [0, 360, 0],
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 right-8 w-12 h-12 border border-cyber-green/30 rotate-45"
          animate={{
            rotate: [45, -315, 45],
            scale: [1, 0.8, 1],
            opacity: [0.3, 0.9, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>
    </PageTransition>
  );
}