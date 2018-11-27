// @ts-ignore
import resolve from 'rollup-plugin-node-resolve'
// @ts-ignore
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import pkg from '../package.json'
import path from 'path'

const config = [
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],

    external: ['react', 'apollo-client', 'react-apollo'],

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts', '.tsx'],
      }),
      typescript({
        tsconfig: '../tsconfig.json',
      }),
    ],
  },

  {
    input: './src/index.ts',
    output: {
      globals: { react: 'React' },
      name: 'TSApollo',
      file: pkg.browser,
      format: 'umd',
    },

    external: ['react'],

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts', '.tsx'],
      }),
      typescript({
        tsconfigOverride: { compilerOptions: { target: 'es5' } },
        tsconfig: path.resolve('..', '/tsconfig.json'),
      }),
    ],
  },
]

module.exports = config
