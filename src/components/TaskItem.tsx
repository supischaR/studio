'use client';

import { useState } from 'react';
import { Trash2, Clock } from 'lucide-react';
import { Task } from '@/lib/types';
import { toggleTaskCompletion, deleteTask } from '@/app/actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

export function TaskItem({ task, onUpdate }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    await toggleTaskCompletion(task.id);
    onUpdate();
    setIsUpdating(false);
  };

  const handleDelete = async () => {
    setIsUpdating(true);
    await deleteTask(task.id);
    onUpdate();
    setIsUpdating(false);
  };

  const difficultyColors = {
    Easy: 'bg-easy text-white',
    Medium: 'bg-medium text-black',
    Hard: 'bg-hard text-white',
  };

  const borderColors = {
    Easy: 'border-l-easy',
    Medium: 'border-l-medium',
    Hard: 'border-l-hard',
  };

  return (
    <div 
      className={cn(
        "group flex items-center gap-4 p-4 bg-card border border-l-4 rounded-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
        task.completed ? "opacity-60" : "opacity-100",
        borderColors[task.difficulty]
      )}
    >
      <div className="flex items-center justify-center">
        <Checkbox 
          checked={task.completed} 
          onCheckedChange={handleToggle}
          disabled={isUpdating}
          className="h-6 w-6 rounded-full border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-base md:text-lg font-medium transition-all truncate",
          task.completed && "line-through text-muted-foreground"
        )}>
          {task.description}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Badge className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-0", difficultyColors[task.difficulty])}>
            {task.difficulty}
          </Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <Button
        variant="default"
        size="icon"
        onClick={handleDelete}
        disabled={isUpdating}
        className="opacity-0 group-hover:opacity-100 bg-primary hover:bg-primary/90 text-primary-foreground transition-opacity h-8 w-8 rounded-lg"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
