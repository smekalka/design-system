import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    resolve({
      extensions: [ '.js', '.jsx' ],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
};
