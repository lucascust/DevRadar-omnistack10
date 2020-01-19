import React, { useState,useEffect } from 'react';

function DevForm({ onSubmit }) {
    // conceito de estado: constate e função que cria uma nova constante 
    const [github_username, setGithub_username]  = useState('');
    const [techs, setTechs ]  = useState('');
    const [latitude, setLatitude]  = useState('');
    const [longitude, setLongitude]  = useState('');


    
    // (função  à executar, quando executar: [vetor com elementos que quando atualizados, aciona função])
    useEffect(() => {

        // Função para pegar posição do usuário pelo navegador
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { longitude, latitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                // 30 segundos
                timeout: 30000,
            }
        )
    }, []);

    // função "addHandleDev" transferida para "DevForm" como submit do Main
    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithub_username('');
        setTechs('');
    }

    return(
        <form onSubmit={handleAddDev}>
            <div className="input-block">
                <label htmlFor="github_username">Usuário Github</label>
                <input name="github_username" 
                id="github_username" 
                required 
                value={github_username} 
                onChange={e => setGithub_username(e.target.value)}
            />
            </div>
            
            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" 
                id="techs" 
                required 
                value={techs} 
                onChange={e => setTechs(e.target.value)}
            />
            </div>
            
            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" 
                    name="latitude" 
                    id="latitude" 
                    required 
                    value={latitude} 
                    // Muda valor com o input do usuário
                    onChange={e => setLatitude(e.target.value)}
                />
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" 
                    name="longitude" 
                    id="longitude" 
                    required 
                    value={longitude} 
                    onChange={e => setLongitude(e.target.value)}
                />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm

 