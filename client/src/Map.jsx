import React from 'react';
import axios from 'axios';
import './App.css';
import ReactMapboxGl from 'react-mapbox-gl';
//Added dependencies: mapbox, react-mapbox-gl-draw

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lng: '',
			lat: ''
		}
	}

	render () {
		return (
			<div className="mapboxBox">
				
			</div>
		)
	}








	render () {
		return (
			<>
				<h1>This is a test. </h1> {''}{''}
				<div className="map">
					<p> MAP will go here-ish. </p>
				</div>
				<img src={this.state.pictureUrl} alt='goal'/>
				<button onClick={this.handleButtonClick} >I'm a button</button>
			</>
		);	
	}











}









// const Map = (props) => {
// 	<div className="Map">
// 		THIS IS A MAP"
// 	</div>

// }


export default Map;