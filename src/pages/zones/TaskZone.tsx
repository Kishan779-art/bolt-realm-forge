import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRealm } from '@/contexts/RealmContext';
import { Plus, Target, Edit, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Task } from '@/types/realm';

const statusColumns = [
  { id: 'backlog' as const, title: 'Backlog', color: 'cyber-blue' },
  { id: 'todo' as const, title: 'To Do', color: 'cyber-violet' },
  { id: 'in-progress' as const, title: 'In Progress', color: 'cyber-green' },
  { id: 'done' as const, title: 'Complete', color: 'cyber-pink' },
];

const priorityConfig = {
  low: { label: 'Low', color: 'text-blue-400', icon: '●' },
  medium: { label: 'Medium', color: 'text-yellow-400', icon: '▲' },
  high: { label: 'High', color: 'text-orange-400', icon: '♦' },
  critical: { label: 'Critical', color: 'text-red-400', icon: '⚠' },
};

export default function TaskZone() {
  const { state, addTask, updateTask, deleteTask, addXP } = useRealm();
  const [isCreating, setIsCreating] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
  });

  const handleCreateTask = () => {
    if (taskForm.title.trim()) {
      addTask(taskForm);
      addXP(15); // Reward for creating a task
      setTaskForm({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
      });
      setIsCreating(false);
    }
  };

  const handleMoveTask = (task: Task, newStatus: Task['status']) => {
    updateTask({ ...task, status: newStatus });
    if (newStatus === 'done') {
      addXP(25); // Big reward for completing task
    } else {
      addXP(5); // Small reward for progress
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
    addXP(2); // Small reward for cleanup
  };

  const getTasksByStatus = (status: Task['status']) =>
    state.tasks.filter(task => task.status === status);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Zone Header */}
        <div className="text-center mb-12 animate-cyber-slide">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Target className="w-12 h-12 text-cyber-green animate-glow-pulse" />
            <h1 className="font-orbitron font-black text-5xl bg-gradient-neon bg-clip-text text-transparent">
              TASK ZONE
            </h1>
          </div>
          <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
            Mission control for your objectives and project nexus
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyber-green/30">
              <span className="font-orbitron text-sm font-bold text-cyber-green">
                {state.tasks.length} Active Missions
              </span>
            </div>
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyber-pink/30">
              <span className="font-orbitron text-sm font-bold text-cyber-pink">
                {getTasksByStatus('done').length} Completed
              </span>
            </div>
          </div>
          
          <Button
            variant="neon"
            onClick={() => setIsCreating(true)}
            className="gap-2"
            disabled={isCreating}
          >
            <Plus className="w-4 h-4" />
            New Mission
          </Button>
        </div>

        {/* Create Form */}
        {isCreating && (
          <div className="mb-8 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-cyber-green/30 shadow-glow-purple">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-cyber-green">
                Create New Mission
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Mission objective..."
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                
                <textarea
                  placeholder="Mission details..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                    className="bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    {Object.entries(priorityConfig).map(([value, config]) => (
                      <option key={value} value={value}>
                        {config.label} Priority
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, status: e.target.value as Task['status'] }))}
                    className="bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    {statusColumns.map(column => (
                      <option key={column.id} value={column.id}>
                        {column.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="neon"
                    onClick={handleCreateTask}
                    disabled={!taskForm.title.trim()}
                  >
                    Launch Mission
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setTaskForm({
                        title: '',
                        description: '',
                        priority: 'medium',
                        status: 'todo',
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

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statusColumns.map((column) => {
            const tasks = getTasksByStatus(column.id);
            
            return (
              <div
                key={column.id}
                className="bg-card/40 backdrop-blur-sm rounded-xl border border-border p-4 min-h-[500px]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full bg-${column.color} animate-glow-pulse`} />
                  <h3 className="font-orbitron font-bold text-lg">
                    {column.title}
                  </h3>
                  <span className="bg-muted px-2 py-1 rounded-lg text-sm font-orbitron font-bold">
                    {tasks.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-glow-blue transition-all duration-300 group animate-float"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        animationDuration: '4s'
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-exo font-semibold text-sm flex-1 mb-2">
                          {task.title}
                        </h4>
                        
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/20 p-1 h-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1 text-xs ${priorityConfig[task.priority].color}`}>
                          <span>{priorityConfig[task.priority].icon}</span>
                          <span className="font-orbitron font-bold">
                            {priorityConfig[task.priority].label}
                          </span>
                        </div>
                        
                        <div className="flex gap-1">
                          {statusColumns
                            .filter(col => col.id !== task.status)
                            .map(col => (
                              <Button
                                key={col.id}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMoveTask(task, col.id)}
                                className="p-1 h-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {col.id === 'done' ? '✓' : '→'}
                              </Button>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {tasks.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="text-2xl mb-2 opacity-50">⚪</div>
                      <p className="text-xs font-exo">No missions here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {state.tasks.length === 0 && !isCreating && (
          <div className="text-center py-16 animate-fade-in">
            <Target className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="font-orbitron font-bold text-xl text-muted-foreground mb-3">
              Mission Control Ready
            </h3>
            <p className="font-exo text-muted-foreground mb-6 max-w-md mx-auto">
              Deploy your first mission to begin conquering your objectives
            </p>
            <Button
              variant="neon"
              onClick={() => setIsCreating(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Launch First Mission
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}