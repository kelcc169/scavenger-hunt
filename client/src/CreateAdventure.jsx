import React from 'react';
import axios from 'axios';
import Map from './Map';
import ImageUploader from './ImageUploader';

class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: true,
      file: null
    }
  }

  render() {
    return(
      <div>
        {/* <Map /> */}
        <ImageUploader onChange={this.onChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default CreateAdventure;