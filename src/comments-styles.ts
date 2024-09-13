import { css } from 'lit';

export const baseStyles = css`
  .comment-container {
    font: 1.2em arial, helvetica, sans-serif;
    min-height: 64px;
    margin-bottom: 12px;
    padding: 8px;
    border-radius: 12px;
    background: #f9fafb;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  .avatar {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 12px;
    border-radius: 8px;
  }
  .name {
    font-weight: bold;
    margin-right: 4px;
  }
  .loading {
    display: flex;
    justify-content: center;
    color: gray;
  }
`;