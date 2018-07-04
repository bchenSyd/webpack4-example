import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs"; //  convert CommonJS to ES2015 before Rollup can process them

export default {
  input: `index.js`,
  plugins: [babel()],
  output: {
    file: `dist/bundle.js`,
    format: "cjs"
  }
};
