var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject("tsconfig.json");

var demoProject = ts.createProject("demo/tsconfig.json");

gulp.task("ts", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(""));
});

gulp.task('watchTs', function() {
	gulp.watch('ng2-layer.ts', function(){
		gulp.run('ts');
	});
});

/**
 * demo file
 */
gulp.task('demo', function () {
	return demoProject.src()
		.pipe(demoProject())
		.js.pipe(gulp.dest("demo/app"));
});

gulp.task('watchDemo', function() {
	gulp.watch('demo/app/**/*.ts', function(){
		gulp.run('demo');
	});
});

gulp.task('default', ['watchTs', 'watchDemo']);