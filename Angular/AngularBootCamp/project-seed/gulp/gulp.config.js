module.exports = {

  build_dir: 'build',
  compile_dir: 'bin',
  bundle: this.build_dir + '/bundle.js',
  server: 'server/server.js',

  app_files: {
    // source, but NO specs
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/modules/**/*.js' ],
    js_compile: ['build/vendor.js', 'build/bundle.js', 'gulp/module.prefix', 'build/app/**/*.js', 'build/common/**/*.js', 'gulp/module.suffix'],
    modules: ['src/modules/**/*.js'],
    vendor: ['vendor/**/*.js'],
    jsunit: [ 'src/**/*.spec.js' ],
    // our partial templates
    atpl: [ 'src/app/**/*.tpl.html', 'src/common/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],
    tpl_src: ['build/vendor.js', 'build/bundle.js', "./build/app/**/*.js", "./build/common/**/*.js", "./build/css/**/*.css"],
    // the index.html
    html: [ 'src/index.html' ],
    less: 'src/less/main.less',
    styles: [ 'src/less/**/*.less'],
    ngmin_js: [ './bin/**/*.js' ]
  },

  test_files: {
    js: [
      'node_modules/jquery/dist/jquery.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
    ]
  },

  browserify_shims: {
  }
};
