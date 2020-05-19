import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'

import logoImg from  '../../assets/saúde.png';
import loginMedico from  '../../assets/login-medico.png';

export default function Login(){
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    async function handleLogin(event){
        event.preventDefault();

        api.post('login', {
            user,
            password
         })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            
            history.push('/home');
        })
        .catch(error => {
           setMessage(error.response.data.message);
        })
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img className="icon-title" src={logoImg} alt="Carteira de Vacinação Online"></img> 
                <span className="title">Carteira de Vacinação Online</span>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>
                    <input 
                        placeholder="Usuário"
                        value={user}
                        onChange={e=> setUser(e.target.value)}
                    />
                     <input 
                        placeholder="Senha"
                        value={password}
                        onChange={e=> setPassword(e.target.value)}
                    />
                    <span>{message}</span>
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