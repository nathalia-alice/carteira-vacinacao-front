import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, withRouter } from 'react-router-dom';
import api from '../../services/api';
import { GiLoveInjection } from "react-icons/gi";

import './styles.css'

class EditVaccine extends React.Component {
   
    constructor(props) {
        super(props);

        this.handleEditVaccine = this.handleEditVaccine.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            name_vaccine: props.location.state.name_vaccine,
            description: props.location.state.description
        };
    }

    handleEditVaccine(event) {
        event.preventDefault();
        var data = this.state;
        var token = localStorage.getItem('token');
        var id = this.props.location.state.id;

        api.put(`vaccines/${id}`, data, {
            headers: { 
                'x-access-token': token
            } 
        })
        .then(response => {
            this.props.history.push('/listvaccine');    

        })
        .catch(error => {
            console.error(error)
            this.handleLogout();
        })
    }

    handleLogout(){
        localStorage.removeItem('token');
        this.props.history.push('/');    
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    render() {
        return (
            <div className="new-incident-container">
                <div className="content">
                    <section>
                        <h1><GiLoveInjection size={35} color="#e02041"></GiLoveInjection>Editar vacina</h1>
                        <Link className="back-link" to="/listvaccine">
                            <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                        Voltar para vacinas
                    </Link>
                    </section>
                    <form onSubmit={this.handleEditVaccine}>
                        <input
                            name="name_vaccine"
                            placeholder="Digite o Nome da Vacina"
                            defaultValue={this.state.name_vaccine}
                            onChange={this.myChangeHandler}
                        />
                        <textarea
                            name="description"
                            placeholder="Digite a Descrição da Vacina"
                            defaultValue={this.state.description}
                            onChange={this.myChangeHandler}
                        />
                        <button className="button" type="submit">Cadastrar</button>

                    </form>
                </div>
            </div>
        );
    }
};

export default withRouter(EditVaccine);

