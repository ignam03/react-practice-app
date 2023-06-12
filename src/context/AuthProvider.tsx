import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";

type User = {
  id: string | number;
  name: string;
  email: string;
  token?: string;
};

type Context = {
  // user: User | null;
  setAuth: any;
  auth: any;
};

const AuthContext = createContext<Context>({
  // user:null,
  setAuth: {},
  auth: {},
});

const AuthProvider = ({ children }: { children: any }) => {
  const [auth, setAuth] = useState({});
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoad(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("/users/profile", config);
        setAuth(data);
        navigate("/");
      } catch (error) {
        setAuth({});
      }
      setLoad(false);
    };
    authUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setAuth,
        auth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
