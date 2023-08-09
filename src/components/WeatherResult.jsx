import { BiArrowBack } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

function WeatherResult({ location, data, handleBack }) {
  const temp = data?.Temperature?.Metric?.Value;
  const weatherText = data?.WeatherText;
  const isDay = data?.isDay;
  const tempInFah = data?.Temperature?.Imperial?.Value;
  const iconNumber = String(data?.WeatherIcon).padStart(2, "0");

  const imgLink = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
  return (
    <div class="card utility_flex_column">
      <div class="go-back-box utility_flex_row" onClick={handleBack}>
        <BiArrowBack />
        <p>Weather App</p>
      </div>
      <hr style={{ width: "100%" }} />
      <img src={imgLink} alt="Weather Icon" style={{ display: "block" }} />
      <p className="temperature-text">
        {temp} <span>&#176;</span> C
      </p>
      <p style={{ fontWeight: 500 }}>{weatherText}</p>
      <div class="utility_flex_row margin_top">
        <IoLocationOutline />
        <p>{location}</p>
      </div>

      <p>{isDay ? "Day" : "Night"}</p>
      <p>
        {tempInFah} <span>&#176;</span> F
      </p>
    </div>
  );
}

export default WeatherResult;
