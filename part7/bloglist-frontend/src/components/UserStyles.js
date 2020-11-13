import styled from 'styled-components';

export const UserList = styled.ul`
  list-style: none;
  margin: 0 0 30px;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;
  & .heading {
    width: 100%;
    padding: 8px 16px 8px;
    box-sizing: border-box;
    color: #e2e2e2;
    background-color: #888;
  }
  & .heading__name,
  & .heading__blogs {
    display: inline-block;
  }
  & .heading__name {
    width: 70%;
  }
  & .heading__blogs {
    width: 30%;
  }
`;

export const UserWrapper = styled.li`
  width: 100%;
  background: rgb(241,241,241);
  background: linear-gradient(0deg, rgb(241,241,241) 0%, rgb(228,228,228) 100%);
  padding: 8px 16px 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  & .user-name {
    display: inline-block;
    width: 70%;
    margin: 0;
    font-weight: 400;
  }
  & .user-blog-count {
    display: inline-block;
    width: 30%;
  }
  &:nth-child(odd) {
    background: rgb(220,220,220);
    background: linear-gradient(0deg, rgb(210,210,210) 0%, rgb(230,230,230) 100%);
  }
  &:hover {
    background: rgb(200, 200, 200);
  }
`;