import React from 'react';
import axios from 'axios';
import Map from './Map';
import './App.css';

//going on an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listName: '',
			locations: [],
			locLat: '',
			locLong: '',
			pictureUrl: '',
			listIndex: 1
		}
		this.handleLocationChange = this.handleLocationChange.bind(this)
	} 

	handleLocationChange(e) {
		e.preventDefault();
		let listIndex = parseInt(this.state.listIndex);
		let listArr = this.state.locations
		let location = listArr[listIndex];

		if (listIndex < listArr.length) {
			this.setState({
				locLat: location.latitude,
				locLong: location.longitude,
				pictureUrl: location.pictureUrl,
				listIndex: listIndex + 1
			})
		} else {
			// you win!
			this.setState({
				pictureUrl: 'https://res.cloudinary.com/dvrplexuy/image/upload/a_270/v1564120639/youdidit_u2l3sv.jpg',
				listIndex: 1
			})
		}
	}

	componentDidMount() {
		axios.get(`/api/lists/${this.props.listId}`)
			.then(res => {
				let list = res.data;
				let locations = res.data.locations
				this.setState({
					listName: list.name,
					locations,
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
				<img src={this.state.pictureUrl} alt='goal' />
				<button onClick={this.handleLocationChange} className="left-margin btn-success" >Next Location</button>
				<Map lng={this.state.locLong} lat={this.state.locLat} />
			</>
		)	
	}
} 

export default Adventure;