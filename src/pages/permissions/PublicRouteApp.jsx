import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/userContext/UserProvider'


const PublicRouteApp = () => {

  const {user} = useAuth()

  return (
    
    <>

    {!user.role ?(
        <Outlet />
    ):<Navigate to='/busqueda' replace/>}
    
    </>



  )
}

export default PublicRouteApp