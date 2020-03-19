import React, {
  Dispatch, SetStateAction, useContext, createContext,
} from 'react';
import createPersistedState from 'use-persisted-state';

// Use persisted state for tracking login so it applies across tabs and reloads
const useLoggedInState = createPersistedState('loggedIn');

type IsLoggedInContext = [
  boolean,
  Dispatch<SetStateAction<boolean>> | null,
];
const isLoggedInContext = createContext<IsLoggedInContext>([false, null]);

// Provider hook that creates isLoggedIn object and handles state
const useProvideIsLoggedIn = () => {
  const [isLoggedIn, setLoggedIn] = useLoggedInState(false);

  return [isLoggedIn, setLoggedIn];
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useIsLoggedIn = () => useContext(isLoggedInContext);

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const IsLoggedInProvider: React.FC = ({ children }) => {
  const value = useProvideIsLoggedIn();
  return (
    <isLoggedInContext.Provider value={value as IsLoggedInContext}>
      {children}
    </isLoggedInContext.Provider>
  );
};
