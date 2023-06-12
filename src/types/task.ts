export type Task = {
  id?: string | number;
  name: string;
  description?: string;
  loadDate?: string | Date;
  taskType?: string | TypeTask;
  active?:boolean
};

export enum TypeTask {
  HOME = "HOME",
  WORK = "WORK",
  SPORT = "SPORT",
}
