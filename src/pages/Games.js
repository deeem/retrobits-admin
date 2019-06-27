import React, { Component } from 'react'
import Table from '../components/Games/Table/Table'

class Games extends Component {
  state = {
    editMode: false,
    game: {},
  }

  handleEdit = (id) => {
    console.log(id);
  }

  handleDelete = (id) => {
    console.log(id);
  }

  render() {
    return <Table onEdit={this.handleEdit} onDelete={this.handleDelete} />
  }
}

export default Games
