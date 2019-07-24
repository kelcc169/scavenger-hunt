import React from 'react';
import axios from 'axios';
import Map from './Map';
import './App.css';

//going on an adventure
class Adventure extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			listId: this.props.listId,
			listName: '',
			locations: [],
			locName: '',
			locLat: '',
			locLong: '',
			pictureUrl: '',
			listIndex: 1
		}
		this.handleButtonClick = this.handleButtonClick.bind(this)
	} 

	handleButtonClick(e) {
		e.preventDefault();
		let listIndex = parseInt(this.state.listIndex);
		let listArr = this.state.locations
		let location = listArr[listIndex];

		if (listIndex < listArr.length) {
			this.setState({
				locName: location.name,
				locLat: location.latitude,
				locLong: location.longitude,
				pictureUrl: location.pictureUrl,
				listIndex: listIndex + 1
			})
		} else {
			// you win!
			this.setState({
				locName: listArr[0].name,
				locLat: listArr[0].latitude,
				locLong: listArr[0].longitude,
				pictureUrl: listArr[0].pictureUrl,
				listIndex: 1
			})
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
				<h1>This is a test. </h1> 
					<Map lng={this.state.locLong} lat={this.state.locLat}/>
				
				<img src={this.state.pictureUrl} alt='goal'/>
				<button onClick={this.handleButtonClick} >I'm a button</button>

			</>
		)	
	}
} 

export default Adventure;