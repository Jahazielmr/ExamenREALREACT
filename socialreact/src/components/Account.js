import React from 'react';
import './Account.css';
import def from './def.jpg';
import $ from 'jquery';
import * as firebase from 'firebase';

const Account = () =>
  <div>
    <h1>Account</h1>
    <Profile />
  </div>

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      inf_scroll: false,
      db: { img: {} },
      loaded: false,

      name: "",
      email: "",
      username: "",
      telephone: "",

    };

    //this.test = this.test.bind(this);
    this.fasterPreview = this.fasterPreview.bind(this);
    this.imageUp = this.fasterPreview.bind(this);
    this.setState = this.setState.bind(this);


  }

  componentDidMount() {
    var user = firebase.auth().currentUser;
    var id = user.uid;
    var userRef = firebase.database().ref().child("Usuarios").child(id);
    var nameaux;
    var emailaux;
    var usernameaux;
    var telephoneaux;

    userRef.on("value", function (snapshot) {
      nameaux = snapshot.child("Nombre").val();
      emailaux = snapshot.child("Email").val();
      usernameaux = snapshot.child("Username").val();
      telephoneaux = snapshot.child("Telephone").val();
      
      document.getElementById("user_name").innerHTML = nameaux;
      document.getElementById("user_description").innerHTML = usernameaux;
      document.getElementById("user_email").innerHTML = emailaux;
      document.getElementById("user_phone").innerHTML = telephoneaux;
      
      


/*
      this.setState({
        "name": nameaux,
        "email": emailaux,
        "username": usernameaux,
        "telephone": telephoneaux
      })
*/
    })
    console.log(emailaux);
    console.log(telephoneaux);
    console.log("hola");
        /*
    this.setState({
      "name": nameaux,
      "email": emailaux,
      "username": usernameaux,
      "telephone": telephoneaux
    })*/
  }
  /*
  test(){
    var userRef= firebase.database().ref().child("Usuarios").child("9esyUsxZ2pcFBXkFqeMfo24jMkh2");
    var nameaux;
    var emailaux;
    var usernameaux;
    var telephoneaux;
  
    userRef.on("value",function(snapshot){
      nameaux= snapshot.child("Nombre").val();
      emailaux= snapshot.child("Email").val();
      usernameaux= snapshot.child("Username").val();
      telephoneaux = snapshot.child("Telephone").val();
      console.log(emailaux);
  
    })
    
    this.setState({ 
      "name": nameaux,
      "email": emailaux,
      "username": usernameaux,
      "telephone": telephoneaux
  
    })
  
    console.log(emailaux);
  
  }*/

  profImage() {
    $("#profileImage").click(function (e) {
      $("#imageUpload").click();
    });
  }

  fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
      $('#profileImage').attr('src',
        window.URL.createObjectURL(uploader.files[0]));
    }
  }

  imageUp() {
    $("#imageUpload").change(function () {
      this.fasterPreview(this);
    });
  }



  render() {
    return (
      <div className="container-account" onLoad={this.test}>
        <div className="rela-block container">
          <div className="rela-block profile-card">
            <div id="profile-container">
              <img id="profileImage" src={def} onClick={this.profImage} />
            </div>
            <input onClick={this.imageUp} id="imageUpload" type="file" name="profile_photo" placeholder="Photo" required capture />
            <div className="rela-block profile-name-container">
              <div className="rela-block user-name" id="user_name" >{this.state.name}</div>
              <div className="rela-block user-desc" id="user_description">{this.state.username}</div>
            </div>
            <div className="rela-block profile-card-stats">
              <div className="floated profile-stat works" id="num_works">28
                        <br />
              </div>
              <div className="floated profile-stat followers" id="num_followers">112
                             <br />
              </div>
              <div className="floated profile-stat following" id="num_following">245
                             <br />
              </div>
            </div>
            <div className="rela-block profile-card-stats InfoExtra">
              <div className="rela-block user-name">Email:</div>
              <div className="rela-block user-desc" id="user_email">{this.state.email}</div>
            </div>
            <div className="rela-block profile-card-stats InfoExtra">
              <div className="rela-block user-name">Phone:</div>
              <div className="rela-block user-desc" id ="user_phone"></div>
            </div>

            {/*<button onClick= {this.test}>ad</button>*/}

          </div>
        </div>
      </div>

    );
  }
};



export default Account;