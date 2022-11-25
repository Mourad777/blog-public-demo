import React from 'react'
import { Icon } from 'semantic-ui-react'

const SearchInput = ({ searchValue, handleSearchValue }) => {

    return (
        <div  className="search-box">
            <button className="btn-search"><Icon name="search" /></button>
            <input value={searchValue} onChange={handleSearchValue} type="text" className="input-search" placeholder="Type to Search..."></input>
        </div>
    )
}

export default SearchInput;