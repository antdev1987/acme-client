import axios from 'axios'

import { createContext,useContext,useEffect,useReducer,useState } from "react";
import { AppReducer, InitialState } from "./AppReducer";
import { useAuth } from '../userContext/UserProvider'

import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const AppContext = createContext()

export const AppProvider =props =>{

    const [state,dispatch] = useReducer(AppReducer,InitialState)
    const {user,setUser} = useAuth()
    const [isLoadingAppProvider,setIsLoadingAppProvider] = useState(false)

    /////////////////////// funciones state ///////////////////

    const setCasoBd = (bd)=>{
        dispatch({type:'GUARDAR-BD',payload:bd})
    }


    const setUserBd = (userBd)=>{
        dispatch({type:'GUARDAR-USERBD',payload:userBd})
    }


    const setOneUserBd = (oneUserBd)=>{
        dispatch({type:'UPDATE-ONE-USER',payload:oneUserBd})
    } 

    const setExtraInfoBd=(dataBd)=>{
        dispatch({type:'VER-EXTRAINFOBD',payload:dataBd})
    }

    const updatingLocaluserBd = (id)=>{
        console.log(typeof id)
        dispatch({type:'DELETE-LOCAL-USER',payload:id})
    }
    ///////////////////// funciones //////////////////////

    //este carga la base de datos de busqueda
    useEffect(()=>{

        const obtenerBd = async()=>{

            setIsLoadingAppProvider(true)

            const token = JSON.parse(localStorage.getItem('uid'))    
            if(!token){
                setIsLoadingAppProvider(false)
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
                setIsLoadingAppProvider(false)
                setCasoBd(data)
            } catch (error) {
                setIsLoadingAppProvider(false)
                console.log(error.response.data)
            }
        }

        obtenerBd()

    },[user])


    //ESTE LEE LA FECHA DE ACTUALIZACION
    useEffect(()=>{
        const obtenerExtraInfo = async()=>{
            const token =JSON.parse(localStorage.getItem('uid'))
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
                const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/extraInfo/ver`
                const {data} = await axios(endPoint,config)
                console.log(data)
                setExtraInfoBd(data)
            } catch (error) {
                console.log(error.response)
            }
        }

        obtenerExtraInfo()
    },[])


    //este crear la fecha de actualizar que se ve en bunsqueda
    const updateExtraInfoAppfn = async(bd)=>{
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
            const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/extraInfo/add`
            const {data} = await axios.post(endPoint,bd,config)
            
        } catch (error) {
            console.log(error)
        }

    }


    //ESTE GUARDA EL EXCEL A LA BASE DE DATOS
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


    ///////////////////////////////////////// creating a user //////////////////
    const createNewUserAppfn = async(userData)=>{

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

            const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/user/add`
            const {data}= await axios.post(endPoint,userData,config)

            console.log(data)
            setOneUserBd(data)
            
        } catch (error) {
            console.log(error.response.data.msg)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                html:`<h3> ${error.response.data.msg}</h3>`
              })
            
        }
    }

    /////////////////////////////// deleting a user ///////////////////////////////
    const deleteNewUserAppfn = async(id)=>{
        console.log(id)
        const token = JSON.parse(localStorage.getItem('uid'))
        if(!token){
            setUser('')
            return
        }
        const config = {
            headers:{
                Authorization:`Bearer ${token.token}`
            }
        }
        try {
            const endPoint = `${import.meta.env.VITE_BASE_URL}/admin/user/remove/${id}`
            const {data} = await axios.delete(endPoint,config)
            updatingLocaluserBd(id)
            console.log(data)

        } catch (error) {
            console.log(error.response)
        }
    }


    ///////////////////// the return ///////////////////////
    return (
        <AppContext.Provider
            value={{

                casoBd:state.casoBd,
                userBd:state.userBd,
                isLoadingAppProvider,
                extraInfoBd:state.extraInfoBd,

                setCasoBd:setCasoBd,
                setUserBd,
                cargarBDAppfn:cargarBDAppfn,
                deleteBDAppfn:deleteBDAppfn,
                createNewUserAppfn,
                deleteNewUserAppfn,
                updateExtraInfoAppfn

            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}


export const useAppProvider=()=>{
    return useContext(AppContext)
}