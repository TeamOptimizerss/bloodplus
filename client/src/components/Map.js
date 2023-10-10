import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useEventTrigger } from "./EventTriggerContext";
import { useUserContext } from "./UserContext";

const Map = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const mapContainer = useRef(null);
  const mapRef = useRef(null); // Add a ref for the map instance
  const drawRef = useRef(null);
  const circleLayerRef = useRef(null);

  const [userLocation, setUserLocation] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const { themeTrigger } = useEventTrigger();
  const { coordinates } = useUserContext();

  const initializeMap = (latitude, longitude) => {
    if (mapContainer.current) {
      // Remove the existing map if it exists
      mapContainer.current.innerHTML = "";
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v10"
        : "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 12,
    });

    // Assign the map instance to the ref
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl());

    // Initialize Mapbox Draw
    drawRef.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        circle: true,
        trash: true,
      },
    });

    map.addControl(drawRef.current);

    map.on("load", () => {
      const circleFeature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        properties: {},
      };

      map.addSource("circle-source", {
        type: "geojson",
        data: circleFeature,
      });

      circleLayerRef.current = map.addLayer({
        id: "circle-layer",
        type: "circle",
        source: "circle-source",
        paint: {
          "circle-radius": calculateCircleRadius(map.getZoom()), // Set initial radius
          "circle-color": "#0074e4",
          "circle-opacity": 0.2,
        },
      });

      drawRef.current.add(circleFeature);

      // Listen for the map's zoom event and update the circle's radius
      map.on("zoom", () => {
        map.setPaintProperty(
          "circle-layer",
          "circle-radius",
          calculateCircleRadius(map.getZoom())
        );
      });
    });
  };

  const calculateCircleRadius = (zoom) => {
    // Adjust this formula to change the behavior of circle scaling with zoom
    return Math.min(200 / Math.pow(2, 12 - zoom), 200);
  };

  const getLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const { latitude, longitude } = position.coords;
      setUserLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error getting user's location:", error);
    }
  };

  const returnToUserLocation = () => {
    getLocation();
    if (userLocation && mapRef.current) {
      const { latitude, longitude } = userLocation;
      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        essential: true,
      });
    }
  };

  useEffect(() => {
    if (coordinates) {
      try {
        const latitude = coordinates[1];
        const longitude = coordinates[0];

        if (userLocation) {
          setUserLocation({ latitude, longitude });
        } else {
          initializeMap(latitude, longitude);
        }
      } catch (error) {
        console.error("Error parsing coordinates JSON:", error);
      }
    }
  }, [coordinates]);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("theme") === "dark");
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      initializeMap(latitude, longitude);
    }
  }, [themeTrigger, userLocation, isDarkMode]);

  return (
    <div className="map-container">
      <div ref={mapContainer} style={{ width: "100%", height: "85vh" }}></div>
      <div className="floating-icon" onClick={returnToUserLocation}>
        <i className="fa-solid fa-location-crosshairs"></i>
      </div>
    </div>
  );
};

export default Map;
