import React from 'react';
import Rutas from './components/layout/Rutas'
import './public/cssNav/cssNav.css';
function App() {
  if(localStorage.getItem('SSPG_token') == undefined){
    localStorage.setItem('SSPG_token', '')
  }

  return (
      <Rutas />
  );
}

export default App;
