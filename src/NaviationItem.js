import React from 'react';
import PropTypes from 'prop-types';
import './NaviationItem.css';

function NaviationItem({poster,rotate,index}){
    return (
        <li className={index == 0 ? "navigation-item active" : "navigation-item"}>
            <span className="rotate-holder">{rotate}</span>
            <span className="background-holder" style={{ backgroundImage: `url(${poster})` }}></span>
        </li>
    )
}

NaviationItem.propTypes = {
    poster: PropTypes.string.isRequired
}

export default NaviationItem