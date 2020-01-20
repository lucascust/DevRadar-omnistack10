// Arquivo principal
import React from 'react';
// Lib para alterar barra de status (fora do app) 
 import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes'

YellowBox.ignoreWarnings(['Urecognized WebSocket']);

export default function App() {
  return (
    <>
      {/* Apesar de configurado, nao houve alteração na statusbar */}
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}
