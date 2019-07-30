import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FetchBits from '../components/Bits/Fetch/FetchBits'

const platforms = [
  { id: 1, slug: 'zx', title: 'ZX-Spectrum' },
  { id: 2, slug: 'nes', title: 'Nes' },
  { id: 3, slug: 'snes', title: 'SNES' },
  { id: 4, slug: 'smd', title: 'SEGA' },
]

class Bits extends Component {
  onEdit = id => {
    console.log('edit')
  }

  onDelete = id => {
    console.log('delete')
  }

  render() {
    return (
      <>
        <FetchBits
          platforms={platforms}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
      </>
    )
  }
}

export default Bits
