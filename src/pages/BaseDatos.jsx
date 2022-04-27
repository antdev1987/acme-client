import React, { useState } from "react";

//import * as XLSX from 'xlsx/xlsx.mjs';
import * as XLSX from "xlsx";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;
import axios from "axios";
import { useAppProvider } from "../context/appContext/AppProvider";

const BaseDatos = () => {
  const [casos, setCasos] = useState([]);
  const [acciones, setAcciones] = useState([]);
  const [bd,setBd]=useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [unableSubmit,setUnableSubmit] = useState(false)
  const { cargarBDAppfn } = useAppProvider();

  const handleSubmit=()=>{
    console.log('hola')
    cargarBDAppfn(bd);
    setCasos([])
    setAcciones([])
  }

  const handleRelate = () => {
    setIsLoading(true)
    setTimeout(() => {
      casos.forEach((item,idx) => {
        //console.log(casos[idx])
        casos[idx]["acciones"]=(acciones.filter(e => e['N°deCaso'] === item['N° CASO']))
      });
      setBd(casos)
      setIsLoading(false)
      setUnableSubmit(true)
    }, 0);
  };

  console.log(bd)

  const handleFileCaso = async (e) => {
    //hay que implementar esta condicion luego para que solo se pueda subir la base de datos correcta
    if (e.target.files[0].name !== "CASOS.xlsx") {
      console.log("estas llamando erroneamente tu base de datos");
      return;
    }

    //codigo de abajo funciona para no detener la app cuando no hay excel cargado
    const file = e.target.files[0];
    if (!file) {
      console.log("aqui");
      return;
    }
    setIsLoading(true);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { cellDates: true });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_row_object_array(worksheet);
    setCasos(jsonData);
    setIsLoading(false);
  };

  const handleFileAcciones = async (e) => {
    //codigo de abajo funciona para no detener la app cuando no hay excel cargado
    const file = e.target.files[0];
    if (!file) {
      console.log("aqui");
      return;
    }
    setIsLoading(true);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { cellDates: true });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_row_object_array(worksheet);
    setAcciones(jsonData);
    setIsLoading(false);
  };

  return (
    <LoadingOverlay
      className="w-100"
      active={isLoading}
      spinner
      text="Loading your content..."
    >
      <div className="text-center pt-4 vh-100 border">
        <h1>Parse Base de Datos Excel</h1>

        <div className="border border-5 w-50 mx-auto p-2 mb-3">
          <label className="d-block text-uppercase mb-1 fw-bold">
            Subir base de datos Caso
          </label>
          <input type="file" onChange={(e) => handleFileCaso(e)} />
        </div>

        {casos.length > 0 && (
          <div className="border border-5 w-50 mx-auto p-2 mb-3">
            <label className="d-block text-uppercase mb-1 fw-bold">
              Subir base de datos Acciones
            </label>
            <input type="file" onChange={(e) => handleFileAcciones(e)} />
          </div>
        )}

        {acciones.length > 0 && (
          <div>
            <button onClick={unableSubmit ? handleSubmit : handleRelate} className="btn btn-info">
              {unableSubmit ? 'Cargar Base de Datos' : 'Crear Relacion'}
            </button>
          </div>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default BaseDatos;
