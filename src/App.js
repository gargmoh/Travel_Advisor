import React from "react";
import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import List from "./Components/List/List";
import Map from "./Components/Map/Map";
import { getPlacesData } from "./api";
import { CssBaseline, Grid } from "@material-ui/core";


const App = () => {
    const [places, setPlaces] = useState([]);
    const [childClicked, setChildClicked]= useState(null);
    const [coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});
    const [isLoading, setisLoading] = useState(false);
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces, setfilteredPlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude }}) => {
            setCoordinates({ lat: latitude, lng: longitude });
          });
    }, []);

    useEffect(()=> {
        const filtered = places.filter((place) => place.rating > rating);
        setfilteredPlaces(filtered);
    },[rating]);

    useEffect(() => {
        if (bounds.sw && bounds.ne){
        setisLoading(true);
        
        getPlacesData(type, bounds.sw, bounds.ne)

  // .then is use because function is async
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setfilteredPlaces([]);
                setisLoading(false);
            })
        }
    },[type, bounds]);
    return (

        <div>
      <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing = { 3 }
        style = {
            { width: '100%' }
        }>
        
        <Grid item xs = { 12 }
        md = { 4 }>
        
        <List places = {filteredPlaces.length ? filteredPlaces : places}
             childClicked= { childClicked }
             isLoading ={isLoading}
             type={type}
             setType={setType}
             rating={rating}
             setRating={setRating}
             
        />
        </Grid > 
        <Grid item xs = { 12 }
        md = { 8 }>
        <Map setCoordinates = { setCoordinates }
        setBounds = { setBounds }
        coordinates = { coordinates }
        places= {filteredPlaces.length ? filteredPlaces : places}
        setChildClicked={setChildClicked}

        />  
        </Grid > 
        
        </Grid>


        </div>
    )
}

export default App;