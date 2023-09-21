import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";

const HomeTester = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div style={{ margin: '20px' }}>
      <header>
        <h3>Dashboard Principal</h3>
      </header>
    </div>
  )
}

export default HomeTester