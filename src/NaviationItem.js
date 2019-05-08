import React from 'react';
import PropTypes from 'prop-types';
import './NaviationItem.css';

function NaviationItem({poster}){
    return (
        <li className="navigation-item">
            <span className="rotate-holder"></span>
            <span className="background-holder" style={{ backgroundImage: `url(${poster})` }}></span>
        </li>
    )
}

NaviationItem.propTypes = {
    poster: PropTypes.string.isRequired
}

export default NaviationItem