import axios from 'axios'

import { createContext,useContext,useEffect,useReducer } from "react";
import { AppReducer, InitialState } from "./AppReducer";
import { useAuth } from './userContext/UserProvider';

const AppContext = createContext()

export const AppProvider =props =>{

    const [state,dispatch] = useReducer(AppReducer,InitialState)
    const {user,setUser} = useAuth()

    /////////////////////// funciones state ///////////////////

    const setCasoBd = (bd)=>{
        dispatch({type:'GUARDAR-BD',payload:bd})
    }


    ///////////////////// funciones //////////////////////

    useEffect(()=>{

        const obtenerBd = async()=>{

            const token = JSON.parse(localStorage.getItem('uid'))    
            if(!token){
                return
            }
            const config = {
                headers:{
                    Authorization: `Bearer ${token.token}` 
                }
            }

            console.log('cargando la base de datos')
            try {
                const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/bd`
                const {data} = await axios(endPoint,config)
                setCasoBd(data)
            } catch (error) {
                console.log(error.response.data)
            }
        }

        obtenerBd()

    },[user])

    const cargarBDAppfn = async(bd,setIsLoading)=>{


        const token = JSON.parse(localStorage.getItem('uid'))
        if(!token){
            setUser('')
            return
        }
        const config = {
            headers:{
                Authorization: `Bearer ${token.token}` 
            }
        }
        try {
            const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/bd/add`
            const {data} = await axios.post(endPoint,bd,config)
            setCasoBd(data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const deleteBDAppfn = async()=>{
        const token = JSON.parse(localStorage.getItem('uid'))    
        if(!token){
            setUser('')
            return
        }
        const config = {
            headers:{
                Authorization: `Bearer ${token.token}` 
            }
        }
        
        try {
            
            const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/bd/remove`
            const {data}= await axios.delete(endPoint,config)
            console.log('eliminar',data)
            setCasoBd([])
            
        } catch (error) {
            console.log(error.response.data)
        }
    }


    ///////////////////// the return ///////////////////////
    return (
        <AppContext.Provider
            value={{

                casoBd:state.casoBd,

                cargarBDAppfn:cargarBDAppfn,
                deleteBDAppfn:deleteBDAppfn

            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}


export const useAppProvider=()=>{
    return useContext(AppContext)
}