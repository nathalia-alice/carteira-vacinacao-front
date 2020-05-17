import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'
import logoImg from  '../../assets/saúde.png';

export default function Profile(){
    const [users, setUsers] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem('token');
   
    useEffect(()=>{
        if(users.length === 0){
            api.get('vacinasxusuario', {
                headers: { 
                    'x-access-token': token
                }  
            })
            .then(response => {
                setUsers(response.data);
            })
        }
    })

    function handleLogout(){
        localStorage.removeItem('token');
        history.push('/')
    }
    
    return (
        <div className="profile-container">
            <header>
                <a className="logo" href="/">
                    <img src={logoImg} alt="Carteira de Vacinação Online"></img>
                </a>
                <Link className="button" to="/vacinasxusuario/new">
                   Cadastrar nova vacina
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
           <h1>Vacinas cadastradas</h1>
           <ul>
               {users.map((user) => (
               <li key={user.id}>
                    <strong>NOME DO CIDADÃO:</strong>
                   <p>{user.name}</p>
                   <strong>NOME DA VACINA:</strong>
                   <p>{user.name_vacina}</p>
                   <strong>DESCRIÇÃO DA VACINA:</strong>
                   <p>{user.description}</p>
                   <strong>DATA DA VACINA:</strong>
                   <p>{user.date}</p>
               </li>
               ))}
           </ul>
        </div>
    );
}