import styled from 'styled-components';

export const OneBlog = styled.div`
  & .author {
    font-size: 14px;
    font-weight: 400;
    color: #777;
  }
  & > h3 {
    display: inline-block;
    width: 100%;
    padding-right: 70px;
    position: relative;
    box-sizing: border-box;
  }
  & .delete-button {
    position: absolute;
    top: 5px;
    right: 0;
  }
  & .blog-content {
    line-height: 26px;
  }
`;