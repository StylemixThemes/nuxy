const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const cssmin = require('gulp-cssmin');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('serve', function (done) {
    "use strict";

    browserSync.init({
        proxy: "http://motors.loc",
        host: "192.168.0.124",
        port: 3000,
        notify: true,
        ui: {
            port: 3001
        },
        open: false
    });

    done();
});

gulp.task('watch', function (done) {

    watch('./metaboxes/assets/scss/**/*.scss').on('change', (e) => {
        gulp.src('./metaboxes/assets/scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./metaboxes/assets/css'))
            .pipe(browserSync.stream())
    });

    watch('./metaboxes/assets/es6/**/*.js').on('change', (e) => {

        gulp.src('./metaboxes/assets/es6/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(browserify({
                transform: ['babelify'],
            }))
            .pipe(gulp.dest('./metaboxes/assets/js'));

    });

    watch('./metaboxes/general_components/es6/*.js').on('change', (e) => {

        console.log(e);

        gulp.src('./metaboxes/general_components/es6/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(browserify({
                transform: ['babelify'],
            }))
            .pipe(gulp.dest('./metaboxes/general_components/js'));

    });

    done();

});

gulp.task('default', gulp.series(gulp.parallel('watch', 'serve')));


/*BUILD TASKS*/
gulp.task('clean_wpcfto', function (done) {
    gulp.src('./metaboxes/assets/css', {allowEmpty: true})
        .pipe(clean());

    gulp.src('./metaboxes/assets/js', {allowEmpty: true})
        .pipe(clean());

    gulp.src('./metaboxes/general_components/js', {allowEmpty: true})
        .pipe(clean());

    done();
});

gulp.task('build_wpcfto', function (done) {

    setTimeout(function () {
        gulp.src('./metaboxes/assets/scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(cssmin())
            .pipe(gulp.dest('./metaboxes/assets/css'));

        gulp.src('./metaboxes/assets/es6/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(browserify({
                transform: ['babelify'],
            }))
            .pipe(gulp.dest('./metaboxes/assets/js'));

        gulp.src('./metaboxes/general_components/es6/**/*.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .on('error', function(error) {
                console.log(error)
            })
            .pipe(browserify({
                transform: ['babelify'],
            }))
            .pipe(gulp.dest('./metaboxes/general_components/js'));

        gulp.src(['./metaboxes/assets/vendors/js/**/*.js'])
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write('../sourcemap'))
            .pipe(gulp.dest('./metaboxes/assets/js'));

        done();

    }, 5000);

});

gulp.task('build', gulp.series('clean_wpcfto', 'build_wpcfto'));