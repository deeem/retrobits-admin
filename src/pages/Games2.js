import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FetchGames from '../components/Games2/FetchGames'

class Games2 extends Component {
  platforms = [
      {id: 1, slug: 'zx', title: 'ZX-Spectrum'},
      {id: 2, slug: 'nes', title: 'Nes'},
      {id: 3, slug: 'snes', title: 'SNES'},
      {id: 4, slug: 'smd', title: 'SEGA'},
  ]

  render() {
    return (
      <>
        <FetchGames platforms={this.platforms} />
      </>
    )
  }
}

Games2.propTypes = {}

export default Games2
