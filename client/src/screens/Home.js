import React, { Fragment, useState, useEffect } from "react";
import Map from "../components/Map";
import { useUserContext } from "../components/UserContext";

const Home = () => {
  const { coordinates } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (coordinates) {
      setIsLoading(false);
    }
  }, [coordinates]);

  return <Fragment>{isLoading ? <div>Loading...</div> : <Map></Map>}</Fragment>;
};

export default Home;
