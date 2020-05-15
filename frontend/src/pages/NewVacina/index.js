import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

export default function NewVacina(){
    const [id_vacina, setVacina] = useState('');
    const [id_usuario, setUsuario] = useState('');
    const [vacina, getVacina] = useState('');
    const [date, setDate] = useState(new Date());
    
    const history = useHistory();
    
    async function handleNewVacina(event){
        event.preventDefault();

        const data = {
            id_vacina,
            id_usuario,
            date
        };
     
        try{
            await api.post('vacinasxusuario', data);

            history.push('/profile');
        }catch(err){
             console.error("Erro:", err);
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
             <section>
                 <h1>Cadastrar nova vacina</h1>
                 <p>Descreva a vacina detalhadamente.</p>
                 <Link className="back-link" to="/profile">
                     <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                     Voltar para home
                 </Link>
             </section>
             <form onSubmit={handleNewVacina}>
                 <input 
                    placeholder="Digite o CPF do cidadão"
                    value={id_usuario}
                    onChange={e=> setUsuario(e.target.value)} 
                />
                <select onChange={e => setVacina(e.target.value)}>
                    <option value="" selected>Selecione a vacina</option> 
                    <option value="de54658b">Covid19</option> 
                    <option value="9e4ae685">H1N1</option>
                </select>

                 <button className="button" type="submit">Cadastrar</button>
             </form>
        </div>
     </div>
    );
}