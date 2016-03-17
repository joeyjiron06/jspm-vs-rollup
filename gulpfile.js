const jspm                  = require('jspm');
const gulp                  = require('gulp');
const rollup                = require('rollup').rollup;
const babel                 = require('rollup-plugin-babel');
const rollupIncludePaths    = require('rollup-plugin-includepaths');

const ROLLUP_FORMATS = {
  AMD          :  'amd',  // – Asychronous Module Definition, used with module loaders like RequireJS
  COMMON_JS    : 'cjs',   // – CommonJS, suitable for Node and Browserify/Webpack
  ES6          : 'es6',   // (default) – Keep the bundle as an ES6 file
  IIFE         : 'iife',  // – A self-executing function, suitable for inclusion as a <script> tag
  UMD          : 'umd'    // – Universal Module Definition, works as amd, cjs and iife all in one
};

const JSPM_FORMATS = {
  AMD          : 'amd',   // – Asychronous Module Definition, used with module loaders like RequireJS
  COMMON_JS    : 'cjs',   // – (default) CommonJS, suitable for Node and Browserify/Webpack
  ESM          : 'esm',   // –  ECMAScript 6 Module
  GLOBAL       : 'global' // – A self-executing function, suitable for inclusion as a <script> tag,

  // to build something similar to iife just set sfx:true on the jsom build options. sfx stands for
  // self executing bundle
};


/**
 * Build /src to /dist/jspm using jspm
 * */
function buildJSPM(format) {
  const builder        = new jspm.Builder();
  const srcMainFile    = 'index.js';
  const destFile       = `dist/jspm/my-library.${format}.js`;
  const bundleOpts     = {
    minify           : false,    // minify the code
    mangle           : false,    // set to `true` for production, `false` if we want to use `debugger` in dev
    format           : format,   // common js for node modules
    sourceMaps       : false,    // write source maps ?
    sfx              : true      // to make a bundle that is independent of the SystemJS loader entirely, we can make SFX bundles:
  };

  return builder.buildStatic(srcMainFile, destFile, bundleOpts);
}

/**
 * Build /src to /dist/rollup using rollup
 * */
function buildRollup(format) {
  return rollup({
      entry      : 'src/index.js',
      plugins    : [
        rollupIncludePaths({paths:['src']}),
        babel({ babelrc : false, presets : [ "es2015-rollup" ]})
      ]
    })
    .then((bundle) => {
      return bundle.write({
        dest          : `dist/rollup/my-library.${format}.js`,
        format        : format,    // common js for node modules
        sourceMaps    : false
      });
    });
}

gulp.task('build:jspm', function() {
  return buildJSPM(JSPM_FORMATS.COMMON_JS);
});

gulp.task('build:rollup', function() {
  return buildRollup(ROLLUP_FORMATS.COMMON_JS);
});

gulp.task('build', ['build:jspm', 'build:rollup']);
gulp.task('default', ['build']);