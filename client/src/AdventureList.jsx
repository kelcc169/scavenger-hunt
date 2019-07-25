import React from 'react';
import { Link } from 'react-router-dom';

const AdventureList = (props) => (
  <div>
    {props.lists.map( (list, index) => 
      <div key={index}>
        <h3>{list.name}</h3>
        <Link to='/adventure'>
          <button onClick={props.handleListSelect} value={list._id} > Go On This Adventure! </button>
        </Link>
      </div>
    )}
  </div>
)

export default AdventureList;