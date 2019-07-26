import React from 'react'

const ImageUploader = (props) => {
  let clickme;
  if (props.pictureUrl === '') {
    clickme = 
    <form id='photo-upload'
      encType='multipart/form-data'
      method='POST'
      action='/imageupload'
      className='button'>
      <label htmlFor='single'>
        <i className="fas fa-camera-retro" />
      </label>
      <input type='file' id='single' name='myFile' /> 
      <input type="submit" value="Add Picture" />
    </form>
  } else {
    clickme = <img src={props.pictureUrl} alt="target"/>
  }

  return (
    <>
      <div className="upload" >
        {clickme}
      </div>
    </>
  )
}

export default ImageUploader;