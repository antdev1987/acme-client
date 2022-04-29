import axios from 'axios'
import {createContext,useContext,useState,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'

const UserContext = createContext()

export const UserProvider = props=>{
    const [user,setUser]= useState(JSON.parse(localStorage.getItem('uid')) || '')
    const navigate = useNavigate()

    const loginUserfn =async(userData)=>{

        try {

            const endPoint = `${import.meta.env.VITE_BASE_URL}/user/login`
            const {data}= await axios.post(endPoint,userData)
            console.log(data)
            localStorage.setItem('uid', JSON.stringify(data));
            setUser(data)
        } catch (error) {
            console.log(error.response)
            console.log(error)
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