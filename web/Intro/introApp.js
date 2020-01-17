import React, { useState } from 'react';

//REACT PRIMEIROS PASSOS

// Conceito React 1: COMPONENTE
// Bloco de HTML, CSS e JS que não interfere no resto da aplicação
// Conceito React 2: Propriedade
// Propriedade = Atributo
// Conceito React 3: Estado
// Informações mantidas pelo componente, usado para manutenir a imutabilidade

// Função App retorna um conteúdo HTML  
function App() {
  // Funções para botão contador
  const [counter, setCounter] = useState(0);
  function incrementCounter() {
    setCounter (counter + 1);
  };
  // 
  return (
    // No React não podemos usar um componente abaixo do outro, precisamos inserir em um container
    // porém, se usarmos "div", pode dar problema com aparencia, melhor usar algo chamado "Fragment", que é apenas abrir e fechar uma tag
    <>
    <Header title = "Dashboard" />
    <Header title = "Dashboard" />
    
    {/* Contador + Botao de incremento0*/ }

    <h1>Contador: {counter}</h1>
    <button onClick={incrementCounter}>Incrementar</button>
    </>
    
  );
}

export default App;
