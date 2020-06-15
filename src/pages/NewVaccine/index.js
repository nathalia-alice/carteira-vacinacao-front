import React, {useEffect, useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { GiLoveInjection } from "react-icons/gi";
import Downshift from 'downshift'
import './styles.css'

export default function NewVaccine(){
    const [id_vaccine, setVacina] = useState('');
    const [id_user, setUsuario] = useState('');
    const [users, setUsers] = useState('');
    const [vaccines, setVaccines] = useState('');
    const date = new Date();
    const history = useHistory();
    const token = localStorage.getItem('token');

    useEffect(()=>{
        getUsers();
        getVaccines();
    })

    async function handleLogout(){
        localStorage.removeItem('token');
        history.push('/')
    }

    async function handleNewVaccine(event){
        event.preventDefault();

        const data = {
            id_vaccine,
            id_user,
            date
        };
     
        try{
            await api.post('vaccinesxuser', data);

            history.push('/home');
        }catch(err){
             console.error("Erro:", err);
             handleLogout();
        }
    }

    async function getUsers(){
        if(users.length === 0){
            api.get('users', {
                headers: { 
                    'x-access-token': token
                }  
            })
            .then(response => {
                var array = [];

                response.data.find(function (element) { 
                   if(element.type  === "cidadao"){
                    array.push(element.doc)
                   }
                });

                setUsers(array);
            })
            .catch(error => {
                console.error(error.response.data.message);
                handleLogout();
            })
        }
    }

    async function getVaccines(){
        if(vaccines.length === 0){
            api.get('vaccines')
            .then(response => {
                var array = [];

                response.data.find(function (element) { 
                   array.push(element.name_vaccine)
                });

                setVaccines(array);
              
            })
            .catch(error => {
                console.error(error.response.data.message);
                handleLogout();
            })
        }
    }

    let input = <Downshift
    onChange={selection => setUsuario(selection)}>
        {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue
        }) => (
        <div>
            <label {...getLabelProps()}>Digite o CPF do cidadão</label>
            <input {...getInputProps()} />
            {isOpen ? (
            <div className="input-personalized">
                {users
                .filter(i => !inputValue || i.includes(inputValue))
                .map((item, index) => (
                    <div
                    {...getItemProps({
                        key: item,
                        index,
                        item
                    })}>
                    {item}
                    </div>
                ))}
            </div>
            ) : null}
        </div>
        )}
    </Downshift>;

    let options = <Downshift
    onChange={selection => setVacina(selection)}>
        {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue
        }) => (
        <div>
            <label {...getLabelProps()}>Digite o nome da vacina</label>
            <input {...getInputProps()} />
            {isOpen ? (
            <div className="input-personalized">
                {vaccines
                .filter(i => !inputValue || i.includes(inputValue))
                .map((item, index) => (
                    <div
                    {...getItemProps({
                        key: item,
                        index,
                        item
                    })}>
                    {item}
                    </div>
                ))}
            </div>
            ) : null}
        </div>
        )}
    </Downshift>;


    return (
       
        <div className="new-incident-container">
        <div className="content">
             <section>
                 <h1><GiLoveInjection size={35} color="#e02041"></GiLoveInjection>Cadastrar nova vacina</h1>
                 <p>Digite nos campos para buscar.</p>
                 <Link className="back-link" to="/home">
                     <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                     Voltar para vacinas
                 </Link>
             </section>
             <form onSubmit={handleNewVaccine}>
                {input}
               
                {options}
                 <button className="button" type="submit">Cadastrar</button>
             </form>
        </div>
     </div>
    );
}