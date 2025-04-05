import { ActionTypes } from "./ActionTypes";

const initialstate={
      Data:[]
}

export const getAllReducer=(state=initialstate,action)=>{
       switch(action.type){
           case ActionTypes.GETALL:
            return{
                ...state,
                Data:action.payload,
            }
           default :
            return state;
       }
}



