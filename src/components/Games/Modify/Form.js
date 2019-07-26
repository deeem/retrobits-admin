import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField, MenuItem, Container } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { validate } from '../../../helpers/validation'
import Images from './Images'
import ImagesUpload from './ImagesUpload'

const getValidationErrors = ({ title, description, platform }) => {
  const errors = {}

  if (!validate['required'](title)) {
    errors.title = 'This field is Required'
  } else if (!validate['min'](title, 3)) {
    errors.title = 'Length should me more than 3 symbols'
  } else {
    delete errors.title
  }

  if (!validate['required'](description)) {
    errors.description = 'This field is Required'
  } else if (!validate['min'](description, 3)) {
    errors.description = 'Length should me more than 3 symbols'
  } else {
    delete errors.title
  }

  if (!validate['required'](platform)) {
    errors.description = 'This field is Required'
  } else {
    delete errors.platform
  }

  return errors
}

const styles = theme => ({
  title: {
    width: '100%',
  },
  description: {
    width: '100%',
  },
  platform: {
    width: '100%',
  },
  rom: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
  },
  rom_title: {
    paddingLeft: '1rem',
  },
  images_button: {
    paddingTop: theme.spacing(2),
  },
})

class Form extends Component {
  state = {
    title: this.props.title,
    description: this.props.description,
    platform: this.props.platform,
    rom: this.props.rom,
    rom_file: null,
    images: null,
    errors: {},
  }

  onChange = e => {
    switch (e.target.name) {
      case 'rom':
        this.setState({
          rom: e.target.files[0].name,
          rom_file: e.target.files[0],
        })
        break
      case 'images':
        this.setState({ images: e.target.files })
        break
      default:
        this.setState({ [e.target.name]: e.target.value })
    }
  }

  onSubmit = e => {
    const { title, description, platform } = this.state

    const errors = getValidationErrors({ title, description, platform })

    if (Object.keys(errors).length) {
      this.setState({ errors })
    } else {
      this.props.onSubmit(this.state)
    }
  }

  onDeleteImage = id => {
    this.props.onDeleteImage(id)
  }

  render() {
    const { errors, title, description, platform, rom } = this.state
    const { classes, platforms, images } = this.props

    return (
      <Container maxWidth="sm">
        <form autoComplete="off">
          <TextField
            name="title"
            className={classes.title}
            label="Title"
            value={title}
            onChange={this.onChange}
            margin="normal"
            error={errors.title !== undefined ? true : false}
            helperText={errors.title}
          />
          <TextField
            name="description"
            className={classes.description}
            multiline
            rowsMax="4"
            label="Description"
            value={description}
            onChange={this.onChange}
            margin="normal"
            error={errors.description !== undefined ? true : false}
            helperText={errors.description}
          />
          <TextField
            name="platform"
            className={classes.platform}
            select
            label="select"
            value={platform}
            helperText="Please select game platform"
            margin="normal"
            onChange={this.onChange}
            error={errors.platform !== undefined ? true : false}
            helperText={errors.platform}
          >
            {platforms.map(option => (
              <MenuItem key={option.id} value={option.slug}>
                {option.title}
              </MenuItem>
            ))}
          </TextField>

          <div className={classes.rom}>
            <label htmlFor="rom">
              <Button variant="contained" component="span">
                Game ROM File
              </Button>
            </label>
            <input
              id="rom"
              name="rom"
              type="file"
              style={{ display: 'none' }}
              onChange={this.onChange}
            />
            <span className={classes.rom_title}>{rom}</span>
          </div>

          <div className={classes.images_button}>
            {images ? (
              <Images items={images} onDelete={this.onDeleteImage} />
            ) : null}
            <ImagesUpload onChange={this.onChange} />
          </div>

          <hr />
          <Button variant="contained" color="primary" onClick={this.onSubmit}>
            Save
          </Button>
        </form>
      </Container>
    )
  }
}

Form.defaultProps = {
  title: '',
  description: '',
  platform: '',
  rom: null,
  images: null,
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  platforms: PropTypes.array.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  platform: PropTypes.string,
  rom: PropTypes.string,
  images: PropTypes.array,
}

export default withStyles(styles)(Form)
