import React from "react";
import { ModeToggle } from "./components/mode-toggle";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotePage from "./pages/NotePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="/note/:id" element={<NotePage />} />
      </Routes>
    </div>
  );
};

export default App;
