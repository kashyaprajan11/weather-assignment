import { BiArrowBack } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { BsSun } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";

function WeatherResult({ location, data, handleBack }) {
  const temp = data?.Temperature?.Metric?.Value;
  const weatherText = data?.WeatherText;
  const isDay = data?.isDay;
  const tempInFah = data?.Temperature?.Imperial?.Value;
  const iconNumber = String(data?.WeatherIcon).padStart(2, "0");

  const imgLink = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
  return (
    <div className="card utility_flex_column">
      <div
        className="go-back-box utility_flex_row"
        style={{ justifyContent: "flex-start" }}
        onClick={handleBack}
      >
        <BiArrowBack />
        <p>Weather App</p>
      </div>
      <hr style={{ width: "100%" }} />
      <img src={imgLink} alt="Weather Icon" style={{ display: "block" }} />
      <p className="temperature-text">
        {temp} <span>&#176;</span> C
      </p>
      <p style={{ fontWeight: 500 }}>{weatherText}</p>
      <div className="utility_flex_row margin_top">
        <IoLocationOutline />
        <p>{location}</p>
      </div>

      <hr style={{ marginTop: "1rem", backgroundColor: "rgba(0,0,0,0.5)" }} />
      <div
        className="utility_flex_row"
        style={{
          justifyContent: "space-between",
        }}
      >
        <div className="utility_flex_row">
          {isDay ? <BsSun /> : <BsFillMoonFill />}
          <p>{isDay ? "Day" : "Night"}</p>
        </div>
        <hr className="vertical-line" />
        <div className="utility_flex_row">
          <FaTemperatureHigh />
          <p>
            {tempInFah} <span>&#176;</span> F
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherResult;
