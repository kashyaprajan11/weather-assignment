import axios from "axios";
import { useState, useEffect } from "react";

import WeatherResult from "./WeatherResult";

function LocationInputStep() {
  const [location, setLocation] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Get the data for the searched city
  const getValues = async () => {
    setIsLoading(true);
    // 1: To get the city key from the api
    const cityData = await axios.get(
      "http://dataservice.accuweather.com/locations/v1/cities/search",
      {
        params: {
          apikey: API_KEY,
          q: location,
        },
      }
    );
    const countryId = cityData?.data[0]?.AdministrativeArea?.CountryID;
    const cityKey = cityData?.data[0]?.Key;

    // 2: To get the weather conditions from the api
    const tempData = await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
      {
        params: {
          apikey: API_KEY,
        },
      }
    );

    const cityTemp = tempData?.data[0];

    setLocation((prev) => `${prev},${countryId}`);
    setData(cityTemp);
    setIsLoading(false);
  };

  // To get back from the Result
  const handleBack = () => {
    setLocation("");
    setData(null);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  if (isLoding) {
    return <div> Loading</div>;
  }

  return (
    <>
      {!data && (
        <div className="utility_flex">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={handleChange}
          />
          <button onClick={getValues}>Search</button>
        </div>
      )}
      {!!data && (
        <WeatherResult
          location={location}
          data={data}
          handleBack={handleBack}
        />
      )}
    </>
  );
}

export default LocationInputStep;
