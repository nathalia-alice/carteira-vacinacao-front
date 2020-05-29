import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { GiLoveInjection } from "react-icons/gi";

import './styles.css'

export default function NewVaccine(){
    const [name_vaccine, setNameVaccine] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();
    const token = localStorage.getItem('token');

    function handleLogout(){
        localStorage.removeItem('token');
        history.push('/')
    }

    async function handleNewVaccine(event){
        event.preventDefault();

        const data = {
            name_vaccine,
            description,
        };
     
        try{
            await api.post('vaccines', data, {
                 headers: {'x-access-token': token }
            });

            history.push('/listvaccine');
        }catch(err){
             console.error("Erro:", err);
             handleLogout();
        }
    }

    return (
       
        <div className="new-incident-container">
        <div className="content">
             <section>
                 <h1><GiLoveInjection size={35} color="#e02041"></GiLoveInjection>Cadastrar nova vacina</h1>
                 <p>Descreva a vacina detalhadamente.</p>
                 <Link className="back-link" to="/home">
                     <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                     Voltar para home
                 </Link>
             </section>
             <form onSubmit={handleNewVaccine}>
                 <input 
                    placeholder="Digite o Nome da Vacina"
                    value={name_vaccine}
                    onChange={e=> setNameVaccine(e.target.value)} 
                />
               <textarea 
                    placeholder="Digite a Descrição da Vacina"
                    value={description}
                    onChange={e=> setDescription(e.target.value)}
                />
                 <button className="button" type="submit">Cadastrar</button>
             </form>
        </div>
     </div>
    );
}