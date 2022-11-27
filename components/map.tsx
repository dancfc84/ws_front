import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import Distance from "./distance";


type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {

  const [office, setOffice ] = useState<LatLngLiteral>();

  //useRef allows you to persist values between renders, does not cause re-renders, so we stay at the same location..
  const mapRef = useRef<GoogleMap>();

  //caches the latlng value and the options, just runs on first render or when certain events happen, won't run all the time!

  const center = useMemo<LatLngLiteral>(() => ({ lat: 51.55, lng: -0.29 }), []);


  //map options passed to our google map
  const options = useMemo<MapOptions>(

    () => ({
      clickableIcons: false,
      disableDefaultUI: true,
      //decides which map is shown, go to google maps platform to change and add more maps
      mapId: "a1fba3f6c23cfa4c",
    }),
    []

  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <div className="container">
      <div className="controls">
        <h1>Find location</h1>
        <Places
/* 
          pass it to a function because we want to setstate AND panto that position */
          
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
        ></GoogleMap>
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
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
