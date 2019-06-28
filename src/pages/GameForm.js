import React, { Component } from 'react'
import axios from '../axios-retrobits'
import { Button, Grid, TextField, MenuItem } from '@material-ui/core'

class GameForm extends Component {
  state = {
    game: {},
    loading: false,
    error: false,
    form: {
      title: '',
      description: '',
      platform: '',
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
    this.setState({
      ...this.state,
      form: { ...this.state.form, [name]: event.target.value },
    })
  }

  handleSave = (event) => {
      console.log('save')
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
        </Grid>

        <Button variant="contained" color="primary" onClick={this.handleSave}>
          Save
        </Button>
      </form>
    )
  }
}

export default GameForm
