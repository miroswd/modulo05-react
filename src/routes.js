import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// BrowserRouter -> Permite navegar entre páginas, através de barra -> /repository
// Switch -> Garante que seja chamada apenas uma rota por momento
// Route -> Representa uma página da aplicação

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* exact -> busca exatamente aquela URL */}
        <Route path="/" exact component={Main} /> {/* Acessando a rota raiz */}
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
