'use client';

import { useEffect, useState } from 'react';
import { TaskInput } from '@/components/TaskInput';
import { TaskItem } from '@/components/TaskItem';
import { getTasks } from '@/app/actions';
import { Task } from '@/lib/types';
import { ClipboardList, LayoutList } from 'lucide-react';

export default function EffortEasePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState<number | null>(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTasks();
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-10">
          
          {/* Header section */}
          <header className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-2">
              <LayoutList className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground font-headline">
              EffortEase <span className="text-primary">Tasks</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Smart task management with AI difficulty ranking.
            </p>
          </header>

          {/* Input section */}
          <section className="space-y-4">
            <TaskInput onTaskCreated={fetchTasks} />
          </section>

          {/* Tasks List section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <ClipboardList className="h-4 w-4" />
                Your Tasks
              </h2>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-bold">
                {tasks.length}
              </span>
            </div>

            <div className="space-y-3 pb-12">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-card/50 border border-border/50 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : tasks.length > 0 ? (
                tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onUpdate={fetchTasks} />
                ))
              ) : (
                <div className="text-center py-20 border-2 border-dashed border-muted rounded-2xl">
                  <p className="text-muted-foreground">No tasks yet. Start by adding one above!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="w-full py-6 text-center text-xs text-muted-foreground space-y-1 border-t border-border/10 bg-background/80 backdrop-blur-md sticky bottom-0 z-50">
        <p className="font-medium text-primary/90">
          made with <span className="text-destructive mx-0.5">❤️</span> from brandon. Please like and subscriber
        </p>
        <p>© {year || '2024'} EffortEase Tasks. Powered by AI.</p>
      </footer>
    </div>
  );
}
