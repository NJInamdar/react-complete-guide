import React from 'react';
import classes from './Person.css';

//recommended to use functional components instead of extending them to components
const Person = (props) => {
    //keep in mind to write className in the syntax, instead of class
    return (
        <div className=   {classes.Person}>
        <p onClick={props.click}>I'm a {props.name} I am {props.age} years old</p>
            <p>{props.children}</p>
            <input type="readonly" onChange={props.changed} value={props.name} />
        </div>
    );
};

export default Person;