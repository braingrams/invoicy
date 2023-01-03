import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const wheelRef = useRef(null);

  const handleClickOutside = (event) => {
    if (wheelRef.current && !wheelRef.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { wheelRef, isComponentVisible, setIsComponentVisible };
}
