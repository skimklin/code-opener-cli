import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    banner: '#!/usr/bin/env node',
    esModule: true,
    file: 'bin/src/index.js',
    format: 'esm'
  },
  plugins: [
    json(),
    commonjs(),
    typescript(),
    resolve({
      exportConditions: ['node'],
      preferBuiltins: false,
    }),
    copy({
      targets: [
        { src: 'node_modules/clipboardy/fallbacks', dest: 'bin' },
      ]
    })
  ],
};

export default config