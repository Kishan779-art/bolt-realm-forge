import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useRealm } from '@/contexts/RealmContext';
import { Play, Pause, RotateCcw, Flame, Coffee, Zap } from 'lucide-react';

const FOCUS_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

export default function FocusZone() {
  const { state, addFocusSession, addXP } = useRealm();
  const [timeLeft, setTimeLeft] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSessionComplete();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handleSessionComplete = () => {
    setIsActive(false);
    
    // Record the session
    addFocusSession({
      duration: sessionType === 'work' ? FOCUS_DURATION / 60 : BREAK_DURATION / 60,
      type: sessionType,
      completedAt: new Date(),
    });

    if (sessionType === 'work') {
      addXP(50); // Big reward for completing a focus session
      setCompletedSessions(prev => prev + 1);
      setSessionType('break');
      setTimeLeft(BREAK_DURATION);
    } else {
      addXP(20); // Reward for taking a break
      setSessionType('work');
      setTimeLeft(FOCUS_DURATION);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'work' ? FOCUS_DURATION : BREAK_DURATION);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = sessionType === 'work' ? FOCUS_DURATION : BREAK_DURATION;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const sessionsToday = state.focusSessions.filter(session => {
    const today = new Date().toDateString();
    return new Date(session.completedAt).toDateString() === today;
  });

  const workSessionsToday = sessionsToday.filter(s => s.type === 'work').length;
  const breakSessionsToday = sessionsToday.filter(s => s.type === 'break').length;

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Zone Header */}
        <div className="text-center mb-12 animate-cyber-slide">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Flame className="w-12 h-12 text-cyber-pink animate-glow-pulse" />
            <h1 className="font-orbitron font-black text-5xl bg-gradient-cyber bg-clip-text text-transparent">
              FOCUS ZONE
            </h1>
          </div>
          <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter the deep work chamber and achieve flow state
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="bg-card/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyber-pink/30">
            <div className="text-center">
              <div className="font-orbitron font-bold text-2xl text-cyber-pink mb-1">
                {workSessionsToday}
              </div>
              <div className="text-xs text-muted-foreground">Work Sessions Today</div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyber-blue/30">
            <div className="text-center">
              <div className="font-orbitron font-bold text-2xl text-cyber-blue mb-1">
                {breakSessionsToday}
              </div>
              <div className="text-xs text-muted-foreground">Breaks Taken</div>
            </div>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-cyber-green/30">
            <div className="text-center">
              <div className="font-orbitron font-bold text-2xl text-cyber-green mb-1">
                {Math.floor(sessionsToday.reduce((acc, s) => acc + s.duration, 0) / 60)}h
              </div>
              <div className="text-xs text-muted-foreground">Total Focus Time</div>
            </div>
          </div>
        </div>

        {/* Main Timer Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-12 border border-cyber-pink/30 shadow-glow-intense text-center relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-cyber opacity-10 animate-portal-spin" />
            
            <div className="relative z-10">
              {/* Session Type Indicator */}
              <div className="flex items-center justify-center gap-3 mb-8">
                {sessionType === 'work' ? (
                  <Flame className="w-8 h-8 text-cyber-pink" />
                ) : (
                  <Coffee className="w-8 h-8 text-cyber-blue" />
                )}
                <h2 className="font-orbitron font-bold text-2xl">
                  {sessionType === 'work' ? 'FOCUS SESSION' : 'BREAK TIME'}
                </h2>
              </div>

              {/* Timer Display */}
              <div className="mb-8">
                <div className="font-orbitron font-black text-8xl mb-4 bg-gradient-cyber bg-clip-text text-transparent animate-glow-pulse">
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress Ring */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-muted-foreground/20"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className={sessionType === 'work' ? 'text-cyber-pink' : 'text-cyber-blue'}
                      style={{
                        strokeDasharray: '251.2',
                        strokeDashoffset: `${251.2 - (getProgress() / 100) * 251.2}`,
                        transition: 'stroke-dashoffset 1s ease-in-out',
                      }}
                    />
                  </svg>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="font-orbitron font-bold text-lg text-primary mb-1">
                        {Math.round(getProgress())}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {sessionType === 'work' ? 'Deep Work' : 'Recovery'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  variant="portal"
                  size="xl"
                  onClick={resetTimer}
                  className="gap-2"
                >
                  <RotateCcw className="w-6 h-6" />
                  Reset
                </Button>
                
                <Button
                  variant={isActive ? "neon" : "cyber"}
                  size="xl"
                  onClick={toggleTimer}
                  className="gap-3 px-16"
                >
                  {isActive ? (
                    <>
                      <Pause className="w-6 h-6" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      {timeLeft === (sessionType === 'work' ? FOCUS_DURATION : BREAK_DURATION) ? 'Start' : 'Resume'}
                    </>
                  )}
                </Button>
                
                <Button
                  variant="portal"
                  size="xl"
                  onClick={() => {
                    setSessionType(sessionType === 'work' ? 'break' : 'work');
                    setTimeLeft(sessionType === 'work' ? BREAK_DURATION : FOCUS_DURATION);
                    setIsActive(false);
                  }}
                  className="gap-2"
                >
                  <Zap className="w-6 h-6" />
                  Switch
                </Button>
              </div>
            </div>
          </div>

          {/* Session Tips */}
          <div className="mt-8 bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-border">
            <h3 className="font-orbitron font-bold text-lg mb-4 text-center">
              {sessionType === 'work' ? 'Focus Protocol' : 'Recovery Protocol'}
            </h3>
            
            {sessionType === 'work' ? (
              <div className="text-center space-y-2 text-sm text-muted-foreground font-exo">
                <p>• Eliminate all distractions</p>
                <p>• Focus on a single task</p>
                <p>• Maintain deep concentration</p>
                <p>• Achieve flow state</p>
              </div>
            ) : (
              <div className="text-center space-y-2 text-sm text-muted-foreground font-exo">
                <p>• Step away from your work</p>
                <p>• Stretch and move your body</p>
                <p>• Hydrate and breathe deeply</p>
                <p>• Prepare for the next session</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}