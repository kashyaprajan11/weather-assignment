import { useState, useEffect } from "react";
import axios from "axios";

import WeatherResult from "./WeatherResult";
import "./styles.css";

function LocationInputStep() {
  const [location, setLocation] = useState("");
  const [_error, setError] = useState("");
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  // To capute the Enter key press for job search
  // Todo: This can also be made into a custom hook
  const downHandler = ({ key }) => {
    if (key === "Enter") {
      setEnterKeyPressed(true);
    }
  };

  const upHandler = ({ key }) => {
    if (key === "Enter") {
      setEnterKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    if (enterKeyPressed) {
      getCityKeyFromLocation();
    }

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.addEventListener("keyup", upHandler);
    };
  }, [enterKeyPressed]);

  // To get the longitude and latitude of the client.
  const getLocationValues = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        reject(new Error("Geolocation is not supported by your browser"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          resolve(coords);
        },
        () => {
          setError("Unable to retrieve your location");
          reject(new Error("Unable to retrieve your location"));
        }
      );
    });
  };

  // To get the city key from location input field
  const getCityKeyFromLocation = async () => {
    setIsLoading(true);
    try {
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

      setLocation((prev) => `${prev},${countryId}`);
      getData(cityKey);
    } catch (err) {
      alert("A valid location is required");
    }
  };

  // Get the city key from the longitude and latitude of the client
  const getCityKeyFromLongAndLat = async () => {
    setIsLoading(true);
    try {
      const coords = await getLocationValues();
      const cityData = await axios.get(
        "https://dataservice.accuweather.com/locations/v1/cities/geoposition/search",
        {
          params: {
            apikey: API_KEY,
            q: `${coords?.latitude},${coords?.longitude}`,
          },
        }
      );

      const cityName = cityData?.data?.EnglishName;
      const country = cityData?.data?.Country?.ID;
      const cityKey = cityData?.data?.Key;

      setLocation(`${cityName}, ${country}`);
      getData(cityKey);
    } catch (err) {
      alert("A valid location is required");
    }
  };

  // To get the data from the city key that we got earlier
  const getData = async (cityKey) => {
    setIsLoading(true);
    try {
      const tempData = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${cityKey}`,
        {
          params: {
            apikey: API_KEY,
          },
        }
      );

      const cityTemp = tempData?.data[0];
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

  if (isLoding) {
    return <p className="loading"> Loading</p>;
  }

  return (
    <>
      {!data && (
        <div className="card utility_flex_column" style={{ padding: "1em" }}>
          <input
            type="text"
            placeholder="Enter City Name"
            value={location}
            onChange={handleChange}
          />
          <div className="margin_top utility_flex_row">
            <hr style={{ width: "40%" }} />
            <p>or</p>
            <hr style={{ width: "40%" }} />
          </div>
          <button className="margin_top" onClick={getCityKeyFromLongAndLat}>
            Get Device Location
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
      <p className="margin_top" style={{ fontSize: "0.6rem" }}>
        (press Enter after entering the location to search)
      </p>
    </>
  );
}

export default LocationInputStep;
