import React, { Component } from 'react'
import axios from '../axios-retrobits'
import { Button, Grid, TextField, MenuItem } from '@material-ui/core'
import ImagesUpload from '../components/GameForm/ImagesUpload'
import Images from '../components/GameForm/Images'

class GameForm extends Component {
  state = {
    game: {},
    loading: false,
    error: false,
    form: {
      title: '',
      description: '',
      platform: '',
      rom: null,
      images: [],
    },
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios
      .get(`games/${id}`)
      .then(response => {
        const data = response.data.data
        console.log(data)
        this.setState({
          game: data,
          form: {
            title: data.title,
            description: data.description,
            platform: data.platform.slug,
          },
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleChange = name => event => {
    let form = {}
    switch (name) {
      case 'rom':
        form = { ...this.state.form, rom: event.target.files[0] }
        break
      case 'images':
        form = { ...this.state.form, images: event.target.files }
        break
      default:
        form = { ...this.state.form, [name]: event.target.value }
    }

    this.setState({ form })
  }

  handleDeleteImage = id => {
    console.log(id)
    // send request to delete
    // then remove from local state
  }

  handleSave = () => {
    let data = new FormData()
    data.append('_method', 'PATCH')
    data.append('title', this.state.form.title)
    data.append('description', this.state.form.description)
    data.append('platform', this.state.form.platform)
    if (this.state.form.rom) {
      data.append('rom', this.state.form.rom)
    }

    if (this.state.form.images) {
      const images = Array.from(this.state.form.images)
      images.forEach((file, i) => {
        data.append('images[]', file)
      })
    }

    axios
      .post(`games/${this.state.game.id}`, data)
      .then(response => {
        // console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { handleChange } = this
    return (
      <form autoComplete="off">
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              label="Title"
              value={this.state.form.title}
              onChange={handleChange('title')}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              rowsMax="4"
              label="Description"
              value={this.state.form.description}
              onChange={handleChange('description')}
              margin="normal"
            />
          </Grid>
          <Grid item>
            <TextField
              select
              label="select"
              value={this.state.form.platform}
              helperText="Please select game platform"
              margin="normal"
              onChange={handleChange('platform')}
            >
              <MenuItem key="zx" value="zx">
                ZX-Spectrum
              </MenuItem>
              <MenuItem key="nes" value="nes">
                Nintendo
              </MenuItem>
              <MenuItem key="snes" value="snes">
                Super Nintendo
              </MenuItem>
              <MenuItem key="smd" value="smd">
                Sega Genesis
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            {this.state.form.rom ? this.state.form.rom.name : null}
            <input
              id="rom"
              type="file"
              style={{ display: 'none' }}
              onChange={this.handleChange('rom')}
            />
            <label htmlFor="rom">
              <Button component="span">Game ROM File</Button>
            </label>
          </Grid>
          <Grid item>
            {this.state.game.images ? (
              <Images
                items={this.state.game.images}
                onDelete={this.handleDeleteImage}
              />
            ) : null}
          </Grid>
          <Grid item>
            <ImagesUpload onChange={this.handleChange('images')} />
          </Grid>
        </Grid>

        <Button variant="contained" color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </form>
    )
  }
}

export default GameForm
