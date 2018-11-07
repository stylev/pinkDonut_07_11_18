var paths = {
	blocks: 'blocks/',
	devDir: 'app/',
	outputDir: 'build/',
	nodeDir: 'node_modules/'
}
var gulp = require('gulp'),
	pug = require('gulp-pug'),
	stylus = require('gulp-stylus'),
	concat = require('gulp-concat'),
	plumber = require('gulp-plumber'),
	prefix = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync').create();
var rimraf = require('rimraf'),
	cleancss = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify');

/* Developer tasks */

// pug compile
gulp.task('pug', function () {
	return gulp.src(paths.blocks + 'pug/pages/*.pug')
	.pipe(plumber())
	.pipe(pug({
		pretty: true
	}))
	.on("error", notify.onError(function (error) {
		return "Message to the notifier: " + error.message;
	}))
	.pipe(gulp.dest(paths.devDir))
	.pipe(browserSync.stream());
});

// stylus-header compile
gulp.task('stylus-header', function() {
	return gulp.src([
		paths.blocks + 'stylus/modules/header.styl'
	])
	.pipe(plumber())
	.pipe(stylus({
		'include css': true
	}))
	.pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleancss())
    .on("error", notify.onError(function (error) {
		return "Message to the notifier: " + error.message;
	}))
	.pipe(gulp.dest(paths.blocks + 'css/'))
	.pipe(browserSync.stream());
});

// stylus-main compile
gulp.task('stylus-main', function() {
	return gulp.src([
		paths.blocks + 'stylus/main.styl'
	])
	.pipe(plumber())
	.pipe(stylus({
		'include css': true
	}))
	.pipe(prefix({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .on("error", notify.onError(function (error) {
		return "Message to the notifier: " + error.message;
	}))
	.pipe(gulp.dest(paths.devDir + 'css/'))
	.pipe(browserSync.stream());
});

// jquery compile
gulp.task('jquery', function() {
	return gulp.src(paths.nodeDir + 'jquery/dist/jquery.min.js')
	.pipe(gulp.dest(paths.devDir + 'js/'))
	.pipe(browserSync.stream());
});

// main scripts compile
gulp.task('mainScripts', function() {
	return gulp.src(paths.blocks + 'js/main.js')
	.pipe(gulp.dest(paths.devDir + 'js/'))
	.pipe(browserSync.stream());
});

// scripts compile
gulp.task('vendorScripts', function() {
	return gulp.src([
		paths.nodeDir + 'slick-carousel/slick/slick.min.js',
		paths.nodeDir + 'jquery-form-styler/dist/jquery.formstyler.min.js',
		paths.nodeDir + 'magnific-popup/dist/jquery.magnific-popup.min.js'
	])
	.pipe(concat('vendor.min.js'))
	.pipe(gulp.dest(paths.devDir + 'js/'))
	.pipe(browserSync.stream());
});

// watch compile
gulp.task('watch', function () {
	gulp.watch([paths.blocks + '**/*.pug', paths.blocks + 'css/header.css'], ['pug']);
	gulp.watch(paths.blocks + '**/*.styl', ['stylus-header', 'stylus-main']);
	gulp.watch(paths.blocks + '**/*.js', ['mainScripts']);
});

// server compile
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: paths.devDir
        }
    });
});

/* Production tasks */

// clean
gulp.task('clean', function (cb) {
	rimraf(paths.outputDir, cb);
});

// js
gulp.task('build', ['clean'], function () {
	return gulp.src(paths.devDir + '*.html')
	.pipe(useref())
	.pipe(gulpif('*.js', uglify()))
	.pipe(gulpif('*.css', cleancss()))
	.pipe(gulp.dest(paths.outputDir));
});

// copy img
gulp.task('imgBuild', ['clean'], () =>
	gulp.src(paths.devDir + 'img/**/*.*')
	.pipe(imagemin())
	.pipe(gulp.dest(paths.outputDir + 'img/'))
);

// copy fonts
gulp.task('fontsBuild', ['clean'], () =>
	gulp.src(paths.devDir + 'fonts/**/*.*')
	.pipe(gulp.dest(paths.outputDir + 'fonts/'))
);

/* Default */

gulp.task('default', ['pug', 'stylus-header', 'stylus-main', 'jquery', 'mainScripts', 'vendorScripts', 'watch', 'browser-sync']);

/* Production */

gulp.task('prod', ['build', 'imgBuild', 'fontsBuild']);