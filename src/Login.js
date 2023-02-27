import React, {useEffect} from "react";
import Home from "./Home";
import {Button, Container} from "react-bootstrap";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/login";
const SPACE_DELIMITER = "%20";
const redirectUri = "http://localhost:3000/login";
const scopes = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARAM = scopes.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
        console.log(currentValue);
        const [key, value] = currentValue.split("=");
        accumulater[key] = value;
        return accumulater;
    }, {});

    return paramSplitUp;
};

const handleLogin = () => {
    window.location = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true}`;
}


function Login() {
    useEffect(() => {
        if (window.location.hash) {
            const {access_token, expires_in, token_type} = getReturnedParamsFromSpotifyAuth(window.location.hash);
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
    }, []);
    return (
        <div className="Login">
            <h1>Kom maar inloggen!</h1>
            <Container>
                <Button onClick={handleLogin}>Log In</Button>
            </Container>
        </div>
    );
}

export default Login;
