import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const PlatformSelector = ({ value, onChange }) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="platform">Platform</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        inputProps={{
          name: 'platform',
          id: 'platform',
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'zx-spectrum'}>ZX-Spectrum</MenuItem>
        <MenuItem value={'nes'}>Nintendo</MenuItem>
        <MenuItem value={'snes'}>Super Nintendo</MenuItem>
        <MenuItem value={'sega'}>Sega Mega Drive</MenuItem>
      </Select>
    </FormControl>
  )
}

export default PlatformSelector

PlatformSelector.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
