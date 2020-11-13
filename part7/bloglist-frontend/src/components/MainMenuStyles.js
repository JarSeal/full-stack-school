import styled from 'styled-components';

export const Menu = styled.nav`
  width: 100%;
  position: relative;
  box-sizing: border-box;
  padding: 4px 250px 4px 4px;
  border-radius: 4px;
  background-color: #666;
  display: inline-block;
  min-height: 37px;
  margin-bottom: 10px;
  vertical-align: middle;
  & .link {
    display: inline-block;
    padding: 7px 14px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid transparent;
    background-color: transparent;
    color: #fff;
    font-size: 11px;
    text-transform: capitalize;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    box-sizing: border-box;
    text-decoration: none;
  }
  & .link:hover {
    background-color: #333;
    border: 1px solid transparent;
  }
  & .link + .link,
  & .link + span {
    margin-left: 4px;
  }
  & .link.active {
    background-color: #777;
  }
`;

export const Info = styled.div`
  position: absolute;
  right: 4px;
  color: #ccc;
  font-size: 12px;
  & button {
    margin-left: 6px;
  }
`;