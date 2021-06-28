import React, { createContext, useEffect, useReducer } from 'react';
import SplashScreen from 'src/components/SplashScreen';
import useAuth from '../hooks/useAuth';


let initialList = [
  {
    id: 'PERU',
    name: 'Perú'
  },
  {
    id: 'DOMINICAN_REPUBLIC',
    name: 'República Dominicana'
  },
  {
    id: 'USA',
    name: 'USA'
  },
  {
    id: 'VENEZUELA',
    name: 'Venezuela'
  }
]
const initialGlobalState = {
  countries: [],
  investmentAccounts: [],
  isInitialised: false,
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { countries } = action.payload;

      return {
        ...state,
        isInitialised: true,
        countries
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        countries: []
      };
    }
    default: {
      return { ...state };
    }
  }
};

const GlobalContext = createContext({
  ...initialGlobalState,
  removeGlobals: () => {},
  setGlobals: () => {}
});

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialGlobalState);
  const { user } = useAuth();

  const removeGlobals = () => {
    dispatch({ type: 'REMOVE' })
  }

  const setGlobals = (location) => {
    try {
      if (location !== 'GLOBAL') {
        let filteredCountries = initialList.filter( country => {
          return country.id === user.location
        })
        dispatch({
          type: 'INITIALISE',
          payload: {
            countries: filteredCountries,
          }
        })
      } else {
        dispatch({
          type: 'INITIALISE',
          payload: {
            countries: initialList,
          }
        })
      }
    } catch (e) {
      dispatch({
        type: 'INITIALISE',
        payload: {
          countries: []
        }
      })
    }
  }

  useEffect(() => {
    const initialise = async () => {
      try {
        if (user && user.location !== 'GLOBAL') {
          let filteredCountries = initialList.filter( country => {
            return country.id === user.location
          })

          dispatch({
            type: 'INITIALISE',
            payload: {
              countries: filteredCountries,
            }
          })
        }  else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              countries: initialList,
            }
          })
        }
      } catch (e) {
        dispatch({
          type: 'INITIALISE',
          payload: {
            countries: []
          }
        })
      }
    }

    initialise()
  }, [user]);


  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        removeGlobals,
        setGlobals
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
