import React from 'react';
import axios from 'axios';

//creating an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listId: '5d363131a98031c5a4fee07b',
			listName: '',
			locations: [],
			currentLoc: '',
			locName: '',
			locLat: '',
			locLong: '',
			pictureUrl: '',
			listIndex: 0
		}
	} 

	componentDidMount() {
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
				<h1>This is a test</h1> {''}{''}
				<div className="map">
					<p> MAP will go here-ish. </p>
				</div>
				<img src={this.state.pictureUrl} />
				<button >I'm a button</button>
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