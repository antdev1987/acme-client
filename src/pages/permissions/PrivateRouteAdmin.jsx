import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/userContext/UserProvider'

const PrivateRouteAdmin = () => {

  const {user} = useAuth()

  //const user = {name:'manuel',role:'admin'}


  return (
    
    <>

    {user.role === 'admin' ?(
        <Outlet />
    ):<Navigate to='/busqueda'/>}
    
    </>



  )
}

export default PrivateRouteAdmin