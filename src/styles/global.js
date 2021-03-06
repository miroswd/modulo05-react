import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  /* Tudo de CSS aqui dentro, será aplicado em toda aplicação */
  * {
    margin:0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
  }
  html, body, #app {
    min-height: 100%;
  }
  body{
    background:#067D8E;
    -webkit-font-smoothing: antialiased !important; /* Deixa a fonte mais definida, !important pro browser não remover essa propriedade*/
  }
  body, input, button {
    color:#222;
    font-size:14px;
    font-family:Arial, Helvetica, sans-serif;
  }
  button{
    cursor:pointer;
  }
`;
