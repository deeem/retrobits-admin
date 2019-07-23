import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {
  fetchPaginated,
  shouldFetch,
  updateParams,
} from '../../axios-retrobits'
import GamesTable from './GamesTable'
import PlatformSelector from './PlatformSelector'
import SearchField from './SearchField'

const styles = theme => ({
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

const combineFetchParams = ({
  page,
  per_page,
  platform,
  titleOrder,
  search_text,
}) => {
  let params = {}

  page && (params = { ...params, page })

  per_page && (params = { ...params, page_size: per_page })

  platform && (params = { ...params, 'filter[platform]': platform })

  params =
    titleOrder === 'asc'
      ? { ...params, sort: 'title' }
      : { ...params, sort: '-title' }

  search_text && (params = { ...params, 'filter[title]': search_text })

  return params
}

class FetchGames extends Component {
  state = {
    params: {
      page: false,
      per_page: false,
      titleOrder: 'asc',
      platform: '',
      search_text: '',
    },
    data: [],
    pagination: {},
  }

  fetchGames = async () => {
    const res = await fetchPaginated(
      'games',
      combineFetchParams(this.state.params),
    )

    this.setState(res)
  }

  componentDidMount() {
    this.fetchGames()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (shouldFetch(prevState.params, this.state.params)) {
      this.fetchGames()
    }
  }

  onChangePage = page =>
    this.setState({ params: updateParams(this.state.params, { page }, false) })

  onChangeRowsPerPage = event =>
    this.setState({
      params: updateParams(this.state.params, { per_page: event.target.value }),
    })

  onSortTitle = () =>
    this.setState({
      params: updateParams(this.state.params, {
        titleOrder: this.state.params.titleOrder === 'asc' ? 'desc' : 'asc',
      }),
    })

  onChangePlatform = event =>
    this.setState({
      params: updateParams(this.state.params, { platform: event.target.value }),
    })

  onChangeSearch = event =>
    this.setState({
      params: updateParams(this.state.params, {
        search_text: event.target.value,
      }),
    })

  render() {
    const {
      data,
      pagination,
      params: { platform, search_text, titleOrder },
    } = this.state
    const { platforms } = this.props

    return (
      <Paper>
        <div className={this.props.classes.actionBar}>
          <PlatformSelector
            options={platforms}
            value={platform}
            onChange={this.onChangePlatform}
          />

          <SearchField value={search_text} onChange={this.onChangeSearch} />
        </div>

        {data.length && (
          <GamesTable
            games={data}
            pagination={pagination}
            onChangePage={this.onChangePage}
            onChangeRowsPerPage={this.onChangeRowsPerPage}
            titleSortOrder={titleOrder}
            onSortTitle={this.onSortTitle}
          />
        )}
      </Paper>
    )
  }
}

FetchGames.propTypes = {
  platforms: PropTypes.array.isRequired,
}

export default withStyles(styles)(FetchGames)
