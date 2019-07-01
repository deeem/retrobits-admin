import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core'

class ImagesUpload extends Component {
  state = {
    thumbnails: [],
  }

  handleChange = event => {
    const readfile = file => {
      let reader = new FileReader()
      reader.onloadend = () => {
        this.setState({
          thumbnails: [...this.state.thumbnails, reader.result],
        })
      }

      reader.readAsDataURL(file)
    }

    Array.from(event.target.files).forEach(file => readfile(file))
    this.props.onChange(event)
  }

  render() {
    return (
      <>
        {this.state.thumbnails.map(image => (
          <img src={image} />
        ))}
        <input
          accept="image/*"
          id="images"
          type="file"
          multiple
          onChange={this.handleChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="images">
          <Button component="span">Images</Button>
        </label>
      </>
    )
  }
}

export default ImagesUpload

ImagesUpload.propTypes = {
  onChange: PropTypes.func.isRequired,
}
