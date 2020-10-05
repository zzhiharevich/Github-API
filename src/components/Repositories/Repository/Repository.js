import React from 'react';
import classes from './Repository.module.css';

const repository = (props) => {
    return (
        <div className={classes.Repository}>
            <strong>Name</strong>: {props.repInfo.name}<br />
            <strong>Owner</strong>: {props.repInfo.owner}<br />
            <strong>URL</strong>: <a href={props.repInfo.url}>{props.repInfo.url}</a><br />
            <strong>Language</strong>: {props.repInfo.language}<br />
            <strong>Stars</strong>: {props.repInfo.stars}<br />
        </div>
    );
}

export default repository;