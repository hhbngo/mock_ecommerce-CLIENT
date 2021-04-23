import React from 'react';
import classes from './Loading.module.css';

const Loading = ({height}) => {
    return <div className={classes.container} style={{minHeight: height}}>
        <div className={classes.spinner}></div>
    </div>
};

export default Loading;