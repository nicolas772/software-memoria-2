import React from 'react';
import AuthService from "../services/auth.service";
import "../assets/Sidebar_assets/css/jquery.mCustomScrollbar.min.css"
import "../assets/Sidebar_assets/css/media-queries.css"
import "../assets/Sidebar_assets/css/style.css"
import "../assets/Sidebar_assets/css/animate.css"
import "../assets/Sidebar_assets/js/jquery-3.3.1.min.js"
import "../assets/Sidebar_assets/js/jquery-migrate-3.0.0.min.js"
import "../assets/Sidebar_assets/js/jquery.backstretch.min.js"
import "../assets/Sidebar_assets/js/jquery.waypoints.min.js"
import "../assets/Sidebar_assets/js/jquery.mCustomScrollbar.concat.min.js"
import "../assets/Sidebar_assets/js/scripts.js"

const logOut = () => {
  AuthService.logout();
};

const Sidebar = () => {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />

      <div className="wrapper">
        <nav className="sidebar">
          <div className="dismiss">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div className="logo">
            <h3>
              <a href="./homeTester">Feel UX</a>
            </h3>
          </div>
          <ul className="list-unstyled menu-elements">
            <li className="active">
              <a href="./homeTester">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a href="./tester">
                <i className="fas fa-tachometer-alt"></i> Dashboards
              </a>
            </li>
            <li>
              <a href="./studies">
                <i class="fa fa-laptop" aria-hidden="true"></i> Estudios
              </a>
            </li>
            <li>
              <a href="/login" onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
              </a>
            </li>
            <li>
              <a
                href="#otherSections"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
                role="button"
                aria-controls="otherSections"
              >
                <i className="fas fa-sync"></i>Other sections
              </a>
              <ul className="collapse list-unstyled" id="otherSections">
                <li>
                  <a className="scroll-link" href="#section-3">
                    Our projects
                  </a>
                </li>
                <li>
                  <a className="scroll-link" href="#section-4">
                    We think that...
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="dark-light-buttons">
            <a className="btn btn-primary btn-customized-4 btn-customized-dark" href="#" role="button">
              Dark
            </a>
            <a className="btn btn-primary btn-customized-4 btn-customized-light" href="#" role="button">
              Light
            </a>
          </div>
        </nav>
        <div className="overlay"></div>
        <div className="content">
          <a className="btn btn-primary btn-customized open-menu" href="./homeTester" role="button">
            <i className="fas fa-align-left"></i> <span>Menu</span>
          </a>
        </div>
      </div>

      
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default Sidebar;
