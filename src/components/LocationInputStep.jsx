import axios from "axios";
import { useState } from "react";

import WeatherResult from "./WeatherResult";
import "./styles.css";

function LocationInputStep() {
  const [location, setLocation] = useState("");
  const [isLoding, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Get the data for the searched city
  const getValues = async () => {
    setIsLoading(true);
    try {
      // 1: To get the city key from the api
      const cityData = await axios.get(
        "https://dataservice.accuweather.com/locations/v1/cities/search",
        {
          params: {
            apikey: API_KEY,
            q: location,
          },
        }
      );
      const countryId = cityData?.data[0]?.AdministrativeArea?.CountryID;
      const cityKey = cityData?.data[0]?.Key;

      console.log(cityKey);

      // 2: To get the weather conditions from the api
      const tempData = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
        {
          params: {
            apikey: API_KEY,
          },
        }
      );

      const cityTemp = tempData?.data[0];

      setLocation((prev) => `${prev},${countryId}`);
      setData(cityTemp);
    } catch (err) {
      alert("A valid location is required");
    }

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
        <div className="card utility_flex_column">
          <input
            type="text"
            placeholder="Enter City Name"
            value={location}
            onChange={handleChange}
          />
          <button className="margin_top" onClick={getValues}>
            Search
          </button>
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
