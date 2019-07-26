import React, { Component } from 'react'
import axios from '../axios-retrobits'
import Form from '../components/Games/Modify/Form'

class GameEdit extends Component {
  platforms = [
    { id: 1, slug: 'zx', title: 'ZX-Spectrum' },
    { id: 2, slug: 'nes', title: 'Nes' },
    { id: 3, slug: 'snes', title: 'SNES' },
    { id: 4, slug: 'smd', title: 'SEGA' },
  ]

  state = {
    game: {},
    loading: true,
    error: false,
    mode: '',
  }

  componentDidMount() {
    const id = this.props.match.params.id

    if (id !== 'create') {
      axios
        .get(`games/${id}`)
        .then(response => {
          this.setState({
            game: response.data.data,
            mode: 'edit',
            loading: false,
          })
        })
        .catch(error => {
          this.setState({ loading: false, mode: 'edit', error: true })
          console.log(error)
        })
    } else {
      this.setState({ loading: false, mode: 'create' })
    }
  }

  handleDeleteImage = id => {
    console.log(id)
  }

  handleSubmit = ({ title, description, platform, rom_file, images }) => {
    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    data.append('platform', platform)
    if (rom_file) {
      data.append('rom', rom_file)
    }

    if (images) {
      const imagesArray = Array.from(images)
      imagesArray.forEach((file, i) => {
        data.append('images[]', file)
      })
    }

    let url = ''
    if (this.state.mode === 'create') {
      url = 'games'
    } else {
      data.append('_method', 'PATCH')
      url = `games/${this.state.game.id}`
    }

    axios
      .post(url, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { game, mode, loading } = this.state

    let form = null

    if (loading === false && mode === 'create') {
      form = (
        <Form
          platforms={this.platforms}
          onSubmit={this.handleSubmit}
          onDeleteImage={this.handleDeleteImage}
        />
      )
    } else if (loading === false && mode === 'edit') {
      form = (
        <Form
          platforms={this.platforms}
          title={game.title}
          description={game.description}
          platform={game.platform.slug}
          rom={game.rom}
          images={game.images}
          onSubmit={this.handleSubmit}
          onDeleteImage={this.handleDeleteImage}
        />
      )
    }

    return <>{form}</>
  }
}

export default GameEdit
