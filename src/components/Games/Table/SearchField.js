import React from 'react'
import PropTypes from 'prop-types'
import { Input } from '@material-ui/core'

const SearchField = (props) => {
  return (
    <Input
      value={props.value}
      placeholder={'search by title'}
      onChange={props.onChange}
    />
  )
}

export default SearchField

SearchField.prototypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
