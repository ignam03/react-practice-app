import clientAxios from "../config/clientAxios";
import { useAuth } from "../hooks/useAuth";
import { Task } from "../types/task";
import { LoginUser, User } from "../types/user";

const endPointTasks = "/tasks";

// export const useApiService = {
//   // const login = async()

//   login: async function (body: LoginUser) {
//     const {} = useAuth();
//      const { data } = await clientAxios.post("/users/login", body);
//      return data;
//   },

//   fetchTasks: async function () {
//     return await clientAxios.get(endPointTasks);
//   },

//   fetchTask: async function (id: string | number) {
//     return await clientAxios.get(`${endPointTasks}/${id}`);
//   },

//   createNewTask: async function (task: Task) {
//     return await clientAxios.post(endPointTasks, task);
//   },

//   deleteTask: async function (id: string | number) {
//     return await clientAxios.delete(`${endPointTasks}/${id}`);
//   },
// };

// export default useApiService;

const useApiService = () => {
  const { setAuth } = useAuth();

  //TODO all login
  const login = async (login: LoginUser) => {
    // const { data } = await clientAxios.get(`/users?email=${login.email}`);
    // localStorage.setItem("token", data.token);
    // setAuth(data);
    // data.map((user: any) => {
    //   setAuth(user);
    // });
    // return data.user;

    try {
      const { data } = await clientAxios.get(`/users?email=${login.email}`);
      const userLogger = data[0];
      if (!userLogger || userLogger.password !== login.password) {
        console.log("password incorrect");
        return null;
      }
      localStorage.setItem("token", data.token);
      setAuth(userLogger);
      return userLogger;
    } catch (error: any) {
      console.log(error);
    }
  };

  const register = async (user: User) => {
    try {
      const { data } = await clientAxios.post("/users", user);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  //TODO all tasks

  const fetchTasks = async () => {
    try {
      const { data } = await clientAxios.get(endPointTasks);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchTask = async (id: string | number) => {
    return await clientAxios.get(`${endPointTasks}/${id}`);
  };

  const createNewTask = async function (task?: Task) {
    try {
      const { data } = await clientAxios.post(endPointTasks, task);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id: string | null) => {
    return await clientAxios.delete(`${endPointTasks}/${id}`);
  };

  return {
    login,
    register,
    fetchTasks,
    fetchTask,
    createNewTask,
    deleteTask,
  };
};

export default useApiService;
