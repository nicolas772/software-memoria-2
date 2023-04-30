import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardTester from "./components/BoardTester";
import Studies from "./components/Studies";
import FormStudy from "./components/FormStudy";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Study from "./components/Study"


const App = () => {
  const [showTesterBoard, setShowTesterBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/home"} className="navbar-brand">
          Proyecto Memoria
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Inicio
            </Link>
          </li>

          {showTesterBoard && (
            <>
              <li className="nav-item">
                <Link to={"/tester"} className="nav-link">
                  Tester Board
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/studies"} className="nav-link">
                  Estudios
                </Link>
              </li>
            </>
          )}

          {showUserBoard && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                @{currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Cerrar Sesión
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Iniciar Sesión
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/tester" element={<BoardTester />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/studies/:idstudy" element={<Study />} />
            <Route path="/studies/new-study" element={<FormStudy />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;