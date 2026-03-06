'use server';
/**
 * @fileOverview This file implements a Genkit flow for categorizing task difficulty.
 *
 * - categorizeTaskDifficulty - A function that categorizes a task description into 'Easy', 'Medium', or 'Hard'.
 * - CategorizeTaskDifficultyInput - The input type for the categorizeTaskDifficulty function.
 * - CategorizeTaskDifficultyOutput - The return type for the categorizeTaskDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTaskDifficultyInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('The description of the task to be categorized.'),
});
export type CategorizeTaskDifficultyInput = z.infer<
  typeof CategorizeTaskDifficultyInputSchema
>;

const CategorizeTaskDifficultyOutputSchema = z.object({
  difficulty: z.enum(['Easy', 'Medium', 'Hard']).describe(
    `The categorized difficulty of the task. Must be one of 'Easy', 'Medium', or 'Hard'.
    'Easy' tasks are simple, quick to complete, and require minimal effort.
    'Medium' tasks are moderately complex, take a reasonable amount of time, and may require some planning.
    'Hard' tasks are complex, time-consuming, and require significant effort or specialized skills.`
  ),
});
export type CategorizeTaskDifficultyOutput = z.infer<
  typeof CategorizeTaskDifficultyOutputSchema
>;

export async function categorizeTaskDifficulty(
  input: CategorizeTaskDifficultyInput
): Promise<CategorizeTaskDifficultyOutput> {
  return categorizeTaskDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'categorizeTaskDifficultyPrompt',
  input: {schema: CategorizeTaskDifficultyInputSchema},
  output: {schema: CategorizeTaskDifficultyOutputSchema},
  prompt: `You are an AI assistant specialized in task management. Your goal is to accurately categorize tasks based on their description into one of three difficulty levels: 'Easy', 'Medium', or 'Hard'.

Consider the complexity, estimated time, and required effort when making your decision.

Task Description: {{{taskDescription}}}`,
});

const categorizeTaskDifficultyFlow = ai.defineFlow(
  {
    name: 'categorizeTaskDifficultyFlow',
    inputSchema: CategorizeTaskDifficultyInputSchema,
    outputSchema: CategorizeTaskDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
