import React from 'react';

import TableBox from './TableBox';

import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import 'handsontable/dist/handsontable.full.css';

// ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

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
  { titulo: 'Moneda' },
  { titulo: 'Presupuesto' },
];

const Table = (props) => {
  return (
    <div
      style={{
        maxWidth: '95%',
        height: '80vh',
        maxHeight: '55vh',
        margin: 'auto',
      }}
    >
      <HotTable data={props.input || props.casoBd} licenseKey="non-commercial-and-evaluation">
        <HotColumn dataKey="NOMBRE" />
      </HotTable>
    </div>
  );
};

export default Table;

{
  /* <table className="table border border-3 border-secondary table-success rounded rounded-3 table-striped table-hover mt-3">
        <thead>
          <tr>
            {tabla.map(({ titulo }, idx) => (
              <th scope="col" key={idx}>
                {titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={{ fontSize: '12px' }}>
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
      </table> */
}
