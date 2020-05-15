import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

import logoImg from  '../../assets/saúde.png';
import loginMedico from  '../../assets/login-medico.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(event){
        event.preventDefault();

        try{  
            history.push('/profile');

        }catch(err){
            console.error("Erro:", err);
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img class="icon-title" src={logoImg} alt="Carteira de Vacinação Online"></img> 
                <text class="title">Carteira de Vacinação Online</text>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="Usuário"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                     <input 
                        placeholder="Senha"
                        value={id}
                        onChange={e=> setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"></FiLogIn>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={loginMedico} alt="Médicos"></img>
        </div>
    );
}