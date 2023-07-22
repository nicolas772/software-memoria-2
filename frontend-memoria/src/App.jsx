import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomeTester from './components/HomeTester';
import Profile from './components/Profile';
import Studies from './components/tester/Studies';
import BoardTester from './components/tester/BoardTester';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AuthService from "./services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowUserBoard(user.roles.includes("ROLE_USER"));
      //setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
    }
  }, []);

  return (
    <>
      {currentUser ? (
      <Home></Home>
      )  : (
        <div></div>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homeTester" element={<HomeTester />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boardTester" element={<BoardTester />} />
        <Route path="/studies" element={<Studies />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;