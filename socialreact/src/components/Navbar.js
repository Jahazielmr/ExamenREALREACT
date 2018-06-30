import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { SignOutButton } from './SignInButton';
import * as routes from '../constants/routes';
import * as firebase from 'firebase';

const Navbar = ({ authUser }) =>
    <div>
        {authUser
            ? <NavAuth authUser={authUser} />
            : <NavNonAuth />
        }
    </div>


const NavNonAuth = () =>
    <div>
        
    </div>

const NavAuth = ({ authUser }) => (

    <div>

        <nav id="navBar" className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark" >
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <ul className="navbar-nav mr-auto" id="nav-items">

                    <li className="nav-item">
                        <Link to={routes.HOME} id="nav-link">Muro Social</Link>
                    </li>

                </ul>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto" id="nav-items">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {
                                    firebase.database().ref().child("Usuarios").child(authUser.uid)
                                        .child("Nombre").on("value", function (snapshot) {
                                            console.log(snapshot.val());
                                            var nom = document.createTextNode(snapshot.val());
                                            document.getElementById("navbarDropdown").innerHTML = "";
                                            document.getElementById("navbarDropdown").appendChild(nom);
                                        })

                                }
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={routes.ACCOUNT} id="nav-link">
                                    <a id="dropdown-item" href="#">Perfil</a>
                                </Link>
                                
                                <div className="dropdown-divider"></div>
                                <SignOutButton />

                            </div>
                        </li>
                    </ul>
                </form>
            </div>
        </nav>
    </div>
)

export default Navbar;