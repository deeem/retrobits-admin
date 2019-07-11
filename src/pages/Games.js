import React, { Component } from 'react'
import Table from '../components/Games/Table/Table'
import { withRouter } from "react-router-dom";

class Games extends Component {

  handleEdit = (id) => {
    this.props.history.push(`/games/${id}`);
  }

  handleDelete = (id) => {
    console.log(id);
  }

  render() {
    return <Table onEdit={this.handleEdit} onDelete={this.handleDelete} />
  }
}


export default withRouter(Games)
