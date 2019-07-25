import React from 'react';
import axios from 'axios';
import Adventure from './Adventure';
import AdventureList from './AdventureList';
import CreateAdventure from './CreateAdventure';
import { Route, Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      userLists: [],
      selectedList: ''
    }
    this.handleListSelect = this.handleListSelect.bind(this)
    this.listDelete = this.listDelete.bind(this)
  }

  handleListSelect(e) {
    let selectedList = e.target.value;
    this.setState({
      selectedList
    })
  }

  handleUserLists() {
    // axios get for all lists associated with user
    // save those in user lists state
  }

  listDelete(e) {
    let listId = e.target.value
    console.log(listId)
    axios.delete(`/api/${this.props.user._id}/lists/${listId}`)
      .then(res => {
        console.log('success!')
      })
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`
    axios.get('/api/lists')
      .then(res => {
        let lists = res.data
        this.setState({
          lists
        })
      })
    axios.get(`/api/users/${this.props.user._id}`)
      .then(res => {
        let userLists = res.data.lists
        console.log(userLists)
        this.setState({
          userLists
        })
      })
  }

  render() {
    let lists = this.state.lists ? this.state.lists : [];

    return(
      <>
        <nav>
          <Link to='/' >Adventures</Link>{' '}{' '}
          <Link to='/create' >Create an Adventure</Link>{' '}{' '}
          <Link to='/myadventures' >My Adventures</Link>
        </nav>
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
          render={() => <CreateAdventure 
            token={this.props.token} 
            user={this.props.user} />}
        />
        <Route path='/myadventures'
          render={() => <AdventureList 
            lists={this.state.userLists} 
            user={this.props.user} 
            listDelete={this.listDelete} />} 
        />
      </>
    )
  }
}

export default Profile;