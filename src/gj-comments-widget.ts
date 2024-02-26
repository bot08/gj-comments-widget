/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spiner } from './icons';

interface Comment {
  avatar_id: number;
  username: string;
  comment: string;
}

@customElement('gj-comments-widget')
export class CommentList extends LitElement {
  static override styles = css`
    .comment-container {
      font: 1.2em "Fira Sans", sans-serif;
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      padding: 8px;
      background: #f9fafb;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 5px;
      margin-right: 12px;
    }
    .name {
      font-weight: bold;
      margin-right: 5px;
    }
    .comment {
      flex: 1;
    }
    .loading {
      display: flex;
      justify-content: center;
      font-style: italic;
      color: gray;
    }
  `;

  @property({ type: Array }) comments: Comment[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) branch = '';
  @property({ type: String }) baseURL = 'sushicat.pp.ua/api/genshin'; // api.genshin-journey.site/.netlify/functions/index  OR  sushicat.pp.ua/api/genshin-ua

  override connectedCallback() {
    super.connectedCallback();
    this.loadComments();
  }

  async loadComments() {
    this.loading = true;
    try {
      const response = await fetch(`https://${this.baseURL}/additional/comments/get.php?branch=${this.branch}`);
      if (!response.ok) {
        console.warn('Error fetching comments');
      }
      const data = await response.json();
      this.comments = data;
    } catch (error) {
      console.warn('Error fetching comments:', error);
    } finally {
      this.loading = false;
    }
  }


  override render() {
    return html`
      ${
        this.loading
        ? 
        html`<div class="loading">${spiner}</div>`
        : 
        !this.comments 
        ?
        html`<div class="loading">No comments</div>`
        :
        this.comments.map(
          comment => html`
            <div class="comment-container">
              <img class="avatar" src="https://genshin-journey.site/img/avatars/${comment.avatar_id}.jpg" alt="Avatar">
              <div>
                <div class="name">${comment.username}</div>
                <div class="comment">${comment.comment}</div>
              </div>
            </div>
          `
        )
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gj-comments-widget': CommentList;
  }
}
