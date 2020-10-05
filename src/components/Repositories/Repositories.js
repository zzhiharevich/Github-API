import React from 'react';
import Repository from './Repository/Repository';
import classes from './Repositories.module.css';

const repositories = (props) => {
    return (
        <div className={classes.Repositories}>
            {props.repos.map(repo => (
                <Repository repInfo={repo} key={repo.id} />
            ))}
        </div>
    );
}

export default repositories;