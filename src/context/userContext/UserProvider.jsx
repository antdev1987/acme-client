import axios from 'axios'
import {createContext,useContext,useState,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const UserContext = createContext()

export const UserProvider = props=>{
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('uid')) || '')
  
    const navigate = useNavigate()

    const loginUserfn =async(userData)=>{

        try {

            const endPoint = `${import.meta.env.VITE_BASE_URL}/user/login`
            const {data}= await axios.post(endPoint,userData)
            Swal.fire({
                icon: 'success',
                title: 'Espera...',
                text: 'Usuario autenticado',
              })
            console.log(data)
            localStorage.setItem('uid', JSON.stringify(data));
            setUser(data)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg,
              })
        }
    }

    const logoutUserfn =()=>{
        localStorage.clear()
        setUser('')
        navigate('/')
    }

    return(
        <UserContext.Provider
            value={{

                user,

                setUser,
                loginUserfn,
                logoutUserfn

            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export const useAuth =()=>{
    return useContext(UserContext)
}