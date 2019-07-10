import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, Input } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const SearchField = props => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <Input
        value={props.value}
        placeholder={'search by title'}
        onChange={props.onChange}
        endAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default SearchField

SearchField.prototypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
