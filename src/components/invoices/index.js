import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom'
import _ from 'lodash'
import MyAlert from '../helpers/MyAlert';
import {getAllInvoices,removeInvoice} from '../../actions/invoices'
import DatePicker from 'react-datepicker';
import moment from 'moment'
class Invoices extends React.Component{
  constructor(props){
    super(props);
    this.state={
     data: [],
     totals: 0
		}
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearchByDate = this.handleSearchByDate.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.invoices!== undefined){
      this.setState({data: nextProps.invoices,totals: this.getCounts(nextProps.invoices)})
    }
  }
  
  componentDidMount() {
    this.props.getAllInvoices()
 
  }

  getCounts(array){
    var sum = 0;
    for(var i = 0; i < array.length; ++i){
       sum += parseFloat(array[i].amount)
    }
    return sum
  }
  handleRemove(id){
    this.props.removeInvoice(this,id)
  }
  handleSearchByDate(value){
    let date = moment(value).format('YYYY-MM-DD')
    let data = this.state.data.filter((item) => item.date == date)
    this.setState({data: data,date: value,totals: this.getCounts(data)})
  }

  render(){
  	let {data,date,totals} = this.state;
	  return (
	  	<div className="container">
        <MyAlert {...this.props} />
        <Link to={'/invoices/new'} className="btn btn-primary">create invoice</Link>
        
        <div>
          Filter: &nbsp;
          <DatePicker
            selected={date ? new Date(date) : new Date()}
            onChange={this.handleSearchByDate}
            className='form-control'
            dateFormat="MM/dd/yyyy h:mm aa"
          />
          <a href="javascript:void(0)" onClick={()=> this.props.history.push('/invoices')}>cancel</a>

        </div>
        <div className="row col-md-6 col-md-offset-2 custyle">
          <table>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="myTable">
             {
              data.map((item)=> {
                
                return(
              <tr>
                <td>{item.amount}</td>
                <td>{item.date}</td>
                <td>
                  <Link to={`invoices/edit/${item.id}`}>Edit</Link>&nbsp;
                  <a href="javascript:void(0)" onClick={()=> this.handleRemove(item.id)}>Delete</a>
                </td>
              </tr>)
            })
             }
             {_.isEmpty(data) ? <tr ><td colspan="3">No data found</td></tr> : null } 
             <tr ><td colspan="3">Totals: {parseFloat(totals)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
	  
	  );
	};
}


function mapStateToProps(state) {
	return {
	   success_message: state.invoices.success_message,
    success: state.invoices.success,
    invoices: state.invoices.invoices
	}
}

export default withRouter(connect(mapStateToProps, {getAllInvoices,removeInvoice})(Invoices));






