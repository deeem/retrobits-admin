import React, { Component } from 'react'
import axios from '../axios-retrobits'
import { Button, TextField, MenuItem, Container } from '@material-ui/core'
import ImagesUpload from '../components/GameForm/ImagesUpload'
import Images from '../components/GameForm/Images'
import { validateInput, validateForm, hasError } from '../helpers/validation'
import { withStyles } from '@material-ui/core/styles'

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

class GameForm extends Component {
  state = {
    game: {},
    loading: false,
    error: false,
    mode: '',
    form: {
      title: '',
      description: '',
      platform: '',
      rom: null,
      images: [],
    },
    validation: {
      title: {
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      description: {
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      platform: {
        rules: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
  }

  componentDidMount() {
    if (this.props.match.params.id !== 'create') {
      const id = this.props.match.params.id
      axios
        .get(`games/${id}`)
        .then(response => {
          const data = response.data.data
          this.setState({
            mode: 'edit',
            game: data,
            form: {
              title: data.title,
              description: data.description,
              platform: data.platform.slug,
            },
            validation: {
              title: {
                rules: {...this.state.validation.title.rules},
                valid: true,
                touched: false,
              },
              description: {
                rules: {...this.state.validation.description.rules},
                valid: true,
                touched: false,
              },
              platform: {
                rules: {...this.state.validation.platform.rules},
                valid: true,
                touched: false,
              },
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      this.setState({ mode: 'create' })
    }
  }

  handleChange = name => event => {
    let value
    switch (name) {
      case 'rom':
        value = event.target.files[0]
        break
      case 'images':
        value = event.target.files
        break
      default:
        value = event.target.value
    }

    const updatedState = {
      ...this.state,
      form: { ...this.state.form, [name]: value },
      validation: {
        ...this.state.validation,
      },
    }

    if (updatedState.validation[name]) {
      updatedState.validation[name] = {
        rules: this.state.validation[name].rules,
        valid: validateInput(value, this.state.validation[name].rules),
        touched: true,
      }
    }

    this.setState({
      ...updatedState,
      formIsValid: validateForm(updatedState.validation),
    })
  }

  handleDeleteImage = id => {
    console.log(id)
    // send request to delete
    // then remove from local state
  }

  handleSubmit = () => {
    const data = new FormData()
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

    if ((this.mode = 'edit')) {
      data.append('_method', 'PATCH')
    }

    const url = this.mode == 'edit' ? `games/${this.state.game.id}` : 'games'

    axios
      .post(url, data)
      .then(response => {
        // console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { handleChange, handleSubmit, handleDeleteImage } = this,
      { form, game } = this.state

    return (
      <Container maxWidth="sm">
        <form autoComplete="off">
          <TextField
            className={this.props.classes.title}
            label="Title"
            value={form.title}
            onChange={handleChange('title')}
            margin="normal"
            error={hasError(this.state.validation.title)}
          />
          <TextField
            className={this.props.classes.description}
            multiline
            rowsMax="4"
            label="Description"
            value={form.description}
            onChange={handleChange('description')}
            margin="normal"
            error={hasError(this.state.validation.description)}
          />
          <TextField
            className={this.props.classes.platform}
            select
            label="select"
            value={form.platform}
            helperText="Please select game platform"
            margin="normal"
            onChange={handleChange('platform')}
            error={hasError(this.state.validation.platform)}
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

          <div className={this.props.classes.rom}>
            <input
              id="rom"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange('rom')}
            />
            <label htmlFor="rom">
              <Button variant="contained" component="span">
                Game ROM File
              </Button>
            </label>
            {game.rom && (
              <span className={this.props.classes.rom_title}>{game.rom}</span>
            )}
            {form.rom && (
              <span className={this.props.classes.rom_title}>
                {form.rom.name}
              </span>
            )}
          </div>

          <div className={this.props.classes.images_button}>
            {game.images ? (
              <Images items={game.images} onDelete={handleDeleteImage} />
            ) : null}
            <ImagesUpload onChange={handleChange('images')} />
          </div>

          <hr />
          <Button
            variant="contained"
            disabled={!this.state.formIsValid}
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>
      </Container>
    )
  }
}

export default withStyles(styles)(GameForm)
