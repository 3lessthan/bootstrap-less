module.exports = function(grunt) {
  const browsersOpt = { browsers: ['last 2 versions', '> 0.5%', 'ie 11'] };
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    less: {
      dev: {
        options: {
          compress: false,
          plugins: [new (require('less-plugin-autoprefix'))(browsersOpt)]
        },

        files: {
          'dist/bootstrap.css':        'less/bootstrap.less',
          'dist/bootstrap-grid.css':   'less/bootstrap-grid.less',
          'dist/bootstrap-reboot.css': 'less/bootstrap-reboot.less'
        }
      },
      dist: {
        options: {
          compress: true,
          plugins: [new (require('less-plugin-clean-css'))('')]
        },
        files: {
          'dist/bootstrap.min.css':        'less/bootstrap.less',
          'dist/bootstrap-grid.min.css':   'less/bootstrap-grid.less',
          'dist/bootstrap-reboot.min.css': 'less/bootstrap-reboot.less'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          // fallbacks for rem units
          require('pixrem')(),
          // vendor prefixes
          require('autoprefixer')(browsersOpt),
          // css babel
          require('postcss-preset-env')(browsersOpt),
          // normalizer
          require('postcss-normalize')(browsersOpt),
          // minify
          // require('cssnano')()
        ]
      },
      dist: {
        src: 'dist/bootstrap.min.css'
      }
    },
    watch: {
      dev: {
        files: ['less/**/*.less'],
        tasks: ['dev']
      }
    }
  });
  grunt.registerTask('dist', ['less:dist', 'postcss:dist']);
  grunt.registerTask('dev',  ['less:dev']);
  // grunt.option('stack', true);
  grunt.registerTask('default', ['dev']);
};
