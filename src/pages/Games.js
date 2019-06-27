import React, { Component } from 'react'
import axios from '../axios-retrobits'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core'
import GamesTablePaginationActions from '../components/Games/GamesTablePaginationActions'

class Games extends Component {
  state = {
    games: [],
    loading: true,
    error: false,
    pagination: {},
    page: false,
    per_page: 10,
    last_page: false,
    platform: '',
    titleOrder: 'asc',
    search_text: false,
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const shouldFetch =
      (prevState.page !== undefined && prevState.page !== this.state.page) ||
      (prevState.per_page !== undefined &&
        prevState.per_page !== this.state.per_page) ||
      (prevState.platform !== undefined &&
        prevState.platform !== this.state.platform) ||
      (prevState.titleOrder !== undefined &&
        prevState.titleOrder !== this.state.titleOrder) ||
      (prevState.search_text !== undefined &&
        prevState.search_text !== this.state.search_text)

    if (shouldFetch) {
      this.fetch()
    }
  }

  combineFetchParams = () => {
    let params = {}

    if (this.state.page) {
      params = {
        ...params,
        page: this.state.page,
      }
    }

    if (this.state.per_page) {
      params = {
        ...params,
        page_size: this.state.per_page,
      }
    }

    if (this.state.platform) {
      params = {
        ...params,
        'filter[platform]': this.state.platform,
      }
    }

    if (this.state.titleOrder === 'asc') {
      params = {
        ...params,
        sort: 'title',
      }
    }

    if (this.state.titleOrder === 'desc') {
      params = {
        ...params,
        sort: '-title',
      }
    }

    if (this.state.search_text) {
      params = {
        ...params,
        'filter[title]': this.state.search_text,
      }
    }

    return params
  }

  fetch = () => {
    axios
      .get('games', {
        params: this.combineFetchParams(),
      })
      .then(response => {
        this.setState({
          games: response.data.data,
          pagination: {
            count: response.data.meta.total,
            page: response.data.meta.current_page,
            rowsPerPage: response.data.meta.per_page,
            last_page: response.data.meta.last_page,
            first: this.extractPageFromUrl(response.data.links.first),
            last: this.extractPageFromUrl(response.data.links.last),
            next: this.extractPageFromUrl(response.data.links.next),
            prev: this.extractPageFromUrl(response.data.links.prev),
          },
          loading: false,
          error: false,
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: false,
        })
      })
  }

  extractPageFromUrl = url => {
    if (url) {
      return new URL(url).searchParams.get('page')
    }

    return url
  }

  handleOnChangePage = page => {
    this.setState({
      page: page,
      loading: true,
    })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 1,
      per_page: event.target.value,
      loading: true,
    })
  }

  handlePlatformChange = event => {
    this.setState({
      page: 1,
      platform: event.target.value,
      loading: true,
    })
  }

  handleSortTitle = () => {
    this.setState({
      page: 1,
      titleOrder: this.state.titleOrder === 'asc' ? 'desc' : 'asc',
      loading: true,
    })
  }

  handleChangeSearch = event => {
    this.setState({
      page: 1,
      search_text: event.target.value,
    })
  }

  render() {
    const paginationActions = () => {
      return (
        <GamesTablePaginationActions
          clickedFirst={() =>
            this.handleOnChangePage(this.state.pagination.first)
          }
          clickedLast={() =>
            this.handleOnChangePage(this.state.pagination.last)
          }
          clickedNext={() =>
            this.handleOnChangePage(this.state.pagination.next)
          }
          clickedPrev={() =>
            this.handleOnChangePage(this.state.pagination.prev)
          }
          page={this.state.pagination.page}
          lastPage={this.state.pagination.last_page}
        />
      )
    }

    let table = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={this.state.titleOrder}
                onClick={this.handleSortTitle}
              >
                Title
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.games.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.platform.title}</TableCell>
              <TableCell>{row.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={this.state.pagination.count}
              page={this.state.pagination.page - 1}
              rowsPerPage={this.state.pagination.rowsPerPage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              onChangePage={this.handleOnChangePage}
              ActionsComponent={paginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )

    if (this.state.loading) {
      table = <p>Loading...</p>
    }

    let selector = (
      <FormControl>
        <InputLabel htmlFor="platform">Platform</InputLabel>
        <Select
          value={this.state.platform}
          onChange={this.handlePlatformChange}
          inputProps={{
            name: 'platform',
            id: 'platform',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'zx-spectrum'}>ZX-Spectrum</MenuItem>
          <MenuItem value={'nes'}>Nintendo</MenuItem>
          <MenuItem value={'snes'}>Super Nintendo</MenuItem>
          <MenuItem value={'sega'}>Sega Mega Drive</MenuItem>
        </Select>
      </FormControl>
    )

    return (
      <Paper>
        {selector}

        <Input
          value={this.search_text}
          placeholder={'search by title'}
          onChange={this.handleChangeSearch}
        />

        {table}
      </Paper>
    )
  }
}

export default Games
