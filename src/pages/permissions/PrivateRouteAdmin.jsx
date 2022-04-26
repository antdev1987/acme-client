import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouteAdmin = () => {

  const user = {name:'manuel',role:'admin'}


  return (
    
    <>

    {user.role === 'admin' ?(
        <Outlet />
    ):<Navigate to='/busqueda'/>}
    
    </>



  )
}

export default PrivateRouteAdmin