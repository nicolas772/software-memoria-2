import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Sidebar from "./Sidebar";
import HomeTester from './tester/HomeTester';
import Profile from './Profile';
import Studies from './tester/Studies';
import BoardTester from './tester/BoardTester';
import Login from "./Login";

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

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
        </main>
      </div>
    </>
  )
}

export default Home