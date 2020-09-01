import React, { Component } from 'react';
import '../MyCSS/MyInfoForm.css'

const initialState = {
    name : '',
    address : '',
    email : '',
    cname : '' ,
    id:'',
    error:''
}
class EmployeeInfo extends Component {
    state = initialState;

    validate(){
        console.log("inside validate");
        let error = '';
        if(!this.state.id)
            error = "Please enter an employee ID.";
        if(error){
            this.setState({error});
            return false;
        }
        this.setState(initialState);
        return true;
    }
    handleChange = (e) => {
        this.setState({
            id : e.currentTarget.value
        })
    }

    fetchData = (e , id) => {
        e.preventDefault();
        const isValid = this.validate();
        if(!isValid)
            return;
        console.log("inside fetch data");
        fetch(`http://localhost:4200/employee-details/${this.state.id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
        if(!json.name){
            this.setState({error:"No employee found with the given key. Please enter a valid key."});
            return;
        }
        this.setState({
            name : json.name,
            address : json.address,
            email : json.email , 
            cname : json.company
        })}).catch(e => {console.log("In catch error -> " + e.message)});
    }
    render() { 
        return (  
            <React.Fragment>
                <form className = 'search-form'>
                    <h3>Search Employee</h3>
					<label>Employee Id</label>
                    <input 
                        onChange = {this.handleChange} 
                        value = {this.state.id} 
                        type = 'text'
                        name = "empId"/>
                    {this.state.error ? (<label className = "error">{this.state.error}</label>) : null}
                    <input type = 'submit' value = 'SEARCH' onClick = {this.fetchData}/>    
                    <label className = 'search-result'>{this.state.name}</label>
                    <label className = 'search-result'>{this.state.address}</label>
                    <label className = 'search-result'>{this.state.email}</label>
                    <label className = 'search-result'>{this.state.cname}</label>
                </form>
            </React.Fragment>
        );
    }
}
 
export default EmployeeInfo;