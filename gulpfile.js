const gulp = require('gulp');
const runSequence = require('run-sequence');
const gulpIf = require('gulp-if');
const watch = require('gulp-watch');
const copy = require('gulp-copy');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const bs = require('browser-sync').create();

const isDebug = process.env.NODE_ENV !== 'production';
const { PORT, OPEN, NODE_ENV, TUNNEL } = process.env;

gulp.task('default', () => 
	runSequence(
		'copy',
		'scripts',
		'server',
		'watch'
	)
);

gulp.task('scripts', () => {
	gulp.src('app/*.js')
		.pipe(plumber())
		.pipe(babel())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpIf(!isDebug, uglify()))
		.pipe(gulp.dest('dist'));
});

gulp.task('server', () => (
	bs.init({
		watchOptions: {
			ignored: 'app/**/*'
		},
		files: ['dist/**/*'],
		open: !!OPEN,
		reloadOnRestart: true,
		port: PORT || 3000,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		},
		server: {
			baseDir: [
				'app',
				'dist'
			],
			directory: false
		},
		tunnel: !!TUNNEL
	})
));

gulp.task('copy', () => {
	gulp.src(['app/*.*', '!app/*.js'])
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => { 
	gulp.watch('app/*.html', () => runSequence('copy'));
	gulp.watch('app/*.js', () => runSequence('scripts'));
});

gulp.task('build', () => runSequence('scripts'));
