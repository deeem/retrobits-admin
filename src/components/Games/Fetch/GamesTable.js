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
import paginationActionsWrapper from './TablePaginationActions'
import PropTypes from 'prop-types'

const GamesTable = ({
  games,
  pagination,
  onChangePage,
  onChangeRowsPerPage,
  titleSortOrder,
  onSortTitle,
  onEdit,
  onDelete,
}) => {
  let table = (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="right">Platform</TableCell>
          <TableCell>
            <TableSortLabel
              active={true}
              direction={titleSortOrder}
              onClick={onSortTitle}
            >
              Title
            </TableSortLabel>
          </TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map(row => (
          <TableRow key={row.id}>
            <TableCell align="right">{row.platform.title}</TableCell>
            <TableCell>{row.title}</TableCell>
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

GamesTable.propTypes = {
  games: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  titleSortOrder: PropTypes.string.isRequired,
  onSortTitle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default GamesTable
