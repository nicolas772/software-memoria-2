import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomeTester from './components/HomeTester';
import Profile from './components/Profile';
import Studies from './components/tester/Studies';
import BoardTester from './components/tester/BoardTester';

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <Sidebar
        image={image}
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
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;