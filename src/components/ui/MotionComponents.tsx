import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface PortalTransitionProps {
  children: ReactNode;
  isVisible: boolean;
}

const portalVariants = {
  hidden: { 
    scale: 0, 
    rotate: 180, 
    opacity: 0,
    filter: 'blur(20px)'
  },
  visible: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20
    }
  },
  exit: { 
    scale: 2, 
    rotate: -180, 
    opacity: 0,
    filter: 'blur(20px)',
    transition: {
      duration: 0.8
    }
  }
};

export function PortalTransition({ children, isVisible }: PortalTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={portalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 1.05 }}
      transition={{
        type: 'spring' as const,
        stiffness: 300,
        damping: 30
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
}

export function FloatingElement({ children, delay = 0, duration = 3, y = -10 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, y, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: 'easeInOut' as const,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className = '', glowColor = 'cyber-blue' }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 0 30px hsl(var(--cyber-blue) / 0.6), 0 0 60px hsl(var(--cyber-violet) / 0.4)',
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring' as const, stiffness: 400, damping: 17 }}
      className={`bg-card/80 backdrop-blur-sm rounded-xl border border-border hover:border-primary/50 transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export function TypewriterText({ text, delay = 0, className = '' }: TypewriterTextProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{
        duration: 2,
        ease: 'linear' as const,
        delay: delay
      }}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      {text}
    </motion.div>
  );
}

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 20 }: ParticleFieldProps) {
  const particles = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyber-blue rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}