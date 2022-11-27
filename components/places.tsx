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

  console.log(status, data);

  //combobox allows you to look up places and get suggestions for those places
  return (

    <Combobox onSelect={() => {}}>
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
