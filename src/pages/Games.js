import React, { Component } from 'react'
import Table from '../components/Games/Table/Table'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'

class Games extends Component {
  state = {
    isOpenDeleteDialog: false,
    itemToDelete: null,
  }

  handleCreate = () => {
    this.props.history.push('/games/create')
  }

  handleEdit = id => {
    this.props.history.push(`/games/${id}`)
  }

  handleDelete = id => {
    this.setState({ itemToDelete: id, isOpenDeleteDialog: true })
  }

  handleDeleteAbort = () => {
    this.setState({ itemToDelete: null, isOpenDeleteDialog: false })
  }

  handleDeleteConfirm = id => {
    console.log(`deletion confirmed form item ${id}`)
  }

  render() {
    const { isOpenDeleteDialog: open, itemToDelete: id } = this.state
    const { handleCreate, handleEdit, handleDelete, handleDeleteAbort, handleDeleteConfirm } = this

    const dialog = (
      <Dialog open={open} onClose={handleDeleteAbort}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteAbort} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteConfirm(id)} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )

    return (
      <>
        {dialog}
        <Table onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} />
      </>
    )
  }
}

export default withRouter(Games)
