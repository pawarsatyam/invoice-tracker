import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  success: false,
  success_message: undefined,
  error: undefined,
  data: [],  
}

const farmers = (state=initialState,action) => {

  switch(action.type){
    case actionTypes.GET_REQUEST_SUCCESS: 
      return {...state,loading: true, error: undefined};
    case actionTypes.GET_RESPONSE_ERROR:
      return{...state, loading: false, error: action.payload.response.data.message} 
    case actionTypes.GET_ALL_INVOICES:
      return {...state,loading: false, invoices: action.payload.response}
    case actionTypes.CREATE_INVOICE:
      return {...state, loading: false, success: true,success_message: "Successfully created"}
    case actionTypes.UPDATE_INVOICE:
      return {...state, loading: false, success: true,success_message: "Successfully updated"}
    case actionTypes.REMOVE_INVOICE:
      return {...state, loading: false, success: true,success_message: "Successfully removed", invoices:  action.payload.obj.state.data.filter((item) => item.id != action.payload.response.id)}
    case actionTypes.GET_INVOICE:
      return {...state, loading: false, success: true, invoice: action.payload.response}
    default: 
      return {...state, loading: false} 
  }  
}

export default farmers

