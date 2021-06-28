import React, { createContext, useEffect, useReducer } from 'react';
import jwt from 'jsonwebtoken';
import SplashScreen from 'src/components/SplashScreen';
import axios from 'src/utils/axios';
import useGlobal from '../hooks/useGlobal';

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwt.decode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALISE': {
      const { isAuthenticated, user  } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case 'LOGIN': {
      const { user,  } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user
      };
    }
    case 'UPDATE_USER': {
      const { user } = action.payload;

      return {
        ...state,
        user
      };
    }
    case 'VERIFY': {
      const { verified } = action.payload;

      return {
        ...state,
        verified
      };
    }
    case 'SET_ERROR': {
      const { error, message } = action.payload;

      return {
        ...state,
        error,
        message
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  verify: () => Promise.resolve(),
  logout: () => {},
  changePassword: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const { setGlobals, removeGlobals } = useGlobal()

  const login = async (email, password) => {
    const response = await axios.post(`api/account/login`, {
      email,
      password
    });

    const { token, user } = response.data;
    const { location } = user


    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      }
    });
    setGlobals(location)
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
    removeGlobals()
  };

  const register = async (email, firstName, lastName, password) => {
    const response = await axios.post(`api/account/register`, {
      email,
      firstName,
      lastName,
      password
    });

    const { token, user } = response.data;

    window.localStorage.setItem('accessToken', token);

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });

  };

  const updateUser = async (userDetails) => {
    return await axios.patch(`api/users/${userDetails.id}`, userDetails);
  };

  const changePassword = async (userDetails) => {
    let { _id } = state.user
    return await axios.patch(`api/customers/${_id}/update-password`, userDetails);
  };

  const verify = async (id) => {
    try {
      const response = await axios.post(`api/account/verify`, {
        id
      });
      let { email, verified } = response.data;
      dispatch({
        type: 'VERIFY',
        payload: {
          verified,
          email
        }
      });
    } catch (e) {
      dispatch({
        type: 'SET_ERROR',
        payload: {
          verified: false,
          error: true,
          message: e.msg
        }
      });
    }
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get('/api/account/me');
          const { data } = response;
          const user = data;



          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: true,
              user,
            }
          });
        } else {
          dispatch({
            type: 'INITIALISE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALISE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialise();
  }, []);

  if (!state.isInitialised) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        verify,
        updateUser,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
