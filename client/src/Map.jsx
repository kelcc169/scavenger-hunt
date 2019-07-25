import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MapMarker from './MapMarker';

const Map = (props) => {
		// let creating = this.props.creating
		//SAVE THE BELOW TWO LINES
		// let lng = this.props.lng
		// let lat = this.props.lat
	let lng = props.lng ? props.lng : -122.312328
	let lat = props.lat ? props.lat : 47.634432

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
					<MapMarker listId={props.listId}	/>
				</Map>
			</div>
		</>
	)
}	

export default Map;