import React from "react";

import NaiveRouter from "./components/NaiveRouter";
import Navigation from "./components/Navigation";

import "./App.css";

function App() {
  return (
    <div>
      <Navigation />
      <NaiveRouter />
    </div>
  );
}

export default App;
