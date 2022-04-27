import React from "react";
import { useAppProvider } from "../context/appContext/AppProvider";

const Busqueda = () => {
  const { casoBd } = useAppProvider();

  console.log(casoBd)

  return <div>Busqueda</div>;
};

export default Busqueda;
