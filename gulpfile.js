'use strict'

var gulp = require('gulp')
var usemin = require('gulp-usemin')
var rev = require('gulp-rev')
var uglify = require('gulp-uglify')
var del = require('del')
var livereload = require('gulp-livereload')

var webpack = require('webpack')
var WebpackServer = require('webpack-dev-server')

gulp.task('clean', function() {
  del(['dist/*', '.tmp']).then(function(paths) {
	   console.log('Deleted files and folders:\n', paths.join('\n'));
});
})
gulp.task('assets', function() {
  return gulp.src('app/index.html')
    .pipe(usemin({
      js: [rev(),uglify()]
    }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch',['clean'], function() {
  livereload.listen();
  var compiler = webpack(require('./webpack.config.js'))

  var server = new WebpackServer(compiler, {
    hot: true,
    contentBase: __dirname + '/app/',
    publicPath: '/assets',
    filename: 'main.js'
  })

  server.listen(8080)
})

gulp.task('build', ['clean'], function() {
  webpack(require('./webpack.dist.config.js')).run(function(err, stats) {
    if (err) throw err
    gulp.start(['assets'])
    done()
  })
})

gulp.task('default', ['watch'])
