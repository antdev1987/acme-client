export const InitialState ={
    casoBd:[],
    userBd:[]
}

export const AppReducer =(state,action)=>{
    switch(action.type){


        case 'GUARDAR-BD':{
            return{
                ...state,
                casoBd: [...action.payload]
            }
        }


        case 'GUARDAR-USERBD':{
            return {
                ...state,
                userBd:[...action.payload]
            }
        }

        case 'UPDATE-ONE-USER':{
            return {
                ...state,
                userBd:[...state.userBd,action.payload]
            }
        }

        default:{
            return{...state}
        }
    }
}