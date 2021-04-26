import React, {Component} from 'react';
import axios from "axios";

class Profiles extends Component {
    constructor() {
        super();
        this.state = {
            profile: "not here"
        };
    }

    handleButtonClick = () => {
        axios.post('/profile', {
            user: 'Lucas',
            pass: 'HelloWorld'
        })
            .then(function (response) {
                console.log(response);
            })
    };

    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick}> click here to access a profile </button>
                <h1> here is a profile name: {this.state.profile}</h1>
            </div>
        );
    }
}

export default Profiles;