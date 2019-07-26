import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, MenuItem, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const PlatformSelector = ({ options, value, onChange }) => {
  const classes = useStyles()

  return (
    <>
      <FormControl className={classes.formControl}>
        <TextField
          //   className={classes.platform}
          select
          label="select"
          value={value}
          helperText="Please select game platform"
          margin="normal"
          onChange={onChange}
        >
          {options.map(option => (
            <MenuItem key={option.id} value={option.slug}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </>
  )
}

export default PlatformSelector

PlatformSelector.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
