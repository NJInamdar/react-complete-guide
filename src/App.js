import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';


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
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };
        let persons = null;
        if (this.state.showPersons) {
            persons = (<div>
                {this.state.persons.map((person, index) => {
                    return <Person
                        name={person.name}
                        click={() => this.deletePersonHandler(index)}
                        age={person.age}
                        key={person.id}
                        changed={(event) => this.nameChangedHandler(event, person.id)}
                    />;
                })}
            </div>);
            style.backgroundColor = 'red';
        }
        const classes = [];

        if (this.state.persons.length <= 2) {
            classes.push('red');
        }
        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }
        //style attribute of button replaces the style provided in the value
        return (
                <div className="App">
                    <h1>Hi, I am a react app.</h1>
                    <p className={classes.join(' carry ')}>This is working</p>
                    <button
                        style={style}
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