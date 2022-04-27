export const InitialState ={
    casoBd:[]
}

export const AppReducer =(state,action)=>{
    switch(action.type){
        case 'GUARDAR-BD':{
            return{
                ...state,
                casoBd: [...action.payload]
            }
        }
        default:{
            return{...state}
        }
    }
}