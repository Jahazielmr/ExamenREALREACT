import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SignUp.css';
import './Jumbotron.css';

import * as routes from '../constants/routes';
import * as firebase from 'firebase';
import 'firebase/auth';


const SignUpPage = ({ history }) =>
    <div id="sign-up-div">
        <div id="main-title">Registrate</div>
        <SignUpForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    fullname: '',
    email: '',
    telephone: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});



class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };   
    }
    

    onClick = (event) => {
        const {
            username,
            fullname,
            telephone,
            email,
            passwordOne,
        } = this.state;
        const {
            history,
        } = this.props;
        firebase.auth().createUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var userId = firebase.auth().currentUser.uid;
                var ref = firebase.database().ref().child("Usuarios");

                var key = ref.push().getKey();

                ref.child(userId).set({
                    "Username": username,
                    "Nombre": fullname,
                    "Email": email,
                    "Telephone": telephone,
                    "Password": passwordOne,
                    "Llave": userId
                });
            }
        });

        event.preventDefault();
    }


    render() {
        const {
            username,
            fullname,
            email,
            telephone,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div onSubmit={this.onSubmit}>
                <ul id="input-list">
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            type="text"
                            placeholder="Username"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={fullname}
                            onChange={event => this.setState(byPropKey('fullname', event.target.value))}
                            type="text"
                            placeholder="Full Name"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={telephone}
                            onChange={event => this.setState(byPropKey('telephone', event.target.value))}
                            type="email"
                            placeholder="Telephone (optional)"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                    </li>
                    <li id="input-list-item">
                        <input id="sign-up-input"
                            className="uk-input"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </li>

                </ul>
                <button id="bt-signup" disabled={isInvalid} onClick={this.onClick}>
                    Unirse
                </button>

                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

const SignUpLink = () =>
    <p>
        Ha ocurrido un error
    {' '}
        <Link to={routes.SIGN_UP}>Ingresar</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
};