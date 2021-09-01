import React from 'react'

const SearchField = (props) => {
    return (
      <>
        <label htmlFor="filter-field">Search for: </label>
        <input type='text' name='filter-field' onChange = {props.handleSearch}></input>
      </>
    )
}

export default SearchField