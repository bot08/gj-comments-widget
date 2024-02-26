import {html} from 'lit';

export const spiner = html`
  <style>
    .loader {
      border: 8px solid #f3f3f3;
      border-radius: 50%;
      border-top: 8px solid #555;
      width: 24px;
      height: 24px;
      -webkit-animation: spin 1s linear infinite;
      animation: spin 1s linear infinite;
      margin: 12px;
    }

    @-webkit-keyframes spin {
      0% { -webkit-transform: rotate(0deg); }
      100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
  <div class="loader"></div>
`
