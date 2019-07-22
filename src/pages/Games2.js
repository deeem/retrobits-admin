import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from '../axios-retrobits'
import GamesTable from '../components/Games2/Table'
import { extractPageParamFromUrl } from '../components/helpers'

/*
 * store: query params
 * handle create, delete, edit, updateQueryPara
 * render dialog, table
 */

class Games2 extends Component {
  state = {
    params: {
        page: false,
        per_page: false,
    },
    games: [],
    pagination: {},
  }

  fetchGames = () => {
    axios
      .get('games')
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

   handleOnChangePage = (value) => {
    console.log('fired change page ' + value)
  }

   handleChangeRowsPerPage = () => {
    console.log('fired change per page')
  }

  render() {
    return (
      <>
        {this.state.games.length && (
          <GamesTable
            games={this.state.games}
            pagination={this.state.pagination}
            onChangePage={this.handleOnChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </>
    )
  }
}

Games2.propTypes = {}

export default Games2
