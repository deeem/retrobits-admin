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
  TableSortLabel,
  IconButton,
} from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import paginationActionsWrapper from '../../Shared/TablePaginationActions'
import PropTypes from 'prop-types'

const BitsTable = ({
  data,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  onEdit,
  onDelete,
}) => {
  let table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">Platform</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Game</TableCell>
          <TableCell>Players</TableCell>
          <TableCell>Difficult</TableCell>
          <TableCell>Rating</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(row => (
          <TableRow key={row.id}>
            <TableCell align="right">{row.game.platform.title}</TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{row.game.title}</TableCell>
            <TableCell>{row.players}</TableCell>
            <TableCell>{row.difficult}</TableCell>
            <TableCell>{row.rating}</TableCell>

            <TableCell style={{ width: '130px' }}>
              <IconButton onClick={() => onDelete(row.id)}>
                <DeleteIcon color="secondary" />
              </IconButton>
              <IconButton onClick={() => onEdit(row.id)}>
                <EditIcon color="primary" />
              </IconButton>
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
            onChangeRowsPerPage={onChangeRowsPerPage}
            onChangePage={onChangePage}
            ActionsComponent={() =>
              paginationActionsWrapper(pagination, onChangePage)
            }
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
  return <Paper>{table}</Paper>
}

BitsTable.propTypes = {
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default BitsTable
