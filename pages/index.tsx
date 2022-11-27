import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";


//we have mentioned here that we want to use the places library - places enables your application to search for places such as establishments, geographic locations, or prominent points of interest, within a defined area

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  //this checks if the useLoadScript worked...if it did returns map component
  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
  
}
