import axios from 'axios'

import { createContext,useContext,useReducer } from "react";
import { AppReducer, InitialState } from "./AppReducer";

const AppContext = createContext()

export const AppProvider =props =>{

    const [state,dispatch] = useReducer(AppReducer,InitialState)


    ///////////////////// funciones //////////////////////

    const cargarBDAppfn = async(bd)=>{
        //console.log(casos,acciones)

      console.log(bd)

        const endPoint = "http://192.168.100.7:4000/api/admin/bd/add"

        try {
            const {data} = await axios.post(endPoint,bd)
            console.log(data)
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