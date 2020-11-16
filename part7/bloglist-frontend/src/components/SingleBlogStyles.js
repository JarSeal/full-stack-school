import styled from 'styled-components';

export const OneBlog = styled.div`
  .author {
    font-size: 14px;
    font-weight: 400;
    color: #777;
  }
  > h3 {
    display: inline-block;
    width: 100%;
    padding-right: 70px;
    position: relative;
    box-sizing: border-box;
  }
  .delete-button {
    position: absolute;
    top: 5px;
    right: 0;
  }
  .blog-content {
    line-height: 26px;
  }
  .new-comment-form {
    margin: -18px 0 20px;
  }
  .form-elem,
  .form-elem label {
    max-width: none;
    width: auto;
    display: inline-block;
  }
  .label-text {
    width: 112px;
  }
  .input-text {
    width: 250px;
  }
  .form-elem__submit {
    width: 116px;
    margin-left: 0;
    display: inline-block;
  }
  .form-elem__submit > button[type=submit] {
    width: 116px;
  }
  .comments-list {
    > div {
      display: inline-block;
      padding: 10px;
      background-color: #999;
      margin-right: 10px;
      margin-bottom: 10px;
      color: #fff;
      border-radius: 4px;
    }
  }
`;