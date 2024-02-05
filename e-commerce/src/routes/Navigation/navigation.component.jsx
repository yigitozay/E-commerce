import React from "react";

import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
const Navigation = () => {
 return (
    <Fragment>
        <div className="navigation">
            <Link className="logo-container" to="/">
            <CrwnLogo className="logo"/>
            </Link> 
            <div className="nav-links-container">
                <Link className="nav-link" to='/shop'> Shop </Link>
            </div>
            <div className="nav-links-container">
                <Link className="nav-link" to='/signIn'> Sign In </Link>
            </div>
        </div>
    </Fragment>
 )
}

export default Navigation;