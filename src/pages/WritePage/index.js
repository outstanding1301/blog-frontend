import React from 'react';
import Header from '@components/common/Header';
import Editor from '@components/common/Editor';

const WritePage = (props) => {
    return (
        <div style={{height:"100vh"}}>
            <Header/>
            <Editor/>
        </div>
    )
}

export default WritePage;