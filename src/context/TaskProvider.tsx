import { createContext, useEffect, useState } from "react";
import { Task } from "../types/task";
import useApiService from "../api/useApiService";

type ContextProps = {
  tasks: Task[] | any;
  task: Task | any;
  load: boolean;
  setTasks: Task[] | any;
  fetchTaskById: Task | any;
  submitTask: any;
  deleteTaskList: any;
  deleteAll: () => void;
  deleTaskSelected: (ids: string[]) => void;
};

const TaskContext = createContext<ContextProps>({
  tasks: [],
  task: {},
  load: false,
  setTasks: [],
  fetchTaskById: {},
  submitTask: "",
  deleteTaskList: "",
  deleteAll: () => {},
  deleTaskSelected: (ids: string[]) => {},
});

const TaskProvider = ({ children }: { children: any }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [task, setTask] = useState<Task | null>(null);
  const [load, setLoad] = useState(false);
  const { fetchTasks, fetchTask, createNewTask, editTask, deleteTask } =
    useApiService();

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      setTasks(await fetchTasks());
      setLoad(true);
    } catch (error) {
      setTasks([]);
    }
  };

  const fetchTaskById = async (id: string) => {
    try {
      const task = await fetchTask(id);
      setTask(task);
      return task;
    } catch (error) {
      setTask(null);
    } finally {
      setLoad(false);
    }
  };

  const submitTask = async (task: Task) => {
    if (task?.id) {
      await editTaskById(task.id, task);
    } else {
      await newTask(task);
    }
  };

  const newTask = async (task: Task) => {
    try {
      const taskCreated = await createNewTask(task);
      console.log(taskCreated);
      setTasks([...tasks, taskCreated]);
    } catch (error) {
      setTask(null);
    } finally {
      setLoad(false);
    }
  };

  const editTaskById = async (id: string | number, task: Task) => {
    try {
      const { data } = await editTask(id, task);
      console.log(data);
    } catch (error) {
      setTask(null);
    } finally {
      setLoad(false);
    }
  };
  const deleteTaskList = async (id: string | null) => {
    try {
      deleteTask(id);
      const tasksUpdate = tasks.filter((task) => task.id !== id);
      setTasks(tasksUpdate);
      return tasksUpdate;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAll = async () => {
    try {
      const ids = tasks.map((task) => task.id);
      await Promise.all(ids.map(deleteTask));
      setTasks([]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleTaskSelected = async (ids: any[]) => {
    try {
      await Promise.all(ids.map(deleteTask));
      const tasksRemove = [...tasks];
      for (const id of ids) {
        const index = tasksRemove.findIndex(
          (task) => task.id.toString() === id
        );
        tasksRemove.splice(index, 1);
      }
      setTasks(tasksRemove);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        fetchTaskById,
        submitTask,
        task,
        deleteTaskList,
        load,
        deleteAll,
        deleTaskSelected,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider };

export default TaskContext;
