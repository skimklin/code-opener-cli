import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: {
    banner: '#!/usr/bin/env node',
    esModule: true,
    dir: 'bin',
    format: 'esm',
  },
  plugins: [
    json(),
    commonjs(),
    typescript(),
    resolve({
      exportConditions: ['node'],
      preferBuiltins: false,
    }),
  ],
};

export default config