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
  const [relateBd, setRelateBd] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [unableSubmit, setUnableSubmit] = useState(false);
  const [fechaHora,setFechaHora] = useState('')
  const { cargarBDAppfn, deleteBDAppfn, casoBd, isLoadingAppProvider,updateExtraInfoAppfn } =
    useAppProvider();

  const handleSubmit = () => {
    console.log("hola");
    setIsLoading(true);
    cargarBDAppfn(relateBd, setIsLoading);
    setCasos([]);
    setAcciones([]);
  };

  const handleRelate = () => {
    setIsLoading(true);
    setTimeout(() => {
      casos.forEach((item, idx) => {
        
        if(item.ESTADO === "DERIVADO A DEPTO. CONTRATOS" ){
          casos[idx]["activo"] = "NO"
        } else {
          casos[idx]["activo"] = "SI"
        }
        
        casos[idx]["acciones"] = acciones.filter(
          (e) => e["N°deCaso"] === item["N° CASO"]
        );
      });
      setRelateBd(casos);
      setIsLoading(false);
      setUnableSubmit(true);
    }, 0);
  };

  const handleDelete = () => {
    deleteBDAppfn();
  };

  console.log(relateBd);

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

  console.log("pagina base de datos");
  console.log(fechaHora)

  const handleSubmitFecha = (e)=>{
    e.preventDefault()

    updateExtraInfoAppfn({fechaHoraInfo:fechaHora})
    setFechaHora('')

  }

  return (
    <LoadingOverlay
      className="w-100"
      active={isLoading || isLoadingAppProvider}
      spinner
      text="Loading your content..."
    >
      {casoBd.length <= 0 ? (
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
              <button
                onClick={unableSubmit ? handleSubmit : handleRelate}
                className="btn btn-info"
              >
                {unableSubmit ? "Cargar Base de Datos" : "Crear Relacion"}
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="text-center border border-3 pt-5 pb-2">
            <h3 className="mb-3">Eliminar base de datos para ingresar Nueva</h3>
            <button className="btn btn-primary" onClick={handleDelete}>
              reset base de datos
            </button>
          </div>

          <form onSubmit={handleSubmitFecha} className="w-50 m-auto mt-5 border border-3 p-2 shadow">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Fecha y Hora de Actualizacion
              </label>
              <input
                type="text"
                value={fechaHora}
                className="form-control"
                id="exampleInputEmail1"
                onChange={(e)=>setFechaHora(e.target.value)}
              />
              <div id="emailHelp" className="form-text">
                this info will show in busqueda page
              </div>
            </div>
            <button className="btn btn-primary">Actualizar Fecha y Hora</button>
          </form>
        </>
      )}
    </LoadingOverlay>
  );
};

export default BaseDatos;
