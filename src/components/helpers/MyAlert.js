import React from 'react';
import '../../assets/css/default.css'

class MyAlert extends React.Component{
 constructor(props){
 	super(props)
 	this.state= {
 		error: undefined,
 		success_message: undefined
 	}
 }
 componentWillReceiveProps(nextProps){
 	this.setState({error: nextProps.error,success_message: nextProps.success_message})
 }

 handleClose = () => {
 	this.setState({error: undefined, success_message: undefined})
 }

 render(){
 	  const {error, success_message} = this.state;
 	  let className = success_message ? 'alert-success' : 'alert-danger'
 	  return(<div id="message1" className={`alert-box ${className} jumbotron flyover flyover-centered ${error || success_message ? 'in' : ''} `}>
        {error || success_message}
       <button type="button" onClick={() => this.handleClose()} className="close" aria-hidden="true">×</button>
    </div>)
 }
}

/** 
 * This is a wrapper method that connects your alert to the store based on a *alertName key. This is the unique identifier that will allow you to both show the alert and dismiss the alert. 
 */
export default MyAlert;