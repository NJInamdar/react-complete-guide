import React, {Component} from 'react';
import classes from './App.css'; //modular css imported using webpack config changes

import Persons from '../components/Persons/Persons'


class App extends Component {
    //state is used to pass dynamic data to components
    //it should be used from one point of initiation in order to prevent application from being difficult to maintain with state
    state = {
        persons: [
            {id: '1', name: "Nagama", age: 28},
            {id: '2', name: "Saddam", age: 26},
            {id: '3', name: "Puja", age: 10}
        ],
        showPersons: false
    };

    //Good practice is to name the event handler function with prefix as handler
    //writing it with onClick of button don't add parenthesis () while calling; we only pass reference with onclick
    switchNameHandler = (newName) => {
        // console.log("was clicked");
        // DON'T DO THIS : this.state.persons[0].name = "Nagama Inamdar";
        this.setState({
            persons: [
                {name: newName, age: 28},
                {name: "Saddam", age: 26},
                {name: "Puja", age: 20}
            ]
        });
    };

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        console.log("in toggle handler");
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow});
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return (p.id === id);
        });

        const person = {...this.state.persons[personIndex]};

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        //EVENT has a TARGET property which returns input field fired with the event; consequently TARGET has a property as VALUE
        this.setState({persons: persons});
    };


    //these arrow functions used in button onclick returns an anonymous FUNCTION which IN result executes switchnamehandler FUNCTION
    //it is recommended to use bind syntax in order to minimize the element changes on react DOM
    render() {
        let persons = null;
        let btnClass = '';
        if (this.state.showPersons) {
            persons = (<div>
                <Persons persons={this.state.persons}
                clicked={this.deletePersonHandler}
                changed={this.nameChangedHandler}/>
            </div>);
            btnClass=classes.Red;
        }
        const assignedClasses = [];

        if (this.state.persons.length <= 2) {
            assignedClasses.push(classes.red);
        }
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.bold);
        }
        //style attribute of button replaces the style provided in the value
        return (
                <div className={classes.App}>
                    <h1>Hi, I am a react app.</h1>
                    <p className={assignedClasses.join(' ')}>This is working</p>
                    <button
                        className={btnClass}
                        onClick={this.togglePersonsHandler}>
                        Toggle Persons
                    </button>
                    {persons}
                </div>
        );
        // return React.createElement('div', {className : 'App'}, React.createElement('h1', null, 'does is work now?'));

    }
}

export default App;
//export default Radium(App); // <= this is called a higher order component(HOC); it basically injects additional functionality
//HOC can be used on components extending components as well as functional components