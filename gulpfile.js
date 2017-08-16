var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');

var tsProject = ts.createProject("tsconfig.json");

var demoProject = ts.createProject("demo/tsconfig.json");

gulp.task("ts", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest(""));
});

gulp.task('watchTs', function() {
	gulp.watch('angular2-layer.ts', function(){
		gulp.run('ts');
	});
});

gulp.task('less', function() {
	return gulp.src('css/*.less') // only compile the entry file
		.pipe(less()).on('error', function(err) {
			this.emit('end');
			console.log(err);
		})
		.pipe(gulp.dest('./css'))
});

gulp.task('watchLess', function() {
	gulp.watch('css/*.less', function(){
		gulp.run('less');
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

gulp.task('default', ['ts', 'watchTs', 'watchDemo', 'less', 'watchLess']);