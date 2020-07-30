export interface Class {
  id: number;
  teacher: number;
  students: Array<number>;
  name: string;
  code: string;
}

export interface Homework {
  id: number;
  classid: number;
  name: string;
  dueDate: number;
  questions: number[];
}

export type QuestionType = "choice" | "short" | "essay";

export interface Question {
  id: number;
  homeworkid: number;
  name: string;
  type: QuestionType;
  choices: string[];
}
