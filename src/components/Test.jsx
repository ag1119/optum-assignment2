import React from 'react'; 

class Test extends React.Component { 
	constructor(props) 
    { 
        super(props); 
        this.state = { 
			users : [] ,
			isLoaded : false,
		}; 
	}  
	
	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(res => res.json())
		.then(json => {
			this.setState({
				isLoaded : true,
				users : json,
			});
		});
	}
    render() 
    { 
		var {isLoaded , users} = this.state;
		if(!isLoaded){
			return <div className = 'badge badge-primary m-2'>Please wait data is loading</div>;
		}
		else{
			return ( 
				<div className = 'badge badge-primary m-2'>
					<div className = ''>All USERS</div>
					<ul>
						{users.map(user => (
							<li className = 'list-group-item' style = {{color:'blue'}} key = {user.id}>{user.name}</li>
						))}
					</ul>
				</div>
			);
		}
    }
} 

export default Test