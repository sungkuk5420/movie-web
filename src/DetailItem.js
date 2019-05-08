import React from 'react';
import PropTypes from 'prop-types';
import './DetailItem.css';

function DetailItem({title,backgroundImage}){
    const titleArr = title.split('');
    console.log(titleArr)
    return (
        <li className="detail-item">
            <div className="headline">
            {titleArr.map((char, i) => {
                return (<DetailItemLetter
                        char={char}
                        key={i}/>);
            })}

            </div>
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </li>
    )
}

function DetailItemLetter({char}){
    return <span className="letter">{char}</span>
}

DetailItem.propTypes = {
    backgroundImage: PropTypes.string.isRequired
}

export default DetailItem