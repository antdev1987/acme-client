import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/appContext/AppProvider";
import PrivateRouteAdmin from "./pages/permissions/PrivateRouteAdmin";
import NavBar from "./layout/NavBar";
import Busqueda from "./pages/Busqueda";
import BaseDatos from "./pages/BaseDatos";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <NavBar />
        <Routes>

          <Route>
            <Route path="/busqueda" element={<Busqueda />} />
          </Route>

          <Route element={<PrivateRouteAdmin />}>
            <Route path="/admin/basedatos" element={<BaseDatos />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
