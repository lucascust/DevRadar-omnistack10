import React from 'react';

// REACT Primeiros Passos

// Parametro props do React passa todos as propriedades de um elemento
function Header(props){
    return(
    // Para usar JS dentro do HTML, usa-se chaves { }
    <h1>{props.title}</h1>
    );
}

export default Header;
