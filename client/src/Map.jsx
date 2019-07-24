import React from 'react';
import axios from 'axios';
import './App.css';
import ReactMapboxGl from 'react-mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
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
		const Map = new ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
			container: 'map',
			zoom: 9
		}
	);

	return (
			<>
				<div className="mapboxBox">
					<Map
							center = {[-122.341408, 47.609797]}
							style="mapbox://styles/mapbox/streets-v9"
							containerStyle={{
								height: '100vh',
								width: '100vw'
							}}>
						{/* <DrawControl /> */}
					</Map>;
				</div>
			<button onClick={this.handleButtonClick}>SOMEDAY I'LL BE A USEFUL SUBMIT BUTTON! </button>
			</>
		)
	}
}	



export default Map;








	// const Map = (props) => {
	// 	<div className="Map">
	// 		THIS IS A MAP"
	// 	</div>
	
	// }