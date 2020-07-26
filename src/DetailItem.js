import React from 'react';
import PropTypes from 'prop-types';
import './DetailItem.css';

function DetailItem({ title, backgroundImage, index }) {
    const titleArr = title.split('');
    for (let i = 0; i < titleArr.length; i++) {
        if (titleArr[i].charCodeAt() === 32) {
            titleArr[i] = '　';
        }
    }
    return (
        <li className={index === 0 ? "detail-item active" : "detail-item"}>
            <div className="headline">
                {titleArr.map((char, i) => {
                    return (
                        <DetailItemLetter char={char} key={i} />
                    );
                })}
            </div>
            <div className="background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        </li>
    )
}

function DetailItemLetter({ char }) {
    const classVar = char.charCodeAt() === 12288 ? "letter space-char" : "letter";
    return <span className={classVar}>{char}</span>
}

DetailItem.propTypes = {
    backgroundImage: PropTypes.string.isRequired
}

export default DetailItem