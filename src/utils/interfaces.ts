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
  questions: Question[];
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

type StudentStatus = "online" | "idle" | "offline";

export interface User {
  id: number;
  name: string;
  password: string;
  role: Role;
  emailkey?: string;
  classes: number[];
  studentStatus: Record<number, StudentStatus>;
}
