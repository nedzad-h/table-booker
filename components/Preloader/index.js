"use client"

import { store } from "@store";
import { setDate, setSearchTerm } from "@store/searchSlice";
import { useEffect, useRef } from "react";

const Preloader = ({ searchTerm, date }) => {


  useEffect(()=> {
    console.log(date, searchTerm);
  }, [date, searchTerm]);
  
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setSearchTerm(searchTerm));
    store.dispatch(setDate(date));
    loaded.current = true;
  }

  return null;
}

export default Preloader;