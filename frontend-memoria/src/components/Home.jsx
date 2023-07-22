import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import HomeTester from './HomeTester';
import Profile from './Profile';
import Studies from './tester/Studies';
import BoardTester from './tester/BoardTester';
import AuthService from "../services/auth.service";
import Login from "./Login";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      //setShowUserBoard(user.roles.includes("ROLE_USER"));
      //setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
    }
  }, []);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <>
      <div className={`app ${toggled ? 'toggled' : ''}`}>
        <Sidebar
          collapsed={collapsed}
          toggled={toggled}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
        />
        <main>
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <Routes>
            <Route path="/homeTester" element={<HomeTester />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/boardTester" element={<BoardTester />} />
            <Route path="/studies" element={<Studies />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default Home