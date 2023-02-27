import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from "react";
import Home from './Home'
import Login from "./Login";
import App from "./App";
import {Route, Link, Router, BrowserRouter, Routes} from "react-router-dom";

const CLIENT_ID = "99e8f40ff31e4773afd9025afb9d63c2";
const CLIENT_SECRET = "a0c007ed7ada4e0aa5eabfeb02a6ffc9";

function SearchAlbum() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        //API access token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    //Search
    async function search() {
        console.log("Search for " + searchInput); //Taylor Swift

        // Get request using search to get the Artist ID
        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => {
                return data.artists.items[0].id
            })
        console.log("Artist ID is " + artistID);
        //Get request with Artist ID grab all the albums from that artist
        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAlbums(data.items);
            })
        // Display those albums to the user
        console.log(albums);
    }

    return (
        <div className="SearchAlbum">
            <h1>Search any artists you like to see their albums!</h1>

            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl placeholder="Search For Artist" type="input" onKeyPress={event => {
                        if (event.key == "Enter") {
                            search();
                        }
                    }}
                                 onChange={event => setSearchInput(event.target.value)}>

                    </FormControl>
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums.map((album, i) => {
                        console.log(album);
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url}/>
                                <Card.Body>
                                    <Card.Title>
                                        {album.name}
                                    </Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>

            </Container>
        </div>
    );
}

export default SearchAlbum;
