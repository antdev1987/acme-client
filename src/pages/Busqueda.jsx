import React, { useState } from 'react';

import * as XLSX from 'xlsx';

import { useAppProvider } from '../context/appContext/AppProvider';

const ar = {};

const tabla = [
  { titulo: 'N° CASO' },
  { titulo: 'AÑO' },
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

const clearObj = () => {
  for (const item in ar) {
    if (ar[item] === '') {
      delete ar[item];
    }
  }
};

const Busqueda = () => {
  const { casoBd } = useAppProvider();
  const [input, setInput] = useState([]);

  const save = (e) => {
    clearObj();
    ar[e.target.name] = e.target.value;
  };

  const buscar = (e) => {
    e.preventDefault();
    clearObj();
    setInput(_.filter(casoBd, { ...ar }));
  };

  const handleExport = (e) => {
    e.preventDefault()
    
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(input);

    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, "MyExcel.xlsx")
  };

  return (
    <>
      <p>{input.length === 0 ? casoBd.length : input.length}</p>

      <form onSubmit={buscar}>
        <input type="text" name="NOMBRE" onChange={save} placeholder="Nombre" />
        <input type="text" name="ID" onChange={save} placeholder="id" />
        <input type="text" name="ESTADO" onChange={save} placeholder="estado" />
        <input type="text" name="AÑO" onChange={save} placeholder="AÑO" />
        <input
          type="text"
          name="UNIDAD REQUIRENTE"
          onChange={save}
          placeholder="UNIDAD REQUIRENTE"
        />
        <input
          type="text"
          name="ITEM PRESUPUESTARIO"
          onChange={save}
          placeholder="ITEM PRESUPUESTARIO"
        />
        <button type="submit">buscar</button>
      </form>

      <button onClick={handleExport}>
        Export
      </button>

      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr>
            {tabla.map(({ titulo }, idx) => (
              <th scope="col" key={idx}>
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {input.length !== 0 ? (
            <>
              {input.map((item) => (
                <tr key={item._id}>
                  <td>{item['N° CASO']}</td>
                  <td>{item.AÑO}</td>
                  <td>{item.ID}</td>
                  <td>{item.NOMBRE}</td>
                  <td>{item?.['UNIDAD REQUIRENTE']}</td>
                  <td>{item.CANTIDAD}</td>
                  <td>{item?.['TIPO LICITACION']}</td>
                  <td>{item.ESTADO}</td>
                  <td>{item.SUBESTADO}</td>
                  <td>{item.acciones[0]?.Fecha}</td>
                  <td>{item.acciones[0]?.Actividad}</td>
                  <td>{item?.MONEDA}</td>
                  <td>{item?.['ITEM PRESUPUESTARIO']}</td>
                  <td>{item?.CONTRALORIA}</td>
                  <td>{item?.PAC}</td>
                  <td>{item?.RESPONSABLE}</td>
                </tr>
              ))}
            </>
          ) : (
            <>
              {casoBd.map((item) => (
                <tr key={item._id}>
                  <td>{item['N° CASO']}</td>
                  <td>{item.AÑO}</td>
                  <td>{item.ID}</td>
                  <td>{item.NOMBRE}</td>
                  <td>{item?.['UNIDAD REQUIRENTE']}</td>
                  <td>{item.CANTIDAD}</td>
                  <td>{item?.['TIPO LICITACION']}</td>
                  <td>{item.ESTADO}</td>
                  <td>{item.SUBESTADO}</td>
                  <td>{item.acciones[0]?.Fecha}</td>
                  <td>{item.acciones[0]?.Actividad}</td>
                  <td>{item?.MONEDA}</td>
                  <td>{item?.['ITEM PRESUPUESTARIO']}</td>
                  <td>{item?.CONTRALORIA}</td>
                  <td>{item?.PAC}</td>
                  <td>{item?.RESPONSABLE}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Busqueda;