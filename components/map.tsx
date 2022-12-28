import { useState, useMemo, useCallback, useRef } from "react";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {

  const [office, setOffice ] = useState<LatLngLiteral>();

  //useRef allows you to persist values between renders, does not cause re-renders, so map settings stay the same.
  const mapRef = useRef<GoogleMap>();

  //caches the latlng value and the options, just runs on first render or when certain events happen, won't run all the time! Set to London
  const center = useMemo<LatLngLiteral>(() => ({ lat: 51.55, lng: -0.29 }), []);

  const permMark = useMemo<LatLngLiteral>(() => ({ lat: 51.2, lng: -0.29 }), []);

  //map options passed to our google map when its rendered
  const options = useMemo<MapOptions>(

    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      //mapId = decides which map is shown, go to google maps platform to change and add more maps, 
      mapId: "a1fba3f6c23cfa4c",
    }),
    []

  );

  //Returns a memorised callback function - basically caches a value 
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  console.log(office);
  

  return (

    <div className="container">
      <div className="controls">
        <h1>Find location</h1>
        <Places
/* 
          pass it to a function because we want to set current location AND pan to that position */
          setOffice={(position => {
            setOffice(position);
            mapRef.current?.panTo(position);
          })}
        />
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          options={options}
          mapContainerClassName="map-container"
          onLoad={onLoad}
          onClick={ev => {
            console.log("latitide = ", ev.latLng?.lat());
            console.log("longitude = ", ev.latLng?.lng());
            console.log(ev);
            
          }}
        >
          {/* If there is an office show the marker */}
          {office && <Marker position={office} /* icon={} *//>}

          <Marker position={permMark}/>

        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};


