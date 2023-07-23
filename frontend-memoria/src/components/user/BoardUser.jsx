import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import CodigoForm from "./CodigoForm";
import InfoModal from "./InfoModal";
import Navbar from "../Navbar";

const BoardUser = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getUserBoard().then(
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
      <div className="container">
        <header className="jumbotron">
          <h3>BOARD USER {content}</h3>
        </header>
      </div>
    </>
  );
};

export default BoardUser;