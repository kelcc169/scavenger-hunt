import React from 'react';
import { Marker } from 'react-mapbox-gl';

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

	render() {
		let {lng, lat} = this.state.userLocation ? this.state.userLocation : {lng: 0, lat: 0}
		return(
			<Marker coordinates={[lng, lat]}
				onClick={() => this.props.handleUserLocation({lng, lat})}
				style={{backgroundColor: 'red', height: '25px', width: '25px', borderRadius: '50%'}}
				longitude={lng}
				>
			</Marker>
		)
	}
}

export default MapMarker;

    // <i class="fas fa-crosshairs"></i>