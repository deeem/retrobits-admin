import React from 'react'
import PropTypes from 'prop-types'

const Images = ({ items, onDelete }) => {
  return (
    <>
      {items.map(image => (
        <img
          key={image.id}
          src={image.url}
          onClick={() => onDelete(image.id)}
        />
      ))}
    </>
  )
}

export default Images

Images.propTypes = {
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
}
