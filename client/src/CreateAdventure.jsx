import React from 'react';
import Map from './Map';
import ImageUploader from './ImageUploader';

class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: true
    }
  }

  render() {
    return(
      <div>
        <Map creating={this.state.creating} />
        <ImageUploader />
      </div>
    )
  }
}

export default CreateAdventure;