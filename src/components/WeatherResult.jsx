function WeatherResult({ location, data, handleBack }) {
  const temp = data?.Temperature?.Metric?.Value;
  const weatherText = data?.WeatherText;
  const isDay = data?.isDay;
  const tempInFah = data?.Temperature?.Imperial?.Value;
  const iconNumber = String(data?.WeatherIcon).padStart(2, "0");

  const imgLink = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;
  return (
    <div>
      <button onClick={handleBack}>Go back</button>
      <img src={imgLink} alt="Weather Icon" style={{ display: "block" }} />
      <p>{temp}</p>
      <p>{weatherText}</p>
      <p>{location}</p>
      <p>{isDay ? "Day" : "Night"}</p>
      <p>{tempInFah}</p>
    </div>
  );
}

export default WeatherResult;
