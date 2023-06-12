import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../views/pages/home";
import { RouterLayout } from "../shared/RouterLayout/RouterLayout";
import { RegisterPage } from "../views/pages/Register/RegisterPage";
import { CharacterPage } from "../views/pages/Character/CharacterPage";
import TodoPage from "../views/pages/TodoList/TodoPage";
import AdminPage from "../views/pages/AdminPage/AdminPage";
import { LoginPage } from "../views/pages/Login/LoginPage";
import { AuthProvider } from "../context/AuthProvider";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import RouteProtected from "./RouteProtected";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route index element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      {/* <Route path="/" element={<RouteProtected />}>
          <Route path="/to-do-list" element={<TodoPage />} />
          <Route path="/rick-morty-list" element={<HomePage />} />
          <Route path="/character/:id" element={<CharacterPage />} />
          <Route path="/admin-post-user" element={<AdminPage />} />
        </Route> */}
      <Route path="to-do-list" element={<RouteProtected />}>
        <Route index element={<TodoPage />} />
      </Route>
      <Route path="/rick-morty-list" element={<RouteProtected />}>
        <Route index element={<HomePage />} />
        {/* <Route path="/character/:id" element={<CharacterPage />} /> */}
        <Route path="character/:id" element={<CharacterPage />}></Route>
      </Route>
      <Route path="/admin-post-user" element={<RouteProtected />}>
        <Route index element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
