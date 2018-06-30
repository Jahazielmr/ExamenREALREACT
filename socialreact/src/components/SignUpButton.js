import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const SignUpButton = () =>
  
    <Link to={routes.SIGN_UP}>
        <button className="uk-button uk-button-default" id="bt-login">Registrarse</button>
    </Link>
  

export default SignUpButton;