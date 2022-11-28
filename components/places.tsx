import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

type PlacesProps = {
  setOffice: (position: google.maps.LatLngLiteral) => void;
};

const postcodeInput = () => {
  console.log("code here");
};

export default function Places({ setOffice }: PlacesProps) {
  //exttracting these values from usePlacesAutoComplete

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  //when a suggestion that has come down in the drop down is selectected we set the value in places function and clear other suggestions

  const handleSelect = async (val: string) => {
    setValue(val);
    clearSuggestions();

    //calling getGeocode with selected address will return several results, we extract coordinates from those results
    const results = await getGeocode({address: val});
    // this will give us the lat lng of the searched for position
    const {lat, lng} = await getLatLng(results[0]);
    setOffice({ lat, lng })
  }

  //combobox allows you to look up places and get suggestions for those places
  return (

    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="combobox-input"
        disabled={!ready}
        placeholder="find location"
      />

      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && 
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description}/>
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}
