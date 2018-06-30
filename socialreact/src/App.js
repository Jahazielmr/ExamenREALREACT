import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/Home';
import Explore from './components/Explore';
import Account from './components/Account';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import NewEvent from './components/NewEvent';
import * as routes from './constants/routes';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      authUser: null,
    }
    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }

  handleLoginGoogle() {
    if (this.state.user) {
      firebase.auth().signOut()
        .then(result => console.log(`${result} ha salido`))
        .catch(err => console.log(err))
      this.setState({ user: null, google: "Google" })
    } else {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(res => {
          this.setState({
            user: res.user
          })
          console.log(this.state.user);
          var ref = firebase.database().ref().child("Usuarios").child(this.state.user.uid);
          ref.child("UID").set(this.state.user.uid);
          ref.child("Name").set(this.state.user.displayName);
          ref.child("Email").set(this.state.user.email);
          ref.child("Phone Number").set(this.state.user.phoneNumber);
          ref.child("Photo URL").set(this.state.user.photoURL);


          this.setState({ google: "Logout Google" })
        })
        .catch(err => console.log("error: " + err))

    }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar authUser={this.state.authUser} />
            <Route
              exact path={routes.LANDING}
              component={() => <LandingPage />}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={() => <SignInPage />}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={() => <SignUpPage />}
            />
            <Route
              exact path={routes.NEW_EVENT}
              component={() => <NewEvent />}
            />
            <Route
              exact path={routes.EXPLORE}
              component={() => <Explore />}
            />

            <Route
              exact path={routes.HOME}
              component={() => <HomePage />}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={() => <Account />}
            />
          </div>

        </Router>

      </div>
    );
  }
}

export default App;
