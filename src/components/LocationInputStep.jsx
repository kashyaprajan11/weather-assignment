import { useState } from "react";

function LocationInputStep() {
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={handleChange}
      />
    </div>
  );
}

export default LocationInputStep;
