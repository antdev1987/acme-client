import React, { useState } from 'react'
import { useAuth } from '../context/appContext/userContext/UserProvider'

const initialValues ={
  userName:'',
  password:''
}

const Login = () => {

  const [inputs,setInputs]= useState(initialValues)
  const {loginUserfn} = useAuth()
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    loginUserfn(inputs)
  }

  const handleInputs=(e)=>{

    setInputs({
      ...inputs,
      [e.target.name]:e.target.value
    })

  }

  


  return (

    <form className='w-50 m-auto mt-5' onSubmit={handleSubmit}>

    <div className="mb-3">
      <label htmlFor="userName" className="form-label">User Name</label>
      <input type="text" name='userName'  className="form-control" id="userName" onChange={handleInputs}/>
    </div>

    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" name='password' className="form-control" onChange={handleInputs} id="exampleInputPassword1"/>
    </div>
  
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  )
}

export default Login