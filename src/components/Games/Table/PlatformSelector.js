import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const PlatformSelector = ({ value, onChange }) => {
  return (
    <FormControl>
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}