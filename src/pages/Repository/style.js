import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Altura total da tela */
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  a {
    color: #267d8d;
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #ddd;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    & + li {
      margin-top: 20px;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid #ded;
    }

    div {
      flex: 1; /*Ocupa todo o espaço possível */
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #444;

          &:hover {
            color: #267d8d;
          }
        }

        span {
          background-color: rgba(35, 128, 144, 0.8);
          color: #fff;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 2px 4px;
          margin-left: 6px;
        }
      }
      p {
        margin-top: 7px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 25px;
  button {
    color: #fff;
    font-weight: 600;

    border-radius: 4px;
    border: 0;
    outline: 0;
    background-color: #267d8d;

    width: 70px;
    padding: 5px;
    margin: 0 0.25rem;

    &:hover {
      transition: opacity 0.25 ease-in;
      opacity: 0.8;
      box-shadow: 0 0 2px black;
    }

    &:nth-child(${props => props.active + 1}) {
      background-color: #3a4151;
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;

  button {
    transition: opacity 0.25s ease-in;
    color: #fff;
    background-color: #267d8d;
    font-weight: 600;

    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 5px;

    margin: 0 0.3rem;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
