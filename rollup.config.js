/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import minifyHTML from 'rollup-plugin-minify-html-literals';

export default {
  input: 'cache/gj-comments-widget.js',
  output: {
    file: 'build/gj-comments-widget.js',
    format: 'iife',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({
      'Reflect.decorate': 'undefined',
      preventAssignment: true
    }),
    resolve(),
    minifyHTML(),
    terser({
      ecma: 2021,
      module: false,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
