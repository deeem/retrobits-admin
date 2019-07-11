import React, { Component } from 'react'
import axios from '../../../axios-retrobits'
import { withStyles } from '@material-ui/core/styles'
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
  IconButton,
} from '@material-ui/core'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import TablePaginationActions from './TablePaginationActions'
import { extractPageParamFromUrl } from '../../helpers'
import PlatformSelector from './PlatformSelector'
import SearchField from './SearchField'

const styles = theme => ({
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

class GamesTable extends Component {
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
    search_text: '',
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
            first: extractPageParamFromUrl(response.data.links.first),
            last: extractPageParamFromUrl(response.data.links.last),
            next: extractPageParamFromUrl(response.data.links.next),
            prev: extractPageParamFromUrl(response.data.links.prev),
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

  handleOnChangePage = page =>
    this.setState({
      page: page,
      loading: true,
    })

  handleChangeRowsPerPage = event =>
    this.setState({
      page: 1,
      per_page: event.target.value,
      loading: true,
    })

  handlePlatformChange = event =>
    this.setState({
      page: 1,
      platform: event.target.value,
      loading: true,
    })

  handleSortTitle = () =>
    this.setState({
      page: 1,
      titleOrder: this.state.titleOrder === 'asc' ? 'desc' : 'asc',
      loading: true,
    })

  handleChangeSearch = event =>
    this.setState({
      page: 1,
      search_text: event.target.value,
    })

  render() {
    const paginationActionsWrapper = () => {
      return (
        <TablePaginationActions
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
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.games.map(row => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.platform.title}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell style={{ width: '130px' }}>
                <IconButton onClick={() => this.props.onDelete(row.id)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
                <IconButton onClick={() => this.props.onEdit(row.id)}>
                  <EditIcon color="primary" />
                </IconButton>
              </TableCell>
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
              ActionsComponent={paginationActionsWrapper}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )

    if (this.state.loading) {
      table = <p>Loading...</p>
    }

    return (
      <Paper>
        <div className={this.props.classes.actionBar}>
          <PlatformSelector
            value={this.state.platform}
            onChange={this.handlePlatformChange}
          />

          <SearchField
            value={this.state.search_text}
            onChange={this.handleChangeSearch}
          />

          <IconButton onClick={this.props.onCreate}>
            <AddIcon />
          </IconButton>
        </div>

        {table}
      </Paper>
    )
  }
}

export default withStyles(styles)(GamesTable)
