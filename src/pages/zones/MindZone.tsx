import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRealm } from '@/contexts/RealmContext';
import { Plus, Brain, Edit, Trash2 } from 'lucide-react';
import { Note } from '@/types/realm';

export default function MindZone() {
  const { state, addNote, updateNote, deleteNote, addXP } = useRealm();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });

  const handleCreateNote = () => {
    if (noteForm.title.trim() && noteForm.content.trim()) {
      addNote(noteForm);
      addXP(10); // Reward for creating a note
      setNoteForm({ title: '', content: '' });
      setIsCreating(false);
    }
  };

  const handleEditNote = (note: Note) => {
    setNoteForm({ title: note.title, content: note.content });
    setEditingId(note.id);
  };

  const handleUpdateNote = () => {
    if (editingId && noteForm.title.trim() && noteForm.content.trim()) {
      const existingNote = state.notes.find(n => n.id === editingId);
      if (existingNote) {
        updateNote({
          ...existingNote,
          title: noteForm.title,
          content: noteForm.content,
        });
        addXP(5); // Reward for updating
        setNoteForm({ title: '', content: '' });
        setEditingId(null);
      }
    }
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    addXP(2); // Small reward for organization
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6">
        {/* Zone Header */}
        <div className="text-center mb-12 animate-cyber-slide">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-12 h-12 text-cyber-blue animate-glow-pulse" />
            <h1 className="font-orbitron font-black text-5xl bg-gradient-cyber bg-clip-text text-transparent">
              MIND ZONE
            </h1>
          </div>
          <p className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto">
            Capture and organize your thoughts in floating digital containers
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-card/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyber-blue/30">
              <span className="font-orbitron text-sm font-bold text-cyber-blue">
                {state.notes.length} Thoughts Captured
              </span>
            </div>
          </div>
          
          <Button
            variant="cyber"
            onClick={() => setIsCreating(true)}
            className="gap-2"
            disabled={isCreating || editingId !== null}
          >
            <Plus className="w-4 h-4" />
            New Thought
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <div className="mb-8 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-cyber-blue/30 shadow-glow-blue">
              <h3 className="font-orbitron font-bold text-lg mb-4 text-cyber-blue">
                {isCreating ? 'Capture New Thought' : 'Edit Thought'}
              </h3>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Thought title..."
                  value={noteForm.title}
                  onChange={(e) => setNoteForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                
                <textarea
                  placeholder="Your mind's content..."
                  value={noteForm.content}
                  onChange={(e) => setNoteForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
                
                <div className="flex gap-3">
                  <Button
                    variant="cyber"
                    onClick={isCreating ? handleCreateNote : handleUpdateNote}
                    disabled={!noteForm.title.trim() || !noteForm.content.trim()}
                  >
                    {isCreating ? 'Capture' : 'Update'} Thought
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingId(null);
                      setNoteForm({ title: '', content: '' });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {state.notes.map((note, index) => (
            <div
              key={note.id}
              className="bg-card/60 backdrop-blur-sm p-6 rounded-xl border border-cyber-violet/30 hover:border-cyber-violet hover:shadow-glow-violet transition-all duration-500 animate-float group"
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationDuration: `${3 + (index % 3)}s`
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-orbitron font-bold text-lg text-primary truncate flex-1">
                  {note.title}
                </h3>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditNote(note)}
                    className="text-cyber-blue hover:text-cyber-blue hover:bg-cyber-blue/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground font-exo text-sm mb-4 line-clamp-4">
                {note.content}
              </p>
              
              <div className="text-xs text-muted-foreground font-exo">
                Created {new Date(note.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {state.notes.length === 0 && !isCreating && (
          <div className="text-center py-16 animate-fade-in">
            <Brain className="w-24 h-24 text-muted-foreground mx-auto mb-6 opacity-50" />
            <h3 className="font-orbitron font-bold text-xl text-muted-foreground mb-3">
              Your Mind Space Awaits
            </h3>
            <p className="font-exo text-muted-foreground mb-6 max-w-md mx-auto">
              Capture your first thought and begin building your digital mind palace
            </p>
            <Button
              variant="cyber"
              onClick={() => setIsCreating(true)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Capture First Thought
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}