import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import Navbar from "../Navbar";

const BoardTester = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getTesterBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <>
    <Navbar></Navbar>
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
    </>
  );
};

export default BoardTester;