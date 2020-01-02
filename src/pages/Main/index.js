import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Container } from '../../components/Container';
import { Form, List, SubmitButton } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
  };

  // Carregar os dados do local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      // Se tiver alguma coisa armazenada no localStorage
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    // Comparando se o estado de repos mudou em relação ao estado atual
    const { repositories } = this.state;
    if (prevState !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault(); // Evita o refresh na página
    const { newRepo, repositories } = this.state;

    // Removendo o botão +
    this.setState({ loading: true });

    const response = await api.get(`/repos/${newRepo}`);

    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, loading, repositories } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {/* Conditional Rendering */}
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(rep => (
            <li key={rep.name}>
              <span>{rep.name}</span>
              <Link to={`/repository/${encodeURIComponent(rep.name)}`}>
                {/* Transformando a barra da url em caracter especial, usando o encode */}
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
