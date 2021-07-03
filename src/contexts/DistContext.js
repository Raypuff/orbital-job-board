import React, { useContext, useEffect, useState } from "react";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyChxfKXBnE5sYwlAmbYajLEuZFVEsZDIPA");
Geocode.setLanguage("en");
Geocode.setRegion("sg");
Geocode.setLocationType("ROOFTOP");
Geocode.enableDebug();

const DistContext = React.createContext();

export function useDist() {
  return useContext(DistContext);
}

export function DistProvider({ children }) {
  const [loading, setLoading] = useState(false);

  async function getDistance(
    originLat,
    originLong,
    destinationLat,
    destinationLong
  ) {
    setLoading(true);
    try {
      const distData = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/distance/${originLat}/${originLong}/${destinationLat}/${destinationLong}`
      );
      const distance = await distData.json();
      return distance;
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function getGeocode(postalCode) {
    try {
      const response = await Geocode.fromAddress(`Singapore ${postalCode}`);
      const { lat, lng } = await response.results[0].geometry.location;
      const result = await [lat, lng];
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  const value = { getDistance, getGeocode };

  return (
    <DistContext.Provider value={value}>
      {!loading && children}
    </DistContext.Provider>
  );
}
