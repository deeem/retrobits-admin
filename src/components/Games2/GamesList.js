import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from '../../axios-retrobits'
import GamesTable from './Table'
import PlatformSelector from './PlatformSelector'
import { extractPageParamFromUrl } from '../helpers'

class GamesList extends Component {
  state = {
    params: {
      page: false,
      per_page: false,
      platform: false,
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

    if (stateParams.platform) {
      params = {
        ...params,
        'filter[platform]': stateParams.platform,
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
      (prevState.params.platform !== undefined &&
        prevState.params.platform !== this.state.params.platform)

    if (shouldFetch) {
      this.fetchGames()
    }
  }

  handleOnChangePage = page => {
    this.setState({
      params: {
        ...this.state.params,
        page,
      },
      // loading: true,
    })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        per_page: event.target.value,
      },
      //   loading: true,
    })
  }

  handleChangePlatform = event => {
    console.log('platform change fired')
    this.setState({
      params: {
        ...this.state.params,
        page: 1,
        platform: event.target.value,
      },

      loading: true,
    })
  }

  render() {
    const { games, pagination } = this.state
    const { platforms } = this.props

    return (
      <>
        <PlatformSelector
          options={platforms}
          value={this.state.params.platform}
          onChange={this.handleChangePlatform}
        />

        {games.length && (
          <GamesTable
            games={games}
            pagination={pagination}
            onChangePage={this.handleOnChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </>
    )
  }
}

GamesList.propTypes = {
  platforms: PropTypes.array.isRequired,
}

export default GamesList
