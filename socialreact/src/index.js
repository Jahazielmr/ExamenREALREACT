import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';
import './index.css';


var config = {
    apiKey: "AIzaSyDY-liRW14W8NoCD3V7-QGE2kYr0Ng69-8",
    authDomain: "awesomemixvol1react.firebaseapp.com",
    databaseURL: "https://awesomemixvol1react.firebaseio.com",
    projectId: "awesomemixvol1react",
    storageBucket: "awesomemixvol1react.appspot.com",
    messagingSenderId: "659500485962"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
