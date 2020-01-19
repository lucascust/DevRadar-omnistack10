// Pasta com Index.js criada para que o CSS possa ficar próximo, a fim de organização

import React from 'react';

import './styles.css';

// "key" é pedido pelo Map para identificar o primeiro item, com um valor unico, usamos "_id"

function DevItem(props) {
    const { dev } = props;

    return(
        <li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt={dev.name}/>
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil no Github</a>
        </li>
    );
}

export default DevItem;