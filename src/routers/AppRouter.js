import React from 'react';
import { Router, Link, Route, Switch, NavLink,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom'
import Invoices from '../components/invoices/index'
import NotFound from '../components/NotFound'
import InvoiceForm from '../components/invoices/invoice-form'
// import ListOrganizers from '../components/Organizers/List'
export const history = createHistory();


class AppRouter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }




 render(){


  return (
    <Router history={history}>
     <div>
       <Switch>
        <Route exact path="/" render={(props) =>  (
           <Redirect to='/invoices'/>
        )}/>
        <Route path="/invoices" exact component={(Invoices)}/>
        <Route path="/invoices/new" exact component={(InvoiceForm)}/>
        <Route path="/invoices/edit/:id" exact component={(InvoiceForm)}/>
        <Route component={NotFound}/>
   
       </Switch>
    </div>
   </Router>)
};

}



function mapStateToProps(state) {
  return {
    

  }
}

export default withRouter(connect(mapStateToProps, {})(AppRouter));


