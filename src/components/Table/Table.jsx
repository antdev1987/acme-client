import React from 'react';

import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import 'handsontable/dist/handsontable.full.css';

// ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

function Table(props) {
  const hotTableComponent = React.useRef(null);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin('exportFile');

    pluginDescarga.downloadFile('csv', {
      filename: 'usuarios',
      fileExtension: 'csv',
      mimeType: 'text/csv',
      columnHeaders: true,
      exportHiddenColumns: true,
    });
  };

  console.log(hotTableComponent)

  return (
    <div className="container-md pb-5">
      <button
        onClick={() => descargarArchivo()}
        className="btn-primary btn mb-2"
      >
        Descargar Archivo
      </button>

      <div className="border p-3">
        {props.casoBd && (
          <HotTable
            ref={hotTableComponent}
            language={esMX.languageCode}
            data={props.input.length === 0 ? props.casoBd : props.input}
            licenseKey="non-commercial-and-evaluation"
            colHeaders={true}
            rowHeaders={true}
            columnSorting={true}
            mergeCells={true}
            // contextMenu={['row_above', 'row_below']}
            readOnly={true}
            manualColumnResize={true}
            maxWidth="926"
            height="500"
            className="text-dark"
            // hiddenColumns= {{
            //   columns: [1],
            //   // show UI indicators to mark hidden columns
            //   indicators: true
            // }}
          >
            <HotColumn data="N° CASO" title="N° CASO" />
            <HotColumn data="AÑO" title="AÑO" />
            <HotColumn data="ID" title="ID" width={50} />
            <HotColumn data="NOMBRE" title="Nombre" width={100} />
            <HotColumn
              data="UNIDAD REQUIRENTE"
              title="UNIDAD REQUIRENTE"
              width={150}
            />
            <HotColumn data="CANTIDAD" title="CANTIDAD" width={100} />
            <HotColumn
              data="TIPO LICITACION"
              title="TIPO LICITACION"
              width={150}
            />
            <HotColumn data="ESTADO" title="ESTADO" width={100} />
            <HotColumn data="SUBESTADO" title="SUBESTADO" width={100} />
            <HotColumn data="MONEDA" title="MONEDA" width={100} />
            <HotColumn
              data="ITEM PRESUPUESTARIO"
              title="Presupuesto"
              width={100}
            />
          </HotTable>
        )}
      </div>
    </div>
  );
}

export default Table;
