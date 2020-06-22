import React from 'react';
import './App.css';
import Cube from './Cube/cube';
import { Link, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Lets start
        </p>
        <a href="https://www.google.de/">
          google.com
        </a>

      </header>
      < Cube />
    </div>
  );
}

export default App;
