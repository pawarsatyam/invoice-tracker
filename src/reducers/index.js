import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import invoices from './invoices';


export default combineReducers({
  invoices: invoices,
  router: routerReducer
})

