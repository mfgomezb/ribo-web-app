import {useEffect, useState } from 'react';
import useAuth from './useAuth';

const useLocationOptions = () => {
  const { user } = useAuth();
  const [countries, setCountries] = useState([
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
  ]);

  useEffect(() => {
    let filteredCountries

    if (user.location !== 'GLOBAL') {
      filteredCountries = countries.filter( country => {
        return country.id === user.location
      })
      setCountries(filteredCountries)
    }
  }, []);

  return countries;
};

export default useLocationOptions;
