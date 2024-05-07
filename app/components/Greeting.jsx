"use client";

import React, { useState, useReducer, useEffect } from "react";

export default function Greeting({ name }) {
  const [greetingState, setGreetingState] = useState("");

  const initState = {
    greeting: "",
  };

  function reducer(state, { type }) {
    switch (type) {
      case "MORNING":
        return {
          greeting: "Morning",
        };
      case "AFTERNOON":
        return {
          greeting: "Afternoon",
        };
      case "EVENING":
        return {
          greeting: "Evening",
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initState);

  const timeOfDay = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreetingState("MORNING");
    } else if (hour >= 12 && hour < 18) {
      setGreetingState("AFTERNOON");
    } else {
      setGreetingState("EVENING");
    }
  };

  useEffect(() => {
    timeOfDay();
  }, []);

  useEffect(() => {
    dispatch({ type: greetingState });
  }, [greetingState]);

  return (
    <div className="text-sm font-medium text-white">
      Good {state.greeting.charAt(0).toUpperCase()+state.greeting.substring(1,state.greeting.length)} {name}
    </div>
  );
}
