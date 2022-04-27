import axios from 'axios'

import { createContext,useContext,useEffect,useReducer } from "react";
import { AppReducer, InitialState } from "./AppReducer";

const AppContext = createContext()

export const AppProvider =props =>{

    const [state,dispatch] = useReducer(AppReducer,InitialState)

    /////////////////////// funciones state ///////////////////

    const setCasoBd = (bd)=>{
        dispatch({type:'GUARDAR-BD',payload:bd})
    }


    ///////////////////// funciones //////////////////////

    useEffect(()=>{

        const obtenerBd = async()=>{
            try {
                const endPoint = "http://192.168.100.7:4000/api/admin/bd"
                const {data} = await axios(endPoint)
                setCasoBd(data)
            } catch (error) {
                console.log(error)
            }
        }

        obtenerBd()

    },[])

    const cargarBDAppfn = async(bd)=>{
        const endPoint = "http://192.168.100.7:4000/api/admin/bd/add"

        try {
            const {data} = await axios.post(endPoint,bd)
            setCasoBd(data)
        } catch (error) {
            console.log(error)
        }

    }


    ///////////////////// the return ///////////////////////
    return (
        <AppContext.Provider
            value={{

                casoBd:state.casoBd,

                cargarBDAppfn:cargarBDAppfn

            }}
        >
            {props.children}
        </AppContext.Provider>
    )

}


export const useAppProvider=()=>{
    return useContext(AppContext)
}