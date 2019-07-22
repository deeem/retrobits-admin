import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import axios from '../../axios-retrobits'
import GamesTable from './Table'
import PlatformSelector from './PlatformSelector'
import SearchField from './SearchField'
import { extractPageParamFromUrl } from '../helpers'

const styles = theme => ({
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

class GamesList extends Component {
  state = {
    params: {
      page: false,
      per_page: false,
      titleOrder: 'desc',
      platform: false,
      search_text: '',
    },
    games: [],
    pagination: {},
  }

  combineFetchParams = stateParams => {
    let params = {}

    if (stateParams.page) {
      params = {
        ...params,
        page: stateParams.page,
      }
    }

    if (stateParams.per_page) {
      params = {
        ...params,
        page_size: stateParams.per_page,
      }
    }

    if (stateParams.titleOrder === 'asc') {
      params = {
        ...params,
        sort: 'title',
      }
    }

    if (stateParams.titleOrder === 'desc') {
      params = {
        ...params,
        sort: '-title',
      }
    }

    if (stateParams.platform) {
      params = {
        ...params,
        'filter[platform]': stateParams.platform,
      }
    }

    if (stateParams.search_text) {
      params = {
        ...params,
        'filter[title]': stateParams.search_text,
      }
    }

    return params
  }

  fetchGames = () => {
    axios
      .get('games', { params: this.combineFetchParams(this.state.params) })
      .then(response => {
        this.setState({
          games: response.data.data,
          pagination: {
            count: response.data.meta.total,
            page: response.data.meta.current_page,
            rowsPerPage: response.data.meta.per_page,
            last_page: response.data.meta.last_page,
            first: extractPageParamFromUrl(response.data.links.first),
            last: extractPageParamFromUrl(response.data.links.last),
            next: extractPageParamFromUrl(response.data.links.next),
            prev: extractPageParamFromUrl(response.data.links.prev),
          },
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.fetchGames()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const shouldFetch =
      (prevState.params.page !== undefined &&
        prevState.params.page !== this.state.params.page) ||
      (prevState.params.per_page !== undefined &&
        prevState.params.per_page !== this.state.params.per_page) ||
      (prevState.params.titleOrder !== undefined &&
        prevState.params.titleOrder !== this.state.params.titleOrder) ||
      (prevState.params.platform !== undefined &&
        prevState.params.platform !== this.state.params.platform) ||
      (prevState.params.search_text !== undefined &&
        prevState.params.search_text !== this.state.params.search_text)

    if (shouldFetch) {
      this.fetchGames()
    }
  }

  handleOnChangePage = page =>
    this.setState({
      params: {
        ...this.state.params,
        page,
      },
      // loading: true,
    })

  handleChangeRowsPerPage = event =>
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        per_page: event.target.value,
      },
      //   loading: true,
    })

  handleSortTitle = () =>
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        titleOrder: this.state.params.titleOrder === 'asc' ? 'desc' : 'asc',
      },
      //   loading: true,
    })

  handleChangePlatform = event =>
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        platform: event.target.value,
      },
      //   loading: true,
    })

  handleChangeSearch = event =>
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        search_text: event.target.value,
      },
    })

  render() {
    const { games, pagination } = this.state
    const { platforms } = this.props

    return (
      <Paper>
        <div className={this.props.classes.actionBar}>
          <PlatformSelector
            options={platforms}
            value={this.state.params.platform}
            onChange={this.handleChangePlatform}
          />

          <SearchField
            value={this.state.search_text}
            onChange={this.handleChangeSearch}
          />
        </div>

        {games.length && (
          <GamesTable
            games={games}
            pagination={pagination}
            onChangePage={this.handleOnChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            titleSortOrder={this.state.params.titleOrder}
            onSortTitle={this.handleSortTitle}
          />
        )}
      </Paper>
    )
  }
}

GamesList.propTypes = {
  platforms: PropTypes.array.isRequired,
}

export default withStyles(styles)(GamesList)
