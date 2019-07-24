import React from 'react';
import axios from 'axios';
import Adventure from './Adventure';
import AdventureList from './AdventureList';
import {
  BrowserRouter as Router,
  Route
}
from 'react-router-dom';
import ImageUploader from './ImageUploader';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      lists: [],
      selectedList: ''
    }
    this.handleListSelect = this.handleListSelect.bind(this)
  }

  handleListSelect(e) {
    let selectedList = e.target.value;
    this.setState({
      selectedList
    })
  }

  onChange(e) {
    console.log(e.target.file)
  }

  componentDidMount() {
    axios.get('/api/lists')
      .then(res => {
        let lists = res.data
        this.setState({
          lists
        })
      })
  }

  render() {
    let lists = this.state.lists ? this.state.lists : [];

    return(
      <Router>
        <Route exact path='/' 
          render={() => <AdventureList 
            lists={lists} 
            handleListSelect={this.handleListSelect} />}
        />
        <Route path='/adventure' 
          render={(props) => <Adventure 
            listId={this.state.selectedList} />}
        />
        <Route path='/create'
          render={() => <ImageUploader onChange={this.props.onChange} />}
        />
      </Router>
    )
  }
}

export default Profile;