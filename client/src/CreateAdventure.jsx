import React from 'react';
import axios from 'axios';
import Map from './Map';
import ImageUploader from './ImageUploader';
import { Link } from 'react-router-dom';

class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUserLocation(e) {
    // e.preventDefault();
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

  onFormSubmit(e) {
    e.preventDefault();
    console.log('starting form submit')
    this.fileUpload(this.state.file).then(res => {
      console.log(res.data)
      this.setState({
        pictureUrl: res.data
      })
      console.log('maybe this worked?')
    })
  }

  onChange(e) {
    this.setState({
      file: e.target.files[0]
    })
    console.log('file in state')
  }

  fileUpload(file) {
    const url = '/imageupload'
    const formData = new FormData();
    formData.append('myFile', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    console.log('file uploading?')
    return axios.post(url, formData, config)
  }

  saveLocation(e) {
    e.preventDefault();
    let listId = this.state.listId
    console.log(listId)
    if(this.state.latitude && this.state.longitude) {
      axios.post(`/api/lists/${this.state.listId}/locations`, {
        lat: this.state.latitude,
        lng: this.state.longitude,
        pictureUrl: this.state.pictureUrl,
        listIndex: this.state.listIndex
      }).then(res => {
        console.log(res.data)
        this.setState({
          latitude: null,
          longitude: null,
          pictureUrl: '',
          listIndex: this.state.listIndex + 1
        })
      })
    }
  }

  render() {
    let contents;
    if (this.state.listId) {
      contents = (
        <div>
          <ImageUploader 
            pictureUrl={this.state.pictureUrl} 
            onFormSubmit={this.onFormSubmit}
            onChange={this.onChange}
            onFileUpload={this.onFileUpload}
          />
          <Map handleUserLocation={this.handleUserLocation} />
          <button onClick={this.saveLocation} >Save This Location</button>
          <Link to='/' ><button onClick={this.props.getLists} >I'm done</button></Link>
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