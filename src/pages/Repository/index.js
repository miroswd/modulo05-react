import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

export default class Repository extends Component {
  // Como é um component de classe, posso definir as proptypes aqui mesmo
  // Pra definir uma propriedade como objeto, usar shape
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {}, // Como é um único repositório, tem q ser iniciado como um objeto
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.rep);

    // const repository = await api.get(`/repos/${repoName}`);
    // const issues = await api.get(`/repos/${repoName}/issues`);

    const [repository, issues] = await Promise.all([
      // Executando as duas requisições ao mesmo tempo
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open', // Retornando 5 itens abertos
          per_page: 5,
        },
      }), // Query params
    ]); // Retornado dentro de um array
    // console.log(repository);
    // console.log(issue);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    return <h1>Repository</h1>;
  }
}
