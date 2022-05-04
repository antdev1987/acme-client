import React, { useState } from 'react'
import { useAppProvider } from '../../context/appContext/AppProvider'



const initialV = {
  art12: "",
cantidadDesgloze: "",
fechaEntrega: "",
fechaOrdenCompra: "",
nCaso: "",
observacionFecha: "",
plazoCantidad: "",
plazoDias: "",
utm: ""
}

const Form = () => {

    const [inputs,setInputs] = useState(initialV)

    const {mantencionAddAppfn} = useAppProvider()

    const handleChange =(e)=>{

        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }

    console.log(inputs)

    const handleSubmit =(e)=>{
      e.preventDefault()


      const dbMantencion ={
        art12: inputs.art12,
        cantidadDesgloze: inputs.cantidadDesgloze,
        fechaEntrega: inputs.fechaEntrega,
        fechaOrdenCompra: inputs.fechaOrdenCompra,
        nCaso: inputs.nCaso,
        observacionFecha: inputs.observacionFecha,
        plazoEntrega:`${inputs.plazoCantidad} ${inputs.plazoDias}`,
        // plazoCantidad: "df",
        // plazoDias: "dias corridos",
        utm: inputs.utm

      }

      console.log(dbMantencion)
      
      mantencionAddAppfn(dbMantencion)
      setInputs(initialV)
    }

  return (
    <form onSubmit={handleSubmit} className="w-50 m-auto border border-4 p-3 shadow">

    <div className="mb-3">
      <label htmlFor="nCaso" className="form-label">
        Numero de Caso
      </label>
      <input type="text" value={inputs.nCaso} name='nCaso' onChange={handleChange} className="form-control" id="nCaso" />
    </div>

    <div className="mb-3 col-4">
      <label htmlFor="observacionFecha" className="form-label">
       Obeservaciones a fecha
      </label>
      <input type="text" className="form-control" value={inputs.observacionFecha} name='observacionFecha' onChange={handleChange} id="utm" />
    </div>


    {/*  */}
    <div className="mb-3">
        <h3 className='text-center'> Plazo de entrega Estimado</h3>
      <div className="row g-3">
        <div className="mb-3 col-4">
          <input type="text" value={inputs.plazoCantidad} name='plazoCantidad' onChange={handleChange} className="form-control" id="plazoEntrega1" />
        </div>

        <div className="col-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="plazoDias"
              onChange={handleChange}
              id="flexRadioDefault1"
              value='dias corridos'
              checked={inputs.plazoDias === 'dias corridos'}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Dias Corridos
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="plazoDias"
              value='dias habiles'
              checked={inputs.plazoDias === 'dias habiles'}
              onChange={handleChange}
              id="flexRadioDefault2"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Dias Habiles
            </label>
          </div>
        </div>
      </div>
    </div>


    {/*  */}
    <div className="row g-3 mb-3">

    <div className="mb-3 col-4">
      <label htmlFor="utm" className="form-label">
       UTM
      </label>
      <input type="text" className="form-control" value={inputs.utm} name='utm' onChange={handleChange} id="utm" />
    </div>


    <div className="mb-3 col-4">
      <label htmlFor="cDesgloze" className="form-label">
       Cantidad Desgloze
      </label>
      <input type="text" value={inputs.cantidadDesgloze} name='cantidadDesgloze' onChange={handleChange} className="form-control" id="cDesgloze" />
    </div>

    <div className="col-4">
       <label>Art 12</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="art12"
              value='aplica'
              checked={inputs.art12 === 'aplica'}
              onChange={handleChange}
              id="art1"
              
            />
            <label className="form-check-label" htmlFor="art1">
             Aplica
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="art12"
              checked={inputs.art12 === 'no aplica'}
              value='no aplica'
              onChange={handleChange}
              id="art2"
            />
            <label className="form-check-label" htmlFor="art2">
             No Aplica
            </label>
          </div>
        </div>
    </div>



    {/*  */}

    <div className="row g-3">


    <div className="mb-3 col-5">
      <label htmlFor="fechacompra" className="form-label">
       Fecha est. orden de compra
      </label>
      <input type="Date" value={inputs.fechaOrdenCompra} name='fechaOrdenCompra' onChange={handleChange} className="form-control" id="fechacompra" />
    </div>


    <div className="mb-3 col-5">
      <label htmlFor="fechaentrega" className="form-label">
       Fecha estimada de entrega
      </label>
      <input type="Date" value={inputs.fechaEntrega} name='fechaEntrega' onChange={handleChange} className="form-control" id="fechaentrega" />
    </div>

    </div>

    <button className="btn btn-primary">Submit</button>

  </form>
  )
}

export default Form