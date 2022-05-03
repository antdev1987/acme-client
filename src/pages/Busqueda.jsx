import React, { useState } from 'react';

import * as XLSX from 'xlsx';

import { useAppProvider } from '../context/appContext/AppProvider';

import LoadingOverlay from 'react-loading-overlay';

import Table from '../components/Table/Table';

import Style from '../style/busqueda.module.css';

LoadingOverlay.propTypes = undefined;

const ar = {};
const searches = [
  {
    title: 'UNIDAD REQUIRENTE',
    defaultOption: 'Todas las unidades',
    optinos: [
      { option: 'unidad 1' },
      { option: 'unidad 2' },
      { option: 'unidad 3' },
      { option: 'unidad 4' },
      { option: 'unidad 5' },
    ],
  },

  {
    title: 'TIPO LICITACION',
    defaultOption: 'Todas las licitaciones',
    optinos: [
      { option: 'LICITACIÓN PÚBLICA' },
      { option: 'LICITACIÓN PRIVADA' },
      { option: 'GRAN COMPRA' },
      { option: 'CONVENIO MARCO' },
      { option: 'COMPRA ÁGIL' },
      { option: 'TRATO DIRECTO' },
    ],
  },

  {
    title: 'AÑO',
    defaultOption: 'Todos los AÑOs',
    optinos: [{ option: '2022' }, { option: '2021' }, { option: '2020' }],
  },

  {
    title: 'ESTADO',
    defaultOption: 'Todos los estados',
    optinos: [
      { option: 'PREPARACIÓN' },
      { option: 'BASES Y ANEXOS' },
      { option: 'GESTION PORTAL' },
      { option: 'EVALUACIÓN' },
      { option: 'ADJUDICACIÓN/DESERCIÓN' },
      { option: 'CONTRATO' },
      { option: 'ORDEN DE COMPRA' },
      { option: 'DERIVADO A DEPTO. CONTRATOS' },
      { option: 'TERMINADO' },
    ],
  },
];

const clearObj = () => {
  for (const item in ar) {
    if (ar[item] === '') {
      delete ar[item];
    }
  }
};

const Busqueda = () => {
  const [input, setInput] = useState([]);
  const [searchInput, setSearchInput] = useState({
    NOMBRE: '',
    ID: '',
    ['N° CASO']: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { casoBd, isLoadingAppProvider } = useAppProvider();

  console.log(casoBd);

  const save = (e) => {
    clearObj();
    ar[e.target.name] = e.target.value;
  };

  const buscar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearObj();

    setTimeout(() => {
      setInput(_.filter(casoBd, { ...ar }));
      setIsLoading(false);
    }, 0);
  };

  const busquedaUna = (e) => {
    const { name, value } = e.target;

    if (name === 'NOMBRE') {
      setSearchInput({ ['N° CASO']: '', NOMBRE: value, ID: '' });
    } else if (name === 'ID') {
      setSearchInput({ ['N° CASO']: '', NOMBRE: '', ID: value });
    } else {
      setSearchInput({ ['N° CASO']: value, NOMBRE: '', ID: '' });
    }

    const filter = casoBd.filter((item) => {
      return item[name].includes(value);
    });
    setInput(filter);
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
      active={isLoadingAppProvider || isLoading}
      spinner
      styles={{
        zIndex: '100',
      }}
      text="Loading your content..."
    >
      <p>{input.length === 0 ? casoBd.length : input.length}</p>

      <div className="w-75 m-auto bg-light p-3 shadow">
        <form onSubmit={buscar}>
          <h2>Busqueda Combinada</h2>
          <div
            className={`form-box d-flex flex-grow-1 flex-wrap ${Style.formBoxd}`}
          >
            {searches.map((item, idx) => (
              <div className="border" key={idx}>
                <label htmlFor="#" className="d-block">
                  {item.title}
                </label>
                <select name={item.title} onChange={save} className="w-100">
                  <option value="">{item.defaultOption}</option>

                  {item.optinos.map((item, idx) => (
                    <option key={idx} value={item.option}>
                      {item.option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <button className="btn btn-primary" type="submit">
            buscar
          </button>
        </form>

        <form>
          <h2>Busqueda por una</h2>

          <div
            className={`form-box d-flex flex-grow-1 flex-wrap ${Style.formBoxd}`}
          >
            <div>
              <label htmlFor="#" className="d-block">
                Palabra Clave
              </label>
              <input
                type="text"
                value={searchInput.NOMBRE}
                name="NOMBRE"
                onChange={busquedaUna}
              />
            </div>

            <div>
              <label htmlFor="#" className="d-block">
                Palabra iD
              </label>
              <input
                type="text"
                value={searchInput.ID}
                name="ID"
                onChange={busquedaUna}
              />
            </div>

            <div>
              <label htmlFor="#" className="d-block">
                caso
              </label>
              <input
                type="text"
                value={searchInput['N° CASO']}
                name="N° CASO"
                onChange={busquedaUna}
              />
            </div>
          </div>
        </form>
      </div>

      <button className="btn btn-info" onClick={handleExport}>
        Export
      </button>

      <Table casoBd={casoBd} input={input} />
    </LoadingOverlay>
  );
};

export default Busqueda;
