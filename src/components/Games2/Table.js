import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  IconButton,
} from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import TablePaginationActions from './TablePaginationActions'
import PropTypes from 'prop-types'

const GamesTable = props => {


  const handleOnChangePage = () => {
    console.log('fired')
  }

  const handleChangeRowsPerPage = () => {
    console.log('fired2')
  }

  const { games, pagination } = props

  const paginationActionsWrapper = () => {
    return (
        <TablePaginationActions
        clickedFirst={() => handleOnChangePage(pagination.first)}
        clickedLast={() => handleOnChangePage(pagination.last)}
        clickedNext={() => handleOnChangePage(pagination.next)}
        clickedPrev={() => handleOnChangePage(pagination.prev)}
        page={pagination.page}
        lastPage={pagination.last_page}
      />
    )
  }

  let table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">Platform</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map(row => (
          <TableRow key={row.id}>
            <TableCell align="right">{row.platform.title}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell style={{ width: '130px' }}>
              {/* <IconButton onClick={() => this.props.onDelete(row.id)}>
                <DeleteIcon color="secondary" />
              </IconButton>
              <IconButton onClick={() => this.props.onEdit(row.id)}>
                <EditIcon color="primary" />
              </IconButton> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            count={pagination.count}
            page={pagination.page - 1}
            rowsPerPage={pagination.rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleOnChangePage}
            ActionsComponent={paginationActionsWrapper}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )

  // if (!games.length) {
  //   table = <p>Loading...</p>
  // }

  return <Paper>{table}</Paper>
}

/*
    props:
    * games (if games == null => loading???)
    * isLoading
    * pagination object
    * ---
    * onChangePerRows
    * onChangePage
 */

GamesTable.propTypes = {
  games: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
}

export default GamesTable
