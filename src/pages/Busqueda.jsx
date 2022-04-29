import React from 'react';
import { useAppProvider } from '../context/appContext/AppProvider';

const tabla = [
  { titulo: 'N° CASO' },
  { titulo: 'A;o' },
  { titulo: 'ID' },
  { titulo: 'Nombre' },
  { titulo: 'Unidad Requirent' },
  { titulo: 'Cantidad' },
  { titulo: 'Tipo de licitacion' },
  { titulo: 'Estado' },
  { titulo: 'Subestado' },
  { titulo: 'Fecha' },
  { titulo: 'Actividad' },
  { titulo: 'Moneda' },
  { titulo: 'Presupuesto' },
  { titulo: 'Contraloria' },
  { titulo: 'PAC' },
  { titulo: 'Responsable' },
  { titulo: 'Noc' },
];

const Busqueda = () => {
  const { casoBd } = useAppProvider();

  console.log(casoBd);

  return (
    <>
      {casoBd.length === 0 ? (
        <p>Loading</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              {tabla.map(({ titulo }, idx) => (
                <th scope="col">{titulo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {casoBd.map((item, idx) => {
              return (
                <tr>
                  <td>{item['N° CASO']}</td>
                  <td>{item.AÑO}</td>
                  <td>{item.ID}</td>
                  <td>{item.NOMBRE}</td>
                  <td>{item['UNIDAD REQUIRENTE']}</td>
                  <td>{item.CANTIDAD}</td>
                  <td>{item['TIPO LICITACION']}</td>
                  <td>{item.ESTADO}</td>
                  <td>{item.SUBESTADO}</td>
                  <td>{item.acciones[0]?.Fecha}</td>
                  <td>{item.acciones[0]?.Actividad}</td>
                  <td>{item?.MONEDA}</td>
                  <td>{item?.["ITEM PRESUPUESTARIO"]}</td>
                  <td>{item?.CONTRALORIA}</td>
                  <td>{item?.PAC}</td>
                  <td>{item?.RESPONSABLE}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Busqueda;
