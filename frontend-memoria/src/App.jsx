import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/user/BoardUser";
import BoardTester from "./components/tester/BoardTester";
import Studies from "./components/tester/Studies";
import FormStudy from "./components/tester/FormStudy";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Study from "./components/tester/Study"
import Iteration from "./components/tester/Iteration";
import Task from "./components/tester/Task";
import IterationUser from "./components/user/IterationUser";
import TaskUser from "./components/user/TaskUser";
import FormCSUQ from "./components/user/FormCSUQ";
import FormSentimentAnalisis from "./components/user/FormSentimentAnalisis";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
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
            <Route path="/studies/:idstudy/:iditeration" element={<Iteration />} />
            <Route path="/user/doiteration/:iditeration" element={<IterationUser />} />
            <Route path="/user/doiteration/:iditeration/:idtask" element={<TaskUser />} />
            <Route path="/user/doCSUQ/:iditeration" element={<FormCSUQ />} />
            <Route path="/user/doQuestion/:iditeration" element={<FormSentimentAnalisis />} />
            <Route path="/studies/:idstudy/:iditeration/:idtask" element={<Task />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;