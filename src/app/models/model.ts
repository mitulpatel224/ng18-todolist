export type Todo = {
  id: string;
  task: string;
  description: string;
  eta: string | Date;
  status: boolean;
  order: number;
};

export const TimerOption = new Map<TimerKey, TimerModel>();
TimerOption.set(10, { hour: 0, minute: 10, second: 0 });
TimerOption.set(20, { hour: 0, minute: 20, second: 0 });
TimerOption.set(45, { hour: 0, minute: 45, second: 0 });

export type TimerKey = 10 | 20 | 45;
export type TimerModel = { hour?: number; minute: number; second: number };
