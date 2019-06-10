import React from "react";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

function GamesTablePaginationActions(props) {
  return (
    <>
      <IconButton
        onClick={props.clickedFirst}
        // disabled={page === 0}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={props.clickedPrev}
        // disabled={page === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={props.clickedNext}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={props.clickedLast}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      >
        <LastPageIcon />
      </IconButton>
    </>
  );
}

export default GamesTablePaginationActions;
