import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import SearchSmartPhone from './SearchSmartPhone'
import axios from 'axios';
function Search (props) {
    const location = useLocation();
    const searchResults = (data) => {
        props.searchResults(data);
    }
    if (location.pathname === '/smartphones') {
        return (
            <div><SearchSmartPhone searchResults={searchResults} /></div>
        )
    }
    else if (location.pathname === '/products') {
        return (
            <div><SearchProduct searchResults={searchResults} /></div>
        )
    }
    else {
        return (
            <div>
                <h4>Page Not Found...</h4>
            </div>
        )
    }

}

export default Search;