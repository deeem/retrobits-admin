import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

function TablePaginationActions(props) {
  const {
    page,
    firstPage,
    lastPage,
    nextPage,
    prevPage,
    changePage,
  } = props;
  return (
    <>
      <IconButton onClick={(event) => changePage(event, firstPage)} disabled={page === 1}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={(event) => changePage(event, prevPage)} disabled={page === 1}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={(event) => changePage(event, nextPage)} disabled={page === lastPage}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton onClick={(event) => changePage(event, lastPage)} disabled={page === lastPage}>
        <LastPageIcon />
      </IconButton>
    </>
  );
}

export default TablePaginationActions;
