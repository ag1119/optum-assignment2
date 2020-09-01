import React, { Component } from 'react';
import '../MyCSS/registrationForm.css';

const initialState = {
        name : '' ,
        address : '' , 
        email : '',
        cname : '' ,
        eid : '' , 
        nameError : '',
        addressError: '',
        emailError:'',
        cnameError: '',
}
class EmployeeForm extends Component {
    state = initialState;
    mychangeHandler = (e) => {
        let nam = e.target.name;
        let val = e.target.value;
        console.log("value " + val);
        this.setState({[nam] : val} , () => {console.log(nam + " " + this.state[nam]);});
        
    }

    validate(){
        console.log("inside validate")
        let nameError = "";
        let addressError = "";
        let emailError = "";
        let cnameError = "";
        if(!this.state.name)
            nameError = 'Name field is required.';
        if(!this.state.address)
            addressError = 'Address field is required.';
        if(!this.state.email || 
            !this.state.email.includes("@") || 
            this.state.email.includes(" ")  ||
            this.state.email.indexOf("@") === 0)
            emailError = 'Please enter a valid email';
        if(!this.state.cname)
            cnameError = 'Company field is required.';
        if(nameError || addressError || emailError || cnameError){
            console.log("error detected");
            this.setState({ nameError: nameError , 
                            addressError:addressError , 
                            emailError:emailError , 
                            cnameError:cnameError});
            return false;
        }
        this.setState(initialState);
        return true;

    }
    

    postData = (e) => {
        e.preventDefault();
        // let body = {
        //     ...this.state
        // }
        // delete body.eid;
        const isValid = this.validate();
        if(!isValid){
            //this.setState(initialState);
            return;
        }
        console.log("I am in post method");
        fetch('http://localhost:4200/employee-details' , {
            method : 'post',
            // mode : 'no-cors',
            headers : {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                name : this.state.name,
                address : this.state.address , 
                email : this.state.email , 
                company : this.state.cname
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState(initialState);
            this.setState({eid:json.id});
            {this.props.refreshList();}
        }).catch(e => console.log(e));
    }

    render() { 
        return (
            <React.Fragment>
                <form className = "registration-form">
                    <h3>Registration Form</h3>
                    <label>Name</label>
                    <input 
                    onChange = {this.mychangeHandler}
                    name = 'name'
                    value = {this.state.name}
                    type = 'text'/>
                    {this.state.nameError ? (
                    <div>
                        <label className = 'error'>{this.state.nameError}</label>
                    </div>) : null}

                    <label>Address</label>
                    <input 
                    onChange = {this.mychangeHandler}
                    name = 'address'
                    value = {this.state.address}
                    type = 'text'/>
                    {this.state.addressError ? (
                    <div>
                        <label className = 'error'>{this.state.addressError}</label>
                    </div>) : null}

                    <label>Email</label>
                    <input 
                    onChange = {this.mychangeHandler}
                    name = 'email'
                    value = {this.state.email}
                    type = 'text'/>
                    {this.state.emailError ? (
                    <div>
                        <label className = 'error'>{this.state.emailError}</label>
                    </div>) : null}

                    <label>Company Name</label>
                    <input 
                    onChange = {this.mychangeHandler}
                    name = 'cname'
                    value = {this.state.cname}
                    type = 'text'/>
                    {this.state.cnameError ? (
                    <div>
                        <label className = 'error'>{this.state.cnameError}</label>
                    </div>) : null}

                    <input type = 'submit' value = 'GENERATE ID' onClick = {this.postData}/>
                    {this.state.eid ? (
                        <React.Fragment>
                            <label className = "id-label">Your Employee Id is : </label>
                            <label className = "generated-id"> {this.state.eid}</label>
                        </React.Fragment>) 
                    : null}
                    
                </form>
            </React.Fragment> 
        );
    }
}
 
export default EmployeeForm;