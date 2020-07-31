export interface Homework {
  id: number;
  classid: number;
  name: string;
  dueDate: number;
  question: Question;
}

export type QuestionType = "choice" | "short" | "essay";

export interface Question {
  id: number;
  homeworkid: number;
  name: string;
  type: QuestionType;
  choices: string[];
}

type Role = "student" | "teacher" | "admin";

interface StudentHWProgress {
  completed: boolean;
  score: number;
}
export type StudentStatus = "online" | "idle" | "offline";
export interface Class {
  id: number;
  teacher: number;
  students: number[];
  name: string;
  code: string;
  homework: number[];
  studentHWProgress: Record<number, Record<number, StudentHWProgress>>;
  studentStatus: Record<number, StudentStatus>;
}

export interface User {
  id: number;
  name: string;
  password: string;
  role: Role;
  emailkey?: string;
  classes: number[];
  studentStatus: Record<number, StudentStatus>;
}
