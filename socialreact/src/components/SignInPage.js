import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


import * as firebase from 'firebase';
import 'firebase/auth';
import * as routes from '../constants/routes';


const SignInPage = ({ history }) =>
    <div id="sign-up-div" >
        <h1 id="main-title">Login</h1>
        <SignInForm history={history} />

    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onClick = (event) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;
      
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';


        return (

            <div className="container">

                <div className="form-signin">

                    <ul id="input-list" >

                        <li class="uk-margin">
                            <div class="uk-inline">
                                <span class="uk-form-icon" ></span>
                                <input id="sign-up-input" class="uk-input" value={email}
                                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                                    type="text"
                                    placeholder="correo" />
                            </div>
                        </li>

                        <li class="uk-margin">
                            <div class="uk-inline">
                                <span class="uk-form-icon" ></span>
                                <input
                                    id="sign-up-input" class="uk-input" value={password}
                                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                                    type="password"
                                    placeholder="contraseña" />
                            </div>
                        </li>

                    </ul>

                </div>
                <button className="uk-button"id="bt-signup" disabled={isInvalid} onClick={this.onClick}>
                    LogIn
                </button>
                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};