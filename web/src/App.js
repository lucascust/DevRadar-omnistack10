import React, { useState, useEffect } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'

function App(){
    const [devs, setDevs] = useState([]);


    // Função para alterar os quadros de usuários quando houver cadastro
    useEffect(() => {
       async function loadDevs() {
           const response = await api.get('/devs');
           setDevs(response.data);
       } 

       loadDevs();
    }, []);

    async function handleAddDev(data) {

        const response = await api.post('/devs', data) 

        // Copia toda a lista de Devs, adicionado res.data ao final da mesma
        setDevs([...devs, response.data]);
    }

    return(
        <div id = "app"> 
            {/* Tag para Sidebar (aside)*/}
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
               
            </aside>

            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;