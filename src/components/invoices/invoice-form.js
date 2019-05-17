import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom'
import DatePicker from 'react-datepicker';
import MyAlert from '../helpers/MyAlert';
import {createInvoice, getInvoice,updateInvoice} from '../../actions/invoices'
import "react-datepicker/dist/react-datepicker.css";

import _ from 'lodash'
let invobj = {}
class InvoiceForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
     	formData: {},
     	id: this.props.match.params.id,
     	invoice: {}
		}
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
   	this.setState({error: nextProps.error})
   	if(!_.isEmpty(nextProps.invoice)){
   		this.setState({invoice: nextProps.invoice})
   	}
  }
  
  componentDidMount() {
  	if(this.state.id)
  		this.props.getInvoice(this.state.id)
  }
  handleDateChange(value){
  	invobj['date'] = value;
    this.setState({formData: invobj});
  }
  handleChange(event){
  	invobj[event.target.name] = event.target.value;
    this.setState({formData: invobj});
  }

  handleSubmit(e){
  	e.preventDefault();
  	if(this.state.id == undefined)
  		this.props.createInvoice(this,this.state.formData)
  	else
  		this.props.updateInvoice(this,this.state.id,this.state.formData)
  }

  render(){
  	let {id, formData,invoice: {amount,date}} = this.state
  	date = formData.date || date
	  return (
	  <div className="container">
	 		<MyAlert {...this.state} />

      <div className="col-md-6 mx-auto text-center">
         <div className="header-title">
            
            <h2 className="wv-heading--subtitle">
               {id  ? "Edit invoice" : "Create new invoice"}
            </h2>
         </div>
      </div>
      <div className="row">
         <div className="col-md-4 mx-auto">
            <div className="myform form ">
               <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                     <input type="number" onChange={this.handleChange} min="0" name="amount" id="price" defaultValue={amount}  className="form-control my-input" placeholder="Amount"/>
                  </div>
                  <div className="form-group">
										<DatePicker
										  selected={date ? new Date(date) : new Date()}
										  timeInputLabel="Time:"
										  onChange={this.handleDateChange}
										  className='form-control'
										  dateFormat="MM/dd/yyyy h:mm aa"
										  
										/>
									</div>
                  <div className="text-center ">
                     <button type="submit" className=" btn btn-primary">Create Your Free Account</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
	  
	  );
	};
}


function mapStateToProps(state) {
	return {
		invoice: state.invoices.invoice,
		error: state.invoices.error
	}
}

export default withRouter(connect(mapStateToProps, {createInvoice,updateInvoice, getInvoice})(InvoiceForm));






