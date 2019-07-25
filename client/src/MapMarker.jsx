import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import axios from 'axios';

class MapMarker extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			userLocation: null,
			intervalHandle: null
		}
		this.getUserLocation = this.getUserLocation.bind(this);
	}

componentDidMount() {
	let handle = setInterval(this.getUserLocation, 1000)
	this.setState({
		intervalHandle: handle
	})
}

componentWillUnmount(){
	clearInterval(this.state.intervalHandle)
}

getUserLocation() {
	navigator.geolocation.getCurrentPosition(position => {
		this.setState({
			userLocation: {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
		});
	});
} 

//Under construction under Carlo's guidance.
// saveUserLocation() {
// 	let listId = this.props.listId
// 		axios.post(`api/lists/${listId}/locations`, 
// 			{body: {latitude: this.state.userLocation.lat, 
// 						longitude: this.state.userLocation.lng
// 					}
// 				}
// 			)
// }

// latitude: req.body.lat,
//       longitude: req.body.lng,
//       pictureUrl: req.body.pictureUrl




render() {
	let {lng, lat} = this.state.userLocation ? this.state.userLocation : {lng: 0, lat: 0}
	return(
		<Marker coordinates={[lng, lat]}
			style={{backgroundColor: 'red', height: '25px', width: '25px', borderRadius: '50%'}}>
		</Marker>
	)


}


}






export default MapMarker;