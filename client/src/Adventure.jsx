import React from 'react';
import axios from 'axios';


//creating an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//WHAT GOES IN STATE?
		}
	} 

	//DO WE NEED HANDLER FUNCTIONS FOR CLICKS AND BUTTONS?

	

	render () {
		return (
			<>
				<h1>This is a test</h1> 
				<div class="map">
					<p> MAP will go here-ish. </p>
				</div>
				
				<div class="adventure-pic">
					{/* URL NEEDS TO CHANGE BASED ON ADVENTURE STEP, LINK TO CLOUDINARY. 
					GET URL FROM STATE */}
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