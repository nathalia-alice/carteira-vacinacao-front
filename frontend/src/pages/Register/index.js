import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css'


export default function Register(){
    const [name, setName]  = useState('');
    const [doc, setDoc] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [senhaNormalize, setSenha] = useState('');

    const history = useHistory();
    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name,
            doc, 
            cep,
            rua,
            bairro,
            cidade,
            estado,
            numero,
            complemento,
            nascimento,
            telefone,
            type,
            email,
            senhaNormalize,
        };

        try{
            await api.post('usuarios', data);

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
                        placeholder="Data de nascimento"
                        value={nascimento}
                        onChange={e=> setNascimento(e.target.value)}
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
                        value={senhaNormalize}
                        onChange={e=> setSenha(e.target.value)} 
                    />
                    <input 
                        placeholder="Telefone"
                        value={telefone}
                        onChange={e=> setTelefone(e.target.value)} 
                    />
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para o logon
                    </Link>
                </section>
                <section>
                    
                    <h3>Endereço</h3>
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e=> setCidade(e.target.value)} 
                        />
                        <input 
                            placeholder="UF" 
                            style={{width: 80}}
                            value={estado}
                            onChange={e=> setEstado(e.target.value)} 
                        />
                    </div>
                    <input 
                        placeholder="CEP"
                        value={cep}
                        onChange={e=> setCep(e.target.value)} 
                    />
                    <input 
                        placeholder="Bairro"
                        value={bairro}
                        onChange={e=> setBairro(e.target.value)} 
                    />
                     <div className="input-group">
                        <input 
                            placeholder="Rua"
                            value={rua}
                            onChange={e=> setRua(e.target.value)} 
                        />
                        <input 
                            placeholder="Nº" 
                            style={{width: 100}}
                            value={numero}
                            onChange={e=> setNumero(e.target.value)} 
                        />
                    </div>
                    <input 
                        placeholder="Complemento"
                        value={complemento}
                        onChange={e=> setComplemento(e.target.value)} 
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </section>
                </form>
           </div>
        </div>
    );
}