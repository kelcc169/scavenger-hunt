import React from 'react';
import axios from 'axios';
import Map from './Map';
import ImageUploader from './ImageUploader';
import { Link } from 'react-router-dom';

class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: null,
      listName: '',
      pictureUrl: '',
      latitude: null,
      longitude: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUserLocation = this.handleUserLocation.bind(this)
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
    axios.post('/api/lists', {
      name: this.state.listName
    }).then(res => {
      let listId = res.data._id
      this.setState({
        listId
      })
    })
  }

  render() {
    let contents;
    
    if (this.state.listId) {
      contents = (
        <div>
          <ImageUploader pictureUrl={this.state.pictureUrl} />
          <Map handleUserLocation={this.handleUserLocation} />
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