import styled from 'styled-components';

export const BlogList = styled.div`
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 2px dashed #bbb;
`;

export const BlogItem = styled.div`
  background: rgb(241,241,241);
  background: linear-gradient(0deg, rgba(241,241,241,1) 0%, rgba(228,228,228,1) 100%);
  padding: 4px 16px 8px;
  border-radius: 4px;
  & + & {
    margin-top: 10px;
  }
  & > h3 {
    margin-top: 8px;
    margin-bottom: 12px;
    padding-right: 130px;
    padding-bottom: 8px;
    font-size: 24px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #fff;
    position: relative;
  }
  & > h3:before {
    display: block;
    content: "";
    width: 100%;
    height: 1px;
    background-color: #ccc;
    position: absolute;
    bottom: 0;
  }
  & > h3 span.author {
    color: #777;
    font-size: 14px;
    display: inline-block;
    margin-left: 6px;
  }
  & > h3 span.likes-big {
    color: #999;
    position: absolute;
    display: block;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    margin-top: -6px;
    font-size: 48px;
    opacity: 0.2;
    padding-right: 20px;
  }
  & > h3 span.likes-big span {
    position: absolute;
    top: 21px;
    right: -12px;
    transform: rotate(90deg);
    font-size: 12px;
    text-transform: uppercase;
  }
  & .togglable {
    min-height: 12px;
    position: relative;
  }
  & .toggle-area {
    transform: translateY(12px);
  }
  & .toggle-button {
    border-radius: 0 0 4px 4px;
    font-size: 10px;
    padding: 4px 20px;
    top: -14px;
    position: absolute;
    border-color: transparent;
    background-color: #ccc;
  }
  & a,
  & a:visited {
    color: #555;
    transition: color 0.2s ease-in-out;
  }
  & a:hover {
    color: #333;
    text-decoration: none;
  }
  & .toggle-area.visi-false.phase-2,
  & .toggle-area.visi-false.phase-3,
  & .toggle-area.visi-true.phase-1 {
    max-height: 126px;
  }
`;

export const InfoRow = styled.div`
  ${ props => props.alignRight ? 'text-align: right;' : '' }
  & + & {
    margin-top: 10px;
  }
  & > span {
    display: inline-block;
    min-width: 80px;
    margin-right: 8px;
    font-weight: 700;
    color: #777;
    font-size: 14px;
  }
  & .delete-button {
    margin-top: -36px;
    margin-bottom: 8px;
  }
`;