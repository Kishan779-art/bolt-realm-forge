import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRealm } from '@/contexts/RealmContext';
import { Plus, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { CalendarEvent } from '@/types/realm';

export default function TimeZone() {
  const { state, addEvent, addXP } = useRealm();
  const [isCreating, setIsCreating] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    color: 'cyber-blue',
  });

  const handleCreateEvent = () => {
    if (eventForm.title.trim() && eventForm.startDate && eventForm.endDate) {
      addEvent({
        ...eventForm,
        startDate: new Date(eventForm.startDate),
        endDate: new Date(eventForm.endDate),
      });
      addXP(12); // Reward for scheduling
      setEventForm({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        color: 'cyber-blue',
      });
      setIsCreating(false);
    }
  };

  const formatEventTime = (start: Date, end: Date) => {
    const startTime = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const endTime = end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${startTime} - ${endTime}`;
  };

  const getEventsForToday = () => {
    const today = new Date().toDateString();
    return state.events.filter(event => 
      new Date(event.startDate).toDateString() === today
    ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return state.events.filter(event => 
      new Date(event.startDate) > today
    ).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);
  };

  const todayEvents = getEventsForToday();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Zone Header */}
        <div className="text-center mb-12 animate-cyber-slide">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calendar className="w-12 h-12 text-cyber-violet animate-glow-pulse" />
            <h1 className="font-orbitron font-black text-5xl bg-gradient-hologram bg-clip-text text-transparent">
              TIME ZONE
            </h1>
          </div>
          <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
            Navigate your temporal calendar and event horizon
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyber-violet/30">
              <span className="font-orbitron text-sm font-bold text-cyber-violet">
                {todayEvents.length} Events Today
              </span>
            </div>
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyber-blue/30">
              <span className="font-orbitron text-sm font-bold text-cyber-blue">
                {state.events.length} Total Scheduled
              </span>
            </div>
          </div>
          
          <Button
            variant="portal"
            onClick={() => setIsCreating(true)}
            className="gap-2"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4" />
            Schedule Event
          </Button>
        </div>

        {/* Create Form */}
        {isCreating && (
          <div className="mb-8 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-cyber-violet/30 shadow-glow-violet">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-cyber-violet">
                Schedule New Event
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Event title..."
                  value={eventForm.title}
                  onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                
                <textarea
                  placeholder="Event description..."
                  value={eventForm.description}
                  onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-orbitron font-bold text-muted-foreground mb-2">
                      Start Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.startDate}
                      onChange={(e) => setEventForm(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-orbitron font-bold text-muted-foreground mb-2">
                      End Date & Time
                    </label>
                    <input
                      type="datetime-local"
                      value={eventForm.endDate}
                      onChange={(e) => setEventForm(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="portal"
                    onClick={handleCreateEvent}
                    disabled={!eventForm.title.trim() || !eventForm.startDate || !eventForm.endDate}
                  >
                    Schedule Event
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEventForm({
                        title: '',
                        description: '',
                        startDate: '',
                        endDate: '',
                        color: 'cyber-blue',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Time Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Events */}
          <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-cyber-violet/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-cyber-violet" />
              <h2 className="font-orbitron font-bold text-xl">Today's Timeline</h2>
            </div>
            
            <div className="space-y-4">
              {todayEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-cyber-violet/50 hover:shadow-glow-violet transition-all duration-300 animate-float"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animationDuration: '3s'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-exo font-semibold text-primary">
                      {event.title}
                    </h3>
                    <div className="text-xs text-cyber-violet font-orbitron font-bold">
                      {formatEventTime(new Date(event.startDate), new Date(event.endDate))}
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-muted-foreground text-sm font-exo mb-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-exo">
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                    <div className="w-3 h-3 rounded-full bg-cyber-violet animate-glow-pulse" />
                  </div>
                </div>
              ))}
              
              {todayEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-exo">No events scheduled for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-cyber-blue/30 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyber-blue" />
              <h2 className="font-orbitron font-bold text-xl">Event Horizon</h2>
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-cyber-blue/50 hover:shadow-glow-blue transition-all duration-300 animate-float"
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    animationDuration: '4s'
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-exo font-semibold text-primary">
                      {event.title}
                    </h3>
                    <div className="text-xs text-cyber-blue font-orbitron font-bold">
                      {new Date(event.startDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="text-muted-foreground text-sm font-exo mb-2">
                      {event.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground font-exo">
                      {formatEventTime(new Date(event.startDate), new Date(event.endDate))}
                    </div>
                    <div className="w-3 h-3 rounded-full bg-cyber-blue animate-glow-pulse" />
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-exo">No upcoming events</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {state.events.length === 0 && !isCreating && (
          <div className="text-center py-16 animate-fade-in">
            <Calendar className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="font-orbitron font-bold text-xl text-muted-foreground mb-3">
              Temporal Grid Empty
            </h3>
            <p className="font-exo text-muted-foreground mb-6 max-w-md mx-auto">
              Schedule your first event to begin organizing your time dimension
            </p>
            <Button
              variant="portal"
              onClick={() => setIsCreating(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Schedule First Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}