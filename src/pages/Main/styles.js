import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 32px;
  color: ${props => (props.error ? '#715' : '#7159c1')};
  font-family: Arial, Helvetica, sans-serif;

  small {
    font-size: 16px;
    color: #715;
  }
`;
