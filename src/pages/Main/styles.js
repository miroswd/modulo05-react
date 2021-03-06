import styled, { keyframes, css } from 'styled-components';

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
    border: 1px solid ${props => (props.error ? '#f15' : '#ddd')};
    border-radius: 4px;
    font-size: 16px;
    animation: ${rotate} 2s step-end infinite;

    transition: border 0.25s ease-out;
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
