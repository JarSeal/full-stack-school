import styled from 'styled-components';

export const BackButton = styled.button`
  display: inline-block;
  margin-right: 8px;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  background-color: #333;
  width: 24px;
  height: 24px;
  border: none;
  box-sizing: border-box;
  transform: translateY(5px);
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:before {
    display: block;
    content: '➜';
    position: absolute;
    top: 3px;
    left: 4px;
    transform: rotate(180deg);
  }
  &:hover {
    background-color: #000;
  }
`;