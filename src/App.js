import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from "react";
import Home from './Home'
import Login from "./Login";
import SearchAlbum from "./SearchAlbum";
import {Route, Link, Router, BrowserRouter, Routes} from "react-router-dom";
import NavBar from "./NavBar";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";

function App() {


    return (
        <div className="App">

            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/searchalbum" element={<SearchAlbum/>}/>
                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default App;
