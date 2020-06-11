import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css'
import logoImg from  '../../assets/saúde.png';

export default function Home(){
    const [profile, setProfile] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(()=>{
        getProfile();
    })

    function handleLogout(){
        localStorage.removeItem('token');
        history.push('/')
    }

    function getProfile(){
        if(profile.length === 0){
            api.get('profile', {
                headers: { 
                    'x-access-token': token
                }  
            })
            .then(response => {
                setProfile(response.data);
                setCep(response.data.cep);
                setStreet(response.data.street);
                setNeighborhood(response.data.neighborhood);
                setCity(response.data.city);
                setState(response.data.state);
                setNumber(response.data.number);
                setComplement(response.data.complement);
                setTelephone(response.data.telephone);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error(error.response.data.message);
                handleLogout();
            })
        }
    }


    async function handleEditProfile(event){
        event.preventDefault();

        const data = {
            cep,
            street,
            neighborhood,
            city,
            state,
            number,
            complement,
            telephone,
            email        
        };
       
        try{
            await api.put(`users/${profile.id}`, data, {
                headers: { 
                    'x-access-token': token
                } 
            });

            history.push('/home');

        }catch(err){
             console.error("Erro:", err);
        }
    }

  
    return (
        <div className="edit-profile">
            <header>
                <a className="logo" href="/">
                    <img src={logoImg} alt="Carteira de Vacinação Online"></img>
                </a>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>
            <form onSubmit={handleEditProfile}>
                <label>CEP</label>
                <input
                    name="cep"
                    placeholder="CEP"
                    defaultValue={profile.cep}
                    onChange={e=> setCep(e.target.value)} 
                />
                <label>Rua</label>
                <input
                    name="rua"
                    placeholder="Rua"
                    defaultValue={profile.street}
                    onChange={e=> setStreet(e.target.value)} 
                />
                <label>Bairro</label>
                <input
                    name="bairro"
                    placeholder="Bairro"
                    defaultValue={profile.neighborhood}
                    onChange={e=> setNeighborhood(e.target.value)} 
                />
                <label>Cidade</label>
                <input
                    name="cidade"
                    placeholder="Cidade"
                    defaultValue={profile.city}
                    onChange={e=> setCity(e.target.value)} 
                />
                <label>Estado</label>
                <input
                    name="estado"
                    placeholder="Estado"
                    defaultValue={profile.state}
                    onChange={e=> setState(e.target.value)} 
                />
                <label>Número</label>
                <input
                    name="numero"
                    placeholder="Número"
                    defaultValue={profile.number}
                    onChange={e=> setNumber(e.target.value)} 
                />
                <label>Complemento</label>
                <input
                    name="complemento"
                    placeholder="Complemento"
                    defaultValue={profile.complement}
                    onChange={e=> setComplement(e.target.value)} 
                />
                <label>Telefone</label>
                <input
                    name="telefone"
                    placeholder="Telefone"
                    defaultValue={profile.telephone}
                    onChange={e=> setTelephone(e.target.value)} 
                />
                <label>E-mail</label>
                <input
                    name="email"
                    placeholder="E-mail"
                    defaultValue={profile.email}
                    onChange={e=> setEmail(e.target.value)} 
                />
                <button className="button" type="submit">Alterar</button>
            </form>
        </div>
    );
}