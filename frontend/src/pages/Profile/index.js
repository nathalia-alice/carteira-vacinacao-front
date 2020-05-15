import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css'
import logoImg from  '../../assets/saúde.png';

var loadingVacinas = false;

export default function Profile(){
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        if(loadingVacinas === false){
            api.get('vacinasxusuario')
            .then(response => {
                loadingVacinas = true;
                setUsers(response.data);
            })
        }
    })

    return (
        <div className="profile-container">
            <header>
                <a class="logo" href="/">
                    <img src={logoImg} alt="Carteira de Vacinação Online"></img>
                </a>
                <Link className="button" to="/vacinasxusuario/new">
                   Cadastrar nova vacina
                </Link>

            </header>
           <h1>Vacinas cadastradas</h1>
           <ul>
               {users.map(user => (
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