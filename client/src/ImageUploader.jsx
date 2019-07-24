import React, { Component } from 'react'

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictureUrl: ''
    }
  }

  render() {
    let clickme;
    if (this.state.pictureUrl === '') {
      clickme = 
      <div className='button'>
        <label htmlFor='single'>
          <i className="fas fa-camera-retro" />
        </label>
        <input hidden type='file' id='single' onChange={this.props.onChange} /> 
      </div>
    } else {
      clickme = <img src={this.state.pictureUrl} alt="target"/>
    }

    return (
      <>
        <div className="upload" >
          {clickme}
        </div>
      </>
    )
  }
}

export default ImageUploader;