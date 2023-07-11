import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showTesterBoard, setShowTesterBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setShowTesterBoard(user.roles.includes("ROLE_TESTER"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <>
      {currentUser ? (
        <nav className="navbar navbar-expand navbar-dark bg-dark">


          {showTesterBoard && (
            <>
              <Link to={"/homeTester"} className="navbar-brand">
                Feel UX
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/homeTester"} className="nav-link">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/tester"} className="nav-link">
                    Tester Board
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/studies"} className="nav-link">
                    Estudios
                  </Link>
                </li>
              </div>
            </>
          )}

          {showUserBoard && (
            <>
              <Link to={"/homeUser"} className="navbar-brand">
                Feel UX
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/homeUser"} className="nav-link">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>
              </div>
            </>
          )}
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                @{currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Cerrar Sesión
              </a>
            </li>
          </div>
        </nav>
      ) : (
        <div></div>
      )}
    </>
  )

}

export default Navbar;