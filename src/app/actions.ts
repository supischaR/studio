'use server';

import { categorizeTaskDifficulty } from '@/ai/flows/ai-task-difficulty-ranking';
import { Task, Difficulty } from '@/lib/types';

// In-memory store for demonstration purposes as we don't have a database configured.
// In a real production app, this would be replaced with Firestore, PostgreSQL, etc.
let tasks: Task[] = [];

export async function getTasks(): Promise<Task[]> {
  return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
}

export async function createTask(description: string): Promise<Task> {
  if (!description || description.trim() === '') {
    throw new Error('Task description is required');
  }

  const { difficulty } = await categorizeTaskDifficulty({ taskDescription: description });
  
  const newTask: Task = {
    id: Math.random().toString(36).substring(2, 11),
    description: description.trim(),
    difficulty: difficulty as Difficulty,
    completed: false,
    createdAt: Date.now(),
  };

  tasks.push(newTask);
  return newTask;
}

export async function toggleTaskCompletion(id: string): Promise<void> {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
}

export async function deleteTask(id: string): Promise<void> {
  tasks = tasks.filter(task => task.id !== id);
}
