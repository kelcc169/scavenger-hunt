import React, { Component } from 'react'
import axios from 'axios'
class ImageUploader extends Component {
    state = {
        selectedFile: null
    }
    ImageUploadhandler = event =>{
        this.setState({
            selectedFile:event.target.files[0]
        })
    }
    fileUploadhandler = () => {

    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.ImageUploadhandler}/>
                <button onClick={this.fileUploadhandler}>Upload</button>
            </div>
        )
    }
}

export default ImageUploader