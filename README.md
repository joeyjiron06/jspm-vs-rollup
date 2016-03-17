# JSPM vs RollupJS

This is an experimental repo. So JSPM uses [rollupJS](http://rollupjs.org/) under the hood. The purposes of this repo is to determine how/why jspm is needed at all for bundling our es6 code to a deployable javascript library.


## Basic Usage

If you havent done so already i recommend putting this in your `.bash_profile` it allows node to search for cli tools when you do `npm install` in this case you need it for jspm

```
PATH=$PATH:./node_modules/.bin
```

Now install and build

```bash
npm install
jspm install
gulp build
```

Look under `dist/` you should see jspm and rollup. Go ahead and open them up and see the output.