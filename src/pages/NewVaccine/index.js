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
    const date = new Date();
    const items = ['03807092013', '53807092013', '09807092013', '03808092013', '75807092013']
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [profile, setProfile] = useState([]);

    useEffect(()=>{
        getProfile();
    })

    function handleLogout(){
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
                {items
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

    function getProfile(){
        console.log("teste", profile)
        if(profile.length === 0){
            api.get('usuarios', {
                headers: { 
                    'x-access-token': token
                }  
            })
            .then(response => {
                console.log("data", response.data)
                setProfile(response.data);
                // console.log("setProfile", profile)
            })
            .catch(error => {
                console.error(error.response.data.message);
            })
        }
    }

    return (
       
        <div className="new-incident-container">
        <div className="content">
             <section>
                 <h1><GiLoveInjection size={35} color="#e02041"></GiLoveInjection>Cadastrar nova vacina</h1>
                 <p>Descreva a vacina detalhadamente.</p>
                 <Link className="back-link" to="/listvaccine">
                     <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                     Voltar para vacinas
                 </Link>
             </section>
             <form onSubmit={handleNewVaccine}>
                {input}
                 {/* <input 
                    placeholder="Digite o CPF do cidadão"
                    value={id_user}
                    onChange={e=> setUsuario(e.target.value)} 
                /> */}
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