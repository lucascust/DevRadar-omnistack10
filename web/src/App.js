import React, { useState } from 'react';
import './global.css'

function App(){



    return(
        <div id = "app">
            {/* Tag para Sidebar (aside)*/}

            <aside>
                <strong>Cadastrar</strong>
                <form>
                    <div class="input-block">
                        <label htmlFor="github_username">Usuário Github</label>
                        <input name="github_username" id="github_username" required />
                    </div>
                    
                    <div class="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input name="techs" id="techs" required />
                    </div>
                    
                    <label htmlFor="username_github">Latitude</label>
                    <input name="github_username" id="username_github" required />
                </form>
            </aside>
            <main>

            </main>
        </div>
    );
}

export default App;