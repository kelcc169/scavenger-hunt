import React from 'react';
import axios from 'axios';
import './App.css';

//creating an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listId: '5d3646a0bc74876ac1e5d32a',
			listName: '',
			locations: [],
			locName: '',
			locLat: '',
			locLong: '',
			pictureUrl: '',
			listIndex: 1
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
	} 

	handleButtonClick(e) {
		e.preventDefault();
		let listIndex = parseInt(this.state.listIndex);
		let listArr = this.state.locations
		let location = listArr[listIndex];

		if (listIndex < listArr.length) {
			this.setState({
				locName: location.name,
				locLat: location.latitude,
				locLong: location.longitude,
				pictureUrl: location.pictureUrl,
				listIndex: listIndex + 1
			})
		} else {
			// you win!
			this.setState({
				locName: listArr[0].name,
				locLat: listArr[0].latitude,
				locLong: listArr[0].longitude,
				pictureUrl: listArr[0].pictureUrl,
				listIndex: 1
			})
		}
	}

	componentDidMount() {
		//set state here for the selected list: 
		//this.setState({
			// listId: this.props.listId
		// })

		axios.get(`/api/lists/${this.state.listId}`)
			.then(res => {
				let list = res.data;
				let locations = res.data.locations
				this.setState({
					listName: list.name,
					locations,
					locName: locations[0].name,
					locLat: locations[0].latitude,
					locLong: locations[0].longitude,
					pictureUrl: locations[0].pictureUrl,
					currentLoc: locations[0]._id
				})
			})
	}

	render () {
		return (
			<>
				<h1>This is a test: Hello, {this.props.user.name} </h1> {''}{''}
				<div className="map">
					<p> MAP will go here-ish. </p>
				</div>
				<img src={this.state.pictureUrl} alt='this is your target'/>
				<button onClick={this.handleButtonClick} >I'm a button</button>
			</>
		);	
	}
} 


// Adventure has state.
// CREATE ADVENTURE:
// Ability to create a list by way of form, and title their scavenger hunt.
// 1. Needs a target for the map to go
// 2. Needs an image target for the specific scavenger spot
// 3. Needs a button. The button needs to:
//		- Take a picture
//		- Send lat and long to state
//
//



export default Adventure;