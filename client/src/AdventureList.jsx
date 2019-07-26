import React from 'react';
import { Link } from 'react-router-dom';

const AdventureList = (props) => {
  let contents;
  
  if (props.user) {
    contents = (
      <div>
        {props.lists.map( (list, index) => 
          <div key={index}>
            <h3>{list.name}</h3>
            <form onSubmit={(e) => props.handleNameUpdate(e)} >
              <input type="text" name="listName" onChange={(e) => props.handleInputChange(e)} />
              <input type="submit" value="Rename List" />
              <input hidden type="text" name="listId" readOnly value={list._id} />
            </form>
            <button onClick={props.deleteList} value={list._id} >Delete</button>
          </div>
        )}
      </div>
    )
  } else {
    contents = (
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
  }

  return(
    <>
      {contents}
    </>
  )
}

export default AdventureList;