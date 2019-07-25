import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col col-auto my-auto">
                           <Link to="/" className="logo">My Unsplash</Link>
                        </div>
                        <div className="col my-auto text-right">
                            <div className="mainmenu">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/contact">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
