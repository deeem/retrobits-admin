import React from "react";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

function GamesTablePaginationActions(props) {
  const {
    page,
    lastPage,
    clickedFirst,
    clickedPrev,
    clickedNext,
    clickedLast
  } = props;
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
  );
}

export default GamesTablePaginationActions;
