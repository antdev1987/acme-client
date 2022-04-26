import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./layout/NavBar";
import Busqueda from "./pages/Busqueda";
import Mantencion from "./pages/Mantencion";
import PrivateRouteAdmin from "./pages/permissions/PrivateRouteAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/busqueda" element={<Busqueda />} />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin/mantencion" element={<Mantencion />} />
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
