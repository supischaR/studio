export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Task {
  id: string;
  description: string;
  difficulty: Difficulty;
  completed: boolean;
  createdAt: number;
}
