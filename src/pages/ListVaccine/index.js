import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css'
import logoImg from  '../../assets/saúde.png';

export default function Home(){
    const [vaccines, setVaccines] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem('token');
   
    useEffect(()=>{
        getVacinas();
    })

    function handleLogout(){
        localStorage.removeItem('token');
        history.push('/')
    }

    function getVacinas(){
        if(vaccines.length === 0){
            api.get('vaccines')
            .then(response => {
                setVaccines(response.data);
            })
            .catch(error => {
                console.error(error.response.data.message);
                handleLogout();
            })
        }
    }

    
    async function handleDeleteVaccine(id){
        try{
            await api.delete(`vaccines/${id}`, {
                headers: { 
                    'x-access-token': token
                }  
            });
            setVaccines(vaccines.filter(vaccines => vaccines.id !== id))
        }catch(err){
            handleLogout();
            console.error("Erro ao deletar vacina, tente novamente.");
        }
    }
    
    return (
 
        <div className="list-vaccine">
            <header>
                <a className="logo" href="/home">
                    <img src={logoImg} alt="Carteira de Vacinação Online"></img>
                </a>
                <Link className="button" to="/vaccines/new">Cadastrar nova vacina</Link>
            </header>
            <h1>Vacinas cadastradas</h1>
            <ul>
                {vaccines.map((user) => (
                   
                <li key={user.id}>
                
                    <strong>NOME DA VACINA:</strong>
                    <p>{user.name_vaccine}</p>
                    <strong>DESCRIÇÃO DA VACINA:</strong>
                    <p>{user.description}</p>
                    <button onClick={() => handleDeleteVaccine(user.id)} type="button">
                       <FiTrash2 size={20} color="red"></FiTrash2>
                   </button>
                   <Link className="edit" type="button" to={{
                            pathname: "/vaccines/edit",
                            state: user
                        }} >
                       <FiEdit2 size={20} color="blue"></FiEdit2>
                   </Link>


                </li>
                ))}
            </ul>
        </div>

    );
}