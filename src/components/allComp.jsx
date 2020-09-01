import React, { Component } from 'react';
import EmployeeForm from './registrationForm'
import EmployeeInfo from './MyInfoForm'
import '../MyCSS/allComp.css'
import EmpList from './empList'
import '../MyCSS/empList.css'
class MyComponents extends Component {
    state = { 
        isListUpdated:false
     }

    refreshList = () => {
        console.log("inside refresh list");
        this.setState({
            isListUpdated:true
        });
    }

    resetFlag = () => {
        this.setState({isListUpdated:false});
    }

    render() { 
        return (  
            <React.Fragment>
                <header id = "main-header">
			        <h1>OPTUM</h1>
		        </header>
                <nav id = "main-nav">
                    <a href="https://www.optumcare.com/">Care</a>
                    <a href="https://www.optumrx.com/public/landing">Pharmacy Services</a>
                    <a href="https://www.optumbank.com/">Health Care Financial Services</a>
                    <a href="https://www.optum.com/business.html">Business Services and Technology</a>
                </nav>
                <div className = "container">
                    <div className = "form-container">
                        <EmployeeForm refreshList = {this.refreshList}/>
                        <EmployeeInfo/>
                    </div>
                    <div className = "emp-list">
                        <EmpList isUpdated = {this.state.isListUpdated} resetFlag = {this.resetFlag}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default MyComponents;