'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createTask } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

interface TaskInputProps {
  onTaskCreated: () => void;
}

export function TaskInput({ onTaskCreated }: TaskInputProps) {
  const [description, setDescription] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isPending) return;

    setIsPending(true);
    try {
      await createTask(description);
      setDescription('');
      onTaskCreated();
      toast({
        title: "Task Created",
        description: "AI has categorized your task difficulty.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create task. Please try again.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="flex gap-2 p-2 bg-card border rounded-xl shadow-lg transition-all duration-300 group-focus-within:ring-2 group-focus-within:ring-primary/50">
        <Input
          placeholder="What needs to be done?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          className="bg-transparent border-none focus-visible:ring-0 text-lg py-6 placeholder:text-muted-foreground"
        />
        <Button 
          type="submit" 
          disabled={!description.trim() || isPending}
          size="lg"
          className="bg-primary hover:bg-primary/90 rounded-lg px-6"
        >
          {isPending ? (
            <Sparkles className="animate-pulse h-5 w-5" />
          ) : (
            <>
              <Plus className="h-5 w-5 mr-1" />
              <span>Add</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
