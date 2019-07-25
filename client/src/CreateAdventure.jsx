import React from 'react';
import axios from 'axios';
import Map from './Map';
import ImageUploader from './ImageUploader';
import { Link } from 'react-router-dom';

class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: '',
      listName: '',
      pictureUrl: '',
      latitude: null,
      longitude: null,
      listIndex: 1
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUserLocation = this.handleUserLocation.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveLocation = this.saveLocation.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserLocation(e) {
    this.setState({
      latitude: e.lat,
      longitude: e.lng
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post(`/api/${this.props.user._id}/lists`, {
      name: this.state.listName
    }).then(res => {
      let listId = res.data._id
      this.setState({
        listId
      })
    })
  }

  saveLocation(e) {
    e.preventDefault();
    let listId = this.state.listId
    console.log(listId)
    axios.post(`/api/lists/${this.state.listId}/locations`, {
      lat: this.state.latitude,
      lng: this.state.longitude,
      pictureUrl: '',
      listIndex: this.state.listIndex
    }).then(res => {
      console.log(res.data)
    })
  }

  render() {
    let contents;
    
    if (this.state.listId) {
      contents = (
        <div>
          <ImageUploader pictureUrl={this.state.pictureUrl} />
          <Map handleUserLocation={this.handleUserLocation} />
          <button onClick={this.saveLocation} >Save This Location</button>
          <Link to='/' ><button>I'm done</button></Link>
        </div>
      )
    } else {
      contents = (
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" name="listName" placeholder="Name Your Adventure" onChange={this.handleInputChange} />
            <input type="submit" value="Frank" />
          </form>
        </div>
      )
    }

    return(
      <>
        {contents}
      </>
    )
  }
}

export default CreateAdventure;