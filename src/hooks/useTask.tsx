import { useContext } from "react";
import TaskContext from "../context/TaskProvider";

export const useTask = () => {
  return useContext(TaskContext);
};
