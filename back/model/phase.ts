import { Task } from "./task";

export interface Phase {
  id: number;
  title: string;
  isCompleted: boolean;
  tasks: Array<Task>;
}
