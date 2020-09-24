import React from 'react';
import './style.scss';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const LikeButton = ({like, count, onLikeChange}) => {
    return (
        <div className="Like">
            <div key={Math.random()} className={`LikeButton${!like ? '_not' : ''}`} onClick={()=>{onLikeChange(!like)}}>
                {like && <i className="fas fa-heart"></i>}
                {!like && <i className="far fa-heart"></i>}
            </div>
            <div className="Like__count">
                {count >= 1000000 ? '+999,999 ' : numberWithCommas(count)+' '}
                명이 좋아합니다.
            </div>
        </div>
    )
}

export default LikeButton;