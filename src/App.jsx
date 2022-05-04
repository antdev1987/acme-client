import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/appContext/AppProvider"
import PrivateRouteAdmin from "./pages/permissions/PrivateRouteAdmin";
import NavBar from "./layout/NavBar";
import Busqueda from "./pages/Busqueda";
import BaseDatos from "./pages/BaseDatos";
import Login from "./pages/Login";
import { UserProvider } from './context/userContext/UserProvider'
import PrivateRouteUser from "./pages/permissions/PrivateRouteUser";
import PublicRouteApp from "./pages/permissions/PublicRouteApp";
import AdminUsers from "./pages/AdminUsers";
import Mantencion from "./pages/Mantencion";
import Alerta from "./pages/Alerta";
import PanelControl from "./pages/PanelControl";
import Reporte from "./pages/Reporte";

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
              <Route path='/alerta' element={<Alerta />}/>
              <Route path='/panelcontrol' element={<PanelControl />}/>
              <Route path='/reporte' element={<Reporte />}/>
            </Route>

            <Route element={<PrivateRouteAdmin />}>
              <Route path="/admin/basedatos" element={<BaseDatos />} />
              <Route path='/admin/admin-users' element={<AdminUsers />}/>
              <Route path='/admin/mantencion' element={<Mantencion  />}/>
            </Route>
            
          </Routes>
        </AppProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
