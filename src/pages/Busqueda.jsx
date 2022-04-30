import React, { useState } from 'react';

import * as XLSX from 'xlsx';

import { useAppProvider } from '../context/appContext/AppProvider';

import LoadingOverlay from 'react-loading-overlay';
import Table from '../components/Table/Table';

LoadingOverlay.propTypes = undefined;

const ar = {};

const clearObj = () => {
  for (const item in ar) {
    if (ar[item] === '') {
      delete ar[item];
    }
  }
};

const Busqueda = () => {
  const { casoBd, isLoadingAppProvider } = useAppProvider();
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

  console.log('pagina busqueda');

  const handleExport = (e) => {
    e.preventDefault();

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(input);

    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, 'MyExcel.xlsx');
  };

  return (
    <LoadingOverlay
      className="w-100 vh-100"
      active={isLoadingAppProvider}
      spinner
      text="Loading your content..."
    >
      <p>{input.length === 0 ? casoBd.length : input.length}</p>

      <form onSubmit={buscar}>
        <div>
          <input
            type="text"
            name="NOMBRE"
            onChange={save}
            placeholder="Nombre"
          />
        </div>

        <input type="text" name="ID" onChange={save} placeholder="id" />

        <div>
          <input
            type="text"
            name="ESTADO"
            onChange={save}
            placeholder="estado"
          />
        </div>

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
          placeholder="ITEM PRESUPUESTARIO"
          onChange={save}
        />
        <button type="submit">buscar</button>
      </form>

      <button onClick={handleExport}>Export</button>

      <Table casoBd={casoBd} input={input} />
    </LoadingOverlay>
  );
};

export default Busqueda;
