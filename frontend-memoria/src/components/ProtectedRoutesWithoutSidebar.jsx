import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import Prueba from "./Prueba"

import { Routes, Route } from "react-router-dom";
import Footer from "./Footer";

const ProtectedRoutesWithoutSidebar = () => {
  const user = AuthService.getCurrentUser();

  if (user) {
    return (
      <div>
        <main>
          <Routes>
            <Route path="/prueba" element={<Prueba />} />
          </Routes>
          <Footer />
        </main>
      </div>
    );
  } else {
    // Si el usuario no está autenticado, redirecciona a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

};

export default ProtectedRoutesWithoutSidebar;