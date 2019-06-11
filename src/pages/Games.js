import React, { Component } from "react";
import Axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination
} from "@material-ui/core";
import GamesTablePaginationActions from "../components/Games/GamesTablePaginationActions";

class Games extends Component {
  state = {
    games: [],
    loading: true,
    error: false,
    pagination: {},
    page: false,
    per_page: 10
  };

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const shouldFetch =
      (prevState.page !== undefined && prevState.page !== this.state.page) ||
      (prevState.per_page !== undefined &&
        prevState.per_page !== this.state.per_page);

    if (shouldFetch) {
      this.fetch();
    }
  }

  combineFetchParams = () => {
    let params = {};

    if (this.state.page) {
      params = {
        ...params,
        page: this.state.page
      };
    }

    if (this.state.per_page) {
      params = {
        ...params,
        page_size: this.state.per_page
      };
    }

    return params;
  };

  fetch = () => {
    Axios.get("http://127.0.0.1:8000/api/admin/games", {
      params: this.combineFetchParams()
    })
      .then(response => {
        this.setState({
          games: response.data.data,
          pagination: {
            count: response.data.meta.total,
            page: response.data.meta.current_page,
            rowsPerPage: response.data.meta.per_page,
            first: this.extractPageFromUrl(response.data.links.first),
            last: this.extractPageFromUrl(response.data.links.last),
            next: this.extractPageFromUrl(response.data.links.next),
            prev: this.extractPageFromUrl(response.data.links.prev)
          },
          loading: false,
          error: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: false
        });
      });
  };

  extractPageFromUrl = url => {
    if (url) {
      return new URL(url).searchParams.get("page");
    }

    return url;
  };

  handleOnChangePage = page => {
    this.setState({
      page: page,
      loading: true
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 1,
      per_page: event.target.value
    });
  };

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
        />
      );
    };

    let table = (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Platform</TableCell>
            <TableCell>Title</TableCell>
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
              page={this.state.pagination.page}
              rowsPerPage={this.state.pagination.rowsPerPage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              onChangePage={this.handleOnChangePage}
              ActionsComponent={paginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );

    if (this.state.loading) {
      table = <p>Loading...</p>;
    }

    return <Paper>{table}</Paper>;
  }
}

export default Games;
