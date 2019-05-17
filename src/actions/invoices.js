import * as actionTypes from './actionTypes'
import { appConstants } from '../constants/constants';
import axios from 'axios';
import _ from 'lodash'



export function getRequest(){
	return {
		type:  actionTypes.GET_REQUEST_SUCCESS,
		payload: {}
	}
}

// Get all invoices
export function getAllInvoicesSuccess(response){
  return {
      type: actionTypes.GET_ALL_INVOICES,
      payload: {
          response,
      }
  }
}
export function getAllInvoices() {
  return function (dispatch) {
    dispatch(getRequest())
    axios.get(`${appConstants.WEB_SERVICE_URL}/api/v1/invoices`)
    .then(response => {
        dispatch(getAllInvoicesSuccess(response.data.invoices))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}

// Get all invoices
export function getInvoiceSuccess(response){
  return {
      type: actionTypes.GET_INVOICE,
      payload: {
          response,
      }
  }
}
export function getInvoice(id) {
  return function (dispatch) {
    dispatch(getRequest())
    axios.get(`${appConstants.WEB_SERVICE_URL}/api/v1/invoices/${id}`)
    .then(response => {
        dispatch(getInvoiceSuccess(response.data.invoice))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}


// create invoices
export function createInvoiceSuccess(response){
  return {
      type: actionTypes.CREATE_INVOICE,
      payload: {
          response,
      }
  }
}

export function createInvoice(_this, data) {
  debugger
  return function (dispatch) {
    const _that = _this
    dispatch(getRequest())
    axios.post(`${appConstants.WEB_SERVICE_URL}/api/v1/invoices`,{'invoices': data})
    .then(response => {
        _that.props.history.push('/invoices')
        dispatch(createInvoiceSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error))
      });
  };
}


// update invoices

export function updateInvoiceSuccess(response){
  return {
      type: actionTypes.UPDATE_INVOICE,
      payload: {
          response,
      }
  }
}

export function updateInvoice(_this,id,data) {
  return function (dispatch) {
    const _that = _this
    dispatch(getRequest())
    axios.patch(`${appConstants.WEB_SERVICE_URL}/api/v1/invoices/${id}`,{'invoices': data})
    .then(response => {
        _that.props.history.push('/invoices')
        dispatch(updateInvoiceSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}


// destroy invoice
export function removeInvoiceSuccess(_that,response){
  return {
      type: actionTypes.REMOVE_INVOICE,
      payload: {
          response: response,
          obj: _that
      }
  }
}

export function removeInvoice(_this,id) {
  return function (dispatch) {
    const _that = _this
    dispatch(getRequest())
    axios.delete(`${appConstants.WEB_SERVICE_URL}/api/v1/invoices/${id}`)
    .then(response => {
        dispatch(removeInvoiceSuccess(_that,response.data))
      }).catch(error=> {
        dispatch(createError(error))
      });

  };
}


export  function createError(error){
 return function(dispatch) {  
    dispatch({
      type: actionTypes.GET_RESPONSE_ERROR,
      payload: error
    });
  }
}