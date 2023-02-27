import React from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SearchAlbum from "./SearchAlbum";


function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/searchalbum">SearchAlbum</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
