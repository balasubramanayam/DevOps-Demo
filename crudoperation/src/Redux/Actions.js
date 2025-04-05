import {ActionTypes} from './ActionTypes'

export const getAll =(data)=>{
    return{
       type:ActionTypes.GETALL,
       payload:data
    }
}