import React, { useState } from 'react';

import { useAppProvider } from '../context/appContext/AppProvider';

import LoadingOverlay from 'react-loading-overlay';

import Table from '../components/Table/Table';

import Style from '../style/busqueda.module.css';
import { Accordion } from 'react-bootstrap';

LoadingOverlay.propTypes = undefined;

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

const Busqueda = () => {
  const [input, setInput] = useState([]);
  const [busquedaUnica, setBusquedaUnica] = useState({});
  const [multiple, setMultiple] = useState({});
  const [searchInput, setSearchInput] = useState({
    NOMBRE: '',
    ID: '',
    ['N° CASO']: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { casoBd, isLoadingAppProvider, extraInfoBd } = useAppProvider();

  const save = (e) => {
    clearObj();
    setMultiple({ [e.target.name]: e.target.value, ...multiple });
  };

  const clearObj = () => {
    for (const item in multiple) {
      if (multiple[item] === '') {
        delete multiple[item];
      }
    }
  };

  console.log('pagina busqueda');

  const buscar = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearObj();

    setTimeout(() => {
      setInput(_.filter(casoBd, { ...multiple }));
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

  const especial = (e) => {
    setBusquedaUnica(e.target.value);
  };

  const busquedaEspecial = (e) => {
    e.preventDefault();

    const filter = casoBd.filter((item) => {
      return item[busquedaUnica]?.includes('SI');
    });
    setInput(filter);
  };

  const porUnaClear = (e) => {
    e.preventDefault();
    setSearchInput({ ['N° CASO']: '', NOMBRE: '', ID: '' });
  };

  const limpiarBuscar = (e) => {
    e.preventDefault();
    setMultiple({
      ['UNIDAD REQUIRENTE']: '',
      ['TIPO LICITACION']: '',
      AÑO: '',
      ESTADO: '',
    });
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
      <div
        className="m-auto p-3 shadow  mb-5 fs-13"
        style={{ maxWidth: '1300px' }}
      >
        <p>{input.length === 0 ? casoBd.length : input.length}</p>

        <p className='text-danger border d-inline-block border-3 p-2'>La ultima actualizacion fue el {extraInfoBd.fechaHoraInfo}</p>

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Busqueda Combinada</Accordion.Header>
            <Accordion.Body>
              <form className="border p-2">
                <h4>Busqueda Combinada</h4>
                <div
                  className={`form-box gap-3 d-flex flex-grow-1 flex-wrap ${Style.formBoxd}`}
                >
                  {searches.map((item, idx) => (
                    <div key={idx}>
                      <label htmlFor="#" className="d-block">
                        {item.title}
                      </label>
                      <select
                        value={multiple[item.title]}
                        name={item.title}
                        onChange={save}
                        className="w-100"
                      >
                        <option>{item.defaultOption}</option>

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
                <button
                  className="btn btn-secondary mt-2"
                  onClick={limpiarBuscar}
                >
                  Limpiar Todo
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Busqueda Especial</Accordion.Header>
            <Accordion.Body>
              <form className={`${Style.formBoxd} border mt-2 mb-2 p-2`}>
                <h4>Busqueda Especial</h4>
                <div>
                  <select value={busquedaUnica} onChange={especial}>
                    <option>Todas</option>
                    <option value="PAC">PAC</option>
                    <option value="CONTRALORIA">CONTRALORIA</option>
                  </select>
                </div>

                <button
                  className="btn btn-primary mt-2"
                  onClick={busquedaEspecial}
                >
                  buscar
                </button>
              </form>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>Busqueda Por Una</Accordion.Header>
            <Accordion.Body>
              <form className={`${Style.formBoxd} border p-2`}>
                <h4>Busqueda por una</h4>

                <div
                  className={`form-box d-flex flex-grow-1 flex-wrap gap-3 ${Style.formBoxd}`}
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
                </div>
                <div>
                  <button onClick={buscarUna} className="btn btn-primary mt-2">
                    Buscar
                  </button>

                  <button
                    className="btn btn-secondary mt-2"
                    onClick={porUnaClear}
                  >
                    Limpiar Todo
                  </button>
                </div>
              </form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {casoBd && <Table casoBd={casoBd} input={input} />}
    </LoadingOverlay>
  );
};

export default Busqueda;
