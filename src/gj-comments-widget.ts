/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { spiner } from './icons';
import { baseStyles } from './comments-styles'

interface Comment {
  avatar_id: number;
  username: string;
  comment: string;
}

@customElement('gj-comments-widget')
export class CommentList extends LitElement {
  static override styles = baseStyles;

  @property({ type: Array }) comments: Comment[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: String }) branch = '';
  @property({ type: String }) baseURL = 'sushicat.pp.ua/api/genshin'; // api.genshin-journey.website/.netlify/functions/index  OR  sushicat.pp.ua/api/genshin-ua
  @property({ type: String }) imgBaseURL = 'genshin-journey.website/img/avatars';

  override connectedCallback() {
    super.connectedCallback();
    this.loadComments();
  }

  async loadComments() {
    this.loading = true;
    try {
      const response = await fetch(`https://${this.baseURL}/additional/comments/get.php?branch=${this.branch}`);
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
              <img class="avatar" src="https://${this.imgBaseURL}/${comment.avatar_id}.jpg" alt="Avatar">
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