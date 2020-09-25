import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  external: [
    'react',
    'react-dom',
    'prop-types',
    'node-sass',
  ],
  plugins: [
    postcss({
      extract: false,
      modules: true,
    }),
    resolve({
      extensions: [ '.js', '.jsx' ],
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
  ],
};
