import React from 'react';

import logo from './logo.svg';
import './App.css';
import Routes from "./routes";
import ChatMenuUsers from './components/ChatMenuUsers'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3 className='App-title'>Bem vindo ao Chat da Gyramais</h3>
      </header>
      <ChatMenuUsers />
      <Routes />
    </div>
  );
};
export default App;
