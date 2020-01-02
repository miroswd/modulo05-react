import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container } from '../../components/Container';
import { Loading, Owner, IssueList } from './style';

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
          per_page: 10,
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

    if (loading) {
      // Enquanto está sendo carregando
      return <Loading>Carregando...</Loading>;
    }

    // Retorna quando for carregado
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos Repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                {/* Encapsulando para usar o flexbox */}
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {/* Labels - etiqueta da issue */}
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
