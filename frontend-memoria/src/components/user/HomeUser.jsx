import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import CodigoForm from "./CodigoForm";

const HomeUser = () => {
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
      <CodigoForm></CodigoForm>
    </>
  )
}

export default HomeUser