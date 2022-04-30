import React from 'react';

import TableBox from './TableBox';

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

const Table = (props) => {
  return (
    <table className="table table-sm table-striped table-hover">
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
        {props.input.length !== 0 ? (
          <>
            {props.input.map((item) => (
              <TableBox item={item} key={item._id} />
            ))}
          </>
        ) : (
          <>
            {props.casoBd.map((item) => (
              <TableBox item={item} key={item._id} />
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};

export default Table;
