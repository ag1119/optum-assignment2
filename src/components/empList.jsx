import React, { Component } from 'react';
class EmpList extends Component {
    state = { 
        emps:[]
     }

     fetchList(){
        fetch('http://localhost:4200/employee-list')
        .then(res => res.json())
        .then(json => {
            this.setState({
                emps:json
            });
            {this.props.resetFlag();}
        })
     }

     componentDidMount(){
         this.fetchList();
     }

    render() { 
        if(this.props.isUpdated){
            this.fetchList();
        }
        console.log(this.props);
        var {emps} = this.state;
        return (
            <React.Fragment>
                <h3>Employee List</h3>
                <ul className = 'items-container'>
                    {emps.map(emp => (
                        <div className = 'list-item' key = {emp['_id'] + 0}>
                            <li className = "item-title" key = {emp['_id'] + 1}>{emp['obj']['name']}</li>
                            <li className = "item-details" key = {emp['_id'] + 2}>{emp['obj']['company']}</li>
                            <li className = "item-details" key = {emp['_id'] + 3}>{emp['obj']['email']}</li>
                            <li className = "item-details" key = {emp['_id'] + 4}>{emp['obj']['address']}</li>
                        </div>
                    ))}
                </ul>
            </React.Fragment>
        );
    }
}
 
export default EmpList;