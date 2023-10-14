import { createContext, useContext, useState } from "react";

// Create a context
const EventTriggerContext = createContext();

// Create a provider component
export const EventTriggerProvider = ({ children }) => {
  const [themeTrigger, setThemeTrigger] = useState(false);
  const [coordinatesTrigger, setCoordinatesTrigger] = useState(null);

  return (
    <EventTriggerContext.Provider
      value={{
        themeTrigger,
        setThemeTrigger,
        coordinatesTrigger,
        setCoordinatesTrigger,
      }}
    >
      {children}
    </EventTriggerContext.Provider>
  );
};

// Create a custom hook to access the event trigger state and function
export const useEventTrigger = () => useContext(EventTriggerContext);
