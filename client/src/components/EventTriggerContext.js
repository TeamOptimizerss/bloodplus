import { createContext, useContext, useState } from "react";

// Create a context
const EventTriggerContext = createContext();

// Create a provider component
export const EventTriggerProvider = ({ children }) => {
  const [themeTrigger, setThemeTrigger] = useState(false);

  return (
    <EventTriggerContext.Provider
      value={{
        themeTrigger,
        setThemeTrigger,
      }}
    >
      {children}
    </EventTriggerContext.Provider>
  );
};

// Create a custom hook to access the event trigger state and function
export const useEventTrigger = () => useContext(EventTriggerContext);
