import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import PropTypes from 'prop-types'

function TablePaginationActions({
  page,
  lastPage,
  clickedFirst,
  clickedPrev,
  clickedNext,
  clickedLast,
}) {
  return (
    <>
      <IconButton onClick={clickedFirst} disabled={page === 1}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={clickedPrev} disabled={page === 1}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={clickedNext} disabled={page === lastPage}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={clickedLast} disabled={page === lastPage}>
        <LastPageIcon />
      </IconButton>
    </>
  )
}

export default TablePaginationActions

TablePaginationActions.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  clickedFirst: PropTypes.func.isRequired,
  clickedPrev: PropTypes.func.isRequired,
  clickedNext: PropTypes.func.isRequired,
  clickedLast: PropTypes.func.isRequired,
}
