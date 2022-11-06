import React from 'react';
import classes from './SearchBar.module.css';

const { searchContainer } = classes;

const SearchBar = ({change}) => {
    return (
        <input
            className={searchContainer}
            type="text"
            placeholder='Search...'
            onChange={change}
        />
    );
};


export default SearchBar;