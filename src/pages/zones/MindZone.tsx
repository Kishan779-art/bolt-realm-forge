import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import { Button } from '@/components/ui/button';
import { useRealm } from '@/contexts/RealmContext';
import { Plus, Brain, Edit, Trash2, Mic } from 'lucide-react';
import { Note } from '@/types/realm';
import { PageTransition, GlowCard, TypewriterText, ParticleField } from '@/components/ui/MotionComponents';
import { VoiceInput } from '@/components/ui/VoiceInput';

export default function MindZone() {
  const { state, addNote, updateNote, deleteNote, addXP } = useRealm();
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [noteForm, setNoteForm] = useState({ title: '', content: '' });
  const [isListening, setIsListening] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  const handleCreateNote = () => {
    if (noteForm.title.trim() && noteForm.content.trim()) {
      addNote(noteForm);
      addXP(10); // Reward for creating a note
      setNoteForm({ title: '', content: '' });
      setIsCreating(false);
      setShowTypewriter(true);
      setTimeout(() => setShowTypewriter(false), 3000);
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

  const handleVoiceResult = (text: string) => {
    // Parse voice input for commands
    if (text.toLowerCase().includes('create') || text.toLowerCase().includes('note')) {
      const content = text.replace(/create|note|new/gi, '').trim();
      const title = content.split(' ').slice(0, 4).join(' ') || 'Voice Note';
      setNoteForm({ title, content });
      setIsCreating(true);
    } else {
      // Use the text as note content
      setNoteForm(prev => ({ 
        ...prev, 
        content: prev.content ? `${prev.content}\n\n${text}` : text 
      }));
    }
    setIsListening(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background pt-20 pb-12 relative">
        {/* Background particles */}
        <ParticleField count={25} />
        
        <div className="container mx-auto px-6">
          {/* Zone Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Brain className="w-12 h-12 text-cyber-blue animate-glow-pulse" />
              </motion.div>
              <motion.h1 
                className="font-orbitron font-black text-5xl bg-gradient-cyber bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                MIND ZONE
              </motion.h1>
            </div>
            
            {showTypewriter ? (
              <TypewriterText
                text="New thought captured in the digital consciousness..."
                className="font-exo text-lg text-cyber-blue max-w-2xl mx-auto"
              />
            ) : (
              <motion.p 
                className="font-exo text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Capture and organize your thoughts in floating digital containers
              </motion.p>
            )}
          </motion.div>

          {/* Enhanced Action Bar */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <GlowCard className="px-4 py-2">
                <motion.span 
                  className="font-orbitron text-sm font-bold text-cyber-blue"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {state.notes.length} Thoughts Captured
                </motion.span>
              </GlowCard>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Voice Input */}
              <VoiceInput
                onResult={handleVoiceResult}
                isListening={isListening}
                onToggle={() => setIsListening(!isListening)}
              />
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="cyber"
                  onClick={() => setIsCreating(true)}
                  className="gap-2"
                  disabled={isCreating || editingId !== null}
                >
                  <Plus className="w-4 h-4" />
                  New Thought
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Create/Edit Form */}
          <AnimatePresence>
            {(isCreating || editingId) && (
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <GlowCard className="p-6 shadow-glow-blue">
                  <motion.h3 
                    className="font-orbitron font-bold text-lg mb-4 text-cyber-blue"
                    animate={{
                      textShadow: [
                        '0 0 10px hsl(var(--cyber-blue) / 0.5)',
                        '0 0 20px hsl(var(--cyber-blue) / 0.8)',
                        '0 0 10px hsl(var(--cyber-blue) / 0.5)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isCreating ? 'Capture New Thought' : 'Edit Thought'}
                  </motion.h3>
                  
                  <div className="space-y-4">
                    <motion.input
                      type="text"
                      placeholder="Thought title..."
                      value={noteForm.title}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    />
                    
                    <motion.textarea
                      placeholder="Your mind's content..."
                      value={noteForm.content}
                      onChange={(e) => setNoteForm(prev => ({ ...prev, content: e.target.value }))}
                      rows={6}
                      className="w-full bg-input border border-border rounded-lg px-4 py-3 font-exo focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    />
                    
                    <motion.div 
                      className="flex gap-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
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
                    </motion.div>
                  </div>
                </GlowCard>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Notes Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {state.notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <GlowCard className="p-6 group h-full">
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
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {state.notes.length === 0 && !isCreating && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
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
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}