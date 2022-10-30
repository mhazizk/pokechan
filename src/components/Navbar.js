import React from "react";
import "./Styles.css"
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <div className='sub-navbar'>
                <h3>
                    React Sandbox
                </h3>
            </div>
            <div className='sub-navbar'>
                <Link className="link" to='/'>Home</Link>
                <Link className="link" to='/react-routes'>Routes</Link>
                <Link className="link" to='/react-reducer'>Reducer</Link>
                <Link className="link" to='/react-immer-reducer'>ImmerReducer</Link>
                <Link className="link" to='/react-consume-api'>Consume API</Link>
                <Link className="link" to='/react-axios-api'>Axios</Link>
            </div>
        </nav>

    )
}

export default Navbar