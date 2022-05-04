import React from 'react';

import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { registerLanguageDictionary, esMX } from 'handsontable/i18n';
import 'handsontable/dist/handsontable.full.css';

// ejecutar para obtener todas las funciones de handsontable
registerAllModules();
registerLanguageDictionary(esMX);

function Table(props) {
  const [usuarios, setUsuarios] = React.useState([]);

  const hotTableComponent = React.useRef(null);

  const descargarArchivo = () => {
    const pluginDescarga =
      hotTableComponent.current.hotInstance.getPlugin('exportFile');

    pluginDescarga.downloadFile('csv', {
      filename: 'usuarios',
      fileExtension: 'csv',
      mimeType: 'text/csv',
      columnHeaders: true,
    });
  };

  return (
    <div className='container-sm'>
      <h2>Hola, gente</h2>
      <button onClick={() => descargarArchivo()}>Descargar Archivo</button>
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
          contextMenu={['row_above', 'row_below']}
          readOnly={false}
          manualColumnResize={true}
          width={"40px"}
        >
          <HotColumn data="AÑO" title="AÑO" />
          <HotColumn data="ID" title="ID" readOnly={true} />
          <HotColumn data="NOMBRE" title="Nombre" />
          <HotColumn data="UNIDAD REQUIRENTE" title="UNIDAD REQUIRENTE" />
          <HotColumn data="CANTIDAD" title="CANTIDAD" />
          <HotColumn data="TIPO LICITACION" title="TIPO LICITACION" />
          <HotColumn data="ESTADO" title="ESTADO" />
          <HotColumn data="SUBESTADO" title='SUBESTADO' />
          <HotColumn data="MONEDA" title='MONEDA' />
          <HotColumn data="ITEM PRESUPUESTARIO" title='Presupuesto' />
        </HotTable>
      )}
    </div>
  );
}

export default Table;
