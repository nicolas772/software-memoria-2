import React, { useState, useEffect } from "react";

import UserService from "../../services/user.service";
import CodigoForm from "./CodigoForm";
import InfoModal from "./InfoModal";

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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <CodigoForm></CodigoForm>
    </div>
  );
};

export default BoardUser;