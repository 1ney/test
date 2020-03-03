var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var log = require('fancy-log');
var color = require('gulp-color');
var cleanCSS = require('clean-css');

gulp.task('watch', (e) => {
  //gulp.watch('src/js/*.js', ['scripts']);
  gulp.series('compile-theme')();
  log(color('Initial compication is done', 'RED'));

  log(color('Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night\'s Watch, for this night and all the nights to come.', 'YELLOW'));
  gulp.watch('./assets/css/*.less', gulp.series('compile-theme'));
  gulp.watch('./assets/css/inc/*.less', gulp.series('compile-theme'));
  // gulp.watch('./layers/**/*.less', gulp.series('compile-layers'));
  // gulp.watch('./layers/**/*.less').on("change", function(file) {
  //       gulp
  //         .src(file)
  //         .pipe(sourcemaps.init())
  //         .pipe(less())
  //         //.pipe(cleanCSS())
  //         .pipe(sourcemaps.write())
  //         .pipe(gulp.dest(function (file) {
  //             log('----------------------------------');
  //             log('File ' + color(file.path.replace(/^.*[\\\/]/, ''), 'CYAN') + ' compiled');
  //             return file.base;
  //         }))
  //         .on('end', () => {
  //             log('==================================');
  //             log(color('Layers CSS compiled', 'GREEN') + '\n');
  //             e();
  //         })
  //   });
    e();
});


gulp.task('compile', (e) => {
    gulp.series('compile-theme', 'compile-layers')();
    e();
})


gulp.task('compile-theme', () => {
    log('Starting theme compilation' + '\n')
    return gulp.src('./assets/css/main.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        //.pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(function (file) {
            log('----------------------------------');
            log('File ' + color(file.path.replace(/^.*[\\\/]/, ''), 'CYAN') + ' compiled');
            return file.base;
        }))
        .on('end', () => {
            log('==================================');
            log(color('Theme CSS compiled', 'GREEN') + '\n')
        })
});
