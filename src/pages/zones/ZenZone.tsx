import { useRealm } from '@/contexts/RealmContext';
import { Trophy, Star, Zap, Target, Brain, Calendar, Flame, BarChart3 } from 'lucide-react';

export default function ZenZone() {
  const { state } = useRealm();

  const getCompletedTasks = () => state.tasks.filter(t => t.status === 'done').length;
  const getTotalFocusTime = () => {
    return Math.floor(state.focusSessions.reduce((acc, session) => acc + session.duration, 0) / 60);
  };
  
  const getWorkSessionsToday = () => {
    const today = new Date().toDateString();
    return state.focusSessions.filter(session => 
      new Date(session.completedAt).toDateString() === today && session.type === 'work'
    ).length;
  };

  const getStreak = () => {
    // Simple streak calculation - consecutive days with at least one completed task
    const today = new Date();
    let streak = 0;
    let currentDate = new Date(today);
    
    while (streak < 30) { // Max check 30 days back
      const dateStr = currentDate.toDateString();
      const hasActivity = state.tasks.some(task => 
        task.status === 'done' && 
        new Date(task.updatedAt).toDateString() === dateStr
      ) || state.focusSessions.some(session =>
        new Date(session.completedAt).toDateString() === dateStr
      );
      
      if (hasActivity) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const achievements = [
    {
      id: 'first-note',
      title: 'Mind Reader',
      description: 'Created your first note',
      icon: Brain,
      unlocked: state.notes.length > 0,
      color: 'cyber-blue',
    },
    {
      id: 'first-task',
      title: 'Mission Started',
      description: 'Created your first task',
      icon: Target,
      unlocked: state.tasks.length > 0,
      color: 'cyber-green',
    },
    {
      id: 'task-completer',
      title: 'Objective Complete',
      description: 'Completed your first task',
      icon: Trophy,
      unlocked: getCompletedTasks() > 0,
      color: 'cyber-pink',
    },
    {
      id: 'focus-master',
      title: 'Flow State',
      description: 'Completed your first focus session',
      icon: Flame,
      unlocked: state.focusSessions.length > 0,
      color: 'cyber-violet',
    },
    {
      id: 'scheduler',
      title: 'Time Lord',
      description: 'Scheduled your first event',
      icon: Calendar,
      unlocked: state.events.length > 0,
      color: 'cyber-blue',
    },
    {
      id: 'productive-day',
      title: 'Productivity Beast',
      description: 'Complete 3 tasks in one day',
      icon: Star,
      unlocked: getCompletedTasks() >= 3,
      color: 'cyber-green',
    },
    {
      id: 'focus-warrior',
      title: 'Focus Warrior',
      description: 'Complete 3 focus sessions in one day',
      icon: Zap,
      unlocked: getWorkSessionsToday() >= 3,
      color: 'cyber-pink',
    },
    {
      id: 'streak-keeper',
      title: 'Streak Keeper',
      description: 'Maintain a 7-day activity streak',
      icon: Flame,
      unlocked: getStreak() >= 7,
      color: 'cyber-violet',
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const progressPercentage = (unlockedAchievements.length / achievements.length) * 100;

  const stats = [
    {
      label: 'Total XP',
      value: state.xp,
      icon: Zap,
      color: 'cyber-blue',
      bgColor: 'cyber-blue/20',
    },
    {
      label: 'Tasks Completed',
      value: getCompletedTasks(),
      icon: Target,
      color: 'cyber-green',
      bgColor: 'cyber-green/20',
    },
    {
      label: 'Notes Created',
      value: state.notes.length,
      icon: Brain,
      color: 'cyber-violet',
      bgColor: 'cyber-violet/20',
    },
    {
      label: 'Focus Hours',
      value: getTotalFocusTime(),
      icon: Flame,
      color: 'cyber-pink',
      bgColor: 'cyber-pink/20',
    },
    {
      label: 'Events Scheduled',
      value: state.events.length,
      icon: Calendar,
      color: 'cyber-blue',
      bgColor: 'cyber-blue/20',
    },
    {
      label: 'Current Streak',
      value: getStreak(),
      icon: Star,
      color: 'cyber-green',
      bgColor: 'cyber-green/20',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Zone Header */}
        <div className="text-center mb-12 animate-cyber-slide">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Trophy className="w-12 h-12 text-cyber-purple animate-glow-pulse" />
            <h1 className="font-orbitron font-black text-5xl bg-gradient-hologram bg-clip-text text-transparent">
              ZEN ZONE
            </h1>
          </div>
          <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
            Your achievement realm and cosmic productivity statistics
          </p>
        </div>

        {/* Progress Overview */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-cyber-purple/30 p-8 shadow-glow-purple">
            <div className="text-center mb-6">
              <h2 className="font-orbitron font-bold text-2xl mb-2">Realm Mastery</h2>
              <p className="text-muted-foreground font-exo">
                {unlockedAchievements.length} of {achievements.length} achievements unlocked
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="relative w-full bg-muted rounded-full h-4 mb-4">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-cyber rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-orbitron font-bold text-xs text-foreground">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card/60 backdrop-blur-sm rounded-xl border border-border p-4 text-center hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300 animate-float"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationDuration: '4s'
              }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.bgColor} mb-3`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <div className="font-orbitron font-bold text-2xl mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground font-exo">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="max-w-6xl mx-auto">
          <h2 className="font-orbitron font-bold text-2xl text-center mb-8 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-cyber-purple" />
            Achievement Codex
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.id}
                className={`bg-card/60 backdrop-blur-sm rounded-xl border p-6 text-center transition-all duration-500 animate-float ${
                  achievement.unlocked
                    ? `border-${achievement.color}/50 hover:border-${achievement.color} hover:shadow-glow-${achievement.color.split('-')[1]}`
                    : 'border-border opacity-50'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  animationDuration: '3s'
                }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  achievement.unlocked
                    ? `bg-${achievement.color}/20 text-${achievement.color}`
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <achievement.icon className="w-8 h-8" />
                </div>
                
                <h3 className={`font-orbitron font-bold text-lg mb-2 ${
                  achievement.unlocked ? `text-${achievement.color}` : 'text-muted-foreground'
                }`}>
                  {achievement.title}
                </h3>
                
                <p className="text-sm font-exo text-muted-foreground">
                  {achievement.description}
                </p>
                
                {achievement.unlocked && (
                  <div className="mt-4">
                    <div className="inline-flex items-center gap-1 bg-gradient-cyber px-3 py-1 rounded-full text-xs font-orbitron font-bold">
                      <Trophy className="w-3 h-3" />
                      UNLOCKED
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-16 animate-fade-in">
          <div className="max-w-2xl mx-auto bg-card/40 backdrop-blur-sm rounded-xl border border-cyber-purple/30 p-8">
            <BarChart3 className="w-12 h-12 text-cyber-purple mx-auto mb-4 animate-glow-pulse" />
            <blockquote className="font-exo text-lg text-muted-foreground italic mb-4">
              "The future belongs to those who believe in the beauty of their productivity."
            </blockquote>
            <div className="font-orbitron font-bold text-sm text-cyber-purple">
              — BOLT Realm Oracle
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}