export type Todo = {
  id: number;
  task: string;
  description: string;
  eta: string | Date;
  status: boolean;
};
