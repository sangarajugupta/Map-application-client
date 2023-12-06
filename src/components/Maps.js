import React, { useState } from "react";

import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl";
import { TOKEN } from "./Geocoder";

// -26.475393195281754, 153.04416685709924

const AppMap = () => {


const [newPlace,setNewPlace] = useState("")

  const handleAddChange = async (e) => {
    const data =  await fetch("http://localhost:5008/maps?" + new URLSearchParams({name : e.value.name}),{
        method:'GET'
    })
    const response = await data.json();

    setNewPlace({
      lat: response.lat,
      lng: response.lng,
    });
  };
  const geojson = {
    type: "Feature",
    geometry: {
      type: "Polygon"
    },
  };

  const layerStyle = {
    id: "maine",
    type: "fill",
    source: "maine", // reference the data source
    layout: {},
  
  };
  // Add a black outline around the polygon.
  const layerOutlineStyle = {
    id: "outline",
    type: "line",
    source: "maine",
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  };

  return (

<>
    <form>
    <select value={newPlace} onChange={handleAddChange}>
      <option value="Mumbai">Mumbai</option>
      <option value="Delhi">Delhi</option>
      <option value="Bangalore">Bangalore</option>
    </select>
  </form>

    <ReactMapGL
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/dmsdesigns/clid0566a000y01q14exw4ruv"
      transitionDuration="200"
      attributionControl={true}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerOutlineStyle} />
        <Layer {...layerStyle} />
      </Source>

      
        <Marker
          
          draggable
          onDragEnd={newPlace }
        />
     
      <NavigationControl position="bottom-right" />
    </ReactMapGL>
    </>
  );
};

export default AppMap;
