import React, { useState } from 'react';

import * as XLSX from 'xlsx';

import { useAppProvider } from '../context/appContext/AppProvider';

import LoadingOverlay from 'react-loading-overlay';

import Table from '../components/Table/Table';

import Style from '../style/busqueda.module.css';

LoadingOverlay.propTypes = undefined;

const ar = {};
let obj;
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
  const { casoBd, isLoadingAppProvider, extraInfoBd } = useAppProvider();

  const save = (e) => {
    clearObj();
    ar[e.target.name] = e.target.value;
  };

  console.log('pagina busqueda');

  const buscar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearObj();

    setTimeout(() => {
      setInput(_.filter(casoBd, { ...ar }));
      setIsLoading(false);
    }, 0);
  };

  const CleanUna = (e) => {
    const { name, value } = e.target;

    if (name === 'NOMBRE') {
      setSearchInput({ ['N° CASO']: '', NOMBRE: value, ID: '' });
    } else if (name === 'ID') {
      setSearchInput({ ['N° CASO']: '', NOMBRE: '', ID: value });
    } else {
      setSearchInput({ ['N° CASO']: value, NOMBRE: '', ID: '' });
    }
  };

  const buscarUna = (e) => {
    e.preventDefault();
    let name;
    let value;

    if (searchInput.ID === '' && searchInput.NOMBRE === '') {
      name = 'N° CASO';
      value = searchInput['N° CASO'];
    } else if (searchInput['N° CASO'] === '' && searchInput.ID === '') {
      name = 'NOMBRE';
      value = searchInput.NOMBRE;
    } else {
      name = 'ID';
      value = searchInput.ID;
    }

    const filter = casoBd.filter((item) => {
      return item[name].includes(value);
    });
    setInput(filter);
  };

  const handleExport = (e) => {
    e.preventDefault();

    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(input);

    XLSX.utils.book_append_sheet(wb, ws, 'test');
    XLSX.writeFile(wb, 'MyExcel.xlsx');
  };

  const especial = (e) => {
    obj = e.target.value;
  };

  const busquedaEspecial = (e) => {
    e.preventDefault();

    const filter = casoBd.filter((item) => {
      return item[obj]?.includes('SI');
    });
    setInput(filter);
  };

  return (
    <LoadingOverlay
      className="w-100"
      active={isLoadingAppProvider || isLoading}
      spinner
      styles={{
        zIndex: '100',
      }}
      text="Loading your content..."
    >
      <div className="w-75 m-auto ">
        <p>{input.length === 0 ? casoBd.length : input.length}</p>

        <p>La ultima actualizacion fue el {extraInfoBd.fechaHoraInfo}</p>
      </div>

      <div className="w-75 m-auto bg-light p-3 shadow">
        <form className="border">
          <h2>Busqueda Combinada</h2>
          <div
            className={`form-box gap-3 d-flex flex-grow-1 flex-wrap ${Style.formBoxd}`}
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

          <button className="btn btn-primary mt-2" onClick={buscar}>
            buscar
          </button>
        </form>

        <form className="border mt-5 mb-5">
          <h2>Busqueda Especial</h2>
          <div>
            <select name="" id="" onChange={especial}>
              <option value="">Todas</option>
              <option value="PAC">PAC</option>
              <option value="CONTRALORIA">CONTRALORIA</option>
            </select>
          </div>

          <button className="btn btn-primary mt-2" onClick={busquedaEspecial}>
            buscar
          </button>
        </form>

        <form className="border">
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
                onChange={CleanUna}
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
                onChange={CleanUna}
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
                onChange={CleanUna}
              />
            </div>

            <button onClick={buscarUna} className="btn btn-primary mt-2">
              Buscar
            </button>
          </div>
        </form>
      </div>

      <div className="w-75 m-auto mt-5 mb-3">
        <button className="btn btn-info" onClick={handleExport}>
          Exportar tabla en excel
        </button>
      </div>

      {casoBd && <Table casoBd={casoBd} input={input} />}
    </LoadingOverlay>
  );
};

export default Busqueda;
