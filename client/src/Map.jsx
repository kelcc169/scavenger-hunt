import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MapMarker from './MapMarker';

class Map extends React.Component {
	render () {
		// let creating = this.props.creating
				//SAVE THE BELOW TWO LINES
		// let lng = this.props.lng
		// let lat = this.props.lat
		let lng = this.props.lng ? this.props.lng : -122.312328
		let lat = this.props.lat ? this.props.lat : 47.634432

		const Map = new ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
			container: 'map',
			minZoom: 12,
			maxZoom: 16
		});
	
	return (
			<>
				<div className="mapboxBox">
					<Map
						center={[lng, lat]}
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: '500px',
							width: '500px'
						}}>
						<Marker coordinates={[lng, lat]}
							style={{backgroundColor: 'rgba(100, 0, 100, 50% )', height: '25px', width: '25px', borderRadius: '50%'}}>
						</Marker>
						<MapMarker />
					</Map>
				</div>
				<button onClick={this.handleButtonClick}>SOMEDAY I'LL BE A USEFUL SUBMIT BUTTON! </button>
			</>
		)
	}
}	

export default Map;



