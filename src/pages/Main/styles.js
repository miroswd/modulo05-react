import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 30px;
  margin: 80px auto; /*80 na horizontal e centralizado na vertical, com largura máxima de 700*/

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

// Animação de loading
const rotate = keyframes`
  from{ /**Rotação inicial */
    transform: rotate(0deg) /* Zero graus de rotação */
  }

  to {
    transform:rotate(360deg)
  }
`;

export const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1; /**Ocupa todo espaço possível */
    padding: 7px 13px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    animation: ${rotate} 2s step-end infinite;
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading, // pega a propriedade disabled
}))`
  background-color: #267d8d;
  padding: 0 10px;
  margin-left: 7px;
  border: 0;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    /* & => Faz uma referência ao botão */
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Como não tem else, ao invés de usar ?: usar && */

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      /* Posso me referenciar ao elemento atual, no caso li
         Aplica uma estilização entre os itens, que tenha um <li> antes
      */
      border-top: 1px solid #ddd;

      /* Assim  me incomoda menos
        border: 1px solid #ddd;
        margin: 10px 0;
        padding: 20px;
       */
    }

    a {
      color: #267d8d;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
