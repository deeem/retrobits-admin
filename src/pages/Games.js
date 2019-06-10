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
    pagination: {}
  };

  componentDidMount() {
    this.fetchGames();
  }

  fetchGames = params => {
    Axios.get("http://127.0.0.1:8000/api/admin/games", { params })
      .then(response => {
        this.setState({
          games: response.data.data,
          pagination: {
            count: response.data.meta.total,
            page: response.data.meta.current_page,
            rowsPerPage: response.data.meta.per_page,
            first: response.data.links.first,
            last: response.data.links.last,
            next: response.data.links.next,
            prev: response.data.links.prev
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

  handlePaginate = url => {
    if (url) {
      this.setState({ loading: true });

      const page = new URL(url).searchParams.get("page");
      this.fetchGames({ page });
    }
  };

  render() {
    const paginationActions = () => {
      return (
        <GamesTablePaginationActions
          clickedFirst={() => this.handlePaginate(this.state.pagination.first)}
          clickedLast={() => this.handlePaginate(this.state.pagination.last)}
          clickedNext={() => this.handlePaginate(this.state.pagination.next)}
          clickedPrev={() => this.handlePaginate(this.state.pagination.prev)}
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
              ActionsComponent={paginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    );

    if (this.state.loading) {
        table = (<p>Loading...</p>);
    }

    return <Paper>
        {table}
    </Paper>;
  }
}

export default Games;
