import React from 'react';
import axios from 'axios';
import Map from './Map';
import axios from 'axios';
import ImageUploader from './ImageUploader';


class CreateAdventure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listId: null,
      listName: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
          <Map />
          {/* <ImageUploader /> */}
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