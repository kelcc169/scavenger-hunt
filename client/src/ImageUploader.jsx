import React from 'react';

class ImageUploader extends React.Component {
  render() {
    let clickme;
    if (this.props.pictureUrl === '') {
      clickme = 
      <form onSubmit={this.props.onFormSubmit}>
        <input type='file' id='single' name='myFile' onChange={this.props.onChange} /> 
        <button type="submit">Add Picture</button>
      </form>
    } else {
      clickme = <img src={this.props.pictureUrl} alt="target"/>
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