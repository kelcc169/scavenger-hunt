import React from 'react';


//creating an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//WHAT GOES IN STATE?
		}
	} 

	render () {
		return (
			<>
			<h1>This is a test</h1> {''}{''}
			<div class="map">
				<p> MAP will go here-ish. </p>
			</div>

			


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