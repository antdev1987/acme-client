import React from "react";
import { useAppProvider } from "../context/appContext/AppProvider";

const Busqueda = () => {
  const { casoBd } = useAppProvider();

  return <div>Busqueda</div>;
};

export default Busqueda;
