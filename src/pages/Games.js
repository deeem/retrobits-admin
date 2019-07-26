import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'
import FetchGames from '../components/Games/Fetch/FetchGames'

class Games extends Component {
  platforms = [
    { id: 1, slug: 'zx', title: 'ZX-Spectrum' },
    { id: 2, slug: 'nes', title: 'Nes' },
    { id: 3, slug: 'snes', title: 'SNES' },
    { id: 4, slug: 'smd', title: 'SEGA' },
  ]

  state = {
    isOpenDeleteDialog: false,
    itemToDelete: null,
  }

  onCreate = () => {
    this.props.history.push('/games/create')
  }

  onEdit = id => {
    this.props.history.push(`/games/${id}`)
  }

  onDelete = id => {
    this.setState({ itemToDelete: id, isOpenDeleteDialog: true })
  }

  onDeleteAbort = () => {
    this.setState({ itemToDelete: null, isOpenDeleteDialog: false })
  }

  onDeleteConfirm = id => {
    console.log(`deletion confirmed form item ${id}`)
  }

  render() {
    const { isOpenDeleteDialog: open, itemToDelete: id } = this.state
    const { platforms } = this

    const dialog = (
      <Dialog open={open} onClose={this.onDeleteAbort}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogActions>
          <Button onClick={this.onDeleteAbort} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => this.onDeleteConfirm(id)}
            color="secondary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )

    return (
      <>
        {dialog}
        <FetchGames
          platforms={platforms}
          onCreate={this.onCreate}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
        />
      </>
    )
  }
}

Games.propTypes = {}

export default withRouter(Games)
