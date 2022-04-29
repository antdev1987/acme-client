import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/appContext/AppProvider";
import PrivateRouteAdmin from "./pages/permissions/PrivateRouteAdmin";
import NavBar from "./layout/NavBar";
import Busqueda from "./pages/Busqueda";
import BaseDatos from "./pages/BaseDatos";
import Login from "./pages/Login";
import { UserProvider } from "./context/appContext/userContext/UserProvider";
import PrivateRouteUser from "./pages/permissions/PrivateRouteUser";
import PublicRouteApp from "./pages/permissions/PublicRouteApp";

const App = () => {
  return (
    <BrowserRouter>
        <UserProvider>
      <AppProvider>
          <NavBar />
          <Routes>

            <Route element={<PublicRouteApp />}>
              <Route path="/" element={<Login />} />
            </Route>

            <Route element={<PrivateRouteUser />}>
              <Route path="/busqueda" element={<Busqueda />} />
            </Route>

            <Route element={<PrivateRouteAdmin />}>
              <Route path="/admin/basedatos" element={<BaseDatos />} />
            </Route>
          </Routes>
      </AppProvider>
        </UserProvider>
    </BrowserRouter>
  );
};

export default App;
