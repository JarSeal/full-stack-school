import styled from 'styled-components';

export const BlogList = styled.div`
  padding-bottom: 30px;
`;

export const BlogItem = styled.div`
  background: rgb(241,241,241);
  background: linear-gradient(0deg, rgba(241,241,241,1) 0%, rgba(228,228,228,1) 100%);
  padding: 4px 16px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  & + & {
    margin-top: 10px;
  }
  & > h3 {
    margin-top: 8px;
    margin-bottom: 0;
    padding-right: 130px;
    font-size: 24px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    transition: color 0.2s ease-in-out;
  }
  & > h3 span.author {
    color: #777;
    font-size: 14px;
    display: inline-block;
    margin-left: 6px;
    transition: color 0.2s ease-in-out;
  }
  & > h3 span.likes-big {
    color: #999;
    position: absolute;
    display: block;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    margin-top: -2px;
    font-size: 48px;
    opacity: 0.2;
    padding-right: 20px;
    transition: color 0.2s ease-in-out;
  }
  & > h3 span.likes-big span {
    position: absolute;
    top: 21px;
    right: -12px;
    transform: rotate(90deg);
    font-size: 12px;
    text-transform: uppercase;
  }
  &:hover {
    background: rgb(200,200,200);
    h3,
    h3 span.author {
      color: #fff;
    }
    > h3 span.likes-big {
      color: #fff;
      opacity: 1;
    }
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