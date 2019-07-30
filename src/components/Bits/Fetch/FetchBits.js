import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  fetchPaginated,
  shouldFetch,
  updateParams,
} from '../../../axios-retrobits'
import BitsTable from './BitsTable'

const styles = theme => ({
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const combineFetchParams = ({ page, per_page }) => {
  let params = {}

  page && (params = { ...params, page })

  per_page && (params = { ...params, page_size: per_page })

  return params
}

class FetchBits extends Component {
  state = {
    params: {
      page: false,
      per_page: false,
    },
    data: [],
    pagination: {},
  }

  fetchData = async () => {
    const res = await fetchPaginated(
      'bits',
      combineFetchParams(this.state.params),
    )

    this.setState(res)
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (shouldFetch(prevState.params, this.state.params)) {
      this.fetchData()
    }
  }

  onChangePage = page =>
    this.setState({ params: updateParams(this.state.params, { page }, false) })

  onChangeRowsPerPage = event =>
    this.setState({
      params: updateParams(this.state.params, { per_page: event.target.value }),
    })

  render() {
    const {
      data,
      pagination,
      params: { platform },
    } = this.state
    const { platforms, onEdit, onDelete } = this.props

    return (
      <Paper>
        {data.length && (
          <BitsTable
            data={data}
            pagination={pagination}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </Paper>
    )
  }
}

FetchBits.propTypes = {
  platforms: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default withStyles(styles)(FetchBits)
