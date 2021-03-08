import {useEffect, useState } from 'react';
import useAuth from './useAuth';

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

const useLocationOptions = () => {
  const { user } = useAuth();
  const [countries, setCountries] = useState(initialList);

  useEffect(() => {
    let filteredCountries

    if (user && user.location !== 'GLOBAL') {
      filteredCountries = initialList.filter( country => {
        return country.id === user.location
      })
      setCountries(filteredCountries)
    } else {
      setCountries(initialList)
    }
  }, [user]);

  return countries;
};

export default useLocationOptions;
