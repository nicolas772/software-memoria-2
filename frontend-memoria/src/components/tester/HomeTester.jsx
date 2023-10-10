import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import ApexChart from "../charts/ApexChart";
import ApexChart2 from "../charts/ApexChart2";
import ApexChart3 from "../charts/ApexChart3";
import Cards from "../charts/Cards";
import "../charts/css/styleDashboardPrincipal.css"

const HomeTester = () => {
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
    <div style={{ margin: '20px' }}>
      <header>
        <h3>Dashboard Principal</h3>
      </header>
    <Cards content={content}></Cards>
    </div>
  )
}

export default HomeTester