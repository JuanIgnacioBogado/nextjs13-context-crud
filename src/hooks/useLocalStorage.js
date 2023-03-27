/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(initialState);
  const [stateLoaded, setStateLoaded] = useState(false);

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem(key)) || initialState);
    setStateLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return {
    [key]: state,
    ['set' + key.charAt(0).toUpperCase() + key.slice(1)]: setState,
    [key + 'Loaded']: stateLoaded
  };
};
