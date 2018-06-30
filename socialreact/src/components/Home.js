import React from 'react';
import './Home.css';
import {ExploreFeed} from './Explore';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const Home = () =>
    <div id="home">
        <div id="main-title">Muro Social</div>
        <Link to={routes.NEW_EVENT}>
            <button className="uk-button uk-button-default" id="bt-new-event">Nuevo Mensaje</button>
        </Link>
        
        <ExploreFeed />
        
    </div>


export default Home;