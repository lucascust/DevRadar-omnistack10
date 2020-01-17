// Sempre deve importar o React quando houver HTML no arquivo
import React from 'react';
// DOM = Árvore de elementos, essa lib se comunica com DOM (React p/ browsers)
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
 