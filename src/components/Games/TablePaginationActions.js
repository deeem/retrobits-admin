import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import PropTypes from 'prop-types'

const paginationActionsWrapper = (pagination, onChangePage) => {
  return (
    <TablePaginationActions
      pagination={pagination}
      onPageChange={onChangePage}
    />
  )
}

const TablePaginationActions = ({
  pagination: { first, next, last, last_page, page },
  onPageChange,
}) => {
  return (
    <>
      <IconButton onClick={() => onPageChange(first)} disabled={page === 1}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={() => onPageChange(last)} disabled={page === 1}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(next)}
        disabled={page === last_page}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => onPageChange(last)}
        disabled={page === last_page}
      >
        <LastPageIcon />
      </IconButton>
    </>
  )
}

export default paginationActionsWrapper

TablePaginationActions.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
}
