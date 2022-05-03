import React, { useState } from 'react'

const Form = () => {

    const [inputs,setInputs] = useState({})

    const handleChange =(e)=>{

        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }

    console.log(inputs)


  return (
    <form className="w-50 m-auto border border-4 p-3">

    <div className="mb-3">
      <label htmlFor="nCaso" className="form-label">
        Numero de Caso
      </label>
      <input type="text" name='nCaso' onChange={handleChange} className="form-control" id="nCaso" />
    </div>


    {/*  */}
    <div className="mb-3">
        <h3> Plazo de entrega Estimado</h3>
      <div className="row g-3">
        <div className="mb-3 col-6">
          <input type="text" name='plazoEntrega' onChange={handleChange} className="form-control" id="plazoEntrega1" />
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
      <input type="text" className="form-control" name='utm' onChange={handleChange} id="utm" />
    </div>


    <div className="mb-3 col-4">
      <label htmlFor="cDesgloze" className="form-label">
       Cantidad Desgloze
      </label>
      <input type="text" name='cantidadDesgloze' onChange={handleChange} className="form-control" id="cDesgloze" />
    </div>

    <div className="col-4">
       <label>Art 12</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="art12"
              value='aplica'
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

    <div className="row g-5">


    <div className="mb-3 col-5">
      <label htmlFor="fechacompra" className="form-label">
       Fecha estimada orden de compra
      </label>
      <input type="Date" name='fechaOrdenCompra' onChange={handleChange} className="form-control" id="fechacompra" />
    </div>


    <div className="mb-3 col-5">
      <label htmlFor="fechaentrega" className="form-label">
       Fecha estimada de entrega
      </label>
      <input type="Date" name='fechaEntrega' onChange={handleChange} className="form-control" id="fechaentrega" />
    </div>

    </div>

    <button className="btn btn-primary">Submit</button>

  </form>
  )
}

export default Form