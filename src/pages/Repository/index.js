import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import { Container } from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './style';

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
    filters: [
      {
        state: 'all',
        label: 'All',
        active: true,
      },
      {
        state: 'open',
        label: 'Open',
        active: false,
      },
      {
        state: 'closed',
        label: 'Closed',
        active: false,
      },
    ],

    filterIndex: 0,
    max: 5,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.rep);

    // const repository = await api.get(`/repos/${repoName}`);
    // const issues = await api.get(`/repos/${repoName}/issues`);

    const [repository, issues] = await Promise.all([
      // Executando as duas requisições ao mesmo tempo
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(f => f.active).state, // Buscando o active:true
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

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.rep);
    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });
    const maxPage = Array.from(response.data);

    this.setState({ issues: response.data, max: maxPage });
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex });
    this.loadIssues();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      filterIndex,
      page,
      max,
    } = this.state;

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
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilterClick(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>
          {/*  */}
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
        {/*  */}
        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button
            type="button"
            disabled={max < 5}
            onClick={() => this.handlePage('next')}
          >
            Próximo
          </button>
        </PageActions>
      </Container>
    );
  }
}
