import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Home.css';
import * as routes from '../constants/routes';
import $ from 'jquery';

const NewEvent = () =>
    <div id="event">
        <div id="main-title">Nuevo Mensaje</div>
        <NewEventForm />
    </div>

const INITIAL_STATE = {
    eventname: '',
    username: '',
    locationname: '',
    error: null,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class NewEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };

        this.addMessage = this.addMessage.bind(this);
    }

    addMessage() {
        var eventRef = firebase.database().ref().child("Mensajes");
        var userRef = firebase.database().ref().child("Usuarios");
        var key = eventRef.push().getKey();
        
        var user = firebase.auth().currentUser;
        var id = user.uid;
        var userRef = firebase.database().ref().child("Usuarios").child(id);
        var nameaux;

        userRef.on("value", function (snapshot) {
            nameaux = snapshot.child("Nombre").val();
        })

        eventRef.child(key).set({
            "Nombre": this.state.eventname,
            "username":nameaux,
            "Lugar": this.state.locationname,
            "Llave": key,
        });
        
    }

    onClick = (event) => {
        const {
            eventname,
            username,
            locationname,
            error,
        } = this.state;
        const {
            history,
        } = this.props;

        { this.addMessage() }


        event.preventDefault();
    }


    render() {
        const {
            eventname,
            locationname,
            error,
        } = this.state;

        const isInvalid =
            eventname === '' ||
            locationname === '';

        return (
            <div onSubmit={this.onSubmit}>
                <form id="input-list" className="uk-grid-small">
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"
                            value={eventname}
                            onChange={event => this.setState(byPropKey('eventname', event.target.value))}
                            type="text"
                            placeholder="Titulo"
                        />
                    </div>
                    <div id="input-list-item">
                        <input id="new-event-input"
                            className="uk-input"
                            value={locationname}
                            onChange={event => this.setState(byPropKey('locationname', event.target.value))}
                            type="text"
                            placeholder="Contenido"
                        />
                    </div>
                    
                </form>
                <button id="bt-signup" className="w3-button w3-round-xxlarge" disabled={isInvalid} onClick={this.onClick}>
                    Publicar        </button>

                {error && <p>{error.message}</p>}
            </div>
        );
    }
}

export default NewEvent;