import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

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
    <header>
      <h1>Home Tester</h1>
    </header>
  )
}

export default HomeTester