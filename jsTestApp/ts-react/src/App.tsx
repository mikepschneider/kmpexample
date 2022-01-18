import React from "react";
import logo from "./logo.svg";
import "./App.css";
import * as kmp from "KMPExample";

function App() {
  kmp.main()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Amplify React TS App</h1>
      </header>
    </div>
  );
}

export default App;
