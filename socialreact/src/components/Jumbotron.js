import React, { Component } from 'react';
import './Jumbotron.css';
import * as firebase from 'firebase';
import SignUpButton from './SignUpButton';
import SignInButton from './SignInButton';
export class Jumbotron extends Component {
    constructor(props)
    {
        super(props);
        this.writingDB = this.writingDB.bind(this);
    }

    writingDB() {
        const rootRef = firebase.database().ref();

        rootRef.push().set({
            name: "HOLA"
        });
    }

    render() {
        return (
            <div id="jumbotron" className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4" id="mainTitle">Social Media</h1>
                    <p className="lead" id="subTitle">Your Social Network</p>
                </div>
                <div id="authButtons">
                    <SignUpButton />
                    <SignInButton />
                </div>
            </div>
        );
    }
}