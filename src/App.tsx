import React from 'react';
import logo from './logo.svg';
import './App.css';

enum State {
  IN_DEVELOPMENT,
  FINISHED,
  ADDON,
}

const games = {
  [State.IN_DEVELOPMENT]: ['dualist'],
  [State.FINISHED]: ['suicide-hero', 'robo-soul'],
  [State.ADDON]: ['godot-css-theme'],
};

function App() {
  return (
    <div className="App">
      <header>
        <h1>Kuma Gee</h1>
        <p>wannabe indie game developer</p>
        <img src="logo.png" alt="logo" />
      </header>
    </div>
  );
}

export default App;
