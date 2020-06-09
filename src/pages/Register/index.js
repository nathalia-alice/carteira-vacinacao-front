import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'


export default function Register(){
    const [name, setName]  = useState('');
    const [doc, setDoc] = useState('');
    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [birth, setBirth] = useState('');
    const [telephone, setTelephone] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [passwordNormalize, setSenha] = useState('');

    const history = useHistory();
    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name,
            doc, 
            cep,
            street,
            neighborhood,
            city,
            state,
            number,
            complement,
            birth,
            telephone,
            type,
            email,
            passwordNormalize,
        };

        try{
            await api.post('users', data);

            history.push('/');

        }catch(err){
             console.error("Erro:", err);
        }
    }
    return (
        <div className="register-container">
           <div className="content">
                <form onSubmit={handleRegister}>
                <section>
                    <h1 class="title">Cadastro de Usuários</h1>
                    <p>Faça seu cadastro, entre na plataforma e tenha acesso a sua carteira de vacinação online.</p>

                    <h3>Dados Cadastrais</h3>
                    <select onChange={e => setType(e.target.value)}>
                        <option value="">Selecione seu perfil</option>
                        <option value="posto-saude">Posto de Saúde</option>
                        <option value="cidadao">Cidadão</option>
                    </select>
                    <input 
                        placeholder="Nome Completo"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                    />
                     <input 
                        placeholder="Data de Nascimento"
                        value={birth}
                        onChange={e=> setBirth(e.target.value)}
                    />
                     <input 
                        placeholder="CPF/CNPJ"
                        value={doc}
                        onChange={e=> setDoc(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e=> setEmail(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={passwordNormalize}
                        onChange={e=> setSenha(e.target.value)} 
                    />
                    <input 
                        placeholder="Telefone"
                        value={telephone}
                        onChange={e=> setTelephone(e.target.value)} 
                    />
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para o login
                    </Link>
                </section>
                <section>
                    
                    <h3>Endereço</h3>
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e=> setCity(e.target.value)} 
                        />
                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={state}
                            onChange={e=> setState(e.target.value)} 
                        />
                    </div>
                    <input 
                        placeholder="CEP"
                        value={cep}
                        onChange={e=> setCep(e.target.value)} 
                    />
                    <input 
                        placeholder="Bairro"
                        value={neighborhood}
                        onChange={e=> setNeighborhood(e.target.value)} 
                    />
                     <div className="input-group">
                        <input 
                            placeholder="Rua"
                            value={street}
                            onChange={e=> setStreet(e.target.value)} 
                        />
                        <input 
                            placeholder="Nº" 
                            style={{width: 100}}
                            value={number}
                            onChange={e=> setNumber(e.target.value)} 
                        />
                    </div>
                    <input 
                        placeholder="Complemento"
                        value={complement}
                        onChange={e=> setComplement(e.target.value)} 
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </section>
                </form>
           </div>
        </div>
    );
}