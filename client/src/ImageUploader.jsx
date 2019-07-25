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
      <form id='photo-upload'
        encType='multipart/form-data'
        method='POST'
        action='/imageupload'
        className='button'>
        {/* <label htmlFor='single'>
          <i className="fas fa-camera-retro" />
        </label> */}
        <input type='file' id='single' name='myFile' /> 
        <input type="submit" value="Add adventure" />
      </form>
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